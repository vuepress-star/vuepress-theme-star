import {
  useSiteData as _useSiteData,
  useSiteLocaleData as _useSiteLocaleData,
} from '@vuepress/client'
import type { ComputedRef, Ref } from 'vue'
import type { StarSiteData, StarSiteLocaleData } from '../../shared/index.js'

/**
 * Ref wrapper of `StarSiteData`
 */
export type StarSiteDataRef = Ref<StarSiteData>

/**
 * Returns the ref of the site data
 */
export const useSiteData = (): StarSiteDataRef =>
  _useSiteData() as unknown as StarSiteDataRef

/**
 * Ref wrapper of `SiteLocaleData`
 */
export type StarSiteLocaleDataRef = ComputedRef<StarSiteLocaleData>

/**
 * Returns the ref of the site data of current locale
 */
export const useSiteLocaleData = (): StarSiteLocaleDataRef => {
  return _useSiteLocaleData() as unknown as StarSiteLocaleDataRef
}
