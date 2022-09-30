import { path } from '@vuepress/utils'
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.js'
import type { default as Token } from 'markdown-it/lib/token.js'
import type { ImportRule } from './types.js'

export const image: ImportRule = (
  state: StateInline,
  link: string,
  label,
  title,
  args
): boolean => {
  if (
    [
      '.png',
      '.jpg',
      '.jpeg',
      '.bmp',
      '.gif',
      '.webp',
      '.psd',
      '.svg',
      '.tiff',
    ].indexOf(path.extname(link).toLowerCase()) === -1
  ) {
    return false
  }

  let tokens: Token[]
  state.md.inline.parse(label, state.md, state.env, (tokens = []))
  const token = state.push('image', 'img', 0)
  token.attrPush(['src', link])
  token.attrPush(['alt', ''])
  token.children = tokens
  token.content = label

  if (title) {
    token.attrPush(['title', title])
  }
  return true
}
