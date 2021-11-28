import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { CopyrightOptions } from '../shared'
import i18n from './i18n.json'
export type CopyrightPluginOptions = CopyrightOptions

export const copyrightPlugin: Plugin<CopyrightPluginOptions> = (
  options,
  app
) => {
  return {
    name: 'vuepress-plugin-copyright',

    alias: {
      '@clipboardComponent':
        typeof options.clipboardComponent === 'string'
          ? app.dir.source(options.clipboardComponent)
          : path.resolve(__dirname, '../client/components/Clipboard.vue'),
    },
    define: (): Record<string, unknown> => ({
      COPYRIGHT_OPTIONS:
        Object.keys(options).length > 0
          ? options
          : app.options.themeConfig.copyright ||
            ({
              noCopy: false,
              noSelect: false,
              disabled: false,
              minLength: 0,
              authorName: '',
            } as CopyrightOptions),
      COPYRIGHT_I18N: i18n,
    }),
    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
  }
}
