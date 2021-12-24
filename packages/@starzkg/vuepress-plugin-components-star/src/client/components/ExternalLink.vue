<script lang="ts">
import { defineComponent } from 'vue'
import ExternalLinkIcon from './ExternalLinkIcon.vue'

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
    default: ExternalLinkIcon,
  },
  url: {
    type: String,
    required: true,
    default: '',
  },
})
</script>

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

<style scoped></style>
