import { tagsData as tagsDataRaw } from '@internal/tagsData'
import { PagesData } from '@vuepress/client'
import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Data resolvers of all tags
 *
 * The key is page key, and the value is an async function that
 * returns the page data
 */
export type TagsData = Record<string, PagesData>

/**
 * Ref wrapper of `TagsData`
 */
export type TagsDataRef = Ref<TagsData>

/**
 * Global tags data ref
 */
export const tagsData: TagsDataRef = ref(tagsDataRaw)

/**
 * Returns the ref of data resolvers of all tags
 */
export const useTagsData = (): TagsDataRef => tagsData
