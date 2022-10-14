import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { CopyrightOptions } from '../shared/index.js'
import { i18n } from './i18n.js'

const __dirname = getDirname(import.meta.url)

export type CopyrightPluginOptions = CopyrightOptions

export const copyrightPlugin =
  (options: CopyrightPluginOptions = {}): Plugin =>
  (app) => {
    return {
      name: '@starzkg/vuepress-plugin-copyright',

      alias: {
        '@clipboardComponent':
          typeof options.clipboardComponent === 'string'
            ? app.dir.source(options.clipboardComponent)
            : path.resolve(__dirname, '../client/components/Clipboard.vue'),
      },
      define: (): Record<string, unknown> => ({
        COPYRIGHT_OPTIONS:
          options ||
          ({
            noCopy: false,
            noSelect: false,
            disabled: false,
            minLength: 0,
            authorName: '',
          } as CopyrightOptions),
        COPYRIGHT_I18N: i18n,
      }),
      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
