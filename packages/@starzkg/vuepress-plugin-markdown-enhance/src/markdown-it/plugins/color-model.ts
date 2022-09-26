import type MarkdownIt from 'markdown-it'
import type { PluginSimple } from 'markdown-it'

/**
 * @see https://www.w3.org/wiki/CSS/Properties/color/HSL
 * @see https://www.w3.org/wiki/CSS/Properties/color/HSLA
 */
const hsla =
  /^[hH][sS][lL][Aa]?\((\s*3[0-5][0-9]|[012]?[0-9][0-9]?)(,\s*([0-9]|[1-9][0-9])%\s*){2}(,\s*(0\.\d{1,2}|1|0)\s*)?\)$/
/**
 * @see https://www.w3.org/wiki/CSS/Properties/color/RGB
 * @see https://www.w3.org/wiki/CSS/Properties/color/RGBA
 */
const rgba =
  /^[rR][gG][Bb][Aa]?\((((\s*2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)(,\s*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\s*){2})|((\s*([0-9]|[1-9][0-9])%\s*)(,\s*([0-9]|[1-9][0-9])%\s*){2}))(,\s*(0\.\d{1,2}|1|0)\s*)?\)$/
/**
 * @see https://www.w3.org/wiki/CSS/Properties/color/RGB
 */
const hex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/

/**
 * Color Model Support
 * <p> The color can be specified as </p>
 * <p> a hexadecimal RGB value: #faf or #ffaaff </p>
 * <p> a RGB value: rgb(255, 160, 255) or rgb(100%, 62.5%, 100%) <br/>
 * Each value is from 0 to 255, or from 0% to 100%. </p>
 * <p> a RGBA value: rgba(255, 160, 255, 1) or rgba(100%, 62.5%, 100%, 1) <br/>
 * This variant includes an “alpha” component to allow specification of the opacity of a color. Values are in the range 0.0 (fully transparent) to 1.0 (fully opaque). </p>
 * <p> a HSL value: hsl(0, 100%, 50%) <br/>
 * A triple (hue, saturation, lightness). hue is an angle in degrees. saturation and lightness are percentages (0-100%). </p>
 * <p> a HSLA value: hsla(0, 100%, 50%, 1) <br/>
 * This variant includes an “alpha” component to allow specification of the opacity of a color. Values are in the range 0.0 (fully transparent) to 1.0 (fully opaque). </p>
 *
 * @see https://www.w3.org/wiki/CSS/Properties/color
 *
 * @param md
 */
export const colorModel: PluginSimple = (md: MarkdownIt): void => {
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
