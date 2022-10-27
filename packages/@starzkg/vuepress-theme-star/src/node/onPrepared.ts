import type { App } from '@vuepress/core'
import {
  prepareArticle,
  prepareBreadcrumb,
  prepareSiteData,
  prepareTimeline,
} from './prepare/index.js'

export const onPrepared = async (app: App): Promise<void> => {
  // extend site data
  await prepareSiteData(app)
  // prepare breadcrumb
  await prepareBreadcrumb(app)
  // prepare article
  await prepareArticle(app)
  // prepare timeline
  await prepareTimeline(app)
}
