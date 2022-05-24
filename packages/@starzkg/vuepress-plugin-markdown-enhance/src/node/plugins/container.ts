import { App } from '@vuepress/core'
import containerPlugin, {
  ContainerPluginOptions,
  MarkdownItContainerRenderFunction,
} from '@vuepress/plugin-container'
import {
  ensureLeadingSlash,
  LocaleConfig,
  resolveLocalePath,
} from '@vuepress/shared'
import type Token from 'markdown-it/lib/token'
import { MarkdownEnhanceOptions } from '../../shared'

export const useContainerPlugin = (
  app: App,
  options: ContainerPluginOptions
): void => {
  app.use(containerPlugin(options))
}

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For custom containers default title
 */
export const resolveContainerPluginOptions = (
  localeOptions: MarkdownEnhanceOptions,
  type: 'info' | 'note' | 'tip' | 'warning' | 'danger'
): ContainerPluginOptions => {
  const locales = Object.entries(localeOptions.locales || {}).reduce(
    (result, [key, value]) => {
      result[key] = {
        defaultInfo: value?.[type] ?? localeOptions[type],
      }
      return result
    },
    {}
  )

  return {
    type,
    locales,
  }
}

export const getDetailsRender =
  (
    locales: LocaleConfig<{
      defaultInfo: string
    }>
  ): MarkdownItContainerRenderFunction =>
  (tokens: Token[], index, _options, env): string => {
    const token = tokens[index]

    if (token.nesting === 1) {
      // `before` tag

      // resolve info (title)
      let info = token.info
        .trim()
        .slice(
          // length of "details"
          7
        )
        .trim()

      if (!info && locales) {
        // locale
        const { filePathRelative } = env
        const relativePath = ensureLeadingSlash(filePathRelative ?? '')

        const localePath = resolveLocalePath(locales, relativePath)
        const localeData = locales[localePath] ?? {}

        info = localeData.defaultInfo || 'Details'
      }

      return `<details class="custom-block details"><summary>${
        info || 'Details'
      }</summary>\n`
    }

    return '</details>\n'
  }
