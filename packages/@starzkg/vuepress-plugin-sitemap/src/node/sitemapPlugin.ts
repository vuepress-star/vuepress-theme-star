import type { Plugin } from '@vuepress/core'
import { removeEndingSlash } from '@vuepress/shared'
import type { SitemapOptions } from '../shared/index.js'
import { logger } from './logger.js'
import { generateSiteMap } from './sitemap.js'

export const sitemapPlugin =
  (options: SitemapOptions = { hostname: 'localhost' }): Plugin =>
  (app) => {
    const plugin = {
      name: '@starkzg/vuepress-plugin-sitemap',
    }

    if (!options.hostname) {
      logger.warn(`[${plugin.name}] Option 'hostname' is required!`)
      return plugin
    }

    options.hostname = removeEndingSlash(options.hostname)

    return {
      ...plugin,

      onGenerated: async (app) => {
        await generateSiteMap(app, options)
      },
    }
  }
