import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type ComponentsStarPluginOptions = Record<never, never>

export const componentsStarPlugin: Plugin<ComponentsStarPluginOptions> = (
  _,
  app
) => {
  if (app.env.isDev && app.options.bundler.endsWith('vite')) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        optimizeDeps: {
          exclude: ['ts-debounce'],
        },
      }
    )
  }

  return {
    name: '@starzkg/vuepress-plugin-components-star',

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/BackToTop.js'
    ),
  }
}
