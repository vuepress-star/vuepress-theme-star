<script lang="ts">
import { defineComponent, h, resolveComponent } from 'vue'

export default defineComponent({
  name: 'Search',
  setup: () => {
    return () =>
      h(
        'div',
        { class: 'search' },
        h(resolveComponent('Docsearch') || resolveComponent('SearchBox'))
      )
  },
})
</script>

<style lang="scss" scoped></style>
