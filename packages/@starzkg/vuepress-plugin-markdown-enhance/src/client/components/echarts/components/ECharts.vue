<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ECharts',
})
</script>

<script lang="ts" setup>
import { useDebounceFn, useEventListener } from '@vueuse/core'
import type { EChartsOption, EChartsType } from 'echarts'
import { onBeforeUnmount, onMounted, PropType, ref } from 'vue'
import { Loading } from '../../loading/index.js'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  language: {
    type: String as PropType<'javascript' | 'json'>,
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

const parseEChartsConfig = (
  config: string,
  type: 'javascript' | 'json'
): EChartsOption => {
  if (type === 'json') return <EChartsOption>JSON.parse(config)

  const exports = {}
  const module = { exports }

  // eslint-disable-next-line no-eval
  eval(config)

  return <EChartsOption>module.exports
}

const loading = ref(true)

const echartsElement = ref<HTMLElement | null>(null)
const echartsInstance = ref<HTMLCanvasElement | null>(null)

const chart = ref<EChartsType>()

onMounted(() => {
  Promise.all([import(/* webpackChunkName: "echarts" */ 'echarts')]).then(
    ([echarts]) => {
      const data = parseEChartsConfig(
        decodeURIComponent(props.code),
        props.language
      )

      chart.value = echarts.init(echartsInstance.value!)
      chart.value.showLoading()
      chart.value.setOption(data)
      chart.value.hideLoading()

      loading.value = false
    }
  )
  useEventListener(
    'resize',
    useDebounceFn(() => chart.value?.resize(), 100)
  )
})

onBeforeUnmount(() => {
  chart.value?.dispose()
})
</script>

<template>
  <div
    :id="id"
    ref="echartsElement"
    class="markdown-enhance-echarts"
    :class="['echarts-' + language]"
  >
    <div v-if="title" class="echarts-title">
      {{ decodeURIComponent(title) }}
    </div>
    <div class="echarts-wrapper">
      <Loading :loading="loading" />
      <div ref="echartsInstance" class="echarts-instance" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
