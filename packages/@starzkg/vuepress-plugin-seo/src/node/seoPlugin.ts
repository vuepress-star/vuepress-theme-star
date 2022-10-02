import type { Plugin } from '@vuepress/core'
import { isLinkHttp, removeEndingSlash } from '@vuepress/shared'
import type { SeoPage, SeoPluginOptions } from '../shared/index.js'
import { logger } from './logger.js'
import { generateRobotsTxt, generateSeo } from './seo.js'

export const seoPlugin =
  (options: SeoPluginOptions): Plugin =>
  (app) => {
    const plugin = { name: '@starzkg/vuepress-plugin-seo' }

    if (!options.hostname) {
      logger.warn(`[${plugin.name}] Option 'hostname' is required!`)
      return plugin
    }

    options.hostname = isLinkHttp(options.hostname)
      ? removeEndingSlash(options.hostname)
      : `https://${removeEndingSlash(options.hostname)}`

    return {
      ...plugin,

      extendsPage(page: SeoPage, app): void {
        generateSeo(app, page, options)
      },

      async onGenerated(): Promise<void> {
        await generateRobotsTxt(app.dir)
      },
    }
  }
