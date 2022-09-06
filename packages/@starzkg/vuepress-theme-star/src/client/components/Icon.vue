<script lang="ts" setup>
import { withBase } from '@vuepress/client'
import { isLinkHttp } from '@vuepress/shared'

const props = defineProps({
  icon: {
    type: String,
    required: false,
    default: '',
  },
  color: {
    type: String,
    required: false,
    default: '',
  },
  size: {
    type: String,
    required: false,
    default: '',
  },
})
const icon = props.icon || ''
</script>

<template>
  <span class="icon">
    <img v-if="isLinkHttp(icon)" :src="icon" alt="icon" />
    <img v-else-if="icon.startsWith('/')" :src="withBase(icon)" alt="icon" />
    <Component :is="'icon-' + icon" v-else />
  </span>
</template>

<style lang="scss" scoped>
.icon {
  height: 1rem;
  width: 1rem;
  color: var(--theme-color);
  font-size: 1rem;
}
</style>
