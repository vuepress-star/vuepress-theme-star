import { defineClientAppEnhance } from '@vuepress/client'
import { useArchive } from './composables'

export default defineClientAppEnhance(({ app, router }) => {
  const archive = useArchive()

  Object.defineProperties(app.config.globalProperties, {
    $archive: {
      get() {
        return archive.value
      },
    },
  })
})
