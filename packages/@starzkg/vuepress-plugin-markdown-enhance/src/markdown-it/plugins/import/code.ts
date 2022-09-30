import { path } from '@vuepress/utils'
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.js'
import type { ImportRule } from './types.js'

// regexp to match the import syntax
const SYNTAX_RE = /^code(?:{(\d+)?-(\d+)?})?(?: ([^\]]+))?/

export const code: ImportRule = (
  state: StateInline,
  link: string,
  content,
  title,
  args
): boolean => {
  if (
    [
      '.java',
      '.js',
      '.c',
      '.cpp',
      '.sh',
      '.cs',
      '.fs',
      '.ts',
      '.kt',
      '.md',
      '.py',
      '.html',
      '.xml',
      '.yaml',
      '.yml',
      '.rb',
      '.styl',
    ].indexOf(path.extname(link).toLowerCase()) === -1
  ) {
    return false
  }

  // create a import_code token
  const token = state.push('import_code', 'code', 0)

  const match = args && args.match(SYNTAX_RE)
  let meta
  if (match) {
    const [, lineStart, lineEnd, info] = match
    // use user specified info, or fallback to file ext
    token.info = info ?? path.extname(link).slice(1)
    meta = {
      importPath: link,
      lineStart: lineStart ? Number.parseInt(lineStart, 10) : 0,
      lineEnd: lineEnd ? Number.parseInt(lineEnd, 10) : undefined,
    }
  } else {
    token.info = path.extname(link).slice(1)
    meta = {
      importPath: link,
      lineStart: 0,
      lineEnd: undefined,
    }
  }

  token.markup = '```'
  // store token meta to be used in renderer rule
  token.meta = meta

  return true
}
