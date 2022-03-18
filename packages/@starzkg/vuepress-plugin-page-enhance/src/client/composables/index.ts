import type { CommentPluginFrontmatter } from '../../shared'
import { enableWaline, walineOption } from '../define'

export const resolveEnablePageViews = (
  frontmatter: CommentPluginFrontmatter
): boolean => {
  if (!enableWaline) return false

  const pluginConfig = walineOption.pageviews !== false
  const pageConfig = frontmatter.pageview

  return (
    // Enable in page
    Boolean(pageConfig) ||
    // Enable in plugin and not disable in theme
    (Boolean(pluginConfig) && pageConfig !== false) ||
    // not disabled in anywhere
    (pluginConfig !== false && pageConfig !== false)
  )
}
