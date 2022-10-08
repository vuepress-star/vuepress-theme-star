import type { MarkdownOptions } from './options/index.js'

/**
 * markdown favor
 */
export type MarkdownFavor = 'default' | 'gfm' | 'vscode' | 'vuepress'

/**
 * default markdown spec
 */
export const DEFAULT_MARKDOWN_SPEC: MarkdownOptions = {
  attrs: true,

  colorModel: true,

  chart: true,

  echarts: true,

  typographer: true,

  sup: true,

  sub: true,

  footnote: true,

  abbr: true,

  cjkBreaks: true,

  deflist: true,

  forInline: false,

  import: true,

  include: true,

  ins: true,

  mark: true,

  flowchart: true,

  tasklist: true,

  tex: true,

  katex: true,

  markmap: true,

  mermaid: true,

  plantuml: true,

  reveal: true,

  container: true,

  details: true,

  align: true,

  vPre: true,

  codeDemo: {
    useBabel: false,
    jsLib: [],
    cssLib: [],
    codepenLayout: 'left',
    codepenEditors: '101',
    babel: 'https://unpkg.com/@babel/standalone/babel.min.js',
    vue: 'https://unpkg.com/vue/dist/vue.global.prod.js',
    react: 'https://unpkg.com/react/umd/react.production.min.js',
    reactDOM: 'https://unpkg.com/react-dom/umd/react-dom.production.min.js',
  },

  externalLinkIcon: true,

  delay: 500,
}

/**
 * CommonMark Spec
 *
 * @see https://spec.commonmark.org/
 */
export const COMMON_MARK_SPEC: MarkdownOptions = {}

/**
 * GitHub Flavored Markdown Spec
 *
 * @see https://github.github.com/gfm/
 */
export const GITHUB_FAVOR_MARKDOWN_SPEC: MarkdownOptions = {
  container: true,

  align: true,

  vPre: true,

  sup: true,

  sub: true,

  footnote: true,

  abbr: true,

  cjkBreaks: true,

  deflist: true,

  forInline: false,

  ins: true,

  mark: true,

  flowchart: true,

  tasklist: true,

  tex: true,

  mermaid: true,

  codeDemo: true,

  reveal: true,
}
