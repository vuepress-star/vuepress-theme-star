import { Icon as _Icon } from '@starzkg/vuepress-star-shared/client'
import { isLinkHttp } from '@vuepress/shared'
import { defineComponent, h, VNode } from 'vue'
import { useIconPrefix } from '../composables/index.js'

export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    if (isLinkHttp(props.icon) || props.icon.startsWith('/')) {
      return (): null | VNode => h(_Icon, props)
    }

    const iconPrefix = useIconPrefix()
    return (): null | VNode => {
      return h(_Icon, { ...props, icon: `${iconPrefix.value}${props.icon}` })
    }
  },
})
