import { defineClientAppEnhance } from '@vuepress/client'
import { useBaiduAnalytics } from './composables'

declare const __BAIDU_ID__: string
declare const __BAIDU_SPA__: boolean
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const _hmt: any

export default defineClientAppEnhance(({ router }) => {
  if (__VUEPRESS_SSR__) return
  useBaiduAnalytics(__BAIDU_ID__)
  if (__BAIDU_SPA__) {
    router.beforeEach((to) => {
      if (typeof _hmt !== 'undefined') {
        // eslint-disable-next-line no-undef
        _hmt.push(['_trackPageview', to.fullPath])
      }
    })
  }
})
