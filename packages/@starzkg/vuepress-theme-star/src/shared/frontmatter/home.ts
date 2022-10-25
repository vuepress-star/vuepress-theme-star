import type { StarPageFrontmatter } from './frontmatter.js'

export interface StarThemeHomePageFrontmatter extends StarPageFrontmatter {
  heroImage?: string
  heroImageDark?: string
  heroAlt?: string
  heroHeight?: number
  heroText?: string | null
  tagline?: string | null
  slogan?: string | string[]
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
    icon: string
    details: string
  }[]
}
