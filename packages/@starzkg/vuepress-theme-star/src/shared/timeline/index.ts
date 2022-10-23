import type { ArticleRecord } from '../article/index.js'

export type TimelineData = Record<
  number,
  Record<number, Record<number, ArticleRecord[]>>
>
