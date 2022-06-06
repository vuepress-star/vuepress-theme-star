<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export interface Archive {
  title: string
  path: string
  createdTime: number
  updatedTime: number
  archiveTime: number
  year: number
  month: number
  day: number
  time: string
}

const props = defineProps({
  month: {
    type: Number,
    default: 1,
  },
  year: {
    type: Number,
    default: 1970,
  },
  pages: {
    type: Array,
    default() {
      return []
    },
  },
})
const router = useRouter()

const { month, year, pages } = toRefs(props)

const currentPages = computed(() => {
  return (pages?.value as Archive[])
    .filter(
      (archive) =>
        archive.year === year?.value && archive.month === month?.value
    )
    .sort((a, b) => b.archiveTime - a.archiveTime)
})

const goPage = (path): void => {
  router.push(path)
}
</script>

<template>
  <div id="timeline-single" class="timeline-single">
    <div id="timeline-create-links" class="timeline-create-links">
      <div id="timeline-create-time" class="timeline-create-time">
        <span>{{ month }} 月 {{ currentPages.length }} 篇</span>
      </div>

      <div id="timeline-create-link-single" class="timeline-create-link-single">
        <ul>
          <li v-for="(item, index) in currentPages" :key="index">
            <div class="timeline-line">
              <div class="timeline-line-icon-par">
                <div class="timeline-line-icon"></div>
              </div>
              <div class="timeline-line-bottom"></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-title">
                <span @click="goPage(item.path)">{{ item.title }}</span>
              </div>
              <div class="timeline-create-page-time">
                <span>{{ item.time }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
