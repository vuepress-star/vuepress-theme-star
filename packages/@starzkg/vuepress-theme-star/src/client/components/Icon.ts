import { defineComponent, h, PropType, resolveComponent, VNode } from 'vue'
import { useIconPrefix } from '../composables/index.js'

declare type IconType = 'component' | 'font-icon'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<IconType>,
      default: 'component',
    },
  },
  setup(props) {
    const iconPrefix = useIconPrefix()
    return (): null | VNode => {
      if (props.type === 'component') {
        const component = resolveComponent(`${iconPrefix.value}${props.name}`)

        return component
          ? h(
              'i',
              {
                class: ['icon'],
              },
              h(component)
            )
          : null
      } else if (props.type === 'font-icon') {
        return h('i', { class: ['icon', props.name] })
      }
      return null
    }
  },
})
