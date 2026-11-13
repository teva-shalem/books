import path from 'path'
import { UserPlugins } from "@vuepress/types"
import { attrs } from './attrs'

const getComponentName = (file: string) => {
  const baseName = path.basename(file, '.vue')
  
  if (baseName === 'index') {
    return path.basename(path.dirname(file))
  }
  
  return baseName
}

export const plugins: UserPlugins = [
  ['@vuepress/register-components', {
    componentsDir: path.resolve(__dirname, '../components'),
    getComponentName,
  }],
  ['@vuepress/back-to-top'],
  ['@vuepress/medium-zoom', attrs.zoom],
  ['vuepress-plugin-typescript', {
      tsLoaderOptions: {
          transpileOnly: true,
      },
  }],
  ['@vuepress/google-analytics', {
      ga: 'UA-163403399-1',
  }],
  ['@vuepress/pwa', {
      serviceWorker: true,
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      updatePopup: {message: 'תוכן חדש מוכן', buttonText: 'לחצו כאן לעדכון'} as any,
      generateSWConfig: {
        globIgnores: ['**/*.pdf'],
      },
  }],
]
