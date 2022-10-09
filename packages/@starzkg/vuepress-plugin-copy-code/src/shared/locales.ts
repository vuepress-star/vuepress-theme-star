import type { LocaleData } from '@vuepress/shared'

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
