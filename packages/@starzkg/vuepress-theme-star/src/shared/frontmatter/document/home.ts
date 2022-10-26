import type { StarPageFrontmatter } from '../frontmatter.js'

export interface StarDocumentHomePageFrontmatter extends StarPageFrontmatter {
  home: true
  heroImage?: string
  heroImageDark?: string
  heroAlt?: string
  heroHeight?: number
  heroText?: string | null
  tagline?: string | null
  actions?: {
    text: string
    link: string
    type?: 'primary' | 'secondary'
  }[]
  features?: {
    title: string
    details: string
  }[]
  footer?: string
  footerHtml?: boolean
}
