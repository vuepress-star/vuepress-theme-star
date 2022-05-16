import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const interactionEffectPlugin = (): Plugin => ({
  name: '@starzkg/vuepress-plugin-interaction-effect',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
