import { defineClientAppEnhance } from '@vuepress/client'
import CodeGroup from './code-group/components/CodeGroup'
import CodeGroupItem from './code-group/components/CodeGroupItem.vue'
import './code-group/styles/index.scss'

export default defineClientAppEnhance(({ app, router }) => {
  app.component('CodeGroup', CodeGroup)
  app.component('CodeGroupItem', CodeGroupItem)
})
