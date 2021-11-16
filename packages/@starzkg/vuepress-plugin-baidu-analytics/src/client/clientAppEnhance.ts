import { defineClientAppEnhance } from '@vuepress/client'
import { useBaiduAnalytics } from './composables'

declare const __BAIDU_ID__: string

const id = __BAIDU_ID__

export default defineClientAppEnhance(() => {
  if (__VUEPRESS_SSR__) return
  useBaiduAnalytics(id)
})
