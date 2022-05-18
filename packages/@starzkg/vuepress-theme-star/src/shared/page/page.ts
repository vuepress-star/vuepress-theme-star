import type { GitPluginPageData } from '@vuepress/plugin-git'

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
}

export interface StarThemePageFrontmatter {
  page?: string
  pageClass?: string
}
