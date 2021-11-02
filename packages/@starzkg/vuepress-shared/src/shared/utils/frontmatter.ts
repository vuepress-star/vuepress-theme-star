import type { BasePageFrontMatter, BaseThemeConfig } from '../types'
import { getAuthorInfo } from './info'

export const getAuthor = (
  frontmatter: BasePageFrontMatter,
  themeConfig: BaseThemeConfig,
  fallback?: string | string[]
): string[] => {
  const { author } = frontmatter

  if (author) return getAuthorInfo(author)
  if (author === false) return []

  if (fallback) return getAuthorInfo(fallback, false)

  return getAuthorInfo(themeConfig.author, false)
}
