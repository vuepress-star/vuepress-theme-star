<script setup lang="ts">
import ArchiveItem from './ArchiveItem.vue'

const archives = []
const years = []
const getMonths = (item): number[] => {
  return [2022]
}
</script>

<template>
  <div id="archive-box" class="archive-box">
    <div v-for="(item, index) in years" :key="index" class="archive-item">
      <div class="archive-year">
        <span class="archive-year-title">{{ item }}</span>
      </div>
      <ArchiveItem
        v-for="month in getMonths(item)"
        :key="month"
        :month="month"
        :year="item"
        :pages="archives"
      ></ArchiveItem>
    </div>
  </div>
</template>
