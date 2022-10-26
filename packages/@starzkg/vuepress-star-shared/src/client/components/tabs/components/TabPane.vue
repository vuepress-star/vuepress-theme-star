<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TabPane',
})
</script>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <div
    class="tab-pane"
    :class="{ 'tab-pane__active': active }"
    :aria-selected="active"
  >
    <slot />
  </div>
</template>
