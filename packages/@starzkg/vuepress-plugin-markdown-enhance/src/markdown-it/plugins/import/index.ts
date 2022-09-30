import type { MarkdownEnv } from '@vuepress/markdown'
import { isLinkHttp } from '@vuepress/shared'
import { fs, path } from '@vuepress/utils'
import type { PluginWithOptions } from 'markdown-it'
import { isSpace, normalizeReference } from 'markdown-it/lib/common/utils.js'
import type { RuleInline } from 'markdown-it/lib/parser_inline.js'
import { parseArgs } from '../../utils/index.js'
import { code } from './code.js'
import { image } from './image.js'
import { pdf } from './pdf.js'
import type { ImportRule, ImportTokenMeta } from './types.js'

export interface ImportPluginOptions {
  /**
   * A function to handle the import rules
   *
   * 处理 import 文件路径
   *
   * @default (path) => path
   */
  importRules?: ImportRule[]
}

const defaultImportRules: ImportRule[] = [
  image,
  pdf,
  code,
  (state, link: string, label, title, args): boolean => {
    const token = state.push('import', path.extname(link).toLowerCase(), 0)
    token.content = label
    token.meta = {
      importPath: link,
      title,
      args,
    } as ImportTokenMeta

    return true
  },
]

export const createImportInlineRule =
  ({
    importRules = [...defaultImportRules],
  }: ImportPluginOptions): RuleInline =>
  (state, silent): boolean => {
    let link = ''
    let title
    let start
    const oldPos = state.pos
    const max = state.posMax

    if (state.src.charCodeAt(state.pos) !== 0x40 /* ! */) {
      return false
    }
    if (state.src.charCodeAt(state.pos + 1) !== 0x5b /* [ */) {
      return false
    }

    const labelStart = state.pos + 2
    const labelEnd = state.md.helpers.parseLinkLabel(
      state,
      state.pos + 1,
      false
    )

    // parser failed to find ']', so it's not a valid link
    if (labelEnd < 0) {
      return false
    }

    let pos = labelEnd + 1
    let res
    if (pos < max && state.src.charCodeAt(pos) === 0x28 /* ( */) {
      //
      // Inline link
      //

      // [label](  <link>  "title"  )
      //        ^^ skipping these spaces
      pos++
      for (; pos < max; pos++) {
        const code = state.src.charCodeAt(pos)
        if (!isSpace(code) && code !== 0x0a) {
          break
        }
      }
      if (pos >= max) {
        return false
      }

      // [label](  <link>  "title"  )
      //          ^^^^^^ parsing link destination
      start = pos
      res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax)
      if (res.ok) {
        link = state.md.normalizeLink(res.str)
        if (state.md.validateLink(link)) {
          pos = res.pos
        } else {
          link = ''
        }
      }

      // [label](  <link>  "title"  )
      //                ^^ skipping these spaces
      start = pos
      for (; pos < max; pos++) {
        const code = state.src.charCodeAt(pos)
        if (!isSpace(code) && code !== 0x0a) {
          break
        }
      }

      // [label](  <link>  "title"  )
      //                  ^^^^^^^ parsing link title
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax)
      if (pos < max && start !== pos && res.ok) {
        title = res.str
        pos = res.pos

        // [label](  <link>  "title"  )
        //                         ^^ skipping these spaces
        for (; pos < max; pos++) {
          const code = state.src.charCodeAt(pos)
          if (!isSpace(code) && code !== 0x0a) {
            break
          }
        }
      } else {
        title = ''
      }

      if (pos >= max || state.src.charCodeAt(pos) !== 0x29 /* ) */) {
        state.pos = oldPos
        return false
      }
      pos++
    } else {
      let label
      //
      // Link reference
      //
      if (typeof state.env.references === 'undefined') {
        return false
      }

      if (pos < max && state.src.charCodeAt(pos) === 0x5b /* [ */) {
        start = pos + 1
        pos = state.md.helpers.parseLinkLabel(state, pos)
        if (pos >= 0) {
          label = state.src.slice(start, pos++)
        } else {
          pos = labelEnd + 1
        }
      } else {
        pos = labelEnd + 1
      }

      // covers label === '' and label === undefined
      // (collapsed reference link and shortcut reference link respectively)
      if (!label) {
        label = state.src.slice(labelStart, labelEnd)
      }

      const ref = state.env.references[normalizeReference(label)]
      if (!ref) {
        state.pos = oldPos
        return false
      }
      link = ref.href
      title = ref.title
    }

    let args
    if (pos < max && state.src.charCodeAt(pos) === 0x7b /* { */) {
      start = pos + 1
      pos = parseArgs(state, pos)
      if (pos >= 0) {
        args = state.src.slice(start, pos++)
      } else {
        state.pos = oldPos
        return false
      }
    }

    //
    // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    //
    if (!silent) {
      const label = state.src.slice(labelStart, labelEnd)

      for (const importRule of importRules) {
        if (importRule(state, link, label, title, args)) {
          break
        }
      }
    }

    state.pos = pos
    state.posMax = max

    return true
  }

export const resolveImportPath = (
  importPath: string,
  { filePath }: MarkdownEnv
): {
  importFilePath: string | null
  importError: string | null
} => {
  let importFilePath = importPath

  if (!path.isAbsolute(importPath)) {
    // if the importPath is relative path, we need to resolve it
    // according to the markdown filePath
    if (!filePath) {
      return {
        importFilePath: null,
        importError: 'Error when resolving path',
      }
    }
    importFilePath = path.resolve(filePath, '..', importPath)
  }

  // check file existence
  if (!fs.existsSync(importFilePath)) {
    return {
      importFilePath,
      importError: 'File not found',
    }
  }
  return {
    importFilePath,
    importError: null,
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const _import: PluginWithOptions<ImportPluginOptions> = (
  md,
  options = { importRules: [...defaultImportRules] }
): void => {
  // add import inline rule
  md.inline.ruler.before('image', 'import', createImportInlineRule(options), {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })

  // add pdf renderer rule
  md.renderer.rules.import_pdf = (
    tokens,
    idx,
    options,
    env: MarkdownEnv,
    slf
  ) => {
    const token = tokens[idx]
    const meta = token.meta as ImportTokenMeta
    if (isLinkHttp(meta.importPath)) {
      return `<PDF url="${meta.importPath}" ${meta.args ? meta.args : ''} />`
    }
    const { importFilePath, importError } = resolveImportPath(
      meta.importPath,
      env
    )
    if (importError) {
      token.content = importError
      return importError
    }
    // extract imported files to env
    if (env.filePath && importFilePath) {
      const importedFiles = env.importedFiles || (env.importedFiles = [])
      importedFiles.push(env.filePath)
    }

    return `<PDF url="${meta.importPath}" ${meta.args ? meta.args : ''}/>`
  }

  // add import renderer rule
  md.renderer.rules.import = (tokens, idx, options, env: MarkdownEnv, slf) => {
    const token = tokens[idx]
    const meta = token.meta as ImportTokenMeta

    // use imported code as token content
    const { importFilePath, importError } = resolveImportPath(
      meta.importPath,
      env
    )
    if (importError) {
      token.content = importError
      return importError
    }

    // extract imported files to env
    if (importFilePath) {
      const importedFiles = env.importedFiles || (env.importedFiles = [])
      importedFiles.push(importFilePath)
      const content = fs
        .readFileSync(importFilePath)
        .toString()
        .split('\n')
        .map((line) => `<p>${line}</p>`)
        .join('\n')
        .replace(/\n?$/, '\n')
      token.content = content
      return content
    }

    return ''
  }
}
