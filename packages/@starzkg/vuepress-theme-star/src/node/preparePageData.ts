import type { Page } from '@vuepress/core'
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

export const resolvePageReadingTime = (
  length: number,
  wordsPerMinute = 300
): number => {
  return Math.round((length / wordsPerMinute) * 100) / 100
}

export const preparePageData = (
  page: Page<Partial<StarThemePageData>>
): void => {
  // save relative file path into page data to generate edit link
  page.data.filePathRelative = page.filePathRelative
  // save title into route meta to generate navbar and sidebar
  page.routeMeta.title = page.title
  // content
  page.data.content = page.content
  // length
  page.data.length = resolvePageLength(page.content)
  // reading time
  page.data.readingTime = resolvePageReadingTime(page.data.length)
}
