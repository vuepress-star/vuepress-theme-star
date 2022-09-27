<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FlowChart',
})
</script>

<script lang="ts" setup>
import { useDebounceFn, useEventListener } from '@vueuse/core'
import type * as Flowchart from 'flowchart.js'
import { computed, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import { Loading } from '../../loading/index.js'
import presets from '../presets'
import { delay } from '../../../utils/index.js'

const props = defineProps({
  id: { type: String, required: true },
  code: {
    type: String,
    required: true,
  },
  preset: {
    type: String as PropType<'ant' | 'pie' | 'vue'>,
    default: 'vue',
  },
})

let svg: Flowchart.Instance
const element = ref<HTMLDivElement>()

const loading = ref(true)
const scale = ref<number>()

const preset = computed<Record<string, unknown>>(() => {
  const preset = presets[props.preset]

  if (!preset) {
    console.warn(`[md-enhance:flowchart] Unknown preset: ${props.preset}`)

    return presets.vue
  }

  return preset
})

const getScale = (width: number): number =>
  width < 419 ? 0.8 : width > 1280 ? 1 : 0.9

onMounted(() => {
  Promise.all([
    import(/* webpackChunkName: "flowchart" */ 'flowchart.js'),
    // delay
    delay(),
  ]).then(([flowchart]) => {
    const { parse } = flowchart

    svg = parse(decodeURIComponent(props.code))

    const loadFlowChart = (): void => {
      const newScale = getScale(window.innerWidth)

      if (scale.value !== newScale) {
        // update scale
        scale.value = newScale

        // draw svg to #id
        svg.drawSVG(props.id, { ...preset.value, scale: newScale })
      }
    }

    loadFlowChart()

    loading.value = false

    useEventListener('resize', useDebounceFn(loadFlowChart, 100))
  })
})
</script>

<template>
  <div
    :id="id"
    ref="element"
    :class="{ loading }"
    class="markdown-enhance-flowchart"
  >
    <Loading
      :loading="loading"
      class="markdown-enhance-flowchart-loading-icon"
    />
  </div>
</template>
