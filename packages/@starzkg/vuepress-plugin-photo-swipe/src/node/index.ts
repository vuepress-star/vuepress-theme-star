import { getLocales } from '@starzkg/vuepress-shared'
import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import { useSassPalettePlugin } from 'vuepress-plugin-sass-palette'
import type { PhotoSwipeOptions } from '../shared/index.js'
import { i18n } from './i18n.js'

const __dirname = getDirname(import.meta.url)

export type { PhotoSwipeOptions } from '../shared/index.js'

export const photoSwipePlugin =
  (options: PhotoSwipeOptions = {}): Plugin =>
  (app) => {
    const photoSwipeOptions = options || {}

    useSassPalettePlugin(app, { id: 'star' })

    return {
      name: '@starzkg/vuepress-plugin-photo-swipe',

      define: (): Record<string, unknown> => ({
        IMAGE_SELECTOR:
          photoSwipeOptions.selector || '.theme-default-content :not(a) > img',
        PHOTOSWIPE_DELAY: photoSwipeOptions.delay || 500,
        PHOTOSWIPE_OPTIONS: photoSwipeOptions.options || {},
        PHOTOSWIPE_I18N: getLocales({
          app,
          name: 'photo-swipe',
          default: i18n,
          config: photoSwipeOptions.locale,
        }),
      }),

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
