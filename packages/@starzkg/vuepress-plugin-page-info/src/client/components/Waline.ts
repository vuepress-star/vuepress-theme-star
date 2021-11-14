import {
  useLocaleConfig,
  useThemePluginConfig,
} from '@starzkg/vuepress-shared/lib/esm/client'
import { usePageFrontmatter, usePageLang } from '@vuepress/client'
import type { WalineInstance } from '@waline/client'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch,
} from 'vue'
import type { VNode } from 'vue'
import { useRoute } from 'vue-router'
import type { CommentPluginFrontmatter, WalineOptions } from '../../shared'
import { resolveEnablePageViews } from '../composables'
import { enableWaline, walineI18n, walineOption } from '../define'

import '../styles/waline.scss'

export default defineComponent({
  name: 'Waline',

  setup() {
    const route = useRoute()
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>()
    const lang = usePageLang()
    const themePluginConfig = useThemePluginConfig<WalineOptions>('comment')
    const walineLocale = useLocaleConfig(walineI18n)

    let id: number
    let waline: WalineInstance | null = null

    const enableComment = computed(() => {
      if (!enableWaline) return false
      const themeConfig = themePluginConfig.value.comment
      const pluginConfig = walineOption.comment !== false
      const pageConfig = frontmatter.value.comment

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // Enable in plugin and not disable in theme
        (Boolean(pluginConfig) && pageConfig !== false) ||
        // not disabled in anywhere
        (themeConfig !== false &&
          pluginConfig !== false &&
          pageConfig !== false)
      )
    })

    const enablePageViews = computed(() =>
      resolveEnablePageViews(frontmatter.value)
    )

    const delayPromise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), walineOption.delay)
    })

    const updateWaline = (): void => {
      const timeID = (id = new Date().getTime())

      if (waline)
        setTimeout(() => {
          if (timeID === id)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            waline!.update({
              lang: lang.value === 'zh-CN' ? 'zh-CN' : 'en',
              locale: {
                ...walineLocale.value,
                ...(walineOption.locale || {}),
              },
            })
        }, walineOption.delay)
      else
        Promise.all([import('@waline/client'), delayPromise]).then(
          ([{ default: Waline }]) => {
            if (timeID === id)
              waline = Waline({
                lang: lang.value === 'zh-CN' ? 'zh-CN' : 'en',
                locale: {
                  ...walineLocale.value,
                  ...(walineOption.locale || {}),
                },
                emoji: [
                  'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
                  'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili',
                ],
                dark: 'body[data-theme="dark"]',
                ...walineOption,
                el: '#waline-comment',
                visitor: enablePageViews.value,
              }) as WalineInstance
          }
        )
    }

    onMounted(() => {
      if (enableWaline) updateWaline()
    })

    onBeforeUnmount(() => {
      if (waline) waline.destroy()
    })

    watch(
      () => route.path,
      () =>
        // Refresh comment when navigating to a new page
        nextTick().then(() => updateWaline())
    )

    return (): VNode =>
      h('div', {
        class: 'waline-wrapper',
        style: { display: enableComment.value ? 'block' : 'none' },
        innerHTML: '<div id="waline-comment" />',
      })
  },
})
