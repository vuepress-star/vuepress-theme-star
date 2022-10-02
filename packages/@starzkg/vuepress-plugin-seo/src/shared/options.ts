import type { App } from '@vuepress/core'
import type { SeoPage } from './page.js'

export interface SeoPluginOptions {
  /**
   * Delopy hostname
   *
   * 部署域名
   */
  hostname: string

  /**
   * 默认作者
   *
   * default author
   */
  author?: string

  /**
   * 你的 Twitter 用户名
   *
   * your twitter username
   */
  twitterID?: string

  /**
   * 内容分级情况
   *
   * Content restrictions
   *
   * The age rating of the content, the format is `[int]+`, such as `'13+'`
   */
  restrictions?: string

  /**
   *  Function to extends seo
   */
  extendsSeo?: (
    app: App,
    /**
     *
     */
    page: SeoPage
  ) => void
}
