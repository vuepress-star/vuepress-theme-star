import * as Icons from '@starzkg/vuepress-icons'
import * as SocialIcons from '@starzkg/vuepress-social-icons'
import { defineClientConfig } from '@vuepress/client'
import { h } from 'vue'
import { BackToTop } from './components'
import Badge from './components/Badge.vue'
import BreadCrumb from './components/BreadCrumb'
import ExternalLink from './components/ExternalLink.vue'
import ExternalLinkIcon from './components/ExternalLinkIcon.vue'
import GithubCorner from './components/GithubCorner.vue'
import Pagination from './components/Pagination.vue'
import ScreenFull from './components/ScreenFull'
import {
  setupDarkMode,
  setupSidebarItems,
  useScrollPromise,
} from './composables'
import './styles/index.scss'
import CodeGroup from './containers/code-group/components/CodeGroup'
import CodeGroupItem from './containers/code-group/components/CodeGroupItem.vue'
import DocumentHome from './pages/document/components/Home.vue'
import Document from './pages/document/components/Page.vue'
import Home from './pages/Home.vue'
import Page from './pages/Page.vue'
import Presentation from './pages/presentation/components/Presentation.vue'
import Profile from './pages/profile/components/Profile.vue'

export default defineClientConfig({
  enhance({ app, router }) {
    app.component('Page', Page)
    app.component('Home', Home)
    app.component('Document', Document)
    app.component('DocumentHome', DocumentHome)
    app.component('Presentation', Presentation)
    app.component('Profile', Profile)

    app.component('CodeGroup', CodeGroup)
    app.component('CodeGroupItem', CodeGroupItem)

    // icon
    for (const icon in Icons) {
      // eslint-disable-next-line import/namespace
      app.component('Icon' + icon, Icons[icon])
    }
    // social icon
    for (const icon in SocialIcons) {
      // eslint-disable-next-line import/namespace
      app.component('IconSocial' + icon, SocialIcons[icon])
    }

    app.component('Badge', Badge)
    app.component('ExternalLinkIcon', ExternalLinkIcon)
    app.component('ExternalLink', ExternalLink)
    app.component('BreadCrumb', BreadCrumb)
    app.component('GithubCorner', GithubCorner)
    app.component('Pagination', Pagination)
    app.component('ScreenFull', ScreenFull)

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
  },

  setup() {
    setupDarkMode()
    setupSidebarItems()
  },

  rootComponents: [BackToTop],
})
