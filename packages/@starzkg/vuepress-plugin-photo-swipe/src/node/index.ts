import { getLocales } from '@starzkg/vuepress-shared'
import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { useSassPalettePlugin } from 'vuepress-plugin-sass-palette'
import type { PhotoSwipeOptions } from '../shared'
import { i18n } from './i18n'

export type { PhotoSwipeOptions } from '../shared'

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

      clientAppRootComponentFiles: path.resolve(
        __dirname,
        '../client/components/PhotoSwipe.vue'
      ),
    }
  }
