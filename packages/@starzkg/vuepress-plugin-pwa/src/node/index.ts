import { getLocales, useCustomDevServer } from '@starzkg/vuepress-shared'
import type { Plugin, PluginObject } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { usePalettePlugin } from 'vuepress-plugin-sass-palette'
import type { PWAOptions } from '../shared'
import { genManifest, getManifest } from './genManifest'
import { genServiceWorker } from './genServiceWorker'
import { i18n } from './i18n'
import { injectLinkstoHead } from './injectHead'

export * from '../shared'

const pwaPlugin: Plugin<PWAOptions> = (options, app) => {
  const { base, themeConfig } = app.options
  const pwaOptions =
    Object.keys(options).length > 0
      ? options
      : (themeConfig.pwa as PWAOptions) || {}

  usePalettePlugin(app, { id: 'hope' })

  useCustomDevServer(
    app,
    'manifest.webmanifest',
    () => getManifest(pwaOptions, app),
    'Unexpected manifest generate error'
  )

  const config: PluginObject = {
    name: '@starzkg/vuepress-plugin-pwa',

    define: () => ({
      PWA_I18N: getLocales(app, i18n, pwaOptions.locales),
      SW_PATH: options.swPath || 'service-worker.js',
    }),

    clientAppRootComponentFiles: [
      pwaOptions.popupComponent ||
        path.resolve(__dirname, '../client/components/SWUpdatePopup.js'),
    ],

    clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),

    onPrepared(): void {
      app.siteData.head = injectLinkstoHead(pwaOptions, base, app.siteData.head)
    },

    async onGenerated(): Promise<void> {
      await genManifest(pwaOptions, app)
      await genServiceWorker(pwaOptions, app)
    },
  }

  if (pwaOptions.showInstall !== false)
    (config.clientAppRootComponentFiles as string[]).push(
      path.resolve(__dirname, '../client/components/PWAInstall.js')
    )

  return config
}

export default pwaPlugin
