import type StateInline from 'markdown-it/lib/rules_inline/state_inline.js'

export interface ImportTokenMeta {
  [type: string]: string | undefined
  importPath: string
  title?: string
}

export type ImportRule = (
  state: StateInline,
  href: string,
  label: string,
  title: string,
  args: string
) => boolean
