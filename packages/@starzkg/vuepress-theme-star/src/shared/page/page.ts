import type { GitPluginPageData } from '@vuepress/plugin-git'

export interface StarThemePageData extends GitPluginPageData {
  filePathRelative: string
}

export interface StarThemePageFrontmatter {
  page?: string
  pageClass?: string
  navbar?: boolean
}
