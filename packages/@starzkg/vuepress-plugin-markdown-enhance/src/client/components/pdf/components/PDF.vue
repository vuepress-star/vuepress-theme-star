<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PDF',
})
</script>

<script lang="ts" setup>
import { withBase } from '@vuepress/client'
import { isLinkHttp } from '@vuepress/shared'
import { computed } from 'vue'

const props = defineProps({
  url: { type: String, required: true },
  height: { type: [String, Number], default: 480 },
  page: {
    type: Number,
    default: 1,
  },
  toolbar: {
    type: Boolean,
    default: true,
  },
  zoom: {
    type: Number,
    default: 100,
  },
})

const hash = computed(
  () =>
    `#page=${props.page}&toolbar=${props.toolbar ? 1 : 0}&zoom=${props.zoom}`
)

const height = computed(() =>
  typeof props.height === 'string' ? props.height : `${props.height}px`
)

const link = withBase(props.url)

const fullLink = `${
  isLinkHttp(link) || __VUEPRESS_SSR__ ? '' : window?.location.host || ''
}${link}`
</script>

<template>
  <div class="pdf-preview">
    <iframe
      class="pdf-iframe"
      :src="`${withBase(props.url)}${hash}`"
      :style="{
        'width': '100%',
        'height': height,
        'border-radius': '8px',
      }"
    />
    <button class="pdf-open-button" @click="window.open(fullLink)" />
  </div>
</template>

<style lang="scss" scoped></style>
