<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Markmap',
})
</script>

<script lang="ts" setup>
import { Loading } from '../../loading/index.js'
import { delay } from '../../../utils/index.js'
import { onMounted, ref } from 'vue'
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: undefined,
  },
  code: {
    type: String,
    required: true,
  },
})

const loading = ref(true)

const markmapElement = ref<SVGElement | null>(null)

onMounted(() => {
  const code = decodeURIComponent(props.code)
  Promise.all([
    import(/* webpackChunkName: "markmap" */ 'markmap-lib'),
    import(/* webpackChunkName: "markmap" */ 'markmap-view'),
    delay(),
  ]).then(([{ Transformer }, markmap]) => {
    const transformer = new Transformer()

    // 1. transform Markdown
    const { root, features } = transformer.transform(code)

    // 2. get assets
    // either get assets required by used features
    const { styles, scripts } = transformer.getUsedAssets(features)

    // or get all possible assets that could be used later
    // const { styles, scripts } = transformer.getAssets(features)

    const { Markmap, loadCSS, loadJS } = markmap
    // 3. load assets
    if (styles) loadCSS(styles)

    if (scripts) loadJS(scripts, { getMarkmap: () => markmap })

    // 4. create markmap
    // `options` is optional, i.e. `undefined` can be passed here
    Markmap.create(markmapElement.value as SVGElement, undefined, root)

    loading.value = false
  })
})
</script>

<template>
  <div
    :id="id"
    ref="element"
    :class="{ loading }"
    class="markdown-enhance-markmap"
  >
    <div v-if="title" class="markmap-title">
      {{ decodeURIComponent(title) }}
    </div>
    <div class="markmap-wrapper">
      <Loading :loading="loading" class="loading-icon" />
      <svg
        ref="markmapElement"
        :aria-label="decodeURIComponent(title)"
        class="markmap markmap-viewport"
      ></svg>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
