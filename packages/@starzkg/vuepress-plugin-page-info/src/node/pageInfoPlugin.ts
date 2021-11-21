import { useReadingTimePlugin } from '@starzkg/vuepress-plugin-reading-time'
import { addViteOptimizeDeps, getLocales } from '@starzkg/vuepress-shared'
import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { usePalettePlugin } from 'vuepress-plugin-sass-palette'
import type { PageInfoOptions } from '../shared'
import { pageInfoI18n } from './i18n'

export * from '../shared'

export const pageInfoPlugin: Plugin<PageInfoOptions> = (options, app) => {
  const { themeConfig } = app.options
  const commentOptions: PageInfoOptions =
    Object.keys(options).length > 0
      ? (options as PageInfoOptions)
      : (themeConfig.comment as PageInfoOptions) || { type: 'disable' }

  addViteOptimizeDeps(app, '@waline/client')

  useReadingTimePlugin(app, { wordPerminute: options.wordPerminute })
  usePalettePlugin(app, { id: 'hope' })

  return {
    name: '@starzkg/vuepress-plugin-page-info',

    alias: {
      '@Waline':
        commentOptions.type === 'waline'
          ? path.resolve(__dirname, '../client/components/Waline.js')
          : '@starzkg/vuepress-shared/es/client/NoopModule.js',
    },

    define: () => ({
      COMMENT_OPTIONS: {
        hint: !themeConfig.pure,
        ...commentOptions,
      },
      PAGE_INFO_I18N: getLocales(app, pageInfoI18n, options.pageInfoLocale),
    }),

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
  }

  // if (commentOptions.type === "vssue")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // config.plugins!.push(["@vssue/vuepress-plugin-vssue", commentOptions]);
}
