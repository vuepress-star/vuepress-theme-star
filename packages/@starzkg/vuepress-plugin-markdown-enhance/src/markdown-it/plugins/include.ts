import type { MarkdownEnv } from '@vuepress/markdown'
import { fs, path } from '@vuepress/utils'
import type { PluginWithOptions } from 'markdown-it'
import type { RuleBlock } from 'markdown-it/lib/parser_block.js'
import type { default as Token } from 'markdown-it/lib/token.js'

export interface IncludePluginOptions {
  /**
   * A function to handle the include path
   *
   * 处理 include 文件路径
   *
   * @default (path) => path
   */
  handleIncludePath?: (str: string) => string

  /**
   * Whether deep include files in included markdown files
   *
   * 是否深度导入包含的 markdown 文件
   *
   * @default false
   */
  deep?: boolean

  /**
   * Whether resolve the code file link path in the included markdown file
   *
   * 是否解析包含的 markdown 文件的里的导入代码块相对路径
   *
   * @default true
   */
  resolveImportCodePath?: boolean

  /**
   * Whether resolve the image related path in the included markdown file
   *
   * 是否解析包含的 markdown 文件的里的相对图像路径
   *
   * @default true
   */
  resolveImagePath?: boolean

  /**
   * Whether resolve the related file link path in the included markdown file
   *
   * 是否解析包含的 markdown 文件的里的文件相对路径
   *
   * @default true
   */
  resolveLinkPath?: boolean
}

interface IncludeTokenMeta {
  includePath: string
  lineStart: number
  lineEnd?: number
}

interface IncludeMarkdownEnv extends MarkdownEnv {
  /** included files */
  includedFiles?: string[]
}

// min length of the include syntax, i.e. '@[code]()'
const MIN_LENGTH = 9

// char codes of '@[code'
const START_CODES = [0x23, 0x69, 0x6e, 0x63, 0x6c, 0x75, 0x64, 0x65, 0x3c]

// regexp to match the include syntax
const SYNTAX_RE = /^#include<([^>]*)>(?:{(?:(\d+)?-(\d+)?)?})?$/

export const createIncludeBlockRule =
  ({ handleIncludePath = (str) => str }: IncludePluginOptions): RuleBlock =>
  (state, startLine, endLine, silent): boolean => {
    // if it's indented more than 3 spaces, it should be a code block
    /* istanbul ignore if */
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]

    // return false if the length is shorter than min length
    if (pos + MIN_LENGTH > max) return false

    // check if it's matched the start
    for (let i = 0; i < START_CODES.length; i += 1) {
      if (state.src.charCodeAt(pos + i) !== START_CODES[i]) {
        return false
      }
    }

    // check if it's matched the syntax
    const match = state.src.slice(pos, max).match(SYNTAX_RE)
    if (!match) return false

    // return true as we have matched the syntax
    if (silent) return true

    const [, includePath, lineStart, lineEnd] = match

    const meta: IncludeTokenMeta = {
      includePath: handleIncludePath(includePath),
      lineStart: lineStart ? Number.parseInt(lineStart, 10) : 0,
      lineEnd: lineEnd ? Number.parseInt(lineEnd, 10) : undefined,
    }

    // create a include token
    const token = state.push('include', '', 0)

    // use user specified info, or fallback to file ext
    token.info = includePath
    token.map = [startLine, startLine + 1]
    // store token meta to be used in renderer rule
    token.meta = meta

    state.line = startLine + 1

    return true
  }

export const resolveInclude = (
  { includePath, lineStart, lineEnd }: IncludeTokenMeta,
  { filePath }: MarkdownEnv
): {
  includeFilePath: string | null
  include: string
} => {
  let includeFilePath = includePath

  if (!path.isAbsolute(includePath)) {
    // if the includePath is relative path, we need to resolve it
    // according to the markdown filePath
    if (!filePath) {
      return {
        includeFilePath: null,
        include: 'Error when resolving path',
      }
    }
    includeFilePath = path.resolve(
      filePath,
      '..',
      path.defaultExt(includePath, '.md')
    )
  }

  // check file existence
  if (!fs.existsSync(includeFilePath)) {
    return {
      includeFilePath,
      include: 'File not found',
    }
  }

  // read file content
  const fileContent = fs.readFileSync(includeFilePath).toString()

  // resolve partial include
  return {
    includeFilePath,
    include: fileContent
      .split('\n')
      .slice(lineStart ? lineStart - 1 : lineStart, lineEnd)
      .join('\n')
      .replace(/\n?$/, '\n'),
  }
}

const resolveRelatedLink = (
  attr: string,
  token: Token,
  filePath: string,
  includedFiles?: string[]
): void => {
  const attrIndex = token.attrIndex(attr)
  const url = token.attrs?.[attrIndex][1]

  if (url?.startsWith('.') && includedFiles && includedFiles.length) {
    const includeDir = path.resolve(path.dirname(filePath), url)

    token.attrs![attrIndex][1] = path.relative(includedFiles[0], includeDir)
  }
}

export const include: PluginWithOptions<IncludePluginOptions> = (
  md,
  options = {
    handleIncludePath: (str) => str,
    deep: true,
    resolveLinkPath: true,
    resolveImagePath: true,
    resolveImportCodePath: true,
  }
): void => {
  const deep = options.deep

  // add include block rule
  md.block.ruler.before('fence', 'include', createIncludeBlockRule(options), {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })

  // add include renderer rule
  md.renderer.rules.include = (
    tokens,
    idx,
    options,
    env: IncludeMarkdownEnv,
    slf
  ) => {
    const token = tokens[idx]

    // use included code as token content
    const { includeFilePath, include } = resolveInclude(token.meta, env)
    let content = include

    // extract included files to env
    if (deep && env.filePath && includeFilePath) {
      const includedFiles = env.includedFiles || (env.includedFiles = [])
      includedFiles.push(env.filePath)
      content = md.render(include, {
        ...env,
        filePath: includeFilePath,
      })
      includedFiles.pop()
    }

    token.content = content

    // recursive render the include until no include
    return content
  }

  if (options.resolveImportCodePath) {
    const defaultRender = md.renderer.rules.import_code!

    md.renderer.rules.import_code = (
      tokens,
      idx,
      options,
      env: IncludeMarkdownEnv,
      self
    ): string => {
      const token = tokens[idx]

      if (env.filePath && env.includedFiles) {
        token.attrPush(['import_code', token.meta.importPath])
        resolveRelatedLink(
          'import_code',
          token,
          env.filePath,
          env.includedFiles
        )
        const attrIndex = token.attrIndex('import_code')
        token.meta.importPath = token.attrs![attrIndex][1]
      }

      // pass token to default renderer.
      return defaultRender(tokens, idx, options, env, self)
    }
  }

  if (options.resolveImagePath) {
    const defaultRender = md.renderer.rules.image!

    md.renderer.rules.image = (
      tokens,
      idx,
      options,
      env: IncludeMarkdownEnv,
      self
    ): string => {
      const token = tokens[idx]

      if (env.filePath && env.includedFiles)
        resolveRelatedLink('src', token, env.filePath, env.includedFiles)

      // pass token to default renderer.
      return defaultRender(tokens, idx, options, env, self)
    }
  }

  if (options.resolveLinkPath) {
    const defaultRender =
      md.renderer.rules.link_open ||
      ((tokens, idx, options, _env, self): string =>
        self.renderToken(tokens, idx, options))

    md.renderer.rules.link_open = (
      tokens,
      idx,
      options,
      env: IncludeMarkdownEnv,
      self
    ): string => {
      const token = tokens[idx]

      if (env.filePath && env.includedFiles)
        resolveRelatedLink('href', token, env.filePath, env.includedFiles)

      // pass token to default renderer.
      return defaultRender(tokens, idx, options, env, self)
    }
  }
}
