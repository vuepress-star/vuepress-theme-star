import { useLocaleConfig } from '@starzkg/vuepress-shared/client'
import { computed, defineComponent, h, onMounted, ref, Transition } from 'vue'
import type { VNode } from 'vue'
import { UpdateIcon } from '../components/icons.js'
import { usePWAEvent, useSkipWaiting } from '../composables/index.js'
import { locales } from '../define.js'

import '../styles/popup.scss'

export default defineComponent({
  name: 'SWUpdatePopup',

  setup(_props, { slots }) {
    const locale = useLocaleConfig(locales)
    const registration = ref<ServiceWorkerRegistration | null>(null)

    const enabled = computed(() => Boolean(registration.value))

    const reload = (): void => {
      if (registration.value) {
        useSkipWaiting(registration.value)
        window.location.reload()

        registration.value = null
      }
    }

    onMounted(() => {
      const event = usePWAEvent()

      event.on('updated', (reg) => {
        if (reg) {
          registration.value = reg
        }
      })
    })

    return (): VNode =>
      h(
        Transition,
        { name: 'popup' },
        () =>
          slots.default?.({
            enabled: enabled.value,
            reload,
          }) ||
          (enabled.value
            ? h(
                'button',
                {
                  class: 'sw-update-popup',
                  tabindex: 0,
                  onClick: () => reload(),
                },
                [
                  locale.value.update,
                  h('span', { class: 'icon-wrapper' }, h(UpdateIcon)),
                ]
              )
            : null)
      )
  },
})
