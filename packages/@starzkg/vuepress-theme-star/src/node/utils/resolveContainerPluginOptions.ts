import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import type { StarThemeData } from '../../shared'

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For custom containers default title
 */
export const resolveContainerPluginOptions = (
  localeOptions: StarThemeData,
  type: 'tip' | 'warning' | 'danger'
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
