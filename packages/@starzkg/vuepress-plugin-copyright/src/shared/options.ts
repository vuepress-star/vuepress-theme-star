import type { Page } from '@vuepress/core'

export interface CopyrightOptions {
  /**
   * CSS选择器
   *
   * CSS Selector
   *
   * @default #app
   */
  selector?: string

  /**
   * Copy
   *
   * 复制
   *
   * @default false
   */
  copy?: boolean

  /**
   * Selection
   *
   * 选择
   *
   * @default false
   */
  selection?: boolean

  /**
   * Min words triggering copyright append
   *
   * 触发附加版权的最小字数
   *
   * @default 100
   */
  triggerWords?: number

  /**
   *
   */
  copyright?:
    | string
    | 'auto'
    | (<
        ExtraPageData extends Record<
          string | number | symbol,
          unknown
        > = Record<never, never>,
        ExtraPageFrontmatter extends Record<
          string | number | symbol,
          unknown
        > = Record<string, unknown>,
        ExtraPageFields extends Record<
          string | number | symbol,
          unknown
        > = Record<never, never>
      >(
        page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
      ) => string)
}
