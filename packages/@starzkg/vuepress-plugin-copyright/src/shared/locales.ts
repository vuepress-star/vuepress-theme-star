import type { ResolvedLocaleConfig } from '@starzkg/vuepress-shared'

export interface CopyrightI18nConfig {
  /**
   * 作者
   *
   * author
   */
  author?: string
  beforeAuthor?: string
  afterAuthor?: string
}

export type CopyrightLocaleConfig = ResolvedLocaleConfig<CopyrightI18nConfig>
