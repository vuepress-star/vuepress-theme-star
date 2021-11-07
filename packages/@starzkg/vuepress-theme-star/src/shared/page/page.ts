import type { GitPluginPageData } from '@vuepress/plugin-git'

export interface StarThemePageData extends GitPluginPageData {
  filePathRelative: string
}

export interface StarThemePageFrontmatter {
  home?: boolean
  navbar?: boolean
  pageClass?: string
}
