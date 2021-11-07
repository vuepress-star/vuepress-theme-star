import { NavLink, SidebarConfig } from '../nav'
import { StarThemePageFrontmatter } from './page'

export interface StarThemeNormalPageFrontmatter
  extends StarThemePageFrontmatter {
  home?: false
  editLink?: boolean
  editLinkPattern?: string
  lastUpdated?: boolean
  contributors?: boolean
  sidebar?: 'auto' | false | SidebarConfig
  sidebarDepth?: number
  prev?: string | NavLink
  next?: string | NavLink
}
