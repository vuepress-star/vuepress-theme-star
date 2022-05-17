import {
  getCategory,
  useLocaleConfig,
} from '@starzkg/vuepress-shared/es/client'
import { defineComponent, h, ref, toRef } from 'vue'
import type { PropType, VNode } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { commentOptions, pageInfoI18n } from '../define'
import { CategoryIcon } from './icons'

export default defineComponent({
  name: 'CategoryInfo',

  props: {
    categories: {
      type: Array as PropType<string[]>,
      default: (): string[] => [],
    },
  },

  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const items = props.categories.length
      ? toRef(props, 'categories')
      : ref(getCategory(props.categories))
    const pageInfoLocale = useLocaleConfig(pageInfoI18n)

    const navigate = (categoryName: string): void => {
      const path = `/category/${encodeURI(categoryName)}/`
      if (route.path !== path) router.push(path)
    }

    return (): VNode | null =>
      items.value.length
        ? h(
            'span',
            {
              class: 'category-info',
              ...(commentOptions.hint !== false
                ? {
                    'ariaLabel': pageInfoLocale.value.category,
                    'data-balloon-pos': 'down',
                  }
                : {}),
            },
            [
              h(CategoryIcon),
              h('ul', { class: 'categories-wrapper' }, [
                items.value.map((category) =>
                  h(
                    'li',
                    {
                      class: {
                        category: true,
                        // clickable: clickable.value,
                      },
                      onClick: () => navigate(category),
                    },
                    h('span', { role: 'navigation' }, category)
                  )
                ),
                h('meta', {
                  property: 'articleSection',
                  content: items.value.join(','),
                }),
              ]),
            ]
          )
        : null
  },
})
