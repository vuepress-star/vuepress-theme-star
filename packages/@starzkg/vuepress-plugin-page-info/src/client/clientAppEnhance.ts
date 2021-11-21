import { defineClientAppEnhance } from '@vuepress/client'
import PageInfo from './components/PageInfo'

import './styles/index.scss'

export default defineClientAppEnhance(({ app }) => {
  app.component('PageInfo', PageInfo)
})