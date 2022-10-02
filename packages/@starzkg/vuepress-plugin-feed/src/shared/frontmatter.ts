import type { Item } from 'feed'

export interface FeedFrontmatter extends Item {
  /**
   * Feed options
   */
  feed?: Item
}
