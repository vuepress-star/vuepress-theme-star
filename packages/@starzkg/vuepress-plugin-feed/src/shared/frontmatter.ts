import type { BasePageFrontMatter } from '@starzkg/vuepress-shared'
import type { FeedAuthor, FeedCategory, FeedContributor } from './feed'

export interface FeedFrontmatterOption {
  /**
   * Feed title
   */
  title?: string

  /**
   * Feed description
   */
  description?: string

  /**
   * Feed content
   */
  content?: string

  /**
   * Feed author
   */
  author?: FeedAuthor[] | FeedAuthor

  /**
   * Feed contributor
   */
  contributor?: FeedContributor[] | FeedContributor

  /**
   * Feed category
   */
  category?: FeedCategory[] | FeedCategory

  /**
   * @desciption guid should be unique gloably
   */
  guid?: string
}

export interface FeedPluginFrontmatter extends BasePageFrontMatter {
  /**
   * Feed plugin options
   */
  feed?: FeedFrontmatterOption | false
}
