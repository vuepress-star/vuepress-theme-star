import copy from 'copy-to-clipboard'

export interface CopyToClipboardOptions {
  message?: string
  format?: string // MIME type
  // eslint-disable-next-line @typescript-eslint/ban-types
  onCopy?: (clipboardData: object) => void
}

declare const __VUEPRESS_DEV__: boolean

export const useCopyToClipboard = async (
  text: string,
  options?: CopyToClipboardOptions
): Promise<void> => {
  try {
    return navigator.clipboard.writeText(text)
  } catch {
    copy(text, {
      debug: __VUEPRESS_DEV__,
      ...options,
    })
  }
}
