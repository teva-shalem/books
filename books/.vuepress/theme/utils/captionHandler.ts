let captionEl: HTMLDivElement | null = null;
let observer: MutationObserver | null = null;

/**
 * Creates and dynamically injects the caption element into the DOM body
 */
const createCaption = (altText: string): void => {
  captionEl?.remove();

  captionEl = document.createElement('div');
  captionEl.className = 'medium-zoom-caption-overlay';
  captionEl.textContent = altText;
  document.body.appendChild(captionEl);

  requestAnimationFrame(() => captionEl?.classList.add('is-visible'));
};

/**
 * Destroys the caption instantly with no animation delays right when closing starts
 */
export const forceDestroyCaption = (): void => {
  captionEl?.remove();
  captionEl = null;
};

/**
 * Intercepts the zero-frame step of a zoom-out sequence.
 * Fires instantly when either the backdrop or image kicks off a transition back to hidden.
 */
const handleZoomCloseStart = (event: TransitionEvent): void => {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const isBackdropClosing = target.classList.contains('medium-zoom-overlay');
  const isImageClosing = target.tagName === 'IMG' && !target.classList.contains('medium-zoom-image--opened');

  if (isBackdropClosing || isImageClosing) {
    forceDestroyCaption();
  }
};

/**
 * Observes image state modifications inside the core content region
 */
export const initCaptionObserver = (): void => {
  observer?.disconnect();
  observer = null;

  const targetContainer = document.querySelector('.main-container');
  if (!targetContainer) return;

  observer = new MutationObserver((mutations: MutationRecord[]) => {
    for (const { type, attributeName, target } of mutations) {
      if (type === 'attributes' && attributeName === 'class' && target instanceof HTMLImageElement) {
        // Native open tracking class applied by medium-zoom
        const isZoomed = target.classList.contains('medium-zoom-image--opened');

        if (isZoomed) {
          const altText = target.alt || target.getAttribute('title');
          if (altText) createCaption(altText);
        } else {
          forceDestroyCaption();
        }
      }
    }
  });

  observer.observe(targetContainer, {
    attributes: true,
    subtree: true,
    attributeFilter: ['class'],
  });
};

/**
 * Registers global failsafe event listeners once during application boot
 */
export const setupGlobalListeners = (): void => {
  if (typeof window === 'undefined') return;
  
  // Using the capture phase guarantees catching the transition step instantly
  window.addEventListener('transitionstart', handleZoomCloseStart, true);
};