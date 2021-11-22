import { useThemePluginConfig } from '@starzkg/vuepress-shared/es/client'
import type { CommentPluginFrontmatter, WalineOptions } from '../../shared'
import { enableWaline, walineOption } from '../define'

export const resolveEnablePageViews = (
  frontmatter: CommentPluginFrontmatter
): boolean => {
  const themePluginConfig = useThemePluginConfig<WalineOptions>('comment')

  if (!enableWaline) return false
  const themeConfig = themePluginConfig.value.pageviews
  const pluginConfig = walineOption.pageviews !== false
  const pageConfig = frontmatter.pageview

  return (
    // Enable in page
    Boolean(pageConfig) ||
    // Enable in plugin and not disable in theme
    (Boolean(pluginConfig) && pageConfig !== false) ||
    // not disabled in anywhere
    (themeConfig !== false && pluginConfig !== false && pageConfig !== false)
  )
}
