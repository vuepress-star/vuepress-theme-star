import type { StarThemePage } from '../page.js'

export const isArticle = (page: StarThemePage): boolean => {
  return (
    page.data.frontmatter.page === undefined ||
    page.data.frontmatter.page === '' ||
    page.data.frontmatter.page === 'Page'
  )
}
