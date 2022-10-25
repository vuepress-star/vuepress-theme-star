import type { PageDataRef } from '@vuepress/client'
import { usePageData as _usePageData } from '@vuepress/client'
import type { StarPageData } from '../../shared/index.js'

export const usePageData = (): PageDataRef<StarPageData> =>
  _usePageData<StarPageData>()
