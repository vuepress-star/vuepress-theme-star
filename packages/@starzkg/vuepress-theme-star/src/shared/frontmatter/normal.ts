import type { NavLink } from '../nav.js'
import type { StarPageFrontmatter } from './frontmatter.js'

export interface StarThemeNormalPageFrontmatter extends StarPageFrontmatter {
  type?: 'reprint' | 'origin' | 'translation'
  origin?: string
  editLink?: boolean
  editLinkPattern?: string
  lastUpdated?: boolean
  contributors?: boolean
  sidebarDepth?: number
  prev?: string | NavLink
  next?: string | NavLink

  /**
   * breadcrumb.
   *
   * 面包屑
   */
  breadcrumb?: boolean

  /**
   * breadcrumb icon.
   *
   * 面包屑图标
   */
  breadcrumbIcon?: boolean
}
