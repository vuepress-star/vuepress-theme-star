import { dayjs } from '@starzkg/vuepress-star-shared'
import type { App } from '@vuepress/core'
import type { StarPage } from '../../shared/index.js'
import { isArticle } from '../../shared/utils/index.js'

export const prepareArticle = async (app: App): Promise<void> => {
  const articles = app.pages
    .filter(isArticle)
    .map((item) => item as StarPage)
    .sort((a, b) => {
      if (a.data.top === b.frontmatter.top) {
        const date1 = dayjs(
          a.date !== '0000-00-00' ? a.date : a.data.git?.createdTime
        )
        const date2 = dayjs(
          b.date !== '0000-00-00' ? b.date : b.data.git?.createdTime
        )
        return date1.isBefore(date2) ? 1 : -1
      }
      return a.data.top ? 1 : -1
    })
    .map((item) => {
      const date = dayjs(item.date || item.data.git?.createdTime)
      return {
        title: item.title,
        icon: item.icon,
        path: item.path,
        date: date.format('YYYY-MM-DD'),
        time: item.data.git?.createdTime,
        excerpt: item.excerpt,
      }
    })

  const content = `\
export const articles = ${JSON.stringify(articles, null, 2)}
`

  await app.writeTemp('internal/articles.js', content)
}
