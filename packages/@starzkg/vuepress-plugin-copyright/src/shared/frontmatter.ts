export interface CopyrightPluginFrontmatter {
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
   * Copyright
   *
   * 版权
   *
   * @default
   */
  copyright?: string
}
