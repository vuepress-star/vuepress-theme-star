import screenfull from 'screenfull'
import { defineComponent, h, onMounted, ref } from 'vue'
import type { VNode } from 'vue'
import { useThemeLocaleData } from '../composables'
import { ScreenFullClose, ScreenFullOpen } from '../icons'

export default defineComponent({
  name: 'ScreenFull',

  setup() {
    const canFullscreen = ref(false)
    const isFullscreen = ref(false)
    const themeLocale = useThemeLocaleData()

    const screenFull = (): void => {
      if (screenfull.isEnabled)
        screenfull.toggle().then(() => {
          isFullscreen.value = screenfull.isFullscreen
        })
    }

    onMounted(() => {
      canFullscreen.value =
        screenfull.isEnabled && themeLocale.value.fullscreen !== false
    })

    return (): VNode | null =>
      canFullscreen.value
        ? h(
            'button',
            {
              'class': 'full-screen',
              'aria-label': isFullscreen.value ? '退出全屏' : '全屏',
              'aria-pressed': isFullscreen.value,
              'data-balloon-pos': 'left',
              'onClick': screenFull,
            },
            h(isFullscreen.value ? ScreenFullClose : ScreenFullOpen)
          )
        : null
  },
})
