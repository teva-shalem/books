/**
 * Anchor scroll handler supporting
 * Hebrew/URI-encoded IDs, cold-cache hydration polling, and asset-settling buffers.
 */

const CONFIG = {
  POLL_INTERVAL_MS: 25,
  MAX_ATTEMPTS: 100,
  SETTLED_DELAY_MS: 350,
};

/**
 * Safely extracts and decodes an element ID from a URL hash.
 * 
 * @param {string} hash The target hash string (e.g., "#שרטוט")
 * @returns {string} The decoded element ID
 */
const decodeHashId = (hash) => {
  const rawId = hash.slice(1);
  try {
    return decodeURIComponent(rawId);
  } catch (e) {
    return rawId;
  }
};

/**
 * Smoothly scrolls the viewport to the target element using reliable offset calculation.
 * 
 * @param {string} id The DOM element ID
 */
const scrollToElement = (id) => {
  const el = document.getElementById(id);
  if (el) {
    let top = 0;
    let current = el;
    while (current) {
      top += current.offsetTop;
      current = current.offsetParent;
    }
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  }
};

/**
 * Handles element polling for SPA hydration and applies cold-cache asset buffers.
 * 
 * @param {string} hash The target URL hash
 */
export const scrollToHash = (hash) => {
  if (!hash) return;
  const id = decodeHashId(hash);

  let attempts = 0;
  const pollForElement = () => {
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => scrollToElement(id), CONFIG.SETTLED_DELAY_MS);
    } else if (attempts < CONFIG.MAX_ATTEMPTS) {
      attempts++;
      setTimeout(pollForElement, CONFIG.POLL_INTERVAL_MS);
    }
  };

  pollForElement();

  window.addEventListener('load', () => {
    setTimeout(() => scrollToElement(id), 50);
  }, { once: true });
};

/**
 * Configures Vue Router scroll behavior and hooks into route transitions.
 * 
 * @param {import('vue-router').default} router The Vue Router instance
 */
export const setupScrollBehavior = (router) => {
  if (typeof window === 'undefined') return;

  const scrollMap = new Map();
  let isHistoryPop = false;

  // Helper to extract key from a state object or fallback to href
  const getKey = (state) => (state && state.key) || window.location.href;

  // Continuously record scroll position tied to the active history record key
  window.addEventListener('scroll', () => {
    const currentKey = getKey(history.state);
    scrollMap.set(currentKey, window.scrollY);
  }, { passive: true });

  // Handle browser back/forward history restoration accurately using event state
  window.addEventListener('popstate', (e) => {
    isHistoryPop = true;
    const targetKey = getKey(e.state);

    setTimeout(() => {
      if (scrollMap.has(targetKey)) {
        window.scrollTo({ top: scrollMap.get(targetKey), behavior: 'auto' });
      } else if (window.location.hash) {
        scrollToHash(window.location.hash);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      isHistoryPop = false;
    }, 0);
  });

  // Intercept in-page anchor clicks to use router.push for proper history state generation
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
        // Save current scroll position to the current history key before navigating
        scrollMap.set(getKey(history.state), window.scrollY);

        router.push({ hash }).then(() => {
          scrollToHash(hash);
        }).catch(() => {});
      }
    }
  });

  router.options.scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) return savedPosition;
    if (to.hash) return false;
    return { x: 0, y: 0 };
  };

  router.afterEach((to) => {
    if (to.hash && !isHistoryPop) {
      scrollToHash(to.hash);
    }
  });
};