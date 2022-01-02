import { defineClientAppEnhance } from '@vuepress/client'
import Archive from './components/Archive.vue'
import { useArchive } from './composables'
import './styles/index.scss'

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
