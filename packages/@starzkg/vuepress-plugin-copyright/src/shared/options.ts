import type { LocaleConfig } from '@vuepress/core'
import type { CopyrightI18nConfig } from './locales.js'

export interface CopyrightOptions {
  clipboardComponent?: string
  noCopy?: boolean
  noSelect?: boolean
  disabled?: boolean
  minLength?: number
  authorName?: string
  locales?: LocaleConfig<CopyrightI18nConfig>
}
