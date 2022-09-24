import type { App } from '@vuepress/core'
import { prepareSiteData } from './prepare/index.js'

export const onPrepared = async (app: App): Promise<void> => {
  // extend site data
  await prepareSiteData(app)
}
