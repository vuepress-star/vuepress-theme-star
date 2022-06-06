import type { NavLink, SidebarConfig } from '../nav'
import type { StarThemePageFrontmatter } from './page'

export interface StarThemeNormalPageFrontmatter
  extends StarThemePageFrontmatter {
  navbar?: boolean
  sidebar?: 'auto' | false | SidebarConfig
  editLink?: boolean
  editLinkPattern?: string
  lastUpdated?: boolean
  contributors?: boolean
  sidebarDepth?: number
  prev?: string | NavLink
  next?: string | NavLink
}
