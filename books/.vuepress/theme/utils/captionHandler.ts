let captionEl: HTMLDivElement | null = null
let observer: MutationObserver | null = null

const createCaption = (altText: string): void => {
  captionEl?.remove()

  captionEl = document.createElement('div')
  captionEl.className = 'medium-zoom-caption-overlay'
  captionEl.textContent = altText
  document.body.appendChild(captionEl)

  // Force layout calculation across double paint cycles before animating opacity
  requestAnimationFrame(() => {
    requestAnimationFrame(() => captionEl?.classList.add('is-visible'))
  })
}

export const forceDestroyCaption = (): void => {
  captionEl?.remove()
  captionEl = null
}

const handleBodyClassChange = (): void => {
  const isZoomed = document.body.classList.contains('medium-zoom--opened')

  if (isZoomed) {
    const openedImg = document.querySelector('img.medium-zoom-image--hidden') as HTMLImageElement | null
    if (openedImg?.alt) {
      createCaption(openedImg.alt)
    }
  } else {
    forceDestroyCaption()
  }
}

export function handleCaption(): void {
  observer?.disconnect()

  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        handleBodyClassChange()
      }
    }
  })

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
  })
}
