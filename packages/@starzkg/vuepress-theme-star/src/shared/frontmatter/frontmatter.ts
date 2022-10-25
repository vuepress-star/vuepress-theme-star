import type { SidebarConfig } from '../nav.js'

export interface StarPageFrontmatter {
  title?: string
  icon?: string
  excerpt?: string
  navbar?: boolean
  sidebar?: 'auto' | false | SidebarConfig
  page?: string
  pageClass?: string
  author?: string
  email?: string
  license?: string
  copyright?: string
  footer?: string
}
