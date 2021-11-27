import type { StarThemeOptions } from '@starzkg/vuepress-theme-star'
import { defineUserConfig } from '@vuepress/cli'
import { path } from '@vuepress/utils'
import { ViteBundlerOptions } from 'vuepress-vite'
import locales from './configs/locales'
const isProd = process.env.NODE_ENV === 'production'

// @ts-ignore
export default defineUserConfig<StarThemeOptions, ViteBundlerOptions>({
  base: '/vuepress-theme-star/',
  title: 'vuepress-theme-star',
  theme: '@starzkg/star',
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

  // site-level locales config
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

  bundler:
    // specify bundler via environment variable
    process.env.DOCS_BUNDLER ??
    // use vite in dev, use webpack in prod
    (isProd ? '@vuepress/webpack' : '@vuepress/vite'),

  themeConfig: {
    logo: '/images/hero.png',

    repo: 'vuepress/vuepress-next',

    docsDir: 'docs',

    // theme-level locales config
    locales: locales,

    themePlugins: {
      githubCorner: true,
      backToTop: true,
      // only enable git plugin in production mode
      git: isProd,
      mdEnhance: {
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
      comment: {
        type: 'waline',
        serverURL: 'https://vercel-shentuzhigang.vercel.app',
      },
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

  plugins: [
    ['@vuepress/plugin-debug'],
    [
      '@vuepress/plugin-docsearch',
      {
        apiKey: '3a539aab83105f01761a137c61004d85',
        indexName: 'vuepress',
        searchParameters: {
          facetFilters: ['tags:v2'],
        },
        locales: {
          '/zh/': {
            placeholder: '搜索文档',
          },
        },
      },
    ],
    [
      '@vuepress/plugin-google-analytics',
      {
        // we have multiple deployments, which would use different id
        id: process.env.DOCS_GA_ID,
      },
    ],
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    // only enable shiki plugin in production mode
    [
      '@vuepress/plugin-shiki',
      isProd
        ? {
            theme: 'dark-plus',
          }
        : false,
    ],
  ],
})
