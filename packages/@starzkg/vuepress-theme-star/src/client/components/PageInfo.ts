import { usePageFrontmatter } from '@vuepress/client'
import { defineComponent, h, resolveComponent, VNode } from 'vue'
import PageAuthor from './PageAuthor.vue'
import PageCategory from './PageCategory.vue'
import PageDate from './PageDate.vue'
import PageReadingTime from './PageReadingTime.vue'
import PageTag from './PageTag.vue'
import PageTitle from './PageTitle.js'
import PageType from './PageType.vue'
import PageView from './PageView.vue'
import PageWord from './PageWord.vue'

export interface PageInfoFrontmatter {
  pageInfo?: PageInfoType[] | false
}
/**
 * 页面信息类型
 *
 * Type of page infomation
 */
export type PageInfoType =
  | 'Type'
  | 'Title'
  | 'Author'
  | 'Category'
  | 'Date'
  | 'View'
  | 'Tag'
  | 'ReadingTime'
  | 'Word'

export default defineComponent({
  name: 'PageInfo',

  components: {
    PageTitle,
    PageAuthor,
    PageDate,
    PageCategory,
    PageTag,
    PageReadingTime,
    PageType,
    PageView,
    PageWord,
  },

  setup() {
    const frontmatter = usePageFrontmatter<PageInfoFrontmatter>()

    return (): VNode | null =>
      h('div', { class: 'page-info' }, [
        h(PageTitle, { class: 'page-title' }),
        h('div', { class: 'page-metas' }, [
          (
            frontmatter.value.pageInfo || [
              'Type',
              'Author',
              'View',
              'Date',
              'Category',
              'Tag',
              'Word',
              'ReadingTime',
            ]
          ).map((item) =>
            h(resolveComponent(`Page${item}`), { class: 'page__meta' })
          ),
        ]),
      ])
  },
})
