import type { MarkdownEnhanceOptions } from './options'

/**
 * markdown favor
 */
export type MarkdownFavor = 'default' | 'gfm' | 'vscode' | 'vuepress'

/**
 * default markdown spec
 */
export const DEFAULT_MARKDOWN_SPEC: MarkdownEnhanceOptions = {
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

  demo: {
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

  presentation: true,
}

/**
 * GitHub Flavored Markdown Spec
 *
 * @see https://github.github.com/gfm/
 */
export const GITHUB_FAVOR_MARKDOWN_SPEC: MarkdownEnhanceOptions = {
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

  demo: true,

  presentation: true,
}
