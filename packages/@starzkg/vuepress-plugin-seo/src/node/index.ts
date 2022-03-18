import { resolvePagePermalink } from '@vuepress/core'
import type { Plugin } from '@vuepress/core'
import type { ExtendPage, PageSeoInfo, SeoContent, SeoOptions } from '../shared'
import { appendSEO } from './appendHead'
import { generateRobotsTxt, generateSeo } from './seo'

export * from '../shared'

export const seoPlugin =
  (options: SeoOptions = {}): Plugin =>
  (app) => {
    const { base } = app.options

    return {
      name: 'seo2',

      extendsPage(page): void {
        const head = page.frontmatter.head || []
        const pageSeoInfo: PageSeoInfo = {
          page: page as ExtendPage,
          app,
          permalink: resolvePagePermalink(page),
        }
        const metaContext: SeoContent = {
          ...generateSeo(options, base, pageSeoInfo),
          ...(options.seo ? options.seo(pageSeoInfo) : {}),
        }

        appendSEO(head, metaContext, options)
        if (options.customHead) options.customHead(head, pageSeoInfo)

        page.frontmatter.head = head
      },

      async onGenerated(): Promise<void> {
        await generateRobotsTxt(app.dir)
      },
    }
  }

export default seoPlugin
