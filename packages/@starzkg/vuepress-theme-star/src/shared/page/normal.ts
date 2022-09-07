import type { NavLink } from '../nav.js'
import type { StarThemePageFrontmatter } from './page.js'

export interface StarThemeNormalPageFrontmatter
  extends StarThemePageFrontmatter {
  editLink?: boolean
  editLinkPattern?: string
  lastUpdated?: boolean
  contributors?: boolean
  sidebarDepth?: number
  prev?: string | NavLink
  next?: string | NavLink
}
