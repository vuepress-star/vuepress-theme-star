import type { CodeDemoOptions } from './code-demo.js'

export const SimpleContainerTypeArray = [
  'default',
  'tip',
  'note',
  'primary',
  'info',
  'warning',
  'danger',
] as const

export type ContainerType = typeof SimpleContainerTypeArray[number]

export type ContainerLocaleData = Record<ContainerType, string> & {
  /**
   * Default Title text for details block
   *
   * 详情块的默认标题
   */
  details: string
}

export type ContainerOptions = {
  /**
   * 是否启用自定义容器
   *
   * - default
   * - note
   * - primary
   * - info
   * - tip
   * - warning
   * - danger
   *
   * ⚠ 最后三个会和默认主题冲突，且可能会覆盖默认主题的样式与行为
   *
   * Whether to enable custom container including
   *
   * - default
   * - note
   * - primary
   * - info
   * - tip
   * - warning
   * - danger
   *
   * ⚠ The last 3 is conflict with default theme and may overide it.
   *
   * @default false
   */
  container?: Partial<Record<ContainerType, boolean>> | boolean

  /**
   * 是否启用详情容器
   *
   * Whether to enable details block support
   */
  details?: boolean

  /**
   * 是否启用自定义对齐支持
   *
   * Whether to enable align support
   *
   * @default false
   */
  align?: boolean

  /**
   * Whether to enable v-pre wrapper.
   *
   * 是否启用 v-pre 容器。
   *
   * @default false
   */
  vPre?: boolean

  /**
   * 是否启用代码示例功能
   *
   * Whether to enable code-demo support
   *
   * @default false
   */
  codeDemo?: Partial<CodeDemoOptions> | boolean
}
