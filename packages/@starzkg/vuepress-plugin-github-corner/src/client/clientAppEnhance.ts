import { defineClientAppEnhance } from '@vuepress/client'
import GithubCorner from './components/GithubCorner.vue'
import './styles/github-corner.scss'

export default defineClientAppEnhance(({ app }) => {
  // wrap the `<GithubCorner />` component with plugin options
  app.component('GithubCorner', GithubCorner)
})
