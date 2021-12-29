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

<style lang="scss" scoped>
.external-link {
  width: 26px;
  height: 26px;
  margin: 4px;
  transform: scale(1, 1);
  transition: transform 0.18s ease-out 0.18s;

  &:hover {
    cursor: pointer;
    transform: scale(1.2, 1.2);
  }

  &::after {
    --balloon-font-size: 8px;
    padding: 0.3em 0.6em;
  }

  .link-icon {
    width: 100%;
    height: 100%;
  }
}
</style>
