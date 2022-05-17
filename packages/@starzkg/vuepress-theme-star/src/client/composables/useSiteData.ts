import { siteData as siteDataRaw } from '@internal/siteData'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { StarSiteData } from '../../shared'

declare const __VUE_HMR_RUNTIME__: Record<string, any>

export type SiteDataRef<T extends StarSiteData = StarSiteData> = Ref<T>

export const siteData: SiteDataRef = ref(siteDataRaw)

export const useSiteData = <
  T extends StarSiteData = StarSiteData
>(): SiteDataRef<T> => siteData as SiteDataRef<T>

if (import.meta.webpackHot || import.meta.hot) {
  __VUE_HMR_RUNTIME__.updateSiteData = (data: StarSiteData) => {
    siteData.value = data
  }
}
