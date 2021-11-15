import { addViteOptimizeDeps, getLocales } from '@starzkg/vuepress-shared'
import type { Plugin, PluginObject } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { usePalettePlugin } from 'vuepress-plugin-sass-palette'
import type { CommentOptions } from '../shared'
import { walineI18n } from './i18n'

export * from '../shared'

const CommentPlugin: Plugin<CommentOptions> = (options, app) => {
  const { themeConfig } = app.options
  const commentOptions: CommentOptions =
    Object.keys(options).length > 0
      ? (options as CommentOptions)
      : (themeConfig.comment as CommentOptions) || { type: 'disable' }

  addViteOptimizeDeps(app, '@waline/client')

  usePalettePlugin(app, { id: 'hope' })

  const config: PluginObject = {
    name: '@starzkg/vuepress-plugin-comment',

    alias: {
      '@Waline':
        commentOptions.type === 'waline'
          ? path.resolve(__dirname, '../client/components/Waline.js')
          : '@starzkg/vuepress-shared/lib/esm/client/NoopModule.js',
    },

    define: () => ({
      COMMENT_OPTIONS: {
        hint: !themeConfig.pure,
        ...commentOptions,
      },
      WALINE_I18N: getLocales(app, walineI18n, options.walineLocale),
    }),

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
  }

  // if (commentOptions.type === "vssue")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // config.plugins!.push(["@vssue/vuepress-plugin-vssue", commentOptions]);

  return config
}

export default CommentPlugin
