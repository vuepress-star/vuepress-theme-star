import type { Plugin, PluginObject } from '@vuepress/core'
import { logger, path } from '@vuepress/utils'

export interface CnzzAnalyticsPluginOptions {
  id: string
  webId: string
  spa: boolean
}

export const cnzzAnalyticsPlugin: Plugin<CnzzAnalyticsPluginOptions> = (
  { id, webId, spa },
  app
) => {
  const plugin: PluginObject = {
    name: '@starzkg/vuepress-plugin-cnzz-analytics',
  }

  if (!id) {
    logger.warn(`[${plugin.name}] 'id' is required`)
    return plugin
  }

  if (!webId) {
    logger.warn(`[${plugin.name}] 'webId' is required`)
    return plugin
  }

  if (app.env.isDev) {
    return plugin
  }

  return {
    ...plugin,

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),

    define: {
      __CNZZ_ID__: id,
      __CNZZ_WEB_ID__: webId,
      __CNZZ_SPA__: spa !== false,
    },
  }
}
