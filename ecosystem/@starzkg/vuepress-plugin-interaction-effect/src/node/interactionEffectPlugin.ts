import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const interactionEffectPlugin = (): Plugin => ({
  name: '@starzkg/vuepress-plugin-interaction-effect',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
