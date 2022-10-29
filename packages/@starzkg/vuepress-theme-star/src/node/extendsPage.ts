import type { GitData } from '@vuepress/plugin-git'
import type { AuthorData } from '../shared/author.js'
import type { StarPage } from '../shared/index.js'

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
  // breadcrumb
  page.data.breadcrumb = []

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
