import type { MediumZoomPluginOptions } from '@vuepress/plugin-medium-zoom'
import type { StarThemePluginsOptions } from '../../shared'

/**
 * Resolve options for @vuepress/plugin-medium-zoom
 */
export const resolveMediumZoomPluginOptions = (
  themePlugins: StarThemePluginsOptions
): MediumZoomPluginOptions | boolean => {
  if (themePlugins?.mediumZoom === false) {
    return false
  }

  return {
    selector: '.theme-star-content > img, .theme-star-content :not(a) > img',
    zoomOptions: {},
    // should greater than page transition duration
    delay: 400,
  }
}
