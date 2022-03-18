import { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { prepareArchive } from './prepareArchive'

export interface ArchivePluginOptions {
  excludes: string[]
  defaultTitle: string
}

export const archivePlugin =
  (options?: ArchivePluginOptions): Plugin =>
  (app) => {
    const archiveOptions = options || ({} as ArchivePluginOptions)
    return {
      onPrepared: async (app) =>
        prepareArchive(
          app,
          archiveOptions.excludes || ['/404.html', '/archive/'],
          archiveOptions.defaultTitle || 'No Title'
        ),
      name: '@starzkg/vuepress-plugin-archive',
      clientAppEnhanceFiles: path.resolve(
        __dirname,
        '../client/clientAppEnhance.js'
      ),
    }
  }
