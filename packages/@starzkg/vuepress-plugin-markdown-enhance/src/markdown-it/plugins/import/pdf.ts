import { path } from '@vuepress/utils'
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.js'
import type { ImportRule } from './types.js'

export const pdf: ImportRule = (
  state: StateInline,
  link: string,
  label,
  title,
  args
): boolean => {
  if (path.extname(link).toLowerCase() !== '.pdf') {
    return false
  }
  const token = state.push('import_pdf', '', 0)
  token.content = label
  token.meta = {
    importPath: link,
    title,
    args,
  }

  return true
}
