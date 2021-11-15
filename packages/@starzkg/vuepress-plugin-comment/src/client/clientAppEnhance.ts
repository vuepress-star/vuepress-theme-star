import { defineClientAppEnhance } from '@vuepress/client'
import Comment from './components/Comment'

import './styles/index.scss'

export default defineClientAppEnhance(({ app }) => {
  // eslint-disable-next-line vue/multi-word-component-names
  app.component('Comment', Comment)
})
