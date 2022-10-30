<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TabPane',
})
</script>

<script setup lang="ts">
defineProps({
  name: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
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
    role="tabpanel"
    :aria-selected="active"
    :aria-expanded="active"
  >
    <slot />
  </div>
</template>
