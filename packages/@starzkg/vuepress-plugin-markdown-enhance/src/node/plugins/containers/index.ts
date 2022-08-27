import type { App } from '@vuepress/core'
import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import { containerPlugin } from '@vuepress/plugin-container'
import type { MarkdownEnhanceOptions } from '../../../shared/index.js'
import { resolveAlignContainerOptions } from './align.js'
import { resolveCodeDemoContainerOptions } from './code-demo.js'
import { resolveComponentContainerOptions } from './component.js'
import { resolveDetailsContainerOptions } from './details.js'
import { resolveVPreContainerOptions } from './v-pre.js'

export {
  resolveAlignContainerOptions,
  resolveComponentContainerOptions,
  resolveCodeDemoContainerOptions,
  resolveDetailsContainerOptions,
  resolveVPreContainerOptions,
}

export const useContainerPlugin = (
  app: App,
  options: ContainerPluginOptions
): void => {
  app.use(containerPlugin(options))
}

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For custom containers default title
 */
export const resolveContainerPluginOptions = (
  localeOptions: MarkdownEnhanceOptions,
  type:
    | 'default'
    | 'tip'
    | 'note'
    | 'primary'
    | 'info'
    | 'warning'
    | 'danger' = 'default'
): ContainerPluginOptions => {
  const locales = Object.entries(localeOptions.locales || {}).reduce(
    (result, [key, value]) => {
      result[key] = {
        defaultInfo: value?.[type] ?? localeOptions[type],
      }
      return result
    },
    {}
  )

  return {
    type,
    locales,
  }
}
