import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { App } from '@vuepress/core'
import chalk from 'chalk'
import { tagHint } from '../common/tagHint.js'
/**
 * Add tags as customElement
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param customElement
 * @param customElements tags recognized as custom element
 */
export const addCustomElement = (
  app: App,
  config: ViteBundlerOptions,
  customElement: string[] | string | RegExp
): void => {
  const customElements =
    typeof customElement === 'string' ? [customElement] : customElement
  const { bundler } = app.options

  if (!bundler.name.endsWith('vite')) {
    console.warn(
      chalk.yellow('warning: '),
      `only add custom element when bundler with vite`
    )
    return
  }

  const viteBundlerConfig = config

  if (!viteBundlerConfig.vuePluginOptions)
    viteBundlerConfig.vuePluginOptions = {}

  if (!viteBundlerConfig.vuePluginOptions.template)
    viteBundlerConfig.vuePluginOptions.template = {}

  if (!viteBundlerConfig.vuePluginOptions.template.compilerOptions)
    viteBundlerConfig.vuePluginOptions.template.compilerOptions = {}

  const {
    isCustomElement = (tag: string): void => tagHint(tag, app.env.isDebug),
  } = viteBundlerConfig.vuePluginOptions.template.compilerOptions

  viteBundlerConfig.vuePluginOptions.template.compilerOptions.isCustomElement =
    (tag: string): boolean | void => {
      if (
        customElements instanceof RegExp
          ? customElements.test(tag)
          : customElements.includes(tag)
      )
        return true

      return isCustomElement(tag)
    }
}
