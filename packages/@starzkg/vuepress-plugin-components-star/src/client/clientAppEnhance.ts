import { defineClientAppEnhance } from '@vuepress/client'
import Badge from './components/Badge.vue'
import CodeGroup from './components/CodeGroup'
import CodeGroupItem from './components/CodeGroupItem.vue'
import GithubCorner from './components/GithubCorner.vue'
import OutboundLink from './components/OutboundLink.vue'
import './styles/index.scss'

export default defineClientAppEnhance(({ app }) => {
  app.component('Badge', Badge)
  app.component('CodeGroup', CodeGroup)
  app.component('CodeGroupItem', CodeGroupItem)
  // wrap the `<GithubCorner />` component with plugin options
  app.component('GithubCorner', GithubCorner)
  // unregister the built-in `<OutboundLink>` to avoid warning
  delete app._context.components.OutboundLink
  // override the built-in `<OutboundLink>`
  app.component('OutboundLink', OutboundLink)
})
