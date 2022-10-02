import { copyCodePlugin } from '@starzkg/vuepress-plugin-copy-code'
import { copyrightPlugin } from '@starzkg/vuepress-plugin-copyright'
import { feedPlugin } from '@starzkg/vuepress-plugin-feed'
import { interactionEffectPlugin } from '@starzkg/vuepress-plugin-interaction-effect'
import { markdownEnhancePlugin } from '@starzkg/vuepress-plugin-markdown-enhance'
import { photoSwipePlugin } from '@starzkg/vuepress-plugin-photo-swipe'
// import { sitemapPlugin } from '@starzkg/vuepress-plugin-sitemap'
import type { Theme } from '@vuepress/core'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { gitPlugin } from '@vuepress/plugin-git'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { palettePlugin } from '@vuepress/plugin-palette'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { tocPlugin } from '@vuepress/plugin-toc'
import { getDirname, path } from '@vuepress/utils'
import type {
  StarThemeLocaleOptions,
  StarThemePluginsOptions,
} from '../shared/index.js'
import { alias } from './alias.js'
import { extendsPage } from './extendsPage.js'
import { onGenerated } from './onGenerated.js'
import { onInitialized } from './onInitialized.js'
import { onPrepared } from './onPrepared.js'
import { onWatched } from './onWatched.js'
import { assignDefaultLocaleOptions } from './utils/index.js'

const __dirname = getDirname(import.meta.url)

export interface StarThemeOptions extends StarThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: StarThemePluginsOptions
}

export const starTheme = ({
  themePlugins = {},
  ...localeOptions
}: StarThemeOptions = {}): Theme => {
  // assign default locale options
  assignDefaultLocaleOptions(localeOptions)

  return {
    name: '@starzkg/vuepress-theme-star',

    layouts: path.resolve(__dirname, '../client/layouts'),

    templateBuild: path.resolve(__dirname, '../../templates/index.build.html'),

    //  extend per page data
    extendsPage,

    // on initialized
    onInitialized,

    // client config file
    clientConfigFile: path.resolve(__dirname, '../client/config.js'),

    // on prepared
    onPrepared,

    // use alias to make all components replaceable
    alias,

    // on watched
    onWatched,

    // on generated
    onGenerated,

    plugins: [
      // @vuepress/plugin-active-header-link
      themePlugins.activeHeaderLinks !== false
        ? activeHeaderLinksPlugin({
            headerLinkSelector: 'a.sidebar-item,a.vuepress-toc-link',
            headerAnchorSelector: '.header-anchor',
            // should greater than page transition duration
            delay: 300,
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

      photoSwipePlugin(),

      themePlugins.feed !== undefined && themePlugins.feed !== false
        ? feedPlugin(themePlugins.feed)
        : [],

      // themePlugins.sitemap !== false ? sitemapPlugin() : [],

      copyCodePlugin({
        selector: '.theme-star-content div[class*="language-"] pre',
      }),

      themePlugins.copyright !== false ? copyrightPlugin() : [],

      interactionEffectPlugin(),

      themePlugins.markdown !== false
        ? markdownEnhancePlugin(themePlugins.markdown || true)
        : [],
    ],
  }
}
