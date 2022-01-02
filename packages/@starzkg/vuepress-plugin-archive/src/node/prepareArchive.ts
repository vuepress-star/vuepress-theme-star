import type { App, Page } from '@vuepress/core'
import { GitData } from '@vuepress/plugin-git'
import type { Archive } from '../shared'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateArchive) {
    __VUE_HMR_RUNTIME__.updateArchive(archive)
  }
}
`

export const prepareArchive = async (
  app: App,
  excludes: string[],
  noTitle: string
): Promise<void> => {
  const archives = app.pages
    .filter((page) => !excludes.includes(page.path))
    .map(
      (
        page: Page<{
          git?: GitData
        }>
      ): Archive => {
        // git commit的时间
        let createdTime = 0
        let updatedTime = 0
        if (typeof page.data.git !== 'undefined') {
          createdTime = page.data.git.createdTime || 0
          updatedTime = page.data.git.updatedTime || 0
        }
        let date = new Date(updatedTime)

        if (page.data.frontmatter.date !== undefined) {
          date = new Date(page.data.frontmatter.date)
        }

        return {
          title: page.title,
          path: page.path,
          createdTime: createdTime,
          updatedTime: updatedTime,
          archiveTime: date.getTime(),
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate() + 1,
          time:
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            (date.getDate() + 1),
        }
      }
    )
    .sort((a, b) => {
      return b.archiveTime - a.archiveTime
    })

  // theme data file content
  let content = `export const archive =  ${JSON.stringify(archives)}`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/archive.js', content)
}
