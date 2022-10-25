import type { StarPage } from '../page.js'

export const isArticle = (page: StarPage): boolean => {
  return (
    page.data.frontmatter.page === undefined ||
    page.data.frontmatter.page === '' ||
    page.data.frontmatter.page === 'Page'
  )
}
