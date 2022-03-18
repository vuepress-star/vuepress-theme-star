import { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { prepareTags } from './prepareTags'

export const tagPlugin: Plugin = () => {
  return {
    onPrepared: async (app) => prepareTags(app),
    name: '@starzkg/vuepress-plugin-tag',
    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
  }
}
