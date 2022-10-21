<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CalendarGraph',
})
</script>

<script lang="ts" setup>
// const props = defineProps({})
import { dayjs } from '@starzkg/vuepress-star-shared/client'
import { useSiteData } from '../composables/index.js'
import { computed, reactive } from 'vue'

const siteData = useSiteData()

interface CalendarGraphData {
  date: string
  count: number
  level: number
}

const size = 14

const graphLevel = reactive([0, 1, 8, 16, 32])

const graphData = computed(() => {
  const graph: CalendarGraphData[][] = []
  for (let week = 0; week <= 52; week++) {
    for (let day = 0; day < 7; day++) {
      const date = dayjs()
        .subtract((52 - week) * 7 - day + dayjs().day(), 'day')
        .format('YYYY-MM-DD')
      if (dayjs().isBefore(date)) {
        continue
      }
      const count = siteData.value.classifications.date?.[date]?.length || 0
      const level = graphLevel.filter((item) => item <= count).length - 1
      graph[week] = graph[week] || []
      graph[week].push({
        date,
        count,
        level,
      })
    }
  }
  return graph
})

const graphMonthData = computed(() => {
  const monthData = {}
  for (const week of graphData.value) {
    for (const day of week) {
      if (monthData[day.date.slice(0, 7)] === undefined) {
        monthData[day.date.slice(0, 7)] =
          size * 1.05 * graphData.value.indexOf(week)
        if (day.date.slice(8) === '01') {
          monthData[day.date.slice(0, 7)] += size
        }
      }
    }
  }
  return monthData
})
</script>

<template>
  <div
    class="calendar-graph"
    :data-from="dayjs(graphData[0][0].date).startOf('day').format()"
    :data-to="dayjs().endOf('day').format()"
  >
    <svg class="calendar-graph-svg" :width="53 * (size + 1) + 30" height="128">
      <g transform="translate(30,20)">
        <g
          v-for="(week, i) in graphData"
          :key="i"
          :transform="'translate(' + i * size + ',0)'"
        >
          <rect
            v-for="(day, j) in week"
            :key="j"
            class="ContributionCalendar-day"
            :width="size * 0.75"
            :height="size * 0.75"
            :x="i"
            :y="j * size"
            rx="2"
            ry="2"
            :data-count="day.count"
            :data-date="day.date"
            :data-level="day.level"
          />
        </g>
        <text
          v-for="(value, key) in graphMonthData"
          :key="key"
          :x="value"
          y="-7"
          class="ContributionCalendar-label"
        >
          {{ dayjs.monthsShort()[Number(key.slice(5, 7)) - 1] }}
        </text>
        <text
          v-for="i in 7"
          :key="i"
          text-anchor="start"
          class="ContributionCalendar-label"
          dx="-30"
          :dy="i * size - 6"
        >
          {{ dayjs.weekdaysShort()[i - 1] }}
        </text>
      </g>
    </svg>
    <div style="width: 100%">
      <div class="float-left">
        <a
          href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile"
          class="Link--muted"
        >
          Learn how we count contributions</a
        >
      </div>
      <div
        class="float-right"
        title="A summary of pull requests, issues opened, and commits to the default and gh-pages branches."
      >
        Less
        <svg
          v-for="(_, index) in graphLevel"
          :key="index"
          :width="size"
          :height="size * 0.75"
          class="d-inline-block"
        >
          <rect
            :width="size * 0.75"
            :height="size * 0.75"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            :data-level="index"
          ></rect>
        </svg>
        More
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
