import { useLocaleConfig } from '@starzkg/vuepress-shared/es/client'
import { defineComponent, h, onMounted, ref, Transition } from 'vue'
import type { VNode } from 'vue'
import { UpdateIcon } from '../components/icons'
import { usePWAEvent } from '../composables'
import { locales } from '../define'

import '../styles/popup.scss'

export default defineComponent({
  name: 'SWHintPopup',

  setup(_props, { slots }) {
    const locale = useLocaleConfig(locales)
    const enabled = ref(false)

    const uninstall = (): void => {
      if (enabled.value) {
        // force refresh
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.location.reload(true)
        // void useUnregister().then((isSuccess) => {
        //   if (isSuccess) window.location.reload();
        // });

        enabled.value = false
      }
    }

    onMounted(() => {
      const event = usePWAEvent()

      event.on('updatefound', () => {
        navigator.serviceWorker.getRegistration().then((registration) => {
          // check whether a valid service worker is actived
          if (registration && registration.active) enabled.value = true
        })
      })

      event.on('updated', () => {
        enabled.value = false
      })
    })

    return (): VNode =>
      h(
        Transition,
        { name: 'popup' },
        () =>
          slots.default?.({
            enabled: enabled.value,
            uninstall,
          }) ||
          (enabled.value
            ? h(
                'button',
                {
                  class: 'sw-hint-popup',
                  tabindex: 0,
                  onClick: () => uninstall(),
                },
                [
                  locale.value.hint,
                  h('span', { class: 'icon-wrapper' }, h(UpdateIcon)),
                ]
              )
            : null)
      )
  },
})
