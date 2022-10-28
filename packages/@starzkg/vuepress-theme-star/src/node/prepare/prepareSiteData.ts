import type { App, Page } from '@vuepress/core'
import type {
  Classification,
  ClassificationData,
  StarSiteData,
} from '../../shared/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
`

/**
 * Generate override site data temp file
 */
export const prepareSiteData = async (app: App): Promise<void> => {
  const siteData = resolveSiteData(app)
  // site data file content
  let content = `\
export const siteData = ${JSON.stringify(siteData, null, 2)}
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/siteData.js', content)
}

export const resolveSiteData = (app): StarSiteData => {
  return {
    ...app.siteData,
    classifications: {
      type: classificationByType(app.pages),
      category: classificationByCategory(app.pages),
      tag: classificationByTag(app.pages),
      date: classificationByDate(app.pages),
    } as ClassificationData,
  }
}

export const classificationByType = (pages: Page[]): Classification => {
  const pageTypeMap: Record<string, string[]> = {}
  for (const key in pages) {
    const page = pages[key]
    const { frontmatter } = page
    const pageType = (frontmatter.page as string) || 'Page'
    pageTypeMap[pageType] = pageTypeMap[pageType] || []
    pageTypeMap[pageType].push(page.key)
  }
  return pageTypeMap
}

export const classificationByCategory = (pages: Page[]): Classification => {
  const category: Record<string, string[]> = {}
  for (const key in pages) {
    const page = pages[key]
    const { frontmatter } = page
    const categories = (frontmatter.categories as string[]) || []
    for (const key1 in categories) {
      category[categories[key1]] = category[categories[key1]] || []
      category[categories[key1]].push(page.key)
    }
  }
  return category
}

export const classificationByTag = (pages: Page[]): Classification => {
  const tag: Record<string, string[]> = {}
  for (const key in pages) {
    const page = pages[key]
    const { frontmatter } = page
    const tags = (frontmatter.tags as string[]) || []
    for (const key1 in tags) {
      tag[tags[key1]] = tag[tags[key1]] || []
      tag[tags[key1]].push(page.key)
    }
  }
  return tag
}

export const classificationByDate = (pages: Page[]): Classification => {
  const dateMap: Record<string, string[]> = {}
  for (const key in pages) {
    const page = pages[key]
    const date = page.date
    dateMap[date] = dateMap[date] || []
    dateMap[date].push(page.key)
  }
  return dateMap
}
