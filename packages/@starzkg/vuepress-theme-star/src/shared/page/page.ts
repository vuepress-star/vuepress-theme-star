import type { GitPluginPageData } from '@vuepress/plugin-git'

export interface StarThemePageData extends GitPluginPageData {
  filePathRelative: string | null
  content: string
}

export interface StarThemePageFrontmatter {
  page?: string
  pageClass?: string
}
