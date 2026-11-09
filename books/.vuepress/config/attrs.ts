export const attrs = {
  zoom: {
    selector: 'img.img:not(.disable-zoom)',
    options: {
      margin: 16,
      background: 'rgba(0, 0, 0, 0.8)'
    }
  }
} as const

export const zoom = attrs.zoom
