<script lang="ts">
import * as Flowchart from 'flowchart.js'
import debounce from 'lodash.debounce'
import Vue, { defineComponent } from 'vue'
import type { PropType } from 'vue'
import presets from '../presets'
import { LoadingIcon } from './icons'

let svg: Flowchart.Instance

export default defineComponent({
  name: 'FlowChart',

  components: { LoadingIcon },

  props: {
    id: { type: String, required: true },
    preset: { type: String as PropType<'ant' | 'vue'>, default: 'vue' },
  },

  data: () => ({
    loading: true,
    scale: 1,
  }),

  computed: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $preset(): Record<string, any> {
      const preset = presets[this.preset as 'ant' | 'vue']

      if (!preset) {
        console.warn(`[md-enhance:flowchart] Unknown preset: ${this.preset}`)
        return presets.vue
      }

      return preset
    },

    resize(): () => void {
      return debounce(() => {
        const scale = this.getScale(window.innerWidth)

        if (this.scale !== scale) {
          this.scale = scale
          svg.drawSVG(this.id, { ...this.$preset, scale })
        }
      }, 100)
    },
  },
  mounted(): void {
    const delay = (): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, 500))

    this.$el.setAttribute('id', this.id)

    Promise.all([
      import(/* webpackChunkName: "flowchart" */ 'flowchart.js'),
      delay(),
    ]).then(([flowchart]) => {
      const { parse } = flowchart

      svg = parse(
        decodeURIComponent((this.$el as HTMLElement).dataset.code || '')
      )
      this.scale = this.getScale(window.innerWidth)

      svg.drawSVG(this.id, { ...this.$preset, scale: this.scale })
      this.loading = false

      window.addEventListener('resize', this.resize)
    })
  },

  beforeUnmount(): void {
    window.removeEventListener('resize', this.resize)
  },

  methods: {
    getScale(width: number): number {
      return width < 419 ? 0.8 : width > 1280 ? 1 : 0.9
    },
  },
})
</script>

<template>
  <div :class="{ loading }" class="md-flowchart">
    <LoadingIcon v-if="loading" class="md-flowchart-loading-icon" />
  </div>
</template>
