import { LocaleConfig } from '@vuepress/core'
import { CopyrightI18nConfig } from './locales'

export interface CopyrightOptions {
  clipboardComponent?: string
  noCopy?: boolean
  noSelect?: boolean
  disabled?: boolean
  minLength?: number
  authorName?: string
  locales?: LocaleConfig<CopyrightI18nConfig>
}
