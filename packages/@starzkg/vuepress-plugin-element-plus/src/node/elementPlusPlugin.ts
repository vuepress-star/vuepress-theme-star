import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ViteComponents from 'unplugin-vue-components/vite'
import WebpackComponents from 'unplugin-vue-components/webpack'
export type GithubCornerPluginOptions = Record<never, never>

export const elementPlusPlugin: Plugin<GithubCornerPluginOptions> = (
  _,
  app
) => {
  if (app.env.isBuild) {
    if (app.options.bundler.endsWith('vite')) {
      // eslint-disable-next-line import/no-extraneous-dependencies
      app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
        app.options.bundlerConfig.viteOptions,
        {
          plugins: [
            ViteComponents({
              resolvers: [ElementPlusResolver()],
            }),
          ],
        }
      )
    } else if (app.options.bundler.endsWith('webpack')) {
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

        config
          .plugin('element-plus')
          .use(WebpackComponents({ resolvers: [ElementPlusResolver()] }))
      }
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
