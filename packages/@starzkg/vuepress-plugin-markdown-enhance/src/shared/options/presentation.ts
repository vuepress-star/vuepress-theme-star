import type { RevealOptions } from './reveal.js'

export type RevealPlugin =
  | 'highlight'
  | 'math'
  | 'search'
  | 'notes'
  | 'zoom'
  | 'anything'
  | 'audio'
  | 'chalkboard'

export interface PresentationOptions {
  /**
   * 启用的 Reveal.js 插件
   *
   * Reveal plugins enabled
   */
  plugins?: RevealPlugin[]
  /**
   * 直接传入 reveal.js 的配置项
   *
   * Config options passed directly to reveal.js
   */
  revealConfig?: Partial<RevealOptions>
}
