import type { SiteData } from '@vuepress/client'
import type { ClassificationData } from './classification/index.js'

/**
 * Vuepress star site data
 */
export interface StarSiteData extends SiteData {
  classifications: ClassificationData
}

/**
 * Vuepress star site data of current locale
 */
export type StarSiteLocaleData = StarSiteData
