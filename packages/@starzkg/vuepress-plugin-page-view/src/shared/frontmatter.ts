import { PageFrontmatter } from '@vuepress/client'

export interface PageViewPluginFrontmatter extends PageFrontmatter {
  /**
   * @description Only available when using valine
   *
   * 是否启用访问量
   *
   * Whether enable pageviews
   *
   * @default true
   */
  pageView?: boolean
}
