import type { EnumChangefreq } from 'sitemap'
import type { SitemapStreamOptions } from 'sitemap/dist/lib/sitemap-stream.js'

/**
 * Sitemap 配置选项
 */
export interface SitemapOptions {
  /**
   * 网站域名
   *
   * domain which to be deployed to
   */
  hostname: string
  /**
   * SiteMap 选项
   *
   * options for sitemap
   */
  options?: SitemapStreamOptions
  /**
   * 需要额外包含的网址
   *
   * Extra urls to be included
   */
  include?: string[]
  /**
   * 不被收录的页面
   *
   * Urls to be excluded
   */
  exclude?: string[]
  /**
   * 输出的文件名
   *
   * Output file name
   *
   * @default 'sitemap.xml'
   */
  filename?: string
  /**
   * 页面默认更新频率
   *
   * Page default update frequency
   *
   * @default "daily"
   */
  changefreq?: EnumChangefreq
}
