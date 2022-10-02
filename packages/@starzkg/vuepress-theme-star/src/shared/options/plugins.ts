import type { CopyrightOptions } from '@starzkg/vuepress-plugin-copyright'
import type { FeedPluginOptions } from '@starzkg/vuepress-plugin-feed'
import type { MarkdownEnhancePluginOptions } from '@starzkg/vuepress-plugin-markdown-enhance'
import type { SeoPluginOptions } from '@starzkg/vuepress-plugin-seo'
import type { SitemapOptions } from '@starzkg/vuepress-plugin-sitemap'

export interface StarThemePluginsOptions {
  /**
   * Enable @vuepress/plugin-active-header-links or not
   */
  activeHeaderLinks?: boolean

  /**
   * Enable @vuepress/plugin-back-to-top or not
   */
  backToTop?: boolean

  /**
   * Enable @vuepress/plugin-container or not
   */
  container?: {
    tip?: boolean
    warning?: boolean
    danger?: boolean
    details?: boolean
    codeGroup?: boolean
    codeGroupItem?: boolean
  }
  /**
   * Enable @vuepress/plugin-external-link-icon or not
   */
  externalLinkIcon?: boolean

  /**
   * Enable @vuepress/plugin-git or not
   */
  git?: boolean

  /**
   * Enable @vuepress/plugin-medium-zoom or not
   */
  mediumZoom?: boolean

  /**
   * Enable @vuepress/plugin-nprogress or not
   */
  nprogress?: boolean

  /**
   * Enable @vuepress/plugin-prismjs or not
   */
  prismjs?: boolean

  /**
   * Copyright
   *
   * 版权信息
   */
  copyright?: CopyrightOptions | boolean

  /**
   * Feed
   *
   * Feed 订阅
   */
  feed?: FeedPluginOptions | false

  /**
   * Seo
   *
   * Seo 增强
   */
  seo?: SeoPluginOptions | false

  /**
   * Sitemap
   *
   * 网站地图
   */
  sitemap?: SitemapOptions | false

  /**
   * Markdown 增强插件配置
   * @see http://vuepress-star.github.io/docs/markdown-enhance/zh/config/
   *
   * Markdown enhance plugin options
   * @see http://vuepress-star.github.io/docs/markdown-enhance/config/
   */
  markdown?: MarkdownEnhancePluginOptions
}
