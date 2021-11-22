import { addViteOptimizeDeps, getLocales } from '@starzkg/vuepress-shared'
import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { usePalettePlugin } from 'vuepress-plugin-sass-palette'
import type { PageEnhanceOptions } from '../shared'
import { ReadingTime } from '../shared'
import { i18n, pageInfoI18n, walineI18n } from './i18n'
import { readingTime } from './reading-time'

export const pageInfoPlugin: Plugin<PageEnhanceOptions> = (options, app) => {
  const { themeConfig } = app.options
  const pageEnhanceOptions: PageEnhanceOptions =
    Object.keys(options).length > 0
      ? (options as PageEnhanceOptions)
      : (themeConfig.pageEnhance as PageEnhanceOptions) || { type: 'disable' }

  addViteOptimizeDeps(app, '@waline/client')

  usePalettePlugin(app, { id: 'hope' })

  return {
    name: '@starzkg/vuepress-plugin-page-enhance',

    alias: {
      '@Waline':
        pageEnhanceOptions.type === 'waline'
          ? path.resolve(__dirname, '../client/components/Waline.js')
          : '@starzkg/vuepress-shared/es/client/NoopModule.js',
    },

    define: () => ({
      COMMENT_OPTIONS: {
        hint: !themeConfig.pure,
        ...pageEnhanceOptions,
      },
      PAGE_INFO_I18N: getLocales(app, pageInfoI18n, options.pageInfoLocale),
      WALINE_I18N: getLocales(app, walineI18n, options.walineLocale),
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
    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
  }

  // if (pageEnhanceOptions.type === "vssue")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // config.plugins!.push(["@vssue/vuepress-plugin-vssue", pageEnhanceOptions]);
}
