import type { Router, RawLocation } from 'vuepress'

const CONFIG = {
  POLL_MS: 25,
  MAX_ATTEMPTS: 100,
  SETTLE_MS: 350,
  RESTORE_LOCK_MS: 150,
  POP_DELAY_MS: 50,
  POP_MAX_ATTEMPTS: 20,
  POP_RETRY_MS: 50,
  POP_SAME_PAGE_LOCK_MS: 600,
  POP_CROSS_PAGE_LOCK_MS: 200,
} as const

interface HistoryState {
  key?: string;
  [key: string]: unknown;
}

const scrollMap = new Map<string, number>()
let isHistoryPop = false
let isRestoring = false
let lastPathname = ''

const getKey = (state: unknown): string => {
  if (state && typeof state === 'object' && 'key' in state) {
    const { key } = state as HistoryState
    if (typeof key === 'string') return key
  }
  return window.location.href
}

const decodeHashId = (hash: string): string => {
  const rawId = hash.replace(/^#/, '')

  try {
    return decodeURIComponent(rawId)
  } catch {
    return rawId
  }
}

const scrollToElement = (id: string, behavior: ScrollBehavior = 'smooth'): void => {
  const el = document.getElementById(id)
  if (!el) return

  let top = 0
  let current: HTMLElement | null = el
  while (current) {
    top += current.offsetTop
    current = current.offsetParent as HTMLElement | null
  }
  window.scrollTo({ top, behavior })
}

export const scrollToHash = (hash: string, behavior: ScrollBehavior = 'smooth'): void => {
  if (!hash) return
  const id = decodeHashId(hash)
  let attempts = 0

  const poll = (): void => {
    if (document.getElementById(id)) {
      if (behavior === 'auto') {
        scrollToElement(id, 'auto')
      } else {
        setTimeout(() => scrollToElement(id, 'smooth'), CONFIG.SETTLE_MS)
      }
    } else if (attempts < CONFIG.MAX_ATTEMPTS) {
      attempts++
      setTimeout(poll, CONFIG.POLL_MS)
    }
  }
  poll()
}

const safeScrollTo = (options: ScrollToOptions): void => {
  isRestoring = true
  window.scrollTo(options)
  setTimeout(() => { isRestoring = false }, CONFIG.RESTORE_LOCK_MS)
}

const bindScrollRecorder = (): void => {
  window.addEventListener('scroll', () => {
    if (!isHistoryPop && !isRestoring) {
      scrollMap.set(getKey(history.state), window.scrollY)
    }
  }, { passive: true })
}

const bindPopStateHandler = (): void => {
  window.addEventListener('popstate', (e: PopStateEvent) => {
    isHistoryPop = true
    isRestoring = true

    const targetKey = getKey(e.state)
    const isSamePage = window.location.pathname === lastPathname
    lastPathname = window.location.pathname

    setTimeout(() => {
      if (scrollMap.has(targetKey)) {
        const targetTop = scrollMap.get(targetKey) ?? 0
        let attempts = 0

        const attemptScroll = (): void => {
          window.scrollTo({ top: targetTop, behavior: isSamePage ? 'smooth' : 'auto' })
          if (
            window.scrollY < targetTop &&
            attempts < CONFIG.POP_MAX_ATTEMPTS &&
            document.documentElement.scrollHeight <= targetTop
          ) {
            attempts++
            setTimeout(attemptScroll, CONFIG.POP_RETRY_MS)
          }
        }
        attemptScroll()
      } else if (isSamePage && window.location.hash) {
        scrollToHash(window.location.hash, 'smooth')
      } else {
        window.scrollTo({ top: 0, behavior: isSamePage ? 'smooth' : 'auto' })
      }

      const lockDuration = isSamePage
        ? CONFIG.POP_SAME_PAGE_LOCK_MS
        : CONFIG.POP_CROSS_PAGE_LOCK_MS

      setTimeout(() => {
        isHistoryPop = false
        isRestoring = false
      }, lockDuration)
    }, CONFIG.POP_DELAY_MS)
  })
}

const bindAnchorClickHandler = (router: Router): void => {
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    const anchor = target?.closest('a')
    if (!anchor) return

    const href = anchor.getAttribute('href')
    if (!href) return

    const isSamePageHash = href.startsWith('#') || href.includes(`${window.location.pathname}#`)
    if (!isSamePageHash) return

    e.preventDefault()
    e.stopImmediatePropagation()

    const hashIndex = href.indexOf('#')
    if (hashIndex < 0) return
    const hash = href.slice(hashIndex)
    if (!hash) return

    scrollMap.set(getKey(history.state), window.scrollY)
    const targetLocation: RawLocation = { path: window.location.pathname, hash }

    if (decodeHashId(window.location.hash) === decodeHashId(hash)) {
      const manualKey = `man-${crypto.randomUUID()}`
      history.pushState({ key: manualKey }, '', window.location.pathname + hash)
      scrollMap.set(manualKey, window.scrollY)
      scrollToHash(hash, 'smooth')
    } else {
      router.push(targetLocation)
        .then(() => scrollToHash(hash, 'smooth'))
        .catch((err: Error) => {
          if (err?.name === 'NavigationDuplicated') scrollToHash(hash, 'smooth')
        })
    }
  }, { capture: true })
}

export const handleScroll = (router: Router): void => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

  lastPathname = window.location.pathname

  bindScrollRecorder()
  bindPopStateHandler()
  bindAnchorClickHandler(router)

  if (router.options) {
    router.options.scrollBehavior = () => null
  }

  router.afterEach((to, from) => {
    const isCrossPage = to.path !== from.path

    if (isCrossPage && !isHistoryPop) {
      requestAnimationFrame(() => {
        if (to.hash) {
          scrollToHash(to.hash, 'auto')
        } else {
          safeScrollTo({ top: 0, behavior: 'auto' })
        }
      })
    } else if (to.hash && !isHistoryPop) {
      scrollToHash(to.hash, 'smooth')
    }
    lastPathname = to.path
  })

  if (window.location.hash) {
    if (document.readyState === 'complete') {
      scrollToHash(window.location.hash, 'auto')
    } else {
      window.addEventListener('load', () => scrollToHash(window.location.hash, 'auto'), { once: true })
    }
  }
}
