import type { StarThemePageFrontmatter } from './page'

export interface StarThemeHomePageFrontmatter extends StarThemePageFrontmatter {
  heroImage?: string
  heroImageDark?: string
  heroAlt?: string
  heroText?: string | null
  tagline?: string | null
  navbar?: boolean
  actions?: {
    text: string
    link: string
    type?: 'primary' | 'secondary'
  }[]
  links?: {
    text: string
    icon: string
    url: string
  }[]
  features?: {
    title: string
    details: string
  }[]
  footer?: string
  footerHtml?: boolean
}
