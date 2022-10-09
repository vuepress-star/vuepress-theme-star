import type { PluginFunction } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { CopyCodeOptions } from '../shared/index.js'
import { logger } from './logger.js'

const __dirname = getDirname(import.meta.url)

export const copyCodePlugin =
  (options: CopyCodeOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) {
      logger.info(`Options:\n${JSON.stringify(options, null, '\t')}`)
    }

    return {
      name: '@starkzg/vuepress-plugin-copy-code',

      define: (): Record<string, unknown> => ({
        CODE_COPY_OPTIONS: options,
        CODE_COPY_LOCALES: options.locales || {},
      }),

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
