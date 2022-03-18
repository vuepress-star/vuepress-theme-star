import { archivePlugin } from '@starzkg/vuepress-plugin-archive'
import { copyCodePlugin } from '@starzkg/vuepress-plugin-copy-code'
import { copyToClipboardPlugin } from '@starzkg/vuepress-plugin-copy-to-clipboard'
import { copyrightPlugin } from '@starzkg/vuepress-plugin-copyright'
import { interactionEffectPlugin } from '@starzkg/vuepress-plugin-interaction-effect'
import { markdownEnhancePlugin } from '@starzkg/vuepress-plugin-markdown-enhance'
import { pageInfoPlugin } from '@starzkg/vuepress-plugin-page-enhance'
import { photoSwipePlugin } from '@starzkg/vuepress-plugin-photo-swipe'
import { sitemapPlugin } from '@starzkg/vuepress-plugin-sitemap'
import type { Page, Theme } from '@vuepress/core'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { containerPlugin } from '@vuepress/plugin-container'
import { gitPlugin } from '@vuepress/plugin-git'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { palettePlugin } from '@vuepress/plugin-palette'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { tocPlugin } from '@vuepress/plugin-toc'
import { fs, path } from '@vuepress/utils'
import type {
  StarThemeLocaleOptions,
  StarThemePageData,
  StarThemePluginsOptions,
} from '../shared'
import {
  assignDefaultLocaleOptions,
  countArticleNumber,
  resolveContainerPluginOptions,
} from './utils'

export interface StarThemeOptions extends StarThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: StarThemePluginsOptions
}

export const theme = ({
  themePlugins = {},
  ...localeOptions
}: StarThemeOptions = {}): Theme => {
  assignDefaultLocaleOptions(localeOptions)

  return {
    name: '@starzkg/vuepress-theme-star',

    layouts: path.resolve(__dirname, '../client/layouts'),

    templateBuild: path.resolve(__dirname, '../../templates/index.build.html'),

    // use alias to make all components replaceable
    alias: Object.fromEntries(
      fs
        .readdirSync(path.resolve(__dirname, '../client/components'))
        .filter((file) => file.endsWith('.vue'))
        .map((file) => [
          `@theme/${file}`,
          path.resolve(__dirname, '../client/components', file),
        ])
    ),

    clientAppEnhanceFiles: [
      path.resolve(__dirname, '../client/clientAppEnhance.js'),
      path.resolve(__dirname, '../client/container/clientAppEnhance.js'),
    ],

    clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),

    define: (app) => {
      return {
        __ARTICLE_NUMBER__: countArticleNumber(app.pages),
      }
    },

    extendsPage: (page: Page<Partial<StarThemePageData>>) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title

      page.data.content = page.content
    },

    plugins: [
      // @vuepress/plugin-active-header-link
      themePlugins.activeHeaderLinks !== false
        ? activeHeaderLinksPlugin({
            headerLinkSelector: 'a.sidebar-item',
            headerAnchorSelector: '.header-anchor',
            // should greater than page transition duration
            delay: 300,
          })
        : [],

      // @vuepress/plugin-container
      themePlugins.container?.tip !== false
        ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'tip'))
        : [],
      themePlugins.container?.warning !== false
        ? containerPlugin(
            resolveContainerPluginOptions(localeOptions, 'warning')
          )
        : [],
      themePlugins.container?.danger !== false
        ? containerPlugin(
            resolveContainerPluginOptions(localeOptions, 'danger')
          )
        : [],
      themePlugins.container?.details !== false
        ? containerPlugin({
            type: 'details',
            before: (info) =>
              `<details class="custom-container details">${
                info ? `<summary>${info}</summary>` : ''
              }\n`,
            after: () => '</details>\n',
          })
        : [],

      themePlugins.container?.codeGroup !== false
        ? containerPlugin({
            type: 'code-group',
            before: () => `<CodeGroup>\n`,
            after: () => '</CodeGroup>\n',
          })
        : [],

      themePlugins.container?.codeGroupItem !== false
        ? containerPlugin({
            type: 'code-group-item',
            before: (info) => `<CodeGroupItem title="${info}">\n`,
            after: () => '</CodeGroupItem>\n',
          })
        : [],

      // @vuepress/plugin-git
      themePlugins.git !== false
        ? gitPlugin({
            createdTime: false,
            updatedTime: localeOptions.lastUpdated !== false,
            contributors: localeOptions.contributors !== false,
          })
        : [],

      // @vuepress/plugin-medium-zoom
      themePlugins.mediumZoom !== false
        ? mediumZoomPlugin({
            selector:
              '.theme-default-content > img, .theme-default-content :not(a) > img',
            zoomOptions: {},
            // should greater than page transition duration
            delay: 300,
          })
        : [],

      // @vuepress/plugin-nprogress
      themePlugins.nprogress !== false ? nprogressPlugin() : [],

      // @vuepress/plugin-palette
      palettePlugin({ preset: 'sass' }),

      // @vuepress/plugin-prismjs
      themePlugins.prismjs !== false ? prismjsPlugin() : [],

      // @vuepress/plugin-theme-data
      themeDataPlugin({ themeData: localeOptions }),

      tocPlugin(),

      archivePlugin(),

      themePlugins.pageEnhance !== false ? pageInfoPlugin() : [],

      photoSwipePlugin(),

      themePlugins.sitemap !== false ? sitemapPlugin() : [],

      copyCodePlugin({
        selector: '.theme-star-content div[class*="language-"] pre',
      }),

      themePlugins.copyright !== false ? copyrightPlugin() : [],

      copyToClipboardPlugin(),

      interactionEffectPlugin(),

      markdownEnhancePlugin(
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
        }
      ),
    ],
  }
}
