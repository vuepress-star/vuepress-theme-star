/**
 * Forked from https://github.com/waylonflinn/markdown-it-katex/blob/master/index.js
 *
 * @see  https://github.com/waylonflinn/markdown-it-katex
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

import { createRequire } from 'node:module'
import Katex from 'katex'
import type { KatexOptions as _KatexOptions } from 'katex'
import type { PluginWithOptions } from 'markdown-it'
import { escapeHtml } from '../utils/index.js'
import { tex } from './tex.js'

const require = createRequire(import.meta.url)

export interface KatexOptions extends _KatexOptions {
  /**
   * Whether enable mhchem extension
   *
   * 是否启用 mhchem 扩展
   *
   * @default false
   */
  mhchem?: boolean
}

// set KaTeX as the renderer for markdown-it-simplemath
const katexInline = (tex: string, options: _KatexOptions): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Katex.renderToString(tex, { ...options, displayMode: false })
  } catch (error) {
    if (options.throwOnError) console.warn(error)

    return `<span class='katex-error' title='${escapeHtml(
      (error as Error).toString()
    )}'>${escapeHtml(tex)}</span>`
  }
}

const katexBlock = (tex: string, options: _KatexOptions): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return `<p class='katex-block'>${Katex.renderToString(tex, {
      ...options,
      displayMode: true,
      strict: (errorCode: string): string =>
        errorCode === 'newLineInDisplayMode' ? 'ignore' : 'warn',
    })}</p>\n`
  } catch (error) {
    if (options.throwOnError) console.warn(error)

    return `<p class='katex-block katex-error' title='${escapeHtml(
      (error as Error).toString()
    )}'>${escapeHtml(tex)}</p>\n`
  }
}

export const katex: PluginWithOptions<KatexOptions> = (md, options = {}) => {
  const { mhchem = false, ...userOptions } = options

  if (mhchem) require('katex/contrib/mhchem')

  const katexOptions = {
    throwOnError: false,
    macros: {
      // support more symbols
      '\\liiiint': '\\int\\!\\!\\!\\iiint',
      '\\iiiint': '\\int\\!\\!\\!\\!\\iiint',
      '\\idotsint': '\\int\\!\\cdots\\!\\int',
    },
    ...userOptions,
  }

  md.use(tex, {
    render: (content, displayMode) =>
      displayMode
        ? katexBlock(content, katexOptions)
        : katexInline(content, katexOptions),
  })
}

export default katex
