import type { App, Page } from '@vuepress/core'
import type { BreadcrumbData, StarPageData } from '../../shared/index.js'

export const prepareBreadcrumb = async (app: App): Promise<void> => {
  for (const page of app.pages) {
    resolveBreadcrumb(page, app.pages)
  }
}

export const resolveBreadcrumb = (
  page: Page<Partial<StarPageData>>,
  pages: Page[]
): void => {
  const breadcrumbConfig: BreadcrumbData = []
  // generate breadcrumb config
  for (let i = 1; i < pages.length; i++) {
    if (pages[i] === undefined) {
      continue
    }
    if (page.path.startsWith(pages[i].path)) {
      breadcrumbConfig.push({
        title: pages[i].title,
        icon: pages[i].frontmatter.icon as string,
        path: pages[i].path,
      })
    }
  }
  page.data.breadcrumb = breadcrumbConfig.sort((a, b) => {
    return a.path.length - b.path.length
  })
}
