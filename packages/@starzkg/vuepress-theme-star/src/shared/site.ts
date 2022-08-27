import type { SiteData } from '@vuepress/client'
import type { ClassificationData } from './classification/index.js'

export interface StarSiteData extends SiteData {
  classifications: ClassificationData
}
