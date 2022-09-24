import type { App } from '@vuepress/core'

export const onGenerated = async (app: App): Promise<void> => {
  console.log('done')
}
