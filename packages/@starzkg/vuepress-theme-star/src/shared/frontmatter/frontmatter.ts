import type { SidebarConfig } from '../nav.js'

export interface StarThemePageFrontmatter {
  navbar?: boolean
  sidebar?: 'auto' | false | SidebarConfig
  page?: string
  pageClass?: string
  license?: string
  copyright?: string
  footer?: string
}
