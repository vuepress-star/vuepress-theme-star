import { getLocales } from '@starzkg/vuepress-shared'
import type { Plugin } from '@vuepress/core'
import type { ReadingTime, ReadingTimeOptions } from '../shared'
import { i18n } from './i18n'
import { readingTime } from './reading-time'

export const readingTimePlugin: Plugin<ReadingTimeOptions> = (options, app) => {
  return {
    name: '@starzkg/vuepress-plugin-reading-time',

    define: (): Record<string, unknown> => ({
      READING_TIME_I18N: getLocales(app, i18n, options.locales),
    }),

    extendsPageData: (page): { readingTime: ReadingTime } => ({
      readingTime: readingTime(
        page.content,
        options.wordPerminute ||
          (app.options.themeConfig.wordPerminute as number) ||
          300
      ),
    }),
  }
}
