import type { NavLink } from '../nav.js'
import type { StarPageFrontmatter } from './frontmatter.js'

export interface StarThemeArticlePageFrontmatter extends StarPageFrontmatter {
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
