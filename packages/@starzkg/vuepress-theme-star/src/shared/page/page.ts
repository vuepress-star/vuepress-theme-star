import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { SidebarConfig } from '../nav.js'

export interface BreadcrumbData {
  title: string
  icon: string
  path: string
}

export interface StarThemePageData extends GitPluginPageData {
  filePathRelative: string | null
  content: string
  /**
   * length of page
   *
   * 字数
   */
  length: number
  /**
   * reading time
   *
   * 预计的阅读时间
   */
  readingTime: number
  /**
   * breadcrumb
   */
  breadcrumb: BreadcrumbData[]
}

export interface StarThemePageFrontmatter {
  navbar?: boolean
  sidebar?: 'auto' | false | SidebarConfig
  page?: string
  pageClass?: string
}
