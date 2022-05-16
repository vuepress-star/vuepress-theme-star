import { getLocales } from '@starzkg/vuepress-shared'
import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { useSassPalettePlugin } from 'vuepress-plugin-sass-palette'
import type { CopyCodeOptions } from '../shared'
import { i18n } from './i18n'

export * from '../shared'

export const copyCodePlugin =
  (options: CopyCodeOptions): Plugin =>
  (app) => {
    useSassPalettePlugin(app, { id: 'star' })

    return {
      name: '@starzkg/vuepress-plugin-copy-code',

      define: (): Record<string, unknown> => ({
        CODE_COPY_OPTIONS: options,
        CODE_COPY_I18N: getLocales({
          app,
          name: 'copy-code',
          default: i18n,
          config: options.locale,
        }),
      }),

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
