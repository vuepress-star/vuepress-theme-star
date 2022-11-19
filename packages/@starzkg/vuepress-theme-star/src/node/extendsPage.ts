import type { GitData } from '@vuepress/plugin-git'
import type { AuthorData } from '../shared/author.js'
import type { StarPage } from '../shared/index.js'

/**
 * Extract Latin words from content
 */
export const getWords = (content: string): RegExpMatchArray | null =>
  // \u00C0-\u024F are Latin Supplement letters, maybe used in language like french
  // \u0400-\u04FF are Cyrillic letters, used in russian
  content.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu)

/**
 * Extract Chinese Characters from content
 */
export const getChinese = (content: string): RegExpMatchArray | null =>
  content.match(/[\u4E00-\u9FD5]/gu)

/**
 * Get word number of given string
 */
export const resolvePageLength = (content: string): number =>
  (getWords(content)?.reduce<number>(
    (accumulator, word) =>
      accumulator + (word.trim() === '' ? 0 : word.trim().split(/\s+/u).length),
    0
  ) || 0) + (getChinese(content)?.length || 0)

export const resolvePageWords = (data: string): number =>
  (getWords(data)?.reduce<number>(
    (accumulator, word) =>
      accumulator + (word.trim() === '' ? 0 : word.trim().split(/\s+/u).length),
    0
  ) || 0) + (getChinese(data)?.length || 0)

export const resolvePageAuthor = (git?: GitData): AuthorData | undefined => {
  return git
    ? (git.contributors || []).map((contributor) => ({
        name: contributor.name,
        email: contributor.email,
      }))
    : undefined
}

export const resolvePageReadingTime = (
  length: number,
  wordsPerMinute = 300
): number => {
  return Math.round((length / wordsPerMinute) * 100) / 100
}

export const extendsPage = (page: StarPage): void => {
  // save relative file path into page data to generate edit link
  page.data.filePathRelative = page.filePathRelative
  // custom excerpt
  page.excerpt = page.frontmatter.excerpt || page.excerpt
  // content
  page.data.content = page.content
  // page icon
  page.data.icon = page.frontmatter.icon
  // author
  page.data.author = resolvePageAuthor(page.data.git)
  // top
  page.data.top = page.frontmatter.top || false
  // length
  page.data.length = resolvePageLength(page.content)
  // words
  page.data.words = resolvePageWords(page.content)
  // reading time
  page.data.readingTime = resolvePageReadingTime(page.data.length)

  page.routeMeta = {
    ...page.routeMeta,
    // save title into route meta to generate navbar and sidebar
    title: page.title,
    icon: page.data.icon,
    author: page.data.author,
    date: page.date,
    time: page.data.git?.createdTime,
    excerpt: page.excerpt,
  }
}
