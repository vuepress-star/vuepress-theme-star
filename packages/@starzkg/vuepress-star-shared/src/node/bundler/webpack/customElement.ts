import type { WebpackBundlerOptions } from '@vuepress/bundler-webpack'
import type { App } from '@vuepress/core'
import chalk from 'chalk'
import { tagHint } from '../common/tagHint.js'
/**
 * Add tags as customElement
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param customElement tags recognized as custom element
 */
export const addCustomElement = (
  app: App,
  config: WebpackBundlerOptions,
  customElement: string[] | string | RegExp
): void => {
  const customElements =
    typeof customElement === 'string' ? [customElement] : customElement
  const { bundler } = app.options

  // for webpack
  if (!bundler.name.endsWith('webpack')) {
    console.warn(
      chalk.yellow('warning: '),
      `only add custom element when bundler with webpack`
    )
    return
  }
  const webpackBundlerConfig = <WebpackBundlerOptions>config

  if (!webpackBundlerConfig.vue) webpackBundlerConfig.vue = {}
  if (!webpackBundlerConfig.vue.compilerOptions)
    webpackBundlerConfig.vue.compilerOptions = {}

  const {
    isCustomElement = (tag: string): void => tagHint(tag, app.env.isDebug),
  } = webpackBundlerConfig.vue.compilerOptions

  webpackBundlerConfig.vue.compilerOptions.isCustomElement = (
    tag: string
  ): boolean | void => {
    if (
      customElements instanceof RegExp
        ? customElements.test(tag)
        : customElements.includes(tag)
    )
      return true

    return isCustomElement(tag)
  }
}
