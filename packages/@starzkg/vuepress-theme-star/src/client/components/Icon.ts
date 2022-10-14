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
import { useIconPrefix } from '../composables/index.js'

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
    const iconPrefix = useIconPrefix()

    const style = computed(() => ({
      ...(props.color ? { color: props.color } : {}),
      ...(props.size ? { 'font-size': `${props.size}px` } : {}),
    }))

    const icon: FunctionalComponent = () => {
      if (props.type === 'component') {
        return resolveComponent(`${iconPrefix.value}${props.icon}`)
      } else if (props.type === 'img') {
        if (isLinkHttp(props.icon)) {
          return h('img', { src: props.icon, alt: props.icon })
        } else if (props.icon.startsWith('/')) {
          return h('img', { src: withBase(props.icon), alt: props.icon })
        }
      } else if (props.type.startsWith('font-')) {
        return h('i', {
          class: [
            'font-icon',
            props.type.slice(5),
            `${iconPrefix.value}${props.icon}`,
          ],
        })
      }
      return null
    }

    return (): null | VNode => {
      return h('span', { class: ['icon'] }, h(icon, { style: style.value }))
    }
  },
})
