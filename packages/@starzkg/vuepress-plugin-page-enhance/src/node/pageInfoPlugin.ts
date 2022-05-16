import { getLocales } from '@starzkg/vuepress-shared'
import type { Page, Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { useSassPalettePlugin } from 'vuepress-plugin-sass-palette'
import type { PageEnhanceOptions } from '../shared'
import { PageEnhancePageData } from '../shared'
import { i18n, pageInfoI18n, walineI18n } from './i18n'
import { readingTime } from './reading-time'

export const pageInfoPlugin =
  (options: PageEnhanceOptions = { type: 'disable' }): Plugin =>
  (app) => {
    useSassPalettePlugin(app, { id: 'star' })

    return {
      name: '@starzkg/vuepress-plugin-page-enhance',

      alias: {
        '@Waline':
          options.type === 'waline'
            ? path.resolve(__dirname, '../client/components/Waline.js')
            : '@starzkg/vuepress-shared/es/client/NoopModule.js',
      },

      define: () => ({
        COMMENT_OPTIONS: options,
        PAGE_INFO_I18N: getLocales({
          app,
          name: 'page-info',
          default: pageInfoI18n,
          config: options.pageInfoLocale,
        }),
        WALINE_I18N: getLocales({
          app,
          name: 'page-info',
          default: walineI18n,
          config: options.walineLocale,
        }),
        READING_TIME_I18N: getLocales({
          app,
          name: 'page-info',
          default: i18n,
          config: options.locales,
        }),
      }),

      extendsPage: (page: Page<PageEnhancePageData>) => {
        page.data.readingTime = readingTime(
          page.content,
          options.wordPerminute || 300
        )
      },
      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }

    // if (pageEnhanceOptions.type === "vssue")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // config.plugins!.push(["@vssue/vuepress-plugin-vssue", pageEnhanceOptions]);
  }
