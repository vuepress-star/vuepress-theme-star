import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { StarThemeLocaleOptions, StarThemePluginsOptions } from '../shared'
import {
  assignDefaultLocaleOptions,
  resolveActiveHeaderLinksPluginOptions,
  resolveContainerPluginOptions,
  resolveContainerPluginOptionsForCodeGroup,
  resolveContainerPluginOptionsForCodeGroupItem,
  resolveContainerPluginOptionsForDetails,
  resolveGitPluginOptions,
  resolveMediumZoomPluginOptions,
} from './utils'

export interface StarThemeOptions extends ThemeConfig, StarThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: StarThemePluginsOptions
}

export const theme: Theme<StarThemeOptions> = ({
  themePlugins = {},
  ...localeOptions
}) => {
  assignDefaultLocaleOptions(localeOptions)

  return {
    name: '@starzkg/vuepress-theme-star',

    layouts: path.resolve(__dirname, '../client/layouts'),

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),

    clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),

    // use the relative file path to generate edit link
    extendsPageData: ({ filePathRelative }) => ({ filePathRelative }),

    plugins: [
      [
        '@vuepress/active-header-links',
        resolveActiveHeaderLinksPluginOptions(themePlugins),
      ],
      ['@vuepress/back-to-top', themePlugins.backToTop !== false],
      ['@starzkg/github-corner', themePlugins.githubCorner !== false],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(themePlugins, localeOptions, 'tip'),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(themePlugins, localeOptions, 'warning'),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(themePlugins, localeOptions, 'danger'),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptionsForDetails(themePlugins),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptionsForCodeGroup(themePlugins),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptionsForCodeGroupItem(themePlugins),
      ],
      ['@vuepress/git', resolveGitPluginOptions(themePlugins, localeOptions)],
      ['@vuepress/medium-zoom', resolveMediumZoomPluginOptions(themePlugins)],
      ['@vuepress/nprogress', themePlugins.nprogress !== false],
      ['@vuepress/palette', { preset: 'sass' }],
      ['@vuepress/prismjs', themePlugins.prismjs !== false],
      ['@vuepress/theme-data', { themeData: localeOptions }],
    ],
  }
}
