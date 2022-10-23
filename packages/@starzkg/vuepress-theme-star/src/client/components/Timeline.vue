<script setup lang="ts">
import { timeline } from '@internal/timeline'
import { dayjs } from '@starzkg/vuepress-star-shared/client'
</script>

<template>
  <ul id="timeline" class="timeline">
    <li
      v-for="(year, i) in Object.keys(timeline).sort(
        (a, b) => Number(b) - Number(a)
      )"
      :key="i"
      class="timeline-year"
    >
      <span class="timeline-year-title">{{ year }}</span>
      <ul>
        <li
          v-for="(month, j) in Object.keys(timeline[year]).sort(
            (a, b) => Number(b) - Number(a)
          )"
          :key="j"
          class="timeline-month"
        >
          <span class="timeline-month-title">{{
            dayjs.monthsShort()[month]
          }}</span>
          <ul>
            <li
              v-for="(day, k) in Object.keys(timeline[year][month]).sort(
                (a, b) => Number(b) - Number(a)
              )"
              :key="k"
              class="timeline-day"
            >
              <span class="timeline-day-title">{{
                dayjs(new Date(year, month, day)).format('YYYY-MM-DD')
              }}</span>
              <ul class="article-list">
                <li
                  v-for="item in timeline[year][month][day]"
                  :key="item.path"
                  class="article-item"
                >
                  <div class="timeline-line">
                    <div class="timeline-line-icon-par">
                      <div class="timeline-line-icon"></div>
                    </div>
                    <div class="timeline-line-bottom"></div>
                  </div>
                  <RouterLink :to="item.path" class="timeline-content">
                    <div class="timeline-article-title">
                      {{ item.title }}
                    </div>
                    <div>
                      {{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}
                    </div>
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>
