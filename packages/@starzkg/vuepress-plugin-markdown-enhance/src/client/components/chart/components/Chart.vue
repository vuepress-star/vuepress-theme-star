<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Chart',
})
</script>

<script lang="ts" setup>
import type {
  Chart,
  ChartConfiguration,
  ChartItem,
} from 'chart.js/auto/auto.esm.js'
import { onMounted, PropType, ref } from 'vue'
import { Loading } from '../../loading/index.js'
import { delay } from '../../../utils/index.js'

type LanguageType = 'javascript' | 'json'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  language: {
    type: String as PropType<LanguageType>,
    default: 'json',
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

const parseChartConfig = (
  config: string,
  language: LanguageType
): ChartConfiguration => {
  if (language === 'json') return JSON.parse(config) as ChartConfiguration

  const exports = {}
  const module = { exports }

  // eslint-disable-next-line no-eval
  eval(config)

  return module.exports as ChartConfiguration
}

const loading = ref(true)

const chartElement = ref<HTMLElement | null>(null)
const chartCanvasElement = ref<HTMLCanvasElement | null>(null)

const chart = ref<Chart>()

onMounted(() => {
  Promise.all([
    import(/* webpackChunkName: "chart" */ 'chart.js/auto'),
    // delay
    delay(),
  ]).then(([{ default: Chart }]) => {
    Chart.defaults.maintainAspectRatio = false

    const data = parseChartConfig(
      decodeURIComponent(props.code),
      props.language
    )
    const ctx = chartCanvasElement.value!.getContext('2d')! as ChartItem

    chart.value = new Chart(ctx, data)

    loading.value = false
  })
})
</script>

<template>
  <div
    :id="id"
    ref="chartElement"
    class="markdown-enhance-chart"
    :class="['chart-' + language]"
  >
    <div v-if="title" class="chart-title">{{ decodeURIComponent(title) }}</div>
    <div class="chart-wrapper">
      <Loading :loading="loading" />
      <canvas
        v-show="!loading"
        ref="chartCanvasElement"
        :aria-label="decodeURIComponent(title)"
        role="img"
      >
        Your browser does not support the canvas element.
      </canvas>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
