import type { Plugin } from '@vuepress/core'

export type CopyToClipboardPluginOptions = Record<never, never>

export const copyToClipboardPlugin: Plugin<CopyToClipboardPluginOptions> = (
  _,
  app
) => {
  if (app.env.isDev && app.options.bundler.endsWith('vite')) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        optimizeDeps: {
          include: ['copy-to-clipboard'],
        },
      }
    )
  }

  return {
    name: '@starzkg/vuepress-plugin-copy-to-clipboard',
  }
}
