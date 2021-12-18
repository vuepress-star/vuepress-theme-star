import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { StarThemeLocaleOptions, StarThemePluginsOptions } from '../shared'
import {
  assignDefaultLocaleOptions,
  countArticleNumber,
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

    define: (app) => {
      return {
        __ARTICLE_NUMBER__: countArticleNumber(app.pages),
      }
    },
    // use the relative file path to generate edit link
    extendsPageData: ({ filePathRelative, content }) => ({
      filePathRelative,
      content,
    }),

    plugins: [
      [
        '@vuepress/active-header-links',
        resolveActiveHeaderLinksPluginOptions(themePlugins),
      ],
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
      ['@vuepress/toc'],
      ['@vuepress/theme-data', { themeData: localeOptions }],
      ['@starzkg/components-star'],
      ['@starzkg/page-enhance', themePlugins?.pageEnhance || true],
      [
        '@starzkg/copy-code',
        {
          selector: '.theme-star-content div[class*="language-"] pre',
        },
      ],
      ['@starzkg/copyright', themePlugins?.copyright !== false],
      ['@starzkg/copy-to-clipboard'],
      ['@starzkg/interaction-effect'],
      [
        '@starzkg/markdown-enhance',
        themePlugins.mdEnhance || {
          enableAll: true,
          presentation: {
            plugins: [
              'highlight',
              'math',
              'search',
              'notes',
              'zoom',
              'anything',
              'audio',
              'chalkboard',
            ],
          },
        },
      ],
    ],
  }
}
