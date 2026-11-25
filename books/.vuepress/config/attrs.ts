import path from 'path'

const attrs = {
  siteDomain     : 'https://books.tevashalem.com',
  siteTitle      : 'טבע שלם - ספרים',
  siteDescription: 'הספרים של דוד ישראל כהן - גוף הידע - 1א2',

  components: {
    componentsDir: path.resolve(__dirname, '../components'),
    getComponentName(file: string) {
      const baseName = path.basename(file, '.vue')

      if (baseName === 'index') {
        return path.basename(path.dirname(file))
      }

      return baseName
    },
  },

  zoom: {
    selector: 'img:not(.disable-zoom)',
    options : {
      margin    : 16,
      background: 'rgba(0, 0, 0, 0.8)',
    },
  },

  ts: {
    tsLoaderOptions: {
      transpileOnly: true,
    },
  },

  pwa: {
    serviceWorker   : true,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    updatePopup     : {message: 'תוכן חדש מוכן', buttonText: 'לחצו כאן לעדכון'} as any,
    generateSWConfig: {
      globIgnores: ['**/*.pdf'],
    },
  },
}

export const {siteTitle, siteDescription, siteDomain, components, pwa, ts, zoom} = attrs
