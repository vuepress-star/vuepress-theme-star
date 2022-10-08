import type { LocaleConfig } from '@vuepress/core'
import type { MarkdownOptions as _MarkdownOptions } from '@vuepress/markdown'
import type { AttrsPluginOptions } from '../../markdown-it/plugins/attrs.js'
import type { EmojiPluginOptions } from '../../markdown-it/plugins/emoji.js'
import type { ForInlinePluginOptions } from '../../markdown-it/plugins/for-inline.js'
import type { KatexPluginOptions } from '../../markdown-it/plugins/katex.js'
import type { MathJaxPluginOptions } from '../../markdown-it/plugins/mathjax.js'
import type { TaskListPluginOptions } from '../../markdown-it/plugins/task-list.js'
import type { ContainerOptions } from './container.js'
import type { ExternalLinkIconOptions } from './external-link-icon.js'
import type { MarkdownEnhanceLocaleData } from './locales.js'
import type { RevealPluginOptions } from './reveal.js'

export * from './code-demo.js'
export * from './container.js'
export * from './external-link-icon.js'
export * from './reveal.js'
/**
 * markdown-enhance plugin configuration
 */
export interface MarkdownEnhanceOptions {
  /**
   * 是否启用Abbreviation支持
   *
   * Whether to enable abbreviation format support
   *
   * @default false
   */
  abbr?: boolean
  /**
   * 是否启用属性支持。
   *
   * Whether to enable attr support
   *
   * @default false
   */
  attrs?: AttrsPluginOptions | boolean
  /**
   * 是否启用 chart 图表支持
   *
   * Whether to enable chart support
   *
   * @default false
   */
  chart?: boolean
  /**
   * 是否禁止汉字字符之间的换行
   *
   * Whether to enable suppress linebreaks between east asian characters
   *
   * @default false
   */
  cjkBreaks?: boolean
  /**
   * 是否启用颜色格式
   *
   * Whether to enable Color Model
   *
   * @default false
   */
  colorModel?: boolean
  /**
   * 是否启用定义列表支持
   *
   * Whether to enable def list format support
   *
   * @default false
   */
  deflist?: boolean
  /**
   * 是否启用 echarts 图表支持
   *
   * Whether to enable echarts support
   *
   * @default false
   */
  echarts?: boolean
  /**
   * 是否启用 emoji
   *
   * Whether to enable emoji
   *
   * @default false
   */
  emoji?: false | EmojiPluginOptions
  /**
   * 是否启用流程图
   *
   * Whether to enable flowchart format support
   *
   * @default false
   */
  flowchart?: boolean
  /**
   * 是否启用脚注格式支持
   *
   * Whether to enable footnote format support
   *
   * @default false
   */
  footnote?: boolean
  /**
   * 是否启用内联标记迭代器支持
   *
   * Whether to enable inline tokens iterator support
   *
   * @default false
   */
  forInline?: false | ForInlinePluginOptions
  /**
   * 是否启用文件导入支持
   *
   * Whether to enable import support
   *
   * @default false
   */
  import?: boolean
  /**
   * 是否启用文件包含支持
   *
   * Whether to enable include support
   *
   * @default false
   */
  include?: boolean
  /**
   * 是否启用ins支持
   *
   * Whether to enable ins format support
   *
   * @default false
   */
  ins?: boolean
  /**
   * 是否启用 KaTeX 语法支持
   *
   * Whether to enable KaTeX syntax support
   *
   * @default false
   */
  katex?: KatexPluginOptions | boolean
  /**
   * 是否启用标注支持
   *
   * Whether to enable mark format support
   *
   * @default false
   */
  mark?: boolean
  /**
   * 是否启用 Markmap 支持
   *
   * Whether to enable markmap support
   *
   * @default false
   */
  markmap?: boolean
  /**
   * 是否启用 MathJax 语法支持
   *
   * Whether to enable MathJax syntax support
   *
   * @default false
   */
  mathjax?: MathJaxPluginOptions | boolean
  /**
   * 是否启用 Mermaid 流程图支持
   *
   * Whether to enable mermaid support
   *
   * @default false
   */
  mermaid?: boolean
  /**
   * 是否启用 PlantUML 支持
   *
   * Whether to enable PlantUML support
   *
   * @default false
   */
  plantuml?: boolean
  /**
   * 是否启用 reveal.js 支持
   *
   * Whether to enable reveal.js support
   *
   * @default false
   */
  reveal?: RevealPluginOptions | boolean
  /**
   * 是否启用上角标格式支持
   *
   * Whether to enable superscript format support
   *
   * @default false
   */
  sup?: boolean
  /**
   * 是否启用下角标格式支持
   *
   * Whether to enable subscript format support
   *
   * @default false
   */
  sub?: boolean
  /**
   * 是否启用任务里表支持
   *
   * Whether to enable tastlist format support
   *
   * @default false
   */
  tasklist?: TaskListPluginOptions | boolean
  /**
   * 是否启用 TeX 语法支持
   *
   * Whether to enable TeX syntax support
   *
   * @see katex
   * @see mathjax
   * @default false
   */
  tex?: 'katex' | 'mathjax' | boolean
  /**
   * 操作页面 DOM 的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * The delay of operating dom, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * @default 500
   */
  delay?: number
}

export declare type MarkdownOptions = MarkdownEnhanceOptions &
  ContainerOptions &
  ExternalLinkIconOptions &
  _MarkdownOptions & {
    locales?: LocaleConfig<MarkdownEnhanceLocaleData>
  }
