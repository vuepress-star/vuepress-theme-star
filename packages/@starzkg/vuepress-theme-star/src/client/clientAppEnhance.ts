import { defineClientAppEnhance } from '@vuepress/client'
import { h } from 'vue'
import { useScrollPromise } from './composables'
import DocumentHome from './pages/document/Home.vue'
import Document from './pages/document/Page.vue'
import Home from './pages/Home.vue'
import Page from './pages/Page.vue'
import Presentation from './pages/Presentation.vue'
import Profile from './pages/Profile.vue'
import './styles/index.scss'

export default defineClientAppEnhance(({ app, router }) => {
  app.component('Page', Page)
  app.component('Home', Home)
  app.component('Document', Document)
  app.component('DocumentHome', DocumentHome)
  app.component('Presentation', Presentation)
  app.component('Profile', Profile)

  // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
  app.component('NavbarSearch', () => {
    const SearchComponent =
      app.component('Docsearch') || app.component('SearchBox')
    if (SearchComponent) {
      return h(SearchComponent)
    }
    return null
  })

  // handle scrollBehavior with transition
  const scrollBehavior = router.options.scrollBehavior!
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait()
    return scrollBehavior(...args)
  }
})
