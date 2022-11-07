import { useFullscreen } from '@vueuse/core'
import { computed, defineComponent, h } from 'vue'
import type { VNode } from 'vue'
import { useThemeLocaleData } from '../composables/index.js'
import { ScreenFullClose, ScreenFullOpen } from '../icons/index.js'

export default defineComponent({
  name: 'Fullscreen',

  setup() {
    const { isSupported, isFullscreen, toggle } = useFullscreen()
    const themeLocale = useThemeLocaleData()

    const canFullscreen = computed(
      () => isSupported.value && themeLocale.value.fullscreen !== false
    )

    return (): VNode | null =>
      canFullscreen.value
        ? h(
            'button',
            {
              'class': 'full-screen',
              'aria-label': isFullscreen.value ? '退出全屏' : '全屏',
              'aria-pressed': isFullscreen.value,
              'data-balloon-pos': 'left',
              'onClick': toggle,
            },
            h(isFullscreen.value ? ScreenFullClose : ScreenFullOpen)
          )
        : null
  },
})
