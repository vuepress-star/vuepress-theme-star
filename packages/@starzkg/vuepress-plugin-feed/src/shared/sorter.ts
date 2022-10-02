import type { Page } from '@vuepress/core'

export declare type FeedSorter = <
  ExtraPageData extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
  ExtraPageFrontmatter extends Record<
    string | number | symbol,
    unknown
  > = Record<string, unknown>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >
>(
  pageA: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  pageB: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
) => number
