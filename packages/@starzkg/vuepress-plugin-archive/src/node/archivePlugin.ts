import { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { prepareArchive } from './prepareArchive'

export interface ArchivePluginOptions {
  excludes: string[]
  defaultTitle: string
}

export const archivePlugin: Plugin<ArchivePluginOptions> = (options) => {
  return {
    onPrepared: async (app) =>
      prepareArchive(
        app,
        options.excludes || ['/404.html', '/archive/'],
        options.defaultTitle || 'No Title'
      ),
    name: '@starzkg/vuepress-plugin-archive',
    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
  }
}
