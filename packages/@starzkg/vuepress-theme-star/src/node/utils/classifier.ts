import type { Page } from '@vuepress/core'
import { isArray } from '@vuepress/shared'
import type { Classification } from '../../shared/index.js'

export interface ClassifierOptions {
  filter?: (page: Page) => boolean
  sorter?: (a: Page, b: Page) => number
  getter: (page: Page) => string | number | string[] | number[] | undefined
  mapper?: (page: Page) => any
  defaultName?: string | number
  children?: ClassifierOptions
}

export const resolveClassification = (
  pages: Page[],
  options: ClassifierOptions
) => {
  if (!options.getter) {
    throw new Error('getter is required')
  }

  options = {
    filter: options.filter,
    sorter: options.sorter,
    getter: options.getter,
    mapper: options.mapper || ((page) => page.key),
    defaultName: options.defaultName,
    children: options.children
      ? { ...options, ...options.children, children: options.children.children }
      : undefined,
  }

  const filter = options.filter || ((page) => true)
  const sorter = options.sorter || ((a, b) => 0)
  const mapper = options.mapper || ((page) => page.key)
  return Object.entries(
    pages
      .filter(filter)
      .sort(sorter)
      .reduce<Record<string, Page[]>>((result, page, currentIndex) => {
        const key = options.getter(page) || options.defaultName
        if (!key) {
          return result
        }
        const keys = isArray(key) ? key : [key]

        for (const key of keys) {
          result[key] = result[key] || []
          result[key].push(page)
        }
        return result
      }, {})
  ).reduce<Classification>((result, [key, value], currentIndex) => {
    result[key] = {
      key,
      pages: value.map(mapper),
      children: options.children
        ? resolveClassification(value, options.children)
        : undefined,
    }
    return result
  }, {})
}
