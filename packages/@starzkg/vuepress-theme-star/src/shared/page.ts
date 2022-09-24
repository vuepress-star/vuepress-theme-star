import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { BreadcrumbData } from './breadcrumb.js'

export interface StarThemePageData extends GitPluginPageData {
  /**
   * relative file path.
   */
  filePathRelative: string | null
  /**
   * page content.
   */
  content: string
  /**
   * length of page.
   *
   * 字数
   */
  length: number
  /**
   * reading time.
   *
   * 预计的阅读时间
   */
  readingTime: number
  /**
   * breadcrumb.
   *
   * 面包屑
   */
  breadcrumb: BreadcrumbData[]
}
