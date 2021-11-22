import { useLocaleConfig } from '@starzkg/vuepress-shared/es/client'
import { usePageData } from '@vuepress/client'
import { computed, defineComponent, h } from 'vue'
import type { VNode } from 'vue'
import type { ReadingTime } from '../../shared'
import { commentOptions, pageInfoI18n, readingTimeI18n } from '../define'
import { TimerIcon } from './icons'

export default defineComponent({
  name: 'ReadingTimeInfo',

  setup() {
    const page = usePageData<{ readingTime: ReadingTime }>()
    const pageInfoLocale = useLocaleConfig(pageInfoI18n)
    const readingTimeLocale = useLocaleConfig(readingTimeI18n)

    const readingTime = computed(() =>
      page.value.readingTime.minutes < 1
        ? [readingTimeLocale.value.minute, 'PT1M']
        : [
            readingTimeLocale.value.time?.replace(
              '$time',
              Math.round(page.value.readingTime.minutes).toString()
            ),
            `PT${Math.round(page.value.readingTime.minutes)}M`,
          ]
    )

    return (): VNode | null =>
      h(
        'span',
        {
          class: 'reading-time-info',
          ...(commentOptions.hint !== false
            ? {
                'ariaLabel': pageInfoLocale.value.readingTime,
                'data-balloon-pos': 'down',
              }
            : {}),
        },
        [
          h(TimerIcon),
          h('span', readingTime.value[0]),
          h('meta', {
            property: 'timeRequired',
            content: readingTime.value[1],
          }),
        ]
      )
  },
})
