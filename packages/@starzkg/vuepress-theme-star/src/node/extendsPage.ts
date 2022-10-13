import type { Page } from '@vuepress/core'
import type { GitData } from '@vuepress/plugin-git'
import type { AuthorData } from '../shared/author.js'
import type { StarThemePageData } from '../shared/index.js'

export const getWords = (data: string): RegExpMatchArray =>
  data.match(/[\w\d\s,.\u00C0-\u024F]+/giu) || []

export const getChinese = (data: string): RegExpMatchArray =>
  data.match(/[\u4E00-\u9FD5]/gu) || []

export const resolvePageLength = (data: string): number =>
  getWords(data).reduce<number>(
    (accumulator, word) =>
      accumulator + (word.trim() === '' ? 0 : word.trim().split(/\s+/u).length),
    0
  ) + getChinese(data).length

export const resolvePageWords = (data: string): number =>
  getWords(data).reduce<number>(
    (accumulator, word) =>
      accumulator + (word.trim() === '' ? 0 : word.trim().split(/\s+/u).length),
    0
  ) + getChinese(data).length

export const resolvePageAuthor = (git: GitData): AuthorData => {
  return (git.contributors || []).map((contributor) => ({
    name: contributor.name,
    email: contributor.email,
  }))
}

export const resolvePageReadingTime = (
  length: number,
  wordsPerMinute = 300
): number => {
  return Math.round((length / wordsPerMinute) * 100) / 100
}

export const extendsPage = (page: Page<Partial<StarThemePageData>>): void => {
  // save title into route meta to generate navbar and sidebar
  page.routeMeta.title = page.title
  // page icon
  page.routeMeta.icon = page.data.icon = page.frontmatter.icon as string
  // save relative file path into page data to generate edit link
  page.data.filePathRelative = page.filePathRelative
  // content
  page.data.content = page.content
  // length
  page.data.length = resolvePageLength(page.content)
  // words
  page.data.words = resolvePageWords(page.content)
  // author
  page.data.author = page.data.git
    ? resolvePageAuthor(page.data.git)
    : undefined
  // reading time
  page.data.readingTime = resolvePageReadingTime(page.data.length)
  // breadcrumb
  page.data.breadcrumb = []
}
