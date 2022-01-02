import { defineClientAppEnhance } from '@vuepress/client'
import Archive from './components/Archive.vue'
import './styles/index.scss'
import { useArchive } from './composables'

export default defineClientAppEnhance(({ app, router }) => {
  app.component('Archive', Archive)

  const archive = useArchive()

  Object.defineProperties(app.config.globalProperties, {
    $archive: {
      get() {
        return archive.value
      },
    },
  })
})
