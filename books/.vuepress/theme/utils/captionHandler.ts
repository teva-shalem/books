let captionEl: HTMLDivElement | null = null;

const createCaption = (altText: string): void => {
  captionEl?.remove();

  captionEl = document.createElement('div');
  captionEl.className = 'medium-zoom-caption-overlay';
  captionEl.textContent = altText;
  document.body.appendChild(captionEl);

  // Force layout calculation across double paint cycles before animating opacity
  requestAnimationFrame(() => {
    requestAnimationFrame(() => captionEl?.classList.add('is-visible'));
  });
};

export const forceDestroyCaption = (): void => {
  captionEl?.remove();
  captionEl = null;
};

const handleZoomTransition = (event: TransitionEvent): void => {
  const target = event.target as HTMLElement | null;
  if (!target?.classList.contains('medium-zoom-overlay')) return;

  const openedImg = document.querySelector('img.medium-zoom-image--opened') as HTMLImageElement | null;
  const opacity = parseFloat(window.getComputedStyle(target).opacity);

  if (opacity === 0) {
    if (openedImg?.alt && document.body.contains(openedImg)) {
      createCaption(openedImg.alt);
    }
  } else if (opacity > 0) {
    forceDestroyCaption();
  }
};

export function handleCaption(): void {
  window.addEventListener('transitionrun', handleZoomTransition, true);

  window.addEventListener('popstate', forceDestroyCaption, { capture: true });
}
