import { SiteData } from '@vuepress/client'
import { ClassificationData } from './classification'

export interface StarSiteData extends SiteData {
  classifications: ClassificationData
}
