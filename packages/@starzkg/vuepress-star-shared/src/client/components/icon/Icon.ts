import { withBase } from '@vuepress/client'
import { isLinkHttp } from '@vuepress/shared'
import {
  computed,
  defineComponent,
  FunctionalComponent,
  h,
  resolveComponent,
  VNode,
} from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'component',
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    if (isLinkHttp(props.icon) || props.icon.startsWith('/')) {
      return (): null | VNode =>
        h('img', {
          class: 'icon',
          src: isLinkHttp(props.icon) ? props.icon : withBase(props.icon),
          alt: props.icon,
          style: { width: props.size, height: props.size },
        })
    }

    const style = computed(() => ({
      ...(props.color ? { color: props.color } : {}),
      ...(props.size ? { 'font-size': `${props.size}px` } : {}),
    }))

    const icon: FunctionalComponent = () => {
      if (!props.icon) {
        return null
      }

      if (props.type === 'component') {
        return h(resolveComponent(props.icon))
      } else if (props.type.startsWith('font-')) {
        return h('i', {
          class: ['font-icon', props.type.slice(5), props.icon],
        })
      }
      return null
    }

    return (): null | VNode => {
      return h('span', { class: ['icon'] }, h(icon, { style: style.value }))
    }
  },
})
