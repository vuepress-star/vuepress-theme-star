import type { Page, Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { CopyrightOptions } from '../shared/index.js'
import { logger } from './logger.js'

const __dirname = getDirname(import.meta.url)

export const copyrightPlugin =
  (options: CopyrightOptions): Plugin =>
  (app) => {
    if (app.env.isDebug) {
      logger.info(`Options:\n${JSON.stringify(options, null, '\t')}`)
    }

    const {
      selector = '#app',
      copy = true,
      selection = true,
      triggerWords = 100,
      copyright = 'auto',
    } = options

    return {
      name: '@starzkg/vuepress-plugin-copyright',

      define: (): Record<string, unknown> => ({
        COPYRIGHT_SELECTOR: selector,
        COPYRIGHT_COPY: copy,
        COPYRIGHT_SELECTION: selection,
        COPYRIGHT_TRIGGER_WORDS: triggerWords,
      }),

      extendsPage: (page: Page<{ copyright?: string }>, app): void => {
        if (copyright === 'auto') {
          page.data.copyright = ''
        } else if (typeof copyright === 'function') {
          page.data.copyright = copyright(page)
        } else {
          page.data.copyright = copyright
        }
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
