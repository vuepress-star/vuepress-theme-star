import { defineClientConfig } from '@vuepress/client'
import Comment from './components/Comment'
import PageInfo from './components/PageInfo'
import PageTitle from './components/PageTitle'

import './styles/index.scss'

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('PageTitle', PageTitle)
    app.component('PageInfo', PageInfo)
    app.component('Comment', Comment)
  },
})
