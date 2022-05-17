import { App, Page } from '@vuepress/core'
import { Classification, ClassificationData } from '../shared'

export const resolveDefine = (app: App): Record<string, any> => {
  return {
    __SITE_DATA__: resolveSiteData(app),
  }
}

export const resolveSiteData = (app) => {
  return {
    classifications: {
      type: classificationByType(app.pages),
      category: classificationByCategory(app.pages),
      tag: classificationByTag(app.pages),
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
    pageTypeMap[pageType].push(key)
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
      category[categories[key1]].push(key)
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
      tag[tags[key1]].push(key)
    }
  }
  return tag
}

export default resolveDefine
