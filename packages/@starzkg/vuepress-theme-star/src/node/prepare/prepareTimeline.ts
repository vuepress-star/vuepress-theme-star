import { dayjs } from '@starzkg/vuepress-star-shared'
import type { App } from '@vuepress/core'
import type { StarPage } from '../../shared/index.js'
import { isArticle } from '../../shared/utils/index.js'

export const prepareTimeline = async (app: App): Promise<void> => {
  const timeline = app.pages.reduce((result, page: StarPage, index) => {
    if (!isArticle(page)) {
      return result
    }
    const date = dayjs(page.date || page.data.git?.createdTime)
    const year = date.year()
    const month = date.month()
    const day = date.day()
    result[year] = result[year] || {}
    result[year][month] = result[year][month] || {}
    result[year][month][day] = result[year][month][day] || []
    result[year][month][day].push({
      title: page.title,
      icon: page.icon,
      path: page.path,
      date: date.format('YYYY-MM-DD'),
      time: page.data.git?.createdTime,
      excerpt: page.excerpt,
    })
    return result
  }, {})

  const content = `\
export const timeline = ${JSON.stringify(timeline, null, 2)}
`

  await app.writeTemp('internal/timeline.js', content)
}
