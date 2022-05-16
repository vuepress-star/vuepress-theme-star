import { defineClientConfig } from '@vuepress/client'
import { useArchive } from './composables'

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const archive = useArchive()

    Object.defineProperties(app.config.globalProperties, {
      $archive: {
        get() {
          return archive.value
        },
      },
    })
  },
})
