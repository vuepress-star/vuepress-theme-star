import { MarkdownEnhanceOptions } from './options'

export type MarkdownFavor = 'default' | 'gfm' | 'vscode' | 'vuepress'

export const DEFAULT_MARKDOWN_ENHANCE_OPTIONS: MarkdownEnhanceOptions = {
  container: true,

  align: true,

  sup: true,

  sub: true,

  footnote: true,

  abbr: true,

  cjkBreaks: true,

  deflist: true,

  emoji: true,

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

export const GITHUB_FAVOR_MARKDOWN_OPTIONS: MarkdownEnhanceOptions = {
  container: true,

  align: true,

  sup: true,

  sub: true,

  footnote: true,

  abbr: true,

  cjkBreaks: true,

  deflist: true,

  emoji: true,

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
