import { defineUserConfig } from '@vuepress/cli'

export default defineUserConfig({
  base: '/',

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'PWA',
      description: 'VuePress 的 PWA 插件',
    },
  },

  themeConfig: {
    logo: '/logo.svg',

    locales: {
      '/': {
        navbar: [{ text: '主页', link: '/' }],
        lang: 'zh-CN',
        selectText: '选择语言',
        lastUpdatedText: '上次编辑于',
        label: '简体中文',
      },
    },
  },

  plugins: [['@starzkg/pwa']],
})
