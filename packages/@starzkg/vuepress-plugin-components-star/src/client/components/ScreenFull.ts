import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import * as screenfull from 'screenfull'
import { defineComponent, h, onMounted, ref } from 'vue'
import type { VNode } from 'vue'
import { CancelFullScreenIcon, EnterFullScreenIcon } from './icons'

export default defineComponent({
  name: 'ScreenFull',

  setup() {
    const canFullscreen = ref(false)
    const isFullscreen = ref(false)
    const themeLocale = useThemeLocaleData()

    onMounted(() => {
      canFullscreen.value =
        screenfull.default.isEnabled && themeLocale.value.fullscreen !== false
    })

    return (): VNode | null =>
      canFullscreen.value
        ? h(
            'button',
            {
              class: 'full-screen',
              ariaPressed: isFullscreen.value,
              onClick: () => {
                if (screenfull.default.isEnabled)
                  screenfull.default.toggle().then(() => {
                    isFullscreen.value = screenfull.default.isFullscreen
                  })
              },
            },
            h(isFullscreen.value ? CancelFullScreenIcon : EnterFullScreenIcon)
          )
        : null
  },
})
