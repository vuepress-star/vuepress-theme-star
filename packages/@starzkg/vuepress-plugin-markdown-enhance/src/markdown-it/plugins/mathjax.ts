/**
 * Forked from https://github.com/tani/markdown-it-mathjax3/blob/master/index.ts
 *
 * @see https://github.com/tani/markdown-it-mathjax3
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Waylon Flinn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import juice from 'juice'
import type { PluginWithOptions } from 'markdown-it'
import type { LiteElement } from 'mathjax-full/js/adaptors/lite/Element.js'
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js'
import type { MmlNode } from 'mathjax-full/js/core/MmlTree/MmlNode.js'
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js'
import { TeX } from 'mathjax-full/js/input/tex.js'
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js'
import type { default as TexError } from 'mathjax-full/js/input/tex/TexError.js'
import { mathjax as MathJax } from 'mathjax-full/js/mathjax.js'
import { CHTML } from 'mathjax-full/js/output/chtml.js'
import { SVG } from 'mathjax-full/js/output/svg.js'
import { tex } from './tex.js'

export interface MathJaxTexInputOptions {
  /**
   * extensions to use
   *
   * @default [
   *   'base',
   *   'action',
   *   'ams',
   *   'amscd',
   *   'bbox',
   *   'boldsymbol',
   *   'braket',
   *   'bussproofs',
   *   'cancel',
   *   'cases',
   *   'centernot',
   *   'color',
   *   'colortbl',
   *   'empheq',
   *   'enclose',
   *   'extpfeil',
   *   'gensymb',
   *   'html',
   *   'mathtools',
   *   'mhchem',
   *   'newcommand',
   *   'noerrors',
   *   'noundefined',
   *   'upgreek',
   *   'unicode',
   *   'verb',
   *   'configmacros',
   *   'tagformat',
   *   'textcomp',
   *   'textmacros'
   *  ]
   */
  packages?: string[]

  /**
   * pattern for recognizing numbers
   *
   * @default /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/
   */
  digits?: RegExp

  tags?: 'ams' | 'all' | 'none'

  /**
   * side for `\tag` macros
   */
  tagSide?: 'left' | 'right'

  /**
   * amount to indent tags
   *
   * @default "0.8em"
   */
  tagIndent: '0.8em'

  /**
   * use label name rather than tag for ids
   *
   * @default true;
   */
  useLabelIds?: boolean

  /**
   *  maximum number of macro substitutions per expression
   *
   * @default 1000
   */
  maxMacros?: number

  /**
   * maximum size for the internal TeX string (in bytes)
   *
   * @default 5120
   */
  maxBuffer?: number

  formatError?: (
    jax: TeX<unknown, unknown, unknown>,
    error: typeof TexError
  ) => MmlNode
}

export interface MathjaxCommonOutputOptions {
  /**
   * Global scaling factor for all expressions
   *
   * @default 1
   */
  scale?: number

  /**
   * smallest scaling factor to use
   *
   * @default 0.5
   */
  minScale?: number

  /**
   * make mtext elements use surrounding font
   *
   * @default false
   */
  mtextInheritFont?: boolean

  /**
   * make merror text use surrounding font
   *
   * @default true
   */
  merrorInheritFont?: boolean

  /**
   * font to use for mtext, if not inheriting (empty means use MathJax fonts)
   *
   * @default ""
   */
  mtextFont?: string

  /**
   * font to use for merror, if not inheriting (empty means use MathJax fonts)
   *
   * @default "serif"
   */
  merrorFont?: string

  /**
   * font to use for character that aren't in MathJax's fonts
   *
   * @default "serif"
   */
  unknownFamily?: string

  /**
   * @default "center"
   */
  displayAlign?: 'left' | 'center' | 'right'

  /**
   * @default 0
   */
  displayIndent?: string

  /**
   * - `true` for MathML spacing rules
   * - `false` for TeX rules
   *
   * @default false
   */
  mathmlSpacing?: boolean

  /**
   * RFDa and other attributes NOT to copy to the output
   */
  skipAttributes: Record<string, boolean>

  /**
   * default size of ex in em units
   *
   * @default 0.5
   */
  exFactor?: number
}

export interface MathjaxCommonHTMLOutputOptions
  extends MathjaxCommonOutputOptions {
  /**
   * Whether match ex-height of surrounding font
   *
   * @default true
   */
  matchFontHeight?: boolean

  /**
   * The URL where the fonts are found
   *
   * @default "[mathjax]/components/output/chtml/fonts/woff-v2"
   */
  fontURL?: string

  /**
   * Whether only produce CSS that is used in the processed equations
   *
   * @default true
   */
  adaptiveCSS?: boolean
}

export interface MathjaxSVGOutputOptions extends MathjaxCommonOutputOptions {
  /**
   * @default "none"
   */
  fontCache?: 'local' | 'global' | 'none'

  /**
   * ID to use for local font cache (for single equation processing)
   */
  localID?: string | null

  /**
   * insert <title> tags with speech content
   *
   * @default true
   */
  internalSpeechTitles?: boolean

  /**
   * initial id number to use for aria-labeledby titles
   */
  titleID?: number
}

// TODO: Add mathjax options
export interface MathJaxPluginOptions {
  /**
   * Output syntax
   *
   * @default 'svg'
   */

  output?: 'chtml' | 'svg'

  /**
   * Tex input options
   */
  tex?: MathJaxTexInputOptions

  /**
   * Common HTML output options
   */
  chtml?: MathjaxCommonHTMLOutputOptions

  /**
   * SVG output options
   */
  svg?: MathjaxSVGOutputOptions
}

interface DocumentOptions {
  InputJax: TeX<LiteElement, string, HTMLElement>
  OutputJax:
    | CHTML<LiteElement, string, HTMLElement>
    | SVG<LiteElement, string, HTMLElement>
}

interface ConvertOptions {
  display: boolean
}

const renderMath = (
  content: string,
  documentOptions: DocumentOptions,
  convertOptions: ConvertOptions
): string => {
  const adaptor = liteAdaptor()

  RegisterHTMLHandler(adaptor)
  const mathDocument = MathJax.document(content, documentOptions)
  /* eslint-disable */
  const html = adaptor.outerHTML(mathDocument.convert(content, convertOptions))
  const stylesheet = adaptor.outerHTML(
    documentOptions.OutputJax.styleSheet(mathDocument)
  )

  /* eslint-enable */
  return juice(html + stylesheet)
}

export const mathjax: PluginWithOptions<MathJaxPluginOptions> = (
  md,
  options = {}
) => {
  const documentOptions = {
    InputJax: new TeX<LiteElement, string, HTMLElement>({
      packages: AllPackages,
      ...options.tex,
    }),
    OutputJax:
      options.output === 'chtml'
        ? new CHTML<LiteElement, string, HTMLElement>({
            ...options.chtml,
          })
        : new SVG<LiteElement, string, HTMLElement>({
            fontCache: 'none',
            ...options.svg,
          }),
  }

  md.use(tex, {
    render: (content, displayMode) => {
      const convertOptions = {
        display: displayMode,
      }

      renderMath(content, documentOptions, convertOptions)
    },
  })
}

export default mathjax
