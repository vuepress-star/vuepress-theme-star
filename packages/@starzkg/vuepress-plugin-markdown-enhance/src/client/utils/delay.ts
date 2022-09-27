declare const MARKDOWN_ENHANCE_DELAY: number
export const delay = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY))
