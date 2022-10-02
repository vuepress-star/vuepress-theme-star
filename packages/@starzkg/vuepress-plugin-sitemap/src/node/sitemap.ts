import type { App, Page, PageData } from '@vuepress/core'
import type { GitData } from '@vuepress/plugin-git'
import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from '@vuepress/shared'
import { chalk, fs, withSpinner } from '@vuepress/utils'
import { LinkItem, SitemapStream } from 'sitemap'
import type { SitemapOptions } from '../shared/index.js'
import { logger } from './logger.js'

const stripLocalePrefix = (
  page: Page
): {
  /** path of '/' */
  defaultPath: string
  /** Locale path prefix of the page */
  pathLocale: string
} => ({
  defaultPath: page.path.replace(page.pathLocale, '/'),
  pathLocale: page.pathLocale,
})

export const generateSiteMap = async (
  app: App,
  options: SitemapOptions
): Promise<void> => {
  logger.info('Generating sitemap')

  const { changefreq = 'daily', include = [], exclude = [] } = options
  const hostname = isLinkHttp(options.hostname)
    ? removeEndingSlash(options.hostname)
    : `https://${removeEndingSlash(options.hostname)}`
  const filename = options.filename
    ? removeLeadingSlash(options.filename)
    : 'sitemap.xml'

  options.options = {
    ...options.options,
    ...{
      hostname: options.hostname,
    },
  }

  const {
    dir,
    pages,
    options: { base, locales },
  } = app

  await withSpinner(`Generating sitemap to ${chalk.cyan(filename)}`)(
    () =>
      new Promise<void>((resolve) => {
        const sitemap = new SitemapStream(options.options)

        const pageLocalesMap = pages.reduce(
          (map: Map<string, string[]>, page) => {
            const { defaultPath, pathLocale } = stripLocalePrefix(page)
            const pathLocales = map.get(defaultPath) || []
            pathLocales.push(pathLocale)

            return map.set(defaultPath, pathLocales)
          },
          // a map with keys of defaultPath and string[] value with pathLocales
          new Map()
        )

        pages.forEach((page: Page) => {
          const frontmatter = page.frontmatter.sitemap

          const metaRobotTags = (page.frontmatter.head || []).find(
            (head) => head[1].name === 'robots'
          )

          const excludePage = metaRobotTags
            ? ((metaRobotTags[1].content as string) || '')
                .split(/,/u)
                .map((content) => content.trim())
                .includes('noindex')
            : frontmatter === false

          if (excludePage) exclude.push(page.path)

          const pageData: PageData & { git?: GitData } = page.data
          const updatedTime = pageData.git?.updatedTime
            ? new Date(pageData.git.updatedTime).toISOString()
            : ''

          const { defaultPath } = stripLocalePrefix(page)
          const relatedLocales = pageLocalesMap.get(defaultPath) || []

          let alternateLinks: LinkItem[] = []

          if (relatedLocales.length > 1)
            alternateLinks = relatedLocales.map((localePrefix) => ({
              lang: locales[localePrefix].lang || 'en',
              url: `${base}${removeLeadingSlash(
                defaultPath.replace(/^\//u, localePrefix)
              )}`,
            }))

          sitemap.write({
            alternateLinks,
            changefreq,
            lastmod: updatedTime,
            ...(typeof frontmatter === 'object' ? frontmatter : {}),
            url: `${base}${removeLeadingSlash(page.path)}`,
          })
        })

        const sitemapXMLPath = dir.dest(filename)
        const writeStream = fs.createWriteStream(sitemapXMLPath)

        sitemap.pipe(writeStream)

        // resolve include
        include.forEach((item) => sitemap.write(item))
        sitemap.end(() => {
          resolve()
        })
      })
  )

  await appendToRobots(dir.dest('robots.txt'), `${hostname}${base}${filename}`)
}

const appendToRobots = async (
  robotTxtPath: string,
  filename: string
): Promise<void> => {
  if (fs.existsSync(robotTxtPath)) {
    await withSpinner(`Appended sitemap path to ${chalk.cyan('robots.txt')}`)(
      async () => {
        const robotsTxt = await fs.readFile(robotTxtPath, { encoding: 'utf8' })

        const newRobotsTxtContent = `${robotsTxt.replace(
          /^Sitemap: .*$/u,
          ''
        )}\nSitemap: ${filename}\n`

        await fs.writeFile(robotTxtPath, newRobotsTxtContent, { flag: 'w' })
      }
    )
  }
}
