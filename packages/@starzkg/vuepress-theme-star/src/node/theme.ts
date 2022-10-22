import { createRequire } from 'node:module'
import { copyrightPlugin } from '@starzkg/vuepress-plugin-copyright'
import { feedPlugin } from '@starzkg/vuepress-plugin-feed'
import { markdownEnhancePlugin } from '@starzkg/vuepress-plugin-markdown-enhance'
import { pwaPlugin } from '@starzkg/vuepress-plugin-pwa'
import { registerIconsPlugin } from '@starzkg/vuepress-plugin-register-icons'
import { seoPlugin } from '@starzkg/vuepress-plugin-seo'
import { sitemapPlugin } from '@starzkg/vuepress-plugin-sitemap'
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

const require = createRequire(import.meta.url)

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

    templateBuild: path.resolve(__dirname, '../../templates/index.build.html'),

    templateDev: path.resolve(__dirname, '../../templates/index.dev.html'),

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

      // @vuepress/plugin-toc
      themePlugins.toc !== false ? tocPlugin() : [],

      // @starzkg/vuepress-plugin-markdown-enhance
      themePlugins.markdown !== false
        ? markdownEnhancePlugin(themePlugins.markdown || true)
        : [],

      // @starzkg/vuepress-plugin-register-icons
      registerIconsPlugin({
        iconsDir: path.dirname(require.resolve('@starzkg/vuepress-icons')),
      }),

      registerIconsPlugin({
        iconsDir: path.dirname(
          require.resolve('@starzkg/vuepress-social-icons')
        ),
        iconPrefix: 'icon-social-',
      }),

      // @starzkg/vuepress-plugin-copyright
      themePlugins.copyright !== false
        ? copyrightPlugin(themePlugins.copyright || {})
        : [],

      // @starzkg/vuepress-plugin-feed
      themePlugins.feed !== undefined && themePlugins.feed !== false
        ? feedPlugin(themePlugins.feed)
        : [],

      // @starzkg/vuepress-plugin-pwa
      themePlugins.pwa !== undefined && themePlugins.pwa !== false
        ? pwaPlugin(themePlugins.pwa)
        : [],

      // @starzkg/vuepress-plugin-seo
      themePlugins.seo !== undefined && themePlugins.seo !== false
        ? seoPlugin(themePlugins.seo)
        : [],

      // @starzkg/vuepress-plugin-sitemap
      themePlugins.sitemap !== undefined && themePlugins.sitemap !== false
        ? sitemapPlugin(themePlugins.sitemap)
        : [],
    ],
  }
}
