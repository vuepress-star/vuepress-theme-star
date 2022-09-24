import type { StarThemeLocaleOptions } from '../../shared/index.js'

export const zh: StarThemeLocaleOptions = {
  // color mode
  colorMode: 'auto',
  colorModeSwitch: true,

  // navbar
  navbar: [],
  logo: null,
  repo: null,
  selectLanguageName: '简体中文',
  selectLanguageText: '选择语言',
  selectLanguageAriaLabel: '选择语言',

  // sidebar
  sidebar: 'auto',
  sidebarDepth: 2,

  // page meta
  editLink: true,
  editLinkText: '在 GitHub 上编辑此页',
  lastUpdated: true,
  lastUpdatedText: '上次更新',
  contributors: true,
  contributorsText: '贡献者',

  // 404 page messages
  notFound: [
    '这里什么都没有',
    '我们怎么到这来了？',
    '这是一个 404 页面',
    '看起来我们进入了错误的链接',
  ],
  backToHome: '返回首页',

  // a11y
  openInNewWindow: '在新窗口打开',
  toggleColorMode: '切换夜间模式',
  toggleNavbar: '切换导航栏',
  toggleSidebar: '切换侧边栏',
}
