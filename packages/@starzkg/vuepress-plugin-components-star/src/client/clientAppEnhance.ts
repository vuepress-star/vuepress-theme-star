import { defineClientAppEnhance } from '@vuepress/client'
import BackToTop from './components/BackToTop'
import GithubCorner from './components/GithubCorner.vue'
import './styles/index.scss'

export default defineClientAppEnhance(({ app }) => {
  // wrap the `<GithubCorner />` component with plugin options
  app.component('GithubCorner', GithubCorner)
  app.component('BackToTop', BackToTop)
})
