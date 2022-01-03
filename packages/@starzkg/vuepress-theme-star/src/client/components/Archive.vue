<script setup lang="ts">
import { useArchive } from '@starzkg/vuepress-plugin-archive/lib/client'
import ArchiveItem from './ArchiveItem.vue'

const archives = useArchive().value
const years = [
  ...new Set(archives.map((archive) => archive.year).sort((a, b) => b - a)),
]
const getMonths = (item): number[] => {
  return [
    ...new Set(
      archives
        .filter((archive) => archive.year === item)
        .map((archive) => archive.month)
    ),
  ].sort((a, b) => b - a)
}
</script>

<template>
  <div id="timeline-box" class="timeline-box">
    <div v-for="(item, index) in years" :key="index" class="timeline-item">
      <div class="timeline-year">
        <span class="timeline-year-title">{{ item }}</span>
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
