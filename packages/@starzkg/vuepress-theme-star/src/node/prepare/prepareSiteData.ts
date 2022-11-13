import { dayjs } from '@starzkg/vuepress-star-shared'
import type { App } from '@vuepress/core'
import type { StarPage, StarSiteData } from '../../shared/index.js'
import { isArticle } from '../../shared/index.js'
import { resolveClassification } from '../utils/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
`

/**
 * Generate override site data temp file
 */
export const prepareSiteData = async (app: App): Promise<void> => {
  const siteData = resolveSiteData(app)
  // site data file content
  let content = `\
export const siteData = ${JSON.stringify(siteData, null, 2)}
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/siteData.js', content)
}

export const resolveSiteData = (app): StarSiteData => {
  const classifications = prepareClassifications(app)

  return {
    ...app.siteData,
    classifications: classifications['/'],
    locales: Object.keys(app.siteData.locales).reduce(
      (result, key, currentIndex) => {
        result[key] = {
          ...app.siteData.locales[key],
          classifications: classifications[key],
        }
        return result
      },
      {}
    ),
  }
}

const prepareClassifications = (app) => {
  const localeClassification = resolveClassification(app.pages, {
    getter: (page) => page.pathLocale,
    mapper: (page) => page,
  })

  return Object.entries(localeClassification).reduce(
    (result, [key, value], currentIndex) => {
      result[key] = {
        type: resolveClassification(value.pages, {
          sorter: (a: StarPage, b: StarPage) => {
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
          },
          getter: (page) =>
            ((page.frontmatter.page as string) || 'Page').toLowerCase(),
        }),
        category: resolveClassification(value.pages, {
          path: `${key}category/:key`,
          filter: isArticle,
          getter: (page) => page.frontmatter.categories as string[],
          defaultName: '未分类',
        }),
        tag: resolveClassification(value.pages, {
          path: `${key}tag/:key`,
          filter: isArticle,
          getter: (page) => page.frontmatter.tags as string[],
        }),
        date: resolveClassification(value.pages, {
          filter: isArticle,
          getter: (page) => page.date,
        }),
        archive: resolveClassification(value.pages, {
          path: `${key}archive/:key`,
          filter: isArticle,
          getter: (page: StarPage) => page.frontmatter.archive,
          defaultName: '未归档',
        }),
        timeline: resolveClassification(value.pages, {
          filter: isArticle,
          getter: (page: StarPage) =>
            dayjs(page.data.git?.createdTime || page.date).get('year'),
          children: {
            getter: (page: StarPage) =>
              dayjs.months()[
                dayjs(page.data.git?.createdTime || page.date).get('month')
              ],
            children: {
              getter: (page: StarPage) =>
                dayjs(page.data.git?.createdTime || page.date).format(
                  'YYYY-MM-DD'
                ),
            },
          },
        }),
      }
      return result
    },
    {}
  )
}
