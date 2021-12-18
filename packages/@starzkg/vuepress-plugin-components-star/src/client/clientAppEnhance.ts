import * as Icons from '@starzkg/vuepress-icons'
import * as SocialIcons from '@starzkg/vuepress-social-icons'
import { defineClientAppEnhance } from '@vuepress/client'
import Badge from './components/Badge.vue'
import BreadCrumb from './components/BreadCrumb'
import CodeGroup from './components/CodeGroup'
import CodeGroupItem from './components/CodeGroupItem.vue'
import ExternalLink from './components/ExternalLink.vue'
import ExternalLinkIcon from './components/ExternalLinkIcon.vue'
import GithubCorner from './components/GithubCorner.vue'
import Pagination from './components/Pagination.vue'
import ScreenFull from './components/ScreenFull'
import './styles/index.scss'

export default defineClientAppEnhance(({ app }) => {
  app.component('Badge', Badge)
  app.component('CodeGroup', CodeGroup)
  app.component('CodeGroupItem', CodeGroupItem)
  // wrap the `<GithubCorner />` component with plugin options
  app.component('GithubCorner', GithubCorner)
  // override the `<ExternalLinkIcon>` provided by @vuepress/plugin-external-link-icon
  delete app._context.components.ExternalLinkIcon
  app.component('ExternalLinkIcon', ExternalLinkIcon)
  app.component('ExternalLink', ExternalLink)
  app.component('BreadCrumb', BreadCrumb)
  app.component('Pagination', Pagination)
  app.component('ScreenFull', ScreenFull)
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
})
