import { debounce } from 'ts-debounce'
import { computed, defineComponent, h, onMounted, ref, Transition } from 'vue'
import { BackToTop } from '../icons/index.js'
import { getScrollTop, scrollToTop } from '../utils/index.js'

export default defineComponent({
  name: 'BackToTop',

  setup() {
    const scrollTop = ref(0)
    const show = computed(() => scrollTop.value > 300)
    const onScroll = debounce(() => {
      scrollTop.value = getScrollTop()
    }, 100)

    onMounted(() => {
      scrollTop.value = getScrollTop()

      window.addEventListener('scroll', () => onScroll())
    })

    const backToTopEl = h(
      'button',
      {
        'class': 'back-to-top',
        'aria-label': '回到顶部',
        'data-balloon-pos': 'left',
        'onClick': scrollToTop,
      },
      h(BackToTop)
    )

    return () =>
      h(
        Transition,
        {
          name: 'back-to-top',
        },
        {
          default: () => (show.value ? backToTopEl : null),
        }
      )
  },
})
