import type { ConvertLocaleConfig } from '@starzkg/vuepress-shared'
import type { WalineLocale } from '@waline/client'

export type WalineI18nConfig = Partial<WalineLocale>

export type WalineLocaleConfig = ConvertLocaleConfig<WalineI18nConfig>
