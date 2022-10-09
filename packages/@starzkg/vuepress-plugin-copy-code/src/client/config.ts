import { defineClientConfig } from '@vuepress/client'
import { setupCopyCode } from './composables/index.js'

import 'balloon-css/balloon.css'
import './styles/index.scss'

export default defineClientConfig({
  setup: () => {
    setupCopyCode()
  },
})
