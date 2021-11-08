<template>
  <span
    class="badge"
    :class="[type, isDot ? 'is-dot' : '']"
    :style="{
      verticalAlign: vertical,
      backgroundColor: color,
    }"
  >
    <slot v-if="!isDot">{{ text }}</slot>
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
  isDot: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
