import type { WebpackBundlerOptions } from '@vuepress/bundler-webpack'
import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export type ElementPlusPluginOptions = Record<never, never>

export const elementPlusPlugin =
  (_: ElementPlusPluginOptions = {}): Plugin =>
  (app) => {
    return {
      name: '@starzkg/vuepress-plugin-element-plus',

      extendsBundlerOptions: (config: unknown, app): void => {
        if (app.options.bundler.name.endsWith('webpack')) {
          const webpackBundlerConfig = config as WebpackBundlerOptions
          // eslint-disable-next-line import/no-extraneous-dependencies
          webpackBundlerConfig.chainWebpack = (config, isServer, isBuild) => {
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
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
