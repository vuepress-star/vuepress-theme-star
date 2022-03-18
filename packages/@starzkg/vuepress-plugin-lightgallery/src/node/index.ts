import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { useSassPalettePlugin } from 'vuepress-plugin-sass-palette'
import type { LightGalleryOptions } from '../shared'

export * from '../shared'

const lightGalleryPlugin =
  (options: LightGalleryOptions): Plugin =>
  (app) => {
    const lightGalleryOptions = options || {}
    const plugins = lightGalleryOptions.plugins || ['pager', 'share', 'zoom']

    useSassPalettePlugin(app, { id: 'star' })

    return {
      name: '@starzkg/vuepress-plugin-lightgallery',

      define: (): Record<string, unknown> => ({
        IMAGE_SELECTOR:
          lightGalleryOptions.selector ||
          '.theme-default-content :not(a) > img',
        LIGHT_GALLERY_DELAY: lightGalleryOptions.delay || 500,
        LIGHT_GALLERY_OPTIONS: lightGalleryOptions.options || {},
        LIGHT_GALLERY_AUTOPLAY: plugins.includes('autoplay'),
        LIGHT_GALLERY_FULLSCREEN: plugins.includes('fullscreen'),
        LIGHT_GALLERY_PAGER: plugins.includes('pager'),
        LIGHT_GALLERY_THUMBNAIL: plugins.includes('thumbnail'),
        LIGHT_GALLERY_ROTATE: plugins.includes('rotate'),
        LIGHT_GALLERY_SHARE: plugins.includes('share'),
        LIGHT_GALLERY_ZOOM: plugins.includes('zoom'),
      }),

      clientAppRootComponentFiles: path.resolve(
        __dirname,
        '../client/components/LightGallery.js'
      ),
    }
  }

export default lightGalleryPlugin
