<template>
  <a
    class="external-link"
    :href="url"
    rel="noopener noreferrer"
    target="_blank"
    :aria-label="text || url"
    data-balloon-pos="up"
  >
    <span class="link-text sr-only" v-text="text || url" />
    <Component :is="icon" class="link-icon" />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExternalLink',
})
</script>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: false,
    default: '',
  },
  icon: {
    type: [String, Object],
    required: false,
    default: '',
  },
  url: {
    type: String,
    required: true,
    default: '',
  },
})
</script>

<style scoped></style>
