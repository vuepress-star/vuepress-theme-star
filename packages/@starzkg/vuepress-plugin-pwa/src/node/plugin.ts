import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  getLocales,
  useCustomDevServer,
} from '@starzkg/vuepress-shared'
import type { PluginFunction } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import { useSassPalettePlugin } from 'vuepress-plugin-sass-palette'
import type { PWAOptions } from '../shared/index.js'
import { generateManifest, getManifest } from './generateManifest.js'
import { generateServiceWorker } from './generateServiceWorker.js'
import { appendBase } from './helper.js'
import { injectLinkstoHead } from './injectHead.js'
import { pwaLocales } from './locales.js'

const __dirname = getDirname(import.meta.url)

export const pwaPlugin =
  (options: PWAOptions = {}): PluginFunction =>
  (app) => {
    const { base } = app.options

    if (options.appendBase) appendBase(base, options)

    const manifest = getManifest(app, options)

    app.options.head = injectLinkstoHead(options, base, app.options.head)

    useSassPalettePlugin(app, { id: 'star' })

    return {
      name: '@starzkg/vuepress-plugin-pwa',

      define: () => ({
        PWA_LOCALES: getLocales({
          app,
          name: 'pwa',
          default: pwaLocales,
          config: options.locales,
        }),
        SW_FORCE_UPDATE: options.update === 'force',
        SW_PATH: options.swPath || 'service-worker.js',
      }),

      extendsBundlerOptions: (config: unknown, app): void => {
        addViteOptimizeDepsInclude({ app, config }, 'register-service-worker')

        addViteSsrNoExternal({ app, config }, 'register-service-worker')

        useCustomDevServer(
          config,
          app,
          '/manifest.webmanifest',
          async () => JSON.stringify(await manifest),
          'Unexpected manifest generate error'
        )
      },

      onGenerated: async (app): Promise<void> => {
        await generateManifest(app, manifest)
        await generateServiceWorker(app, options)
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
