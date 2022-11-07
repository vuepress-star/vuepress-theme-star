import type { PhotoSwipeOptions } from 'photoswipe'

declare const IMAGE_SELECTOR: string
declare const PHOTOSWIPE_DELAY: number
declare const PHOTOSWIPE_OPTIONS: PhotoSwipeOptions
declare const PHOTOSWIPE_I18N: Record<
  string,
  {
    /**
     * arrowPrev button title
     */
    arrowPrevTitle: string

    /**
     * arrowNext button title
     */
    arrowNextTitle: string

    /**
     * close button title
     */
    closeTitle: string

    /**
     * download button title
     */
    downloadTitle: string

    /**
     * fullscreen button title
     */
    fullscreenTitle: string

    /**
     * zoom button title
     */
    zoomTitle: string
  }
>

export const imageSelector = IMAGE_SELECTOR

export const locales = PHOTOSWIPE_I18N

export const delay = PHOTOSWIPE_DELAY

export const options = PHOTOSWIPE_OPTIONS
