import type { MarkdownEnhanceOptions } from './options'

export type MarkdownFavor = 'default' | 'gfm' | 'vscode' | 'vuepress'

export const DEFAULT_MARKDOWN_SPEC: MarkdownEnhanceOptions = {
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

/**
 * GitHub Flavored Markdown Spec
 *
 * @see https://github.github.com/gfm/
 */
export const GITHUB_FAVOR_MARKDOWN_SPEC: MarkdownEnhanceOptions = {
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
