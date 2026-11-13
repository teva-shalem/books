import type { Configuration, WebpackPluginInstance } from 'webpack'
import type Config from 'webpack-chain'

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

export const configureWebpack = (config: Configuration, isServer: boolean) => {
  if (!isServer) {
    const htmlPlugin = (config.plugins || []).find(
      (plugin): plugin is WebpackPluginInstance & HtmlWebpackPluginInstance =>
        plugin.constructor.name === 'HtmlWebpackPlugin',
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

export const chainWebpack = (config: Config) => {
  ['scss', 'sass'].forEach((rule) => {
    if (config.module.rules.has(rule)) {
      config.module.rule(rule).oneOfs.values().forEach((oneOf) => {
          oneOf.use('sass-loader').tap((options = {}) => {
              options.sassOptions = {
                  ...options?.sassOptions || {},
                  quietDeps: true,
                  silenceDeprecations: ['import', 'legacy-js-api'],
              }
              return options
          })
      })
    }
  })
}