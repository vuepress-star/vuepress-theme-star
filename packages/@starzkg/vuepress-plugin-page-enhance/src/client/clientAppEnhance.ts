import { defineClientAppEnhance } from '@vuepress/client'
import Comment from './components/Comment'
import PageInfo from './components/PageInfo'
import PageTitle from './components/PageTitle'

import './styles/index.scss'

export default defineClientAppEnhance(({ app }) => {
  app.component('PageTitle', PageTitle)
  app.component('PageInfo', PageInfo)
  app.component('Comment', Comment)
})
