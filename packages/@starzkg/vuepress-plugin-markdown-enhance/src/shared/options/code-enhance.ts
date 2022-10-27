import type { CopyCodeLocaleData, CopyCodeOptions } from './code-copy.js'
import type { RevealPluginOptions } from './reveal.js'

export declare type CodeEnhanceOptions = {
  /**
   * 是否启用 chart 图表支持
   *
   * Whether to enable chart support
   *
   * @default false
   */
  chart?: boolean
  /**
   * 是否启用代码复制
   *
   * Whether to enable code copy
   *
   * @default false
   */
  copy?: Partial<CopyCodeOptions> | boolean
  /**
   * 是否启用 echarts 图表支持
   *
   * Whether to enable echarts support
   *
   * @default false
   */
  echarts?: boolean
  /**
   * 是否启用流程图
   *
   * Whether to enable flowchart format support
   *
   * @default false
   */
  flowchart?: boolean
  /**
   * 是否启用代码高亮
   *
   * Whether to enable code highlight
   *
   * @default 'auto'
   */
  highlight?: 'prismjs' | 'shiki' | 'auto' | false
  /**
   * 是否启用 Markmap 支持
   *
   * Whether to enable markmap support
   *
   * @default false
   */
  markmap?: boolean
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
}

export declare type CodeEnhanceLocaleData = CopyCodeLocaleData
