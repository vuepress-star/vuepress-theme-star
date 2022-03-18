import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import screenfull from 'screenfull'
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
        screenfull.isEnabled && themeLocale.value.fullscreen !== false
    })

    return (): VNode | null =>
      canFullscreen.value
        ? h(
            'button',
            {
              class: 'full-screen',
              ariaPressed: isFullscreen.value,
              onClick: () => {
                if (screenfull.isEnabled)
                  screenfull.toggle().then(() => {
                    isFullscreen.value = screenfull.isFullscreen
                  })
              },
            },
            h(isFullscreen.value ? CancelFullScreenIcon : EnterFullScreenIcon)
          )
        : null
  },
})
