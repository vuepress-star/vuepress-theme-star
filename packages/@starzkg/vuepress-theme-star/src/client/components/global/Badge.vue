<template>
  <span
    class="badge"
    :class="type"
    :style="{
      verticalAlign: vertical,
      backgroundColor: color,
    }"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: false,
    default: 'tip',
  },
  text: {
    type: String,
    required: false,
    default: '',
  },
  color: {
    type: String,
    required: false,
    default: '',
  },
  vertical: {
    type: String,
    required: false,
    default: undefined,
  },
})
</script>
