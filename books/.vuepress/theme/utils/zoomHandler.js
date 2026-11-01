/**
 * Integrates `@vuepress/plugin-medium-zoom` with the browser History API.
 * Pushes a history state when an image is zoomed in, ensuring that pressing the browser's 
 * "Back" button closes the zoom overlay instead of navigating away from the document.
 */

// Global state tracking for zoom and history navigation
let isZoomed = false
let ignoreNextPopState = false
let currentSelector = ''
let popStateListenerAttached = false

/**
 * Handles the browser's `popstate` event (e.g., clicking the browser Back button).
 * If an image is zoomed, closes the zoom without navigating the page.
 */
function handlePopState() {
  if (isZoomed) {
    isZoomed = false
    ignoreNextPopState = true

    // Click the active overlay to trigger medium-zoom's native unzoom routine
    const zoomOverlay = document.querySelector('.medium-zoom-overlay')
    if (zoomOverlay) {
      zoomOverlay.click()
    }
  }
}

/**
 * Handles manual close events (ESC key or clicking the open image directly).
 * Programmatically pops the history entry so the history stack remains clean.
 */
function handleManualClose() {
  if (isZoomed) {
    isZoomed = false
    if (!ignoreNextPopState) {
      ignoreNextPopState = true
      history.back()
    }
  }
}

/**
 * Attaches event listeners to document level events (ESC key and global window popstate).
 * Designed to only bind once across route transitions.
 */
function attachGlobalListeners() {
  if (!popStateListenerAttached) {
    window.addEventListener('popstate', handlePopState)

    // Intercept ESC key presses while image is zoomed
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isZoomed) {
        handleManualClose()
      }
    })

    popStateListenerAttached = true
  }
}

/**
 * Binds image click handlers for medium-zoom targets on the current page.
 * 
 * @param {string} selector - CSS selector matching zoomable images.
 */
function bindImageListeners(selector) {
  const images = document.querySelectorAll(selector)
  if (!images.length) return

  images.forEach((img) => {
    // Avoid attaching duplicate click listeners if revisited
    if (img.dataset.zoomHistoryBound) return
    img.dataset.zoomHistoryBound = 'true'

    img.addEventListener('click', () => {
      // Small timeout allows medium-zoom to render its overlay before checking state
      setTimeout(() => {
        const overlay = document.querySelector('.medium-zoom-overlay')
        if (overlay && !isZoomed) {
          isZoomed = true
          ignoreNextPopState = false
          history.pushState({ mediumZoom: true }, '')

          // Listen for overlay click to detect manual unzooming
          overlay.addEventListener(
            'click',
            () => {
              setTimeout(handleManualClose, 50)
            },
            { once: true }
          )
        }
      }, 50)
    })
  })
}

/**
 * Initializes or updates the zoom-to-history binding for the given route context.
 * 
 * @param {string} selector - CSS selector matching target images.
 * @default 'img.img:not(.disable-zoom)'
 */
export function initZoomHistory(selector = 'img.img:not(.disable-zoom)') {
  currentSelector = selector
  attachGlobalListeners()

  // Small delay to ensure VuePress DOM hydration has finished post-route navigation
  setTimeout(() => {
    bindImageListeners(currentSelector)
  }, 300)
}