import type { App } from '@vuepress/core'

export const onWatched = async (app: App): Promise<void> => {
  console.log('done')
}
