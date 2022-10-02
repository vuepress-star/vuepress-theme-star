import type { SitemapItem } from 'sitemap'

export interface SitemapPageFrontmatter extends SitemapItem {
  /**
   * Whether enable from sitemap
   *
   * 是否使用SiteMap
   */
  sitemap?: false | SitemapItem
}
