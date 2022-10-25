import type { PageFrontmatterRef } from '@vuepress/client'
import { usePageFrontmatter as _usePageFrontmatter } from '@vuepress/client'
import type { StarPageFrontmatter } from '../../shared/index.js'

export const usePageFrontmatter = (): PageFrontmatterRef<StarPageFrontmatter> =>
  _usePageFrontmatter<StarPageFrontmatter>()
