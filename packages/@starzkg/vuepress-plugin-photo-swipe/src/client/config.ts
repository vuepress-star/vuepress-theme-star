import { defineClientConfig } from '@vuepress/client'
import PhotoSwipe from './components/PhotoSwipe.vue'

export default defineClientConfig({
  rootComponents: [PhotoSwipe],
})
