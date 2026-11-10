import type MarkdownIt from 'markdown-it'
import type { Configuration as WebpackConfiguration, WebpackPluginInstance } from 'webpack';
import type { PageData } from 'vuepress'
import type { UserConfig } from './types/config'

import { attrs } from './config/attrs'
import { addContainer, addPageClass } from './config/utils.js'

interface HtmlWebpackPluginInstance {
  constructor: { name: string }
  options: {
    scriptLoading?: 'blocking' | 'defer' | 'module'
    minify?: {
        removeComments: boolean,
        collapseWhitespace: boolean,
    }
    [key: string]: unknown
  }
}

/**
 * Computes the deployment sub-path dynamically based on context environment hooks
 */
function getBaseUrl(): `/${string}/` | undefined {
  const isProd = process.env.NODE_ENV === 'production'
  const githubRepo = process.env.GITHUB_REPOSITORY // "owner/repo-name"

  return isProd && githubRepo && githubRepo.split('/')[1] === 'books-forever'
    ? '/books-forever/'
    : undefined
}

const config: UserConfig<{}> = {
  title: 'טבע שלם - ספרים',
  description: 'הספרים של דוד ישראל כהן - גוף הידע - 1א2',
  theme: 'derech-hapeima',
  base: getBaseUrl(),
  dest: './dist',
  port: 8082,
  evergreen: true,

  head: [
    ['link', { rel: 'icon', href: '/images/icons/icon-512x512.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&display=swap',
        media: 'print',
        onload: "this.media='all'" as any
    }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }]
  ],

  markdown: {
    extractHeaders: ['h1', 'h2', 'h3', 'h4'] as any,
    extendMarkdown: (md: MarkdownIt): void => {
      addContainer(md, 'hebrew-list')
    }
  },

  plugins: [
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
        updatePopup: {
          message: 'תוכן חדש מוכן',
          buttonText: 'לחצו כאן לעדכון',
        } as any
    }]
  ],

  chainWebpack: (config): void => {
    ['scss', 'sass'].forEach((rule) => {
      if (config.module.rules.has(rule)) {
        config.module.rule(rule).oneOfs.values().forEach((oneOf) => {
            oneOf.use('sass-loader').tap((options) => {
                options = options || {}
                options.sassOptions = {
                    ...options?.sassOptions || {},
                    quietDeps: true,
                    silenceDeprecations: ['import', 'legacy-js-api']
                }
                return options
            })
        })
      }
    })
  },

  extendPageData($page: PageData): void {
    addPageClass($page)
  },

  configureWebpack: (config: WebpackConfiguration, isServer: boolean): void => {
    if (!isServer) {
      const htmlPlugin = (config.plugins || []).find(
        (plugin): plugin is WebpackPluginInstance & HtmlWebpackPluginInstance => 
          plugin.constructor.name === 'HtmlWebpackPlugin'
      )
      
      if (htmlPlugin) {
        htmlPlugin.options.scriptLoading = 'defer'

        if (process.env.NODE_ENV === 'production') {
          htmlPlugin.options.minify = {
            ...htmlPlugin.options.minify,
            removeComments: true,
            collapseWhitespace: true,
          }
        }
      }
    }
  }
}

export default config
