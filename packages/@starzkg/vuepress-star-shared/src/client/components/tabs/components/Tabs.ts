import { defineComponent, getCurrentInstance, h, ref } from 'vue'
import { getTabPanes } from '../utils/index.js'
import TabNav from './TabNav.vue'

export default defineComponent({
  name: 'Tabs',

  setup(_, { slots }) {
    const vm = getCurrentInstance()!
    // index of current active item
    const activeIndex = ref(-1)

    return () => {
      // NOTICE: here we put the `slots.default()` inside the render function to make
      // the slots reactive, otherwise the slot content won't be changed once the
      // `setup()` function of current component is called

      // get children tab-pane
      const items = getTabPanes(vm)

      // do not render anything if there is no tab-pane
      if (items.length === 0) {
        return null
      }

      if (activeIndex.value < 0 || activeIndex.value > items.length - 1) {
        // if `activeIndex` is invalid

        // find the index of the tab-pane with `active` props
        activeIndex.value = items.findIndex(
          (vnode) => vnode.props.active === '' || vnode.props.active === true
        )

        // if there is no `active` props on tab-pane, set the first item active
        if (activeIndex.value === -1) {
          activeIndex.value = 0
        }
      } else {
        // set the active item
        items.forEach((vnode, i) => {
          vnode.props.active = i === activeIndex.value
        })
      }

      return h('div', { class: 'tabs' }, [
        h(TabNav, {
          panes: items,
          activeIndex: activeIndex.value,
          onTabClick: (pane, i, e) => {
            activeIndex.value = i
          },
        }),
        items,
      ])
    }
  },
})
