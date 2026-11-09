import VTooltip from 'v-tooltip'
import Buefy from 'buefy'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css'

import { setupScrollBehavior } from './theme/utils/scrollHandler'
import { initZoomHistory } from './theme/utils/zoomHandler'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer,
}) => {
  Vue.use(VTooltip)
  Vue.use(Buefy)
  Vue.use(VueKatex, {
    globalOptions: {
      //... Define globally applied KaTeX options here
    }
  });

  if (isServer || typeof window === 'undefined') return;
  
  setupScrollBehavior(router);
  
  router.afterEach(() => {
    initZoomHistory()
  })

  let captionEl = null;
    let observer = null;

    // 1. Function to cleanly create the caption overlay
    const createCaption = (altText) => {
      // Clear out any old lingering element first
      if (captionEl && captionEl.parentNode) {
        captionEl.parentNode.removeChild(captionEl);
      }
      captionEl = document.createElement('div');
      captionEl.className = 'medium-zoom-caption-overlay';
      captionEl.textContent = altText;
      document.body.appendChild(captionEl);

      requestAnimationFrame(() => {
        if (captionEl) captionEl.classList.add('is-visible');
      });
    };

    // 2. Function to absolute-destruct the caption element
    const forceDestroyCaption = () => {
      if (captionEl) {
        captionEl.classList.remove('is-visible');
        const elToRemove = captionEl;
        
        // Immediately fade out, then drop from DOM after animation frames wrap up
        setTimeout(() => {
          if (elToRemove && elToRemove.parentNode) {
            elToRemove.parentNode.removeChild(elToRemove);
          }
        }, 300);
        
        captionEl = null;
      }
    };

    // 3. MutationObserver focusing exclusively on the image zoom states
    const initObserver = () => {
      if (observer) observer.disconnect();

      const targetContainer = document.querySelector('.main-container');
      if (!targetContainer) return;

      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const targetNode = mutation.target;

            if (targetNode.tagName === 'IMG') {
              const isZoomed = targetNode.classList.contains('medium-zoom-image--hidden');
              
              if (isZoomed) {
                const altText = targetNode.alt || targetNode.getAttribute('title');
                if (altText) createCaption(altText);
              } else {
                forceDestroyCaption();
              }
            }
          }
        }
      });

      observer.observe(targetContainer, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
      });
    };

    // 4. FAILSAFE TRIGGER: Watch the native medium-zoom overlay element directly.
    // If the library closes via Escape key, scrolling, or background click, 
    // the backdrop overlay state will change. This ensures no caption gets stuck.
    window.addEventListener('transitionend', (event) => {
      const target = event.target;
      if (target && target.classList && target.classList.contains('medium-zoom-overlay')) {
        // If the overlay is fading out or being hidden, destroy our custom caption immediately
        const computedStyle = window.getComputedStyle(target);
        if (computedStyle.opacity === '0' || computedStyle.visibility === 'hidden') {
          forceDestroyCaption();
        }
      }
    }, true);

    // Clean up completely on route changes
    router.afterEach(() => {
      forceDestroyCaption();
      setTimeout(initObserver, 500); 
    });
}
