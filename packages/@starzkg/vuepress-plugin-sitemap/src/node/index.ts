import type { Plugin } from '@vuepress/core'
import type { SitemapOptions } from '../shared'
import { generateSiteMap, logger } from './sitemap'

export const sitemapPlugin =
  (options: SitemapOptions = { hostname: 'localhost' }): Plugin =>
  (app) => {
    const hostname = options.hostname

    const plugin = { name: '@starzkg/vuepress-plugin-sitemap' }

    if (!hostname) {
      logger.error("Required 'hostname' option is missing!")

      return plugin
    }

    return {
      ...plugin,

      async onGenerated(): Promise<void> {
        await generateSiteMap(options, app)
      },
    }
  }
