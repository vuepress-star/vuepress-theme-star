import type { App } from '@vuepress/core'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { shikiPlugin } from '@vuepress/plugin-shiki'

const isProd = process.env.NODE_ENV === 'production'

export const useHighlightPlugin = (
  app: App,
  options: 'prismjs' | 'shiki' | 'auto'
): void => {
  if (options === 'prismjs') {
    app.use(prismjsPlugin())
  } else if (options === 'shiki') {
    app.use(shikiPlugin())
  } else if (options === 'auto') {
    app.use(isProd ? shikiPlugin({ theme: 'dark-plus' }) : prismjsPlugin())
  }
}
