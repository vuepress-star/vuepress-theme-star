import { defineClientConfig } from '@vuepress/client'
import { useTagsData } from './composables'

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const tagsData = useTagsData()

    Object.defineProperties(app.config.globalProperties, {
      $tags: {
        get() {
          return tagsData.value
        },
      },
    })
  },
})
