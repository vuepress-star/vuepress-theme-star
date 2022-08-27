import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { AddThisPluginOptions } from '../shared/index.js'

export * from '../shared/index.js'

const addThisPlugin =
  (options: AddThisPluginOptions): Plugin =>
  (app) => {
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
