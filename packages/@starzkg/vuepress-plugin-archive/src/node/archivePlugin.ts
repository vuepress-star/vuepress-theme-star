import { createPage, Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { prepareArchive } from './prepareArchive'

export interface ArchivePluginOptions {
  excludes: string[]
  defaultTitle: string
}

export const archivePlugin: Plugin<ArchivePluginOptions> = (options) => {
  return {
    define: {
      __EXCLUDES__: options.excludes || [],
      __NO_TITLE__: options.defaultTitle || '',
    },
    onInitialized: async (app) => {
      // 如果主页不存在
      const timeline = await createPage(app, {
        path: '/archive',
        // 设置 frontmatter
        frontmatter: {
          layout: 'Archive',
          slug: 'plugin-archive',
        },
        // 设置 markdown 内容
        content: '',
      })
      // 把它添加到 `app.pages`
      app.pages.push(timeline)
    },
    onPrepared: async (app) =>
      prepareArchive(
        app,
        options.excludes || ['/404.html', '/archive/'],
        options.defaultTitle || 'No Title'
      ),
    name: '@starzkg/vuepress-plugin-archive',
    multiple: false,
    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),
  }
}
