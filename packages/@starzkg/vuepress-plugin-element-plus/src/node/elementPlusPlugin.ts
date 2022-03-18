import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { WebpackBundlerOptions } from '@vuepress/bundler-webpack'
import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type ElementPlusPluginOptions = Record<never, never>

export const elementPlusPlugin =
  (_: ElementPlusPluginOptions): Plugin =>
  (app) => {
    return {
      name: '@starzkg/vuepress-plugin-element-plus',

      extendsBundlerOptions: (config: unknown, app): void => {
        if (app.env.isDev && app.options.bundler.name.endsWith('vite')) {
          const viteBundlerConfig = config as ViteBundlerOptions
          // eslint-disable-next-line import/no-extraneous-dependencies
          viteBundlerConfig.viteOptions = require('vite').mergeConfig(
            viteBundlerConfig.viteOptions,
            {
              optimizeDeps: {
                include: ['lodash'],
              },
            }
          )
        }

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

      clientAppEnhanceFiles: path.resolve(
        __dirname,
        '../client/clientAppEnhance.js'
      ),
    }
  }
