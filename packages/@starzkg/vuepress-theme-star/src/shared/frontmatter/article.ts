import type { NavLink } from '../nav.js'
import type { StarThemePageFrontmatter } from './frontmatter.js'

export interface StarThemeArticlePageFrontmatter
  extends StarThemePageFrontmatter {
  type?: 'reprint' | 'origin' | 'translation'
  origin?: string
  editLink?: boolean
  editLinkPattern?: string
  lastUpdated?: boolean
  contributors?: boolean
  sidebarDepth?: number
  prev?: string | NavLink
  next?: string | NavLink
}
