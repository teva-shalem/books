/**
 * Anchor scroll handler supporting
 * Hebrew/URI-encoded IDs, cold-cache hydration polling, and asset-settling buffers.
 */

const CONFIG = {
  DEDUPE_WINDOW_MS: 500,
  POLL_INTERVAL_MS: 25,
  MAX_ATTEMPTS: 100,
  SETTLED_DELAY_MS: 350,
};

let lastRunHash = null;
let lastRunTime = 0;
let isBackNavigation = false;

/**
 * Safely extracts and decodes an element ID from a URL hash.
 * 
 * @param {string} hash - The target hash string (e.g., "#שרטוט")
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
 * Instantly snaps the viewport to the target element.
 * 
 * @param {string} id - The DOM element ID
 */
const scrollToElement = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
};

/**
 * Handles element polling for SPA hydration and applies cold-cache asset buffers.
 * 
 * @param {string} hash - The target URL hash
 */
export const scrollToHash = (hash) => {
  if (!hash) return;

  const now = Date.now();
  // Prevent duplicate execution within the deduplication window
  if (lastRunHash === hash && (now - lastRunTime) < CONFIG.DEDUPE_WINDOW_MS) return;
  
  lastRunHash = hash;
  lastRunTime = now;

  const id = decodeHashId(hash);

  // 1. Poll until the element mounts into the DOM
  let attempts = 0;
  const pollForElement = () => {
    const el = document.getElementById(id);
    if (el) {
      // Element found! Give cold-cache assets time to render/paint
      setTimeout(() => scrollToElement(id), CONFIG.SETTLED_DELAY_MS);
    } else if (attempts < CONFIG.MAX_ATTEMPTS) {
      attempts++;
      setTimeout(pollForElement, CONFIG.POLL_INTERVAL_MS);
    }
  };

  pollForElement();

  // 2. Safeguard for slow cold loads: re-verify once all network assets are fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => scrollToElement(id), 50);
  }, { once: true });
};

/**
 * Configures Vue Router scroll behavior and hooks into route transitions.
 * 
 * @param {import('vue-router').default} router - The Vue Router instance
 */
export const setupScrollBehavior = (router) => {
  if (typeof window === 'undefined') return;

  // Track browser back/forward navigation explicitly
  window.addEventListener('popstate', () => {
    isBackNavigation = true;
  });

  router.options.scrollBehavior = (to, from, savedPosition) => {
    // If it's a back/forward action and we have saved coordinates, 
    // bypass the hash entirely and restore the exact previous viewport position.
    if (isBackNavigation && savedPosition) {
      isBackNavigation = false; // Reset flag
      return savedPosition;
    }

    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return false; // Defer to hash handler only on fresh clicks
    }

    return { x: 0, y: 0 };
  };

  router.afterEach((to) => {
    // Ensure flag resets if user clicked a normal router-link
    isBackNavigation = false;

    if (to.hash) {
      scrollToHash(to.hash);
    } else {
      lastRunHash = null; // Reset deduplication lock when navigating to a clean URL
    }
  });
};