import {
  useLocaleConfig,
  useThemePluginConfig,
} from '@starzkg/vuepress-shared/es/client'
import { usePageFrontmatter } from '@vuepress/client'
import { computed, defineComponent, h, resolveComponent } from 'vue'
import type { VNode } from 'vue'
import type {
  CommentPluginFrontmatter,
  PageEnhanceOptions,
  PageInfoType,
} from '../../shared'
import { commentOptions, pageInfoI18n } from '../define'
import AuthorInfo from './AuthorInfo'
import CategoryInfo from './CategoryInfo'
import DateInfo from './DateInfo'
import PageViewInfo from './PageViewInfo'
import ReadingTimeInfo from './ReadingTimeInfo'
import TagInfo from './TagInfo'
import WordInfo from './WordInfo'

import 'balloon-css/balloon.css'

export default defineComponent({
  name: 'PageInfo',

  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    PageViewInfo,
    ReadingTimeInfo,
    TagInfo,
    WordInfo,
  },

  setup() {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>()
    const themePluginConfig =
      useThemePluginConfig<PageEnhanceOptions>('comment')

    const config = computed<PageInfoType[] | false>(() => {
      const themeConfig = themePluginConfig.value.pageInfo
      const pluginConfig = commentOptions.pageInfo
      const pageConfig = frontmatter.value.pageInfo

      return pageConfig === false
        ? false
        : Array.isArray(pageConfig)
        ? pageConfig
        : pluginConfig === false
        ? false
        : Array.isArray(pluginConfig)
        ? pluginConfig
        : themeConfig === false
        ? false
        : Array.isArray(themeConfig)
        ? themeConfig
        : ['Author', 'PageView', 'Date', 'Category', 'Tag', 'ReadingTime']
    })

    const isOriginal = computed(() => frontmatter.value.original)
    const i18n = useLocaleConfig(pageInfoI18n)

    return (): VNode | null =>
      config.value
        ? h('div', { class: 'page-info' }, [
            isOriginal.value
              ? h('span', { class: 'origin' }, i18n.value.origin)
              : null,
            config.value.map((item) => h(resolveComponent(`${item}-info`))),
          ])
        : null
  },
})
