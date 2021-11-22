import type { ResolvedLocaleConfig } from '@starzkg/vuepress-shared'
import type { WalineLocale } from '@waline/client'

export type WalineI18nConfig = Partial<WalineLocale>

export type WalineLocaleConfig = ResolvedLocaleConfig<WalineI18nConfig>
