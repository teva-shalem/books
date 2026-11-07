const CONFIG = { POLL_MS: 25, MAX_ATTEMPTS: 100, SETTLE_MS: 350 };
const scrollMap = new Map();

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
        setTimeout(() => scrollToElement(id, 'smooth'), CONFIG.SETTLE_MS);
      }
    } else if (attempts < CONFIG.MAX_ATTEMPTS) {
      attempts++;
      setTimeout(poll, CONFIG.POLL_MS);
    }
  };
  poll();
};

/**
 * Configures Vue Router scroll behavior and history restoration.
 */
export const setupScrollBehavior = (router) => {
  if (typeof window === 'undefined') return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

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
        window.scrollTo({ top: 0, behavior: isSamePage ? 'smooth' : 'auto' });
      }

      setTimeout(() => { isHistoryPop = isRestoring = false; }, isSamePage ? 600 : 200);
    }, 50);
  });

  // Intercept in-page anchor clicks
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    const isSamePageHash = href.startsWith('#') || href.includes(window.location.pathname + '#');
    if (!isSamePageHash) return;

    e.preventDefault();
    e.stopImmediatePropagation(); // Isolates behavior from VuePress built-in click listeners

    const hash = href.substring(href.indexOf('#'));
    if (!hash) return;

    scrollMap.set(getKey(history.state), window.scrollY);
    const targetLocation = { path: window.location.pathname, hash };

    if (decodeHashId(window.location.hash) === decodeHashId(hash)) {
      const manualKey = `man-${Math.random().toString(36).substring(2, 10)}`;
      history.pushState({ key: manualKey }, '', window.location.pathname + hash);
      scrollMap.set(manualKey, window.scrollY);
      scrollToHash(hash, 'smooth');
    } else {
      router.push(targetLocation)
        .then(() => scrollToHash(hash, 'smooth'))
        .catch((err) => {
          if (err && err.name === 'NavigationDuplicated') scrollToHash(hash, 'smooth');
        });
    }
  }, { capture: true });

  router.options.scrollBehavior = () => false;

  router.afterEach((to, from) => {
    const isCrossPage = to.path !== from.path;
    
    if (isCrossPage && !isHistoryPop) {
      requestAnimationFrame(() => {
        if (!to.hash) {
          safeScrollTo({ top: 0, behavior: 'auto' });
        } else {
          scrollToHash(to.hash, 'auto');
        }
      });
    } else if (to.hash && !isHistoryPop) {
      scrollToHash(to.hash, 'smooth');
    }
    lastPathname = to.path;
  });

  if (window.location.hash) {
    if (document.readyState === 'complete') {
      scrollToHash(window.location.hash, 'auto');
    } else {
      window.addEventListener('load', () => scrollToHash(window.location.hash, 'auto'), { once: true });
    }
  }
};