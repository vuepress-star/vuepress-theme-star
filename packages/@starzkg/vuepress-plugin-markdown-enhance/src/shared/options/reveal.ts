import type {
  RevealOptions as _RevealOptions,
  RevealPlugin,
} from '../../@types/reveal.js/index.js'

export { RevealThemeType, RevealPlugin } from '../../@types/reveal.js/index.js'

export interface RevealOptions {
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
  revealConfig?: Partial<_RevealOptions>
}
