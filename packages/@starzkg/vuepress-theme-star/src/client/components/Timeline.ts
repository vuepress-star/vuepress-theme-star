import { dayjs } from '@starzkg/vuepress-star-shared/client'
import { computed, defineComponent, h, VNode, watchEffect } from 'vue'
import { useSiteLocaleData } from '../composables/index.js'
import ArticleList from './ArticleList.vue'

import '../styles/timeline.scss'

export default defineComponent({
  name: 'Timeline',
  setup() {
    const siteLocaleData = useSiteLocaleData()
    dayjs.locale(siteLocaleData.value.lang)
    const timeline = computed(() => {
      return siteLocaleData.value.classifications?.timeline || {}
    })
    watchEffect(() => {
      dayjs.locale(siteLocaleData.value.lang)
    })

    return (): VNode =>
      h(
        'ul',
        { class: 'timeline' },
        Object.entries(timeline.value)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .reduce((result, [key, value], currentIndex) => {
            result.push(
              h(
                'div',
                { class: 'timeline-year' },
                h('div', { class: 'timeline-year-title' }, key)
              )
            )

            if (value.children) {
              result.push(
                ...Object.entries(value.children)
                  .sort((a, b) => Number(b[0]) - Number(a[0]))
                  .reduce((result, [key, value], currentIndex) => {
                    result.push(
                      h(
                        'div',
                        { class: 'timeline-month' },
                        h('div', { class: 'timeline-month-title' }, key)
                      )
                    )

                    if (value.children) {
                      result.push(
                        ...Object.entries(value.children)
                          .sort((a, b) => Number(b[0]) - Number(a[0]))
                          .reduce((result, [key, value], currentIndex) => {
                            result.push(
                              h('li', { class: 'timeline-day timeline-item' }, [
                                h('div', { class: 'timeline-item__tail' }),
                                h(
                                  'div',
                                  { class: 'timeline-item__node' },
                                  h('div', {
                                    class: 'timeline-item__node-icon',
                                  })
                                ),
                                h('div', { class: 'timeline-item__wrapper' }, [
                                  h(
                                    'div',
                                    { class: 'timeline-item-title' },
                                    key
                                  ),
                                  h(
                                    'div',
                                    {
                                      class: 'timeline-item__content',
                                    },
                                    h(ArticleList, { pages: value.pages })
                                  ),
                                ]),
                              ])
                            )

                            return result
                          }, [] as VNode[])
                      )
                    }

                    return result
                  }, [] as VNode[])
              )
            }

            return result
          }, [] as VNode[])
      )
  },
})
