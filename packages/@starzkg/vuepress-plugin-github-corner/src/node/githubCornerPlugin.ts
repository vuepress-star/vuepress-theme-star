import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type GithubCornerPluginOptions = Record<never, never>

export const githubCornerPlugin: Plugin<GithubCornerPluginOptions> = (
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
    name: '@starzkg/vuepress-plugin-github-corner',

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
  }
}
