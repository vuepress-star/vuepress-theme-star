import type {
  ContainerPluginOptions,
  MarkdownItContainerRenderFunction,
} from '@vuepress/plugin-container'
import {
  ensureLeadingSlash,
  LocaleConfig,
  resolveLocalePath,
} from '@vuepress/shared'
import type Token from 'markdown-it/lib/token.js'
import type { MarkdownOptions } from '../../../shared/index.js'

export const detailsRender =
  (
    locales: LocaleConfig<{
      details?: string
    }> = {}
  ): MarkdownItContainerRenderFunction =>
  (tokens: Token[], index, _options, env): string => {
    const token = tokens[index]

    // `before` tag
    if (token.nesting === 1) {
      // resolve info (title)
      let info = token.info
        .trim()
        .slice(
          // length of "details"
          7
        )
        .trim()

      // get locale
      if (!info && locales) {
        const { filePathRelative } = env
        const relativePath = ensureLeadingSlash(filePathRelative ?? '')

        const localePath = resolveLocalePath(locales, relativePath)
        const localeData = locales[localePath] ?? {}

        info = localeData.details || 'Details'
      }

      return `<details class="custom-container details">\n<summary>${info}</summary>\n`
    }

    return '\n</details>\n'
  }

export const resolveDetailsContainerOptions = (
  localeOptions: MarkdownOptions
): ContainerPluginOptions => {
  return {
    type: 'details',
    render: detailsRender(localeOptions.locales),
  }
}
