import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
export type GithubCornerPluginOptions = Record<never, never>

export const elementPlusPlugin: Plugin<GithubCornerPluginOptions> = (
  _,
  app
) => {
  if (app.env.isBuild && app.options.bundler.endsWith('webpack')) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    app.options.bundlerConfig.chainWebpack = (config, isServer, isBuild) => {
      config.resolve.extensions.add('.mjs')

      // https://github.com/webpack/webpack/issues/11467#issuecomment-691873586
      config.module
        .rule('esm')
        .test(/\.m?jsx?$/)
        .resolve.set('fullySpecified', false)
        .end()
        .type('javascript/auto')
    }
  }

  return {
    name: '@starzkg/vuepress-plugin-element-plus',

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
  }
}
