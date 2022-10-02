import type { PluginFunction } from '@vuepress/core'
import { removeEndingSlash, removeLeadingSlash } from '@vuepress/shared'
import { logger } from '@vuepress/utils'
import { Feed } from 'feed'
import type { FeedPluginOptions } from '../shared/index.js'
import { outputFile } from './utils/index.js'

export const feedPlugin =
  (options: FeedPluginOptions): PluginFunction =>
  (app) => {
    const plugin = {
      name: '@starkzg/vuepress-plugin-feed',
    }

    if (app.env.isDev) {
      return plugin
    }

    if (!options.hostname) {
      logger.warn(`[${plugin.name}] Option 'hostname' is required!`)
      return plugin
    }

    if (!(options.atom || options.json || options.rss)) {
      logger.warn(
        `[${plugin.name}] No requested output, the plugin won’t start!`
      )
      return plugin
    }

    options.hostname = removeEndingSlash(options.hostname)

    return {
      name: '@starkzg/vuepress-plugin-feed',

      onPrepared: async (app) => {
        const locales = Object.assign(
          { '/': app.siteData },
          app.siteData.locales
        )
        for (const locale in locales) {
          const feedOptions = {
            ...options,
            ...locales[locale],
          } as FeedPluginOptions

          const siteData = {
            ...app.siteData.locales[locale],
            ...app.siteData,
          }

          const title = feedOptions.options?.title || siteData.title

          const feed = new Feed({
            id: options.hostname,
            title,
            description: siteData.description,
            copyright: '',
            language: siteData.lang,
            ...options.options,
          })

          app.pages
            .filter((page) => page.path.startsWith(locale))
            .map((page) => ({
              title: page.title,
              id: page.path,
              link: page.path,
              date: new Date(),
            }))
            .forEach((item) => feed.addItem(item))

          const resolveHeadItem = (
            name: string,
            filename: string,
            type: string
          ): void => {
            app.pages
              .filter((page) => page.path.startsWith(locale))
              .forEach((page) => {
                if (feedOptions.atom) {
                  // ensure head exists
                  if (!page.frontmatter.head) page.frontmatter.head = []
                  page.frontmatter.head.push([
                    'link',
                    {
                      rel: 'alternate',
                      type,
                      href: `${options.hostname}${filename}`,
                      title: `${title} ${name} Feed`,
                    },
                  ])
                }
              })
          }

          if (feedOptions.atom) {
            const filename = removeLeadingSlash(
              `${locale}${
                typeof feedOptions.atom === 'string'
                  ? feedOptions.atom
                  : 'atom1.xml'
              }`
            )
            await outputFile(app.dir.dest(filename), feed.atom1())
            resolveHeadItem('Atom1', filename, 'application/atom+xml')
          }
          if (feedOptions.json) {
            const filename = removeLeadingSlash(
              `${locale}${
                typeof feedOptions.json === 'string'
                  ? feedOptions.json
                  : 'feed.json'
              }`
            )
            await outputFile(app.dir.dest(filename), feed.json1())
            resolveHeadItem('JSON', filename, 'application/json')
          }
          if (feedOptions.rss) {
            const filename = removeLeadingSlash(
              `${locale}${
                typeof feedOptions.rss === 'string'
                  ? feedOptions.rss
                  : 'rss.xml'
              }`
            )
            await outputFile(app.dir.dest(filename), feed.rss2())
            resolveHeadItem('RSS2', filename, 'application/json')
          }
        }
      },
    }
  }
