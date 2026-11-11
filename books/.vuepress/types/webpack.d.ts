import type { Configuration, WebpackPluginInstance } from 'webpack'

export type WebpackConfiguration = Configuration
export type WebpackPlugin = WebpackPluginInstance

export interface HtmlWebpackPluginInstance {
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