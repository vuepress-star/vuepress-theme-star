import { defineClientConfig } from '@vuepress/client'
import { defineComponent, FunctionalComponent, h, onMounted, VNode } from 'vue'
import Badge from './components/Badge.vue'
import BreadCrumb from './components/BreadCrumb.js'
import ExternalLink from './components/ExternalLink.vue'
// import ExternalLinkIcon from './components/ExternalLinkIcon.vue'
import ScreenFull from './components/Fullscreen.js'
import { Suspension } from './components/index.js'
import Pagination from './components/Pagination.vue'
import {
  setupDarkMode,
  setupNavbar,
  setupSidebar,
  setupSidebarItems,
  setupUserAgent,
  useScrollPromise,
} from './composables/index.js'
import './styles/index.scss'
import layouts from './layouts/index.js'
import {
  Document,
  DocumentHome,
  Home,
  Page,
  Presentation,
  Profile,
} from './pages/index.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_SSR__: boolean

export default defineClientConfig({
  enhance: ({ app, router }) => {
    app.component('Page', Page)
    app.component('Home', Home)
    app.component('Document', Document)
    app.component('DocumentHome', DocumentHome)
    app.component('Presentation', Presentation)
    app.component('Profile', Profile)

    app.component('Badge', Badge)
    // app.component('ExternalLinkIcon', ExternalLinkIcon)
    app.component('ExternalLink', ExternalLink)
    app.component('BreadCrumb', BreadCrumb)
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

    // compat with
    // @starzkg/vuepress-plugin-giscus-comment
    // @starzkg/vuepress-plugin-twikoo-comment
    // @starzkg/vuepress-plugin-waline-comment
    app.component(
      'Comment',
      defineComponent({
        name: 'Comment',
        props: {
          darkMode: Boolean,
        },
        setup: (props) => {
          const CommentComponent: FunctionalComponent = (props) => {
            const comment =
              app.component('GiscusComment') ||
              app.component('TwikooComment') ||
              app.component('WalineComment')
            return comment ? h(h(comment), props) : null
          }

          return (): VNode | null =>
            h(
              'div',
              {
                class: {
                  'comment-wrapper': true,
                },
              },
              h(CommentComponent, { darkmode: props.darkMode })
            )
        },
      })
    )

    router.beforeEach((to, from, next) => {
      if (__VUEPRESS_SSR__) {
        next()
      }
      // same path no route
      if (to.fullPath !== from.fullPath) {
        next()
      }
    })

    // handle scrollBehavior with transition
    const scrollBehavior = router.options.scrollBehavior!
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait()
      return scrollBehavior(...args)
    }
  },

  setup() {
    setupUserAgent()
    setupDarkMode()
    setupSidebarItems()
    setupNavbar()
    setupSidebar()

    onMounted(() => {
      console.log(
        '%c vuepress-theme-star %c by starzkg',
        'font-weight: bold;color: white;display: inline-block;text-align: center;height: 1rem;line-height: 1rem;background-color: rgba(255,202,212,.8);padding: 10px;border-bottom-left-radius: 13px;border-top-left-radius: 12px;',
        'font-weight: bold;color: white;display: inline-block;text-align: center;height: 1rem;line-height: 1rem;background-color: rgba(178,247,239,.85);padding: 10px;border-bottom-right-radius: 13px;border-top-right-radius: 12px;'
      )
      console.log(
        '想要了解更多，请点击：https://github.com/vuepress-star/vuepress-theme-star'
      )
    })
  },

  rootComponents: [Suspension],

  layouts,
})
