import type { Plugin, PluginObject } from '@vuepress/core'
import { getDirname, logger, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @starzkg/vuepress-plugin-baidu-analytics
 */
export interface BaiduAnalyticsPluginOptions {
  /**
   * The Measurement ID of Baidu Analytics.
   */
  id: string
  /**
   * Open SPA
   */
  spa: boolean
}

export const baiduAnalyticsPlugin =
  ({ id, spa }: BaiduAnalyticsPluginOptions): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: '@starzkg/vuepress-plugin-baidu-analytics',
    }

    if (!id) {
      logger.warn(`[${plugin.name}] 'id' is required`)
      return plugin
    }

    if (app.env.isDev) {
      return plugin
    }

    return {
      ...plugin,

      define: {
        __BAIDU_ID__: id,
        __BAIDU_SPA__: spa,
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
