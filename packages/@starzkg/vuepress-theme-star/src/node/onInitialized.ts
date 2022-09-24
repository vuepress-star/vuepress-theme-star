import type { App } from '@vuepress/core'
import { prepareBreadcrumb } from './prepare/index.js'

export const onInitialized = async (app: App): Promise<void> => {
  // prepare breadcrumb
  await prepareBreadcrumb(app)
}
