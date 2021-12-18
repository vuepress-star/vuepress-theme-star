import copy from 'copy-to-clipboard'

interface Options {
  message?: string
  format?: string // MIME type
  // eslint-disable-next-line @typescript-eslint/ban-types
  onCopy?: (clipboardData: object) => void
}

export const useCopyToClipboard = (text: string, options?: Options): void => {
  copy(text, {
    debug: __VUEPRESS_DEV__,
    ...options,
  })
}
