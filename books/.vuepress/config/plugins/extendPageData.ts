import type {PluginTuple} from '@vuepress/types'
import type {Page, Plugin} from 'vuepress-types'
import {siteDomain} from '../attrs'

const addClass = ($page: Page): void => {
  if ($page.frontmatter.pageClass)
    return

  const cleanClass = ($page.frontmatter.permalink ?? '').replace(/\//g, '')

  if (cleanClass) {
    $page.frontmatter.pageClass = cleanClass
  }
}

const plugin: Plugin = () => ({
  name          : 'extend-page-data-plugin',
  extendPageData: ($page: Page) => {
    const fm = $page.frontmatter
    fm.canonicalUrl = `${siteDomain}${fm.permalink}`

    addClass($page)
  },
})

export const extendPageDataPlugin = [plugin] as unknown as PluginTuple
