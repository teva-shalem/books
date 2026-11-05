/**
 * Clean and robust scroll management system for Vue Router SPAs.
 */

const CONFIG = {
  POLL_INTERVAL_MS: 25,
  MAX_ATTEMPTS: 100,
  SETTLED_DELAY_MS: 350,
};

const getKey = (state) => (state && state.key) || window.location.href;

/**
 * Safely decodes a hash into an element ID.
 */
const decodeHashId = (hash) => {
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return hash.slice(1);
  }
};

/**
 * Scrolls to a target DOM element with offset calculation.
 */
const scrollToElement = (id, behavior = 'smooth') => {
  const el = document.getElementById(id);
  if (!el) return;

  let top = 0;
  let current = el;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent;
  }
  window.scrollTo({ top, behavior });
};

/**
 * Handles element polling for SPA hydration and instant cross-page anchor loading.
 */
export const scrollToHash = (hash, behavior = 'smooth') => {
  if (!hash) return;
  const id = decodeHashId(hash);

  let attempts = 0;
  const poll = () => {
    if (document.getElementById(id)) {
      if (behavior === 'auto') {
        scrollToElement(id, 'auto');
      } else {
        setTimeout(() => scrollToElement(id, 'smooth'), CONFIG.SETTLED_DELAY_MS);
      }
    } else if (attempts < CONFIG.MAX_ATTEMPTS) {
      attempts++;
      setTimeout(poll, CONFIG.POLL_INTERVAL_MS);
    }
  };

  poll();
};

/**
 * Configures Vue Router scroll behavior and history restoration.
 */
export const setupScrollBehavior = (router) => {
  if (typeof window === 'undefined') return;

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const scrollMap = new Map();
  let isHistoryPop = false;
  let isRestoring = false;
  let lastPathname = window.location.pathname;

  const safeScrollTo = (options) => {
    isRestoring = true;
    window.scrollTo(options);
    setTimeout(() => { isRestoring = false; }, 150);
  };

  // Continuously record user scroll position
  window.addEventListener('scroll', () => {
    if (!isHistoryPop && !isRestoring) {
      scrollMap.set(getKey(history.state), window.scrollY);
    }
  }, { passive: true });

  // Handle browser back/forward history navigation
  window.addEventListener('popstate', (e) => {
    isHistoryPop = true;
    isRestoring = true;
    const targetKey = getKey(e.state);
    const isSamePage = window.location.pathname === lastPathname;
    lastPathname = window.location.pathname;

    setTimeout(() => {
      if (scrollMap.has(targetKey)) {
        const targetTop = scrollMap.get(targetKey);
        let attempts = 0;
        const attemptScroll = () => {
          window.scrollTo({ top: targetTop, behavior: isSamePage ? 'smooth' : 'auto' });
          if (window.scrollY < targetTop && attempts < 20 && document.documentElement.scrollHeight <= targetTop) {
            attempts++;
            setTimeout(attemptScroll, 50);
          }
        };
        attemptScroll();
      } else if (isSamePage && window.location.hash) {
        scrollToHash(window.location.hash, 'smooth');
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }

      setTimeout(() => {
        isHistoryPop = false;
        isRestoring = false;
      }, isSamePage ? 600 : 200);
    }, 50);
  });

  // Intercept in-page anchor clicks
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    const isSamePageHash = href.startsWith('#') || href.includes(window.location.pathname + '#');
    if (isSamePageHash) {
      e.preventDefault();
      const hash = href.substring(href.indexOf('#'));
      if (hash) {
        const currentKey = getKey(history.state);
        scrollMap.set(currentKey, window.scrollY);

        // Check if we are already on this exact hash
        if (decodeHashId(window.location.hash) === decodeHashId(hash)) {
          // 1. Manually push a new history state so the Back button works
          history.pushState(
            { ...history.state, key: Math.random().toString(36).substring(2) }, 
            '', 
            hash
          );
          // 2. Save the scroll position for this new history entry too
          scrollMap.set(getKey(history.state), window.scrollY);
          // 3. Trigger smooth scroll manually
          scrollToHash(hash, 'smooth');
        } else {
          router.push({ hash }).then(() => scrollToHash(hash, 'smooth')).catch(() => {});
        }
      }
    }
  });
  
  // Intercept in-page anchor clicks
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    const isSamePageHash = href.startsWith('#') || href.includes(window.location.pathname + '#');
    if (isSamePageHash) {
      e.preventDefault();
      const hash = href.substring(href.indexOf('#'));
      if (hash) {
        const currentKey = getKey(history.state);
        scrollMap.set(currentKey, window.scrollY);

        // Check if we are already on this exact hash
        if (window.location.hash === hash) {
          // 1. Manually push a new history state so the Back button works
          history.pushState(
            { ...history.state, key: Math.random().toString(36).substring(2) }, 
            '', 
            hash
          );
          // 2. Save the scroll position for this new history entry too
          scrollMap.set(getKey(history.state), window.scrollY);
          // 3. Trigger smooth scroll manually
          scrollToHash(hash, 'smooth');
        } else {
          router.push({ hash }).then(() => scrollToHash(hash, 'smooth')).catch(() => {});
        }
      }
    }
  });

  // Jump to top on new forward cross-page navigation ONLY if there is no hash
  router.beforeEach((to, from, next) => {
    if (to.path !== from.path && !isHistoryPop) {
      if (!to.hash) {
        safeScrollTo({ top: 0, behavior: 'auto' });
      }
    }
    lastPathname = to.path;
    next();
  });

  router.options.scrollBehavior = () => false;

  router.afterEach((to) => {
    const isCrossPage = to.path !== lastPathname;
    lastPathname = to.path;
    if (to.hash && !isHistoryPop) {
      scrollToHash(to.hash, isCrossPage ? 'auto' : 'smooth');
    }
  });
};