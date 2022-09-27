import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { WebpackBundlerOptions } from '@vuepress/bundler-webpack'
import type { App } from '@vuepress/core'
import { addCustomElement as addViteCustomElement } from './vite/customElement.js'
import { addCustomElement as addWebpackaCustomElement } from './webpack/customElement.js'

/**
 * Add tags as customElement
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param customElement tags recognized as custom element
 */
export const addCustomElement = (
  app: App,
  config: unknown,
  customElement: string[] | string | RegExp
): void => {
  const customElements =
    typeof customElement === 'string' ? [customElement] : customElement
  const { bundler } = app.options

  // for vite
  if (bundler.name.endsWith('vite')) {
    const viteBundlerConfig = <ViteBundlerOptions>config
    addViteCustomElement(app, viteBundlerConfig, customElements)
  }

  // for webpack
  if (bundler.name.endsWith('webpack')) {
    const webpackBundlerConfig = <WebpackBundlerOptions>config
    addWebpackaCustomElement(app, webpackBundlerConfig, customElements)
  }
}
