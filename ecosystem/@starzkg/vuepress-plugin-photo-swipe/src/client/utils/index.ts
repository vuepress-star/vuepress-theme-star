import type { SlideData } from 'photoswipe'

export const getImageInfo = (image: HTMLImageElement): SlideData => ({
  src: image.src,
  width: image.naturalWidth,
  height: image.naturalHeight,
  alt: image.alt,
})

export interface PhotoSwipeImages {
  elements: HTMLImageElement[]
  infos: SlideData[]
}

export const getImages = (selector: string): Promise<PhotoSwipeImages> => {
  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>(selector)
  )

  return Promise.all(
    images.map(
      (image) =>
        new Promise<SlideData>((resolve, reject) => {
          if (image.complete) resolve(getImageInfo(image))
          else {
            image.onload = (): void => resolve(getImageInfo(image))
            image.onerror = (err): void => reject(err)
          }
        })
    )
  ).then((infos) => ({ elements: images, infos }))
}
