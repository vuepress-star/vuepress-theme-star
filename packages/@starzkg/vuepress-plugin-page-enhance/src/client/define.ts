import type {
  PageEnhanceLocaleConfig,
  PageEnhanceOptions,
  ReadingTimeLocaleConfig,
  WalineLocaleConfig,
  WalineOptions,
} from '../shared'

declare const READING_TIME_I18N: ReadingTimeLocaleConfig

declare const COMMENT_OPTIONS: PageEnhanceOptions
declare const PAGE_INFO_I18N: PageEnhanceLocaleConfig
declare const WALINE_I18N: WalineLocaleConfig

export const commentOptions = COMMENT_OPTIONS
export const pageInfoI18n = PAGE_INFO_I18N

export const readingTimeI18n = READING_TIME_I18N

export const walineOption = commentOptions as WalineOptions

export const enableWaline = Boolean(
  walineOption && walineOption.type === 'waline' && walineOption.serverURL
)

export const walineI18n = WALINE_I18N
