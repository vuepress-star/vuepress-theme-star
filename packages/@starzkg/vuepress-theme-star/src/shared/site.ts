import type { SiteData } from '@vuepress/client'
import type { ClassificationData } from './classification'

export interface StarSiteData extends SiteData {
  classifications: ClassificationData
}
