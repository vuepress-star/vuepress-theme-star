<script setup lang="ts">
import { useSiteLocaleData } from '@theme/composables'
import { computed } from 'vue'

const siteLocaleData = useSiteLocaleData()

const archives = computed(() => {
  return siteLocaleData.value.classifications?.archive || {}
})
</script>

<template>
  <ul id="archive" class="archive">
    <li
      v-for="(item, i) in Object.keys(archives)"
      :key="i"
      class="archive-item"
    >
      {{ item }}
    </li>
  </ul>
</template>
