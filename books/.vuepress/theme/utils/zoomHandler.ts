import type { Router } from 'vuepress'
import { zoom } from '../../config/attrs'

const CONFIG = {
  CLASSES: {
    OVERLAY: '.medium-zoom-overlay',
  },
  KEYS: {
    ESCAPE: 'Escape',
  },
  DATA_ATTRS: {
    HISTORY_BOUND: 'zoomHistoryBound',
  },
  TIMEOUTS: {
    OVERLAY_RENDER_MS: 50,
    DOM_HYDRATION_MS: 300,
  },
} as const

let isZoomed = false
let ignoreNextPopState = false
let currentSelector = ''
let isGlobalListenersAttached = false

/**
 * Handles browser navigation changes (Back/Forward buttons)
 */
const handlePopState = (): void => {
  if (!isZoomed) return
  
  isZoomed = false
  ignoreNextPopState = true

  // Native medium-zoom unzooms automatically when its overlay is clicked
  const zoomOverlay = document.querySelector(CONFIG.CLASSES.OVERLAY) as HTMLElement | null
  zoomOverlay?.click()
}

/**
 * Handles explicit manual escapes (ESC keys, scrolling actions, background overlays)
 */
const handleManualClose = (): void => {
  if (!isZoomed) return

  isZoomed = false
  
  if (!ignoreNextPopState) {
    ignoreNextPopState = true
    history.back()
  }
}

const bindGlobalListeners = (): void => {
  if (isGlobalListenersAttached) return

  // 1. Monitor browser history transitions
  window.addEventListener('popstate', handlePopState)

  // 2. Catch native keyboard events
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === CONFIG.KEYS.ESCAPE && isZoomed) {
      handleManualClose()
    }
  })

  // 3. Track DOM trees to clear history if overlay unmounts via scroll/clicks
  const observer = new MutationObserver(() => {
    if (isZoomed && !document.querySelector(CONFIG.CLASSES.OVERLAY)) {
      handleManualClose()
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })

  isGlobalListenersAttached = true
}

const bindImageListeners = (selector: string): void => {
  const images = document.querySelectorAll<HTMLImageElement>(selector)
  
  images.forEach((img) => {
    if (img.dataset[CONFIG.DATA_ATTRS.HISTORY_BOUND]) return
    img.dataset[CONFIG.DATA_ATTRS.HISTORY_BOUND] = 'true'

    img.addEventListener('click', () => {
      // Buffer allows medium-zoom to inject overlay before updating history
      setTimeout(() => {
        if (document.querySelector(CONFIG.CLASSES.OVERLAY) && !isZoomed) {
          isZoomed = true
          ignoreNextPopState = false
          history.pushState({ mediumZoom: true }, '')
        }
      }, CONFIG.TIMEOUTS.OVERLAY_RENDER_MS)
    })
  })
}

/**
 * Initializes or updates the zoom-to-history binding for the current page context
 */
export function handleZoom(router: Router, selector: string = zoom.selector): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  router.afterEach(() => {
    currentSelector = selector
    bindGlobalListeners()

    // Buffer ensures VuePress finishes painting page layouts before scanning images
    setTimeout(() => bindImageListeners(currentSelector), CONFIG.TIMEOUTS.DOM_HYDRATION_MS)
  })
}
