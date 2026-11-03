const {zoom} = require('../../config/attrs.js')

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
 * Handles manual close events (ESC key, clicking, or scrolling).
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
 * Attaches global event listeners and the DOM observer.
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

    // Single observer to cleanly detect any overlay removal (click, ESC, scroll, etc.)
    const observer = new MutationObserver(() => {
      if (isZoomed && !document.querySelector('.medium-zoom-overlay')) {
        handleManualClose()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })

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
        }
      }, 50)
    })
  })
}

/**
 * Initializes or updates the zoom-to-history binding for the given route context.
 * 
 * @param {string} selector - CSS selector matching target images.
 */
export function initZoomHistory(selector = zoom.selector) {
  currentSelector = selector
  attachGlobalListeners()

  // Small delay to ensure VuePress DOM hydration has finished post-route navigation
  setTimeout(() => {
    bindImageListeners(currentSelector)
  }, 300)
}