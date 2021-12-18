import type { Page } from '@vuepress/core'

export const countArticleNumber = (pages: Page[]): number => {
  let articleNumber = 0
  for (const key in pages) {
    const page = pages[key]
    const { frontmatter, title } = page
    if (
      title !== undefined &&
      title !== '' &&
      (frontmatter.page === undefined ||
        (frontmatter.page as string).toLowerCase().indexOf('home') === -1)
    ) {
      articleNumber++
    }
  }
  return articleNumber
}
