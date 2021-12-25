import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { AddThisPluginOptions } from '../shared'

export * from '../shared'

const addThisPlugin: Plugin<AddThisPluginOptions> = (options) => {
  if (!options.pubid) {
    console.error('[AddThis]: Please provide a pubid to let plugin work')

    return {
      name: '@starzkg/vuepress-plugin-add-this',
    }
  }

  return {
    name: 'add-this',

    define: {
      PUB_ID: options.pubid,
    },

    globalUIComponents: 'AddThis',

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/AddThis.js'
    ),
  }
}

export default addThisPlugin
