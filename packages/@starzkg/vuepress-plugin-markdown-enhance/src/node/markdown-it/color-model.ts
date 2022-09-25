import type MarkdownIt from 'markdown-it'

const hsla =
  /^[hH][sS][lL][Aa]?\((3[0-5][0-9]|[012]?[0-9][0-9]?)(,\s*([0-9]|[1-9][0-9])%\s*){2}(,\s*(0\.\d{1,2}|1|0)\s*)?\)$/
const rgba =
  /^[rR][gG][Bb][Aa]?\((\s*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}\s*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?\s*(0\.\d{1,2}|1|0)?\s*\)$/
const hex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
export const colorModel = (md: MarkdownIt): void => {
  const rawInlineCodeRule = md.renderer.rules.code_inline!
  md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
    const result = rawInlineCodeRule(tokens, idx, options, env, slf)
    const content = tokens[idx].content
    if (hex.test(content) || rgba.test(content) || hsla.test(content)) {
      return `${result.slice(
        0,
        result.length - '</code>'.length
      )}<span class="color-model" style="background: ${
        tokens[idx].content
      }"></span></code>`
    }
    return result
  }
}
