import type { ReadingTime } from '@starzkg/vuepress-plugin-reading-time'
import { useLocaleConfig } from '@starzkg/vuepress-shared/es/client'
import { usePageData } from '@vuepress/client'
import { computed, defineComponent, h } from 'vue'
import type { VNode } from 'vue'
import { commentOptions, pageInfoI18n, readingTimeI18n } from '../define'
import { WordIcon } from './icons'

export default defineComponent({
  name: 'WordInfo',

  setup() {
    const page = usePageData<{ readingTime: ReadingTime }>()

    const pageInfoLocale = useLocaleConfig(pageInfoI18n)
    const readingTimeLocale = useLocaleConfig(readingTimeI18n)

    const words = computed(() => page.value.readingTime.words.toString())
    const wordText = computed(() =>
      readingTimeLocale.value.word.replace('$word', words.value)
    )

    return (): VNode | null =>
      wordText.value
        ? h(
            'span',
            {
              class: 'words-info',
              ...(commentOptions.hint !== false
                ? {
                    'ariaLabel': pageInfoLocale.value.words,
                    'data-balloon-pos': 'down',
                  }
                : {}),
            },
            [
              h(WordIcon),
              h('span', wordText.value),
              h('meta', {
                property: 'wordCount',
                content: words.value,
              }),
            ]
          )
        : null
  },
})
