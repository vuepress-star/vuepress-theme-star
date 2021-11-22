import { defineClientAppEnhance } from '@vuepress/client'
import Comment from './components/Comment'
import PageInfo from './components/PageInfo'

import './styles/index.scss'

export default defineClientAppEnhance(({ app }) => {
  app.component('PageInfo', PageInfo)
  app.component('Comment', Comment)
})
