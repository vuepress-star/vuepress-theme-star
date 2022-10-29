import type { App } from '@vuepress/core'
import { prepareBreadcrumb, prepareSiteData } from './prepare/index.js'

export const onPrepared = async (app: App): Promise<void> => {
  // override site data
  await prepareSiteData(app)
  // prepare breadcrumb
  await prepareBreadcrumb(app)
}
