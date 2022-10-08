<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlantUML',
})
</script>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  code: {
    type: String,
    required: true,
  },
  preset: {
    type: String as PropType<'svg' | 'png' | 'txt'>,
    default: 'svg',
  },
})
const url = ref('')
onMounted(() => {
  const html = document.querySelector('html') as HTMLHtmlElement
  url.value = `https://www.plantuml.com/plantuml/${props.preset}/${props.code}`
  // watch theme change
  const observer = new MutationObserver(() => {
    url.value = `https://www.plantuml.com/plantuml/${props.preset}/${props.code}`
  })

  observer.observe(html, {
    attributeFilter: ['class'],
    attributes: true,
  })
})
</script>

<template>
  <div v-if="url" :id="id" class="markdown-enhance-plantuml">
    <img v-if="preset === 'png' || preset === 'svg'" :alt="id" :src="url" />
    <iframe
      v-else
      style="
        width: 100%;
        min-height: 400px;
        border: none;
        background-color: #000;
      "
      :src="url"
    />
  </div>
</template>
