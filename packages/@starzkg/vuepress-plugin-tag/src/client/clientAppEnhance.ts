import { defineClientAppEnhance } from '@vuepress/client'
import { useTagsData } from './composables'

export default defineClientAppEnhance(({ app, router }) => {
  const tagsData = useTagsData()

  Object.defineProperties(app.config.globalProperties, {
    $tags: {
      get() {
        return tagsData.value
      },
    },
  })
})
