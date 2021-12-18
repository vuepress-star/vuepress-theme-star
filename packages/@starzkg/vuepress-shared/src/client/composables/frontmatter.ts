import { usePageFrontmatter } from '@vuepress/client'
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { getAuthor, getCategory, getTag } from '../../shared'
import type { BasePageFrontMatter, BaseThemeConfig } from '../../shared'
import { DateInfo, DateOptions, getDate } from '../utils'

export type AuthorRef = ComputedRef<string[]>

export const useAuthor = (fallback?: string | string[]): AuthorRef =>
  computed(() =>
    getAuthor(
      usePageFrontmatter<BasePageFrontMatter>().value,
      useThemeData<BaseThemeConfig>().value,
      fallback
    )
  )

export type CategoryRef = ComputedRef<string[]>

export const useCategory = (): CategoryRef =>
  computed(() => {
    const { categories, category = categories } =
      usePageFrontmatter<BasePageFrontMatter>().value

    return getCategory(category)
  })

export type TagRef = ComputedRef<string[]>

export const useTag = (): TagRef =>
  computed(() => {
    const { tags, tag = tags } = usePageFrontmatter<BasePageFrontMatter>().value

    return getTag(tag)
  })

export type DateRef = ComputedRef<DateInfo | null>

export const useDate = (options?: DateOptions, fallback?: Date): DateRef =>
  computed(() => {
    const { time, date = time } =
      usePageFrontmatter<BasePageFrontMatter>().value

    return getDate(date ?? fallback, options)
  })
