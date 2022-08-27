import type { StarThemeLocaleOptions } from '../../shared/index.js'

export const en: StarThemeLocaleOptions = {
  // color mode
  colorMode: 'auto',
  colorModeSwitch: true,

  // navbar
  navbar: [],
  logo: null,
  repo: null,
  selectLanguageText: 'Languages',
  selectLanguageAriaLabel: 'Select language',

  // sidebar
  sidebar: 'auto',
  sidebarDepth: 2,

  // page meta
  editLink: true,
  editLinkText: 'Edit this page',
  lastUpdated: true,
  lastUpdatedText: 'Last Updated',
  contributors: true,
  contributorsText: 'Contributors',

  // 404 page messages
  notFound: [
    `There's nothing here.`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`,
  ],
  backToHome: 'Take me home',

  // a11y
  openInNewWindow: 'open in new window',
  toggleColorMode: 'toggle dark mode',
  toggleSidebar: 'toggle sidebar',
}
