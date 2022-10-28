import type { App, AppDir } from '@vuepress/core'
import { resolvePagePermalink } from '@vuepress/core'
import { isArray } from '@vuepress/shared'
import { fs, withSpinner } from '@vuepress/utils'
import type { SeoContent, SeoPage, SeoPluginOptions } from '../shared/index.js'
import { logger } from './logger.js'
import { getLocales, resolveUrl } from './utils.js'

export const resolveSeo = (
  app: App,
  page: SeoPage,
  options: SeoPluginOptions
): SeoContent => {
  const { base } = app.options

  const { frontmatter } = page

  const permalink = resolvePagePermalink({
    app,
    frontmatter,
    slug: page.slug,
    date: page.date,
    pathInferred: page.pathInferred,
    pathLocale: page.pathLocale,
  })
  const {
    frontmatter: {
      author: pageAuthor,
      time,
      date = time,
      banner,
      cover,
      tag,
      tags = tag as string[],
    },
    git = {},
  } = page.data
  const { siteData } = app
  const locales = getLocales(siteData.locales)

  const type = ['article', 'category', 'tag', 'timeline'].some(
    (folder) =>
      page.filePathRelative && page.filePathRelative.startsWith(`/${folder}`)
  )
    ? 'website'
    : 'article'

  const author =
    pageAuthor === false ? '' : (pageAuthor as string) || options.author || ''
  const { updatedTime } = git

  const modifiedTime = updatedTime ? new Date(updatedTime).toISOString() : ''
  const articleTags: string[] = Array.isArray(tags)
    ? tags
    : typeof tag === 'string'
    ? [tag]
    : []

  const publishTime =
    date instanceof Date ? new Date(date).toISOString() : date || ''

  return {
    'og:url': resolveUrl(base, permalink || page.path),
    'og:site_name': siteData.title,
    'og:title': page.title,
    'og:description': page.frontmatter.description || '',
    'og:type': type,
    'og:image': cover
      ? resolveUrl(base, cover)
      : banner
      ? resolveUrl(base, banner)
      : '',
    'og:updated_time': modifiedTime,
    'og:locale': page.lang,
    'og:locale:alternate': locales,

    'twitter:card': 'summary_large_image',
    'twitter:image:alt': siteData.title,

    'article:author': author,
    'article:tag': articleTags,
    'article:published_time': publishTime,
    'article:modified_time': modifiedTime,
  }
}

export const appendSeo = (
  page: SeoPage,
  content: SeoContent,
  options: SeoPluginOptions
): void => {
  page.frontmatter.head = page.frontmatter.head || []

  const appendMeta = ({ name, content }): void => {
    page.frontmatter.head?.push(['meta', { name, content }])
  }

  for (const property in content) {
    if (isArray(content[property])) {
      content[property].forEach((tag: string) =>
        appendMeta({ name: property, content: tag })
      )
    } else {
      appendMeta({
        name: property,
        content: content[property] as string,
      })
    }
  }
  if (options.restrictions)
    appendMeta({
      name: 'og:restrictions:age',
      content: options.restrictions,
    })

  if (options.twitterID)
    appendMeta({ name: 'twitter:creator', content: options.twitterID })
}

export const generateSeo = (
  app: App,
  page: SeoPage,
  options: SeoPluginOptions
): void => {
  const metaContext: SeoContent = resolveSeo(app, page, options)
  appendSeo(page, metaContext, options)
  if (options.extendsSeo) options.extendsSeo(app, page)
}

export const generateRobotsTxt = async (dir: AppDir): Promise<void> => {
  await withSpinner('Generating robots.txt')(async (spinner) => {
    const publicPath = dir.public('robots.txt')

    let content = fs.existsSync(publicPath)
      ? await fs.readFile(publicPath, { encoding: 'utf8' })
      : ''

    if (content && !content.includes('User-agent')) {
      logger.fail('robots.txt seems invalid!')
    } else {
      content += '\nUser-agent:*\nDisallow:\n'

      await fs.writeFile(dir.dest('robots.txt'), content, {
        flag: 'w',
      })
    }
  })
}
