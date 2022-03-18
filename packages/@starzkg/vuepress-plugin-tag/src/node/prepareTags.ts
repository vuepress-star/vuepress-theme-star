import type { App, Page } from '@vuepress/core'
import type { Tag } from '../shared'

export const prepareTags = async (app: App): Promise<void> => {
  const tagMap = app.pages.reduce((tags, page): Map<string, Page[]> => {
    if (page.data.frontmatter.tags !== undefined) {
      const frontmatterTags = page.data.frontmatter.tags as string[]
      frontmatterTags.forEach((tag) => {
        let m = tags.get(tag)
        if (m === undefined) {
          m = []
        }
        m.push(page)
        tags.set(tag, m)
      })
    }
    return tags
  }, new Map<string, Page[]>())

  const tags: Tag[] = []
  for (const key of tagMap.keys()) {
    tags.push({
      name: key,
      pages: tagMap.get(key) || [],
    })
  }

  // tags data file content
  const content = `\
export const tagsData =  {\
${tags
  .map(
    ({ name, pages }) => `
  // tag: ${name}
  ${JSON.stringify(name)}: {
    ${pages
      .map(
        ({ key, path, dataFilePath, dataFileChunkName }) => `
      // path: ${path}
      ${JSON.stringify(key)}: () => import(${
          dataFileChunkName
            ? `/* webpackChunkName: "${dataFileChunkName}" */`
            : ''
        }${JSON.stringify(dataFilePath)}).then(({ data }) => data),`
      )
      .join('')}
  },`
  )
  .join('')}
}
`

  await app.writeTemp('internal/tagsData.js', content)
}
