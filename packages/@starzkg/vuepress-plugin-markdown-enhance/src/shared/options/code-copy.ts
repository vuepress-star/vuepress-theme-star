import type { LocaleData } from '@vuepress/shared'

export interface CopyCodeOptions {
  /**
   * Prompt message display time
   *
   * @description setting it to `0` will disable the hint.
   *
   * 提示消息显示时间
   *
   * @description 设置为 `0` 会禁用提示。
   *
   * @default 300
   */
  duration?: number

  /**
   * Whether to display on the mobile side
   *
   * 是否展示在移动端
   *
   * @default false
   */
  showInMobile?: boolean

  /**
   * Whether use non-fancy styles
   *
   * 是否启用非华丽样式
   */
  pure?: boolean
}

export interface CopyCodeLocaleData extends LocaleData {
  /**
   * Copy text
   *
   * 复制文字
   */
  copy: string

  /**
   * Copied text
   *
   * 已复制文字
   */
  copied: string

  /**
   * Success message text after content is copied
   *
   * 复制成功提示消息文字
   */
  hint: string
}
