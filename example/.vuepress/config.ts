import { analyticsPlugin } from '@starzkg/vuepress-plugin-analytics'
import { elementPlusPlugin } from '@starzkg/vuepress-plugin-element-plus'
import { giscusCommentPlugin } from '@starzkg/vuepress-plugin-giscus-comment'
import { interactionEffectPlugin } from '@starzkg/vuepress-plugin-interaction-effect'
import { live2dWidgetPlugin } from '@starzkg/vuepress-plugin-live2d-widget'
import { photoSwipePlugin } from '@starzkg/vuepress-plugin-photo-swipe'
import { starTheme } from '@starzkg/vuepress-theme-star'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defineUserConfig } from '@vuepress/cli'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { path } from '@vuepress/utils'
import locales from './locales'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  base: '/',
  title: 'vuepress-theme-star',
  debug: !isProd,
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/images/icons/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/images/icons/favicon-32x32.png`,
      },
    ],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'application-name', content: 'VuePress' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'VuePress' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/images/icons/apple-touch-icon.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/images/icons/safari-pinned-tab.svg',
        color: '#3eaf7c',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'vuepress-theme-star',
      description: 'A vuepress theme for building personal site',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'vuepress-theme-star',
      description: '为了构建功能完备的个人网站',
    },
  },

  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(
          /^@vuepress/,
          path.resolve(__dirname, '../../packages/@vuepress')
        ),
    },
  },

  bundler:
    process.env.DOCS_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),

  theme: starTheme({
    logo: '/images/hero.png',

    repo: 'vuepress-star/vuepress-theme-star',

    docsDir: 'docs',

    profile: {
      name: 'Vuepress Theme Star',
      firstName: 'Star',
      lastName: 'Vuepress Theme Star',
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    },

    footer:
      '<a href="http://beian.miit.gov.cn/" target="_blank">浙ICP备19031217号</a> | MIT Licensed | Copyright © 2021-present Starzkg',

    // theme-level locales config
    locales,

    themePlugins: {
      backToTop: true,
      // only enable git plugin in production mode
      git: isProd,
      markdown: {
        locales: {
          '/zh/': {
            details: '详情',
          },
        },
      },
      copyright: {
        copyright: 'Copyright © 2021-present Starzkg',
      },
      feed: {
        hostname: 'https://vuepress-star.shentuzhigang.cn',
        atom: true,
        json: true,
        rss: true,
      },
      pwa: {},
      seo: {
        hostname: 'https://vuepress-star.shentuzhigang.cn',
      },
      sitemap: {
        hostname: 'https://vuepress-star.shentuzhigang.cn',
      },
    },
  }),

  plugins: [
    docsearchPlugin({
      appId: '34YFD9IUQ2',
      apiKey: '9a9058b8655746634e01071411c366b8',
      indexName: 'vuepress',
      searchParameters: {
        facetFilters: ['tags:v2'],
      },
      locales: {
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
              },
            },
          },
        },
      },
    }),
    analyticsPlugin({
      google: {
        // we have multiple deployments, which would use different id
        id: process.env.DOCS_GA_ID ?? '',
      },
      baidu: {
        // we have multiple deployments, which would use different id
        id: process.env.DOCS_GA_ID ?? '',
        spa: true,
      },
      cnzz: {
        id: process.env.DOCS_CNZZ_ID ?? '',
        webId: process.env.DOCS_CNZZ_WEB_ID ?? '',
        spa: true,
      },
    }),
    giscusCommentPlugin({
      repo: 'vuepress-star/vuepress-star',
      repoId: 'R_kgDOGlaj0w',
      category: 'Announcements',
      categoryId: 'DIC_kwDOGlaj084CRwyw',
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    // only enable shiki plugin in production mode
    isProd ? shikiPlugin({ theme: 'dark-plus' }) : [],
    elementPlusPlugin(),
    photoSwipePlugin(),
    interactionEffectPlugin(),
    live2dWidgetPlugin({
      dev: {
        log: true,
      },
      model: {
        jsonPath: 'asuna',
      },
      display: {
        position: 'left',
        hOffset: 50,
      },
      mobile: {
        scale: 0.3,
      },
      dialog: {
        // 开启对话框
        enable: true,
        hitokoto: true,
        script: {
          // 每空闲 10 秒钟，显示一条一言
          'every idle 10s': '$hitokoto$',
          // 当触摸到星星图案
          'hover .star': '星星在天上而你在我心里 (*!/ω＼*)',
          // 当触摸到角色身体
          'tap body': '哎呀！别碰我！',
          // 当触摸到角色头部
          'tap face': '人家已经不是小孩子了！',
        },
      },
    }),
  ],
})
