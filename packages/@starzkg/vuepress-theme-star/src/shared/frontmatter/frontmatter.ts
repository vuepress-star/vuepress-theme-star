import type { SidebarConfig } from '../nav.js'

export interface StarPageFrontmatter {
  title?: string
  icon?: string
  excerpt?: string
  top?: boolean
  themeClass?: string
  page?: string
  pageClass?: string
  aside?: boolean
  navbar?: boolean
  sidebar?: 'auto' | false | SidebarConfig
  archive?: string
  author?: string
  email?: string
  license?: string
  copyright?: string
  footer?: string
}
