import {
  defineComponent,
  FunctionalComponent,
  h,
  resolveComponent,
  VNode,
} from 'vue'

export default defineComponent({
  name: 'Search',
  setup: (props) => {
    const SearchComponent: FunctionalComponent = () => {
      // compat with
      // @vuepress/plugin-docsearch
      // @vuepress/plugin-search
      const search =
        resolveComponent('Docsearch') || resolveComponent('SearchBox')
      return h(search)
    }
    return (): VNode | null =>
      h('div', { class: 'search-wrapper' }, h(SearchComponent, props))
  },
})
