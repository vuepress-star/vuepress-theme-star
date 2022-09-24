import type {
  StarThemeLocaleData,
  StarThemeLocaleOptions,
} from '../../shared/index.js'
import locales from '../locales/index.js'

export const DEFAULT_LOCALE_OPTIONS: StarThemeLocaleOptions = {
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
  toggleColorMode: 'toggle color mode',
  toggleSidebar: 'toggle sidebar',
}

export const DEFAULT_LOCALE_DATA: StarThemeLocaleData = locales.en

/**
 * Assign default options
 */
export const assignDefaultLocaleOptions = (
  localeOptions: StarThemeLocaleOptions
): void => {
  Object.assign(localeOptions, {
    ...DEFAULT_LOCALE_OPTIONS,
    ...DEFAULT_LOCALE_DATA,
    ...localeOptions,
  })

  function assignLocaleConfig(name: string, locale: StarThemeLocaleData): void {
    if (!localeOptions.locales) {
      localeOptions.locales = {}
    }

    if (!localeOptions.locales[name]) {
      localeOptions.locales[name] = {}
    }

    Object.assign(localeOptions.locales[name], {
      ...locale,
      ...localeOptions.locales[name],
    })
  }

  assignLocaleConfig('/', DEFAULT_LOCALE_DATA)

  for (const key in locales) {
    assignLocaleConfig(`/${key}/`, locales[key])
  }
}
