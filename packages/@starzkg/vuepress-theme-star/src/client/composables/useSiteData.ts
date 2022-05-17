import { useSiteData as _useSiteData } from '@vuepress/client'
import { computed, ComputedRef } from 'vue'
import { StarSiteData } from '../../shared'

declare type StarSiteDataRef = ComputedRef<StarSiteData>

declare const __SITE_DATA__: StarSiteData

export const useSiteData = (): StarSiteDataRef => {
  return computed(() => {
    Object.assign(__SITE_DATA__, _useSiteData().value)
    return __SITE_DATA__
  })
}
