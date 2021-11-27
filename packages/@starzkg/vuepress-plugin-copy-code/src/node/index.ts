import { getLocales } from '@starzkg/vuepress-shared'
import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { usePalettePlugin } from 'vuepress-plugin-sass-palette'
import type { CopyCodeOptions } from '../shared'
import { i18n } from './i18n'

export * from '../shared'

const copyCodePlugin: Plugin<CopyCodeOptions> = (options, app) => {
  usePalettePlugin(app, { id: 'hope' })

  return {
    name: '@starzkg/vuepress-plugin-copy-code',

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPTIONS:
        Object.keys(options).length > 0
          ? options
          : app.options.themeConfig.copyCode || {},
      CODE_COPY_I18N: getLocales(app, i18n, options.locale),
    }),

    clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),
  }
}

export default copyCodePlugin
