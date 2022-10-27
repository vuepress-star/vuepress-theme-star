<script setup lang="ts">
import { Icon } from '@theme/components'
import { isArray } from '@vuepress/shared'
import { computed } from 'vue'
import { useThemeLocaleData } from '../../../composables/index.js'

const themeLocaleData = useThemeLocaleData()

const projects = computed(() => {
  if (!themeLocaleData.value.profile) {
    return []
  }
  if (isArray(themeLocaleData.value.profile.projects)) {
    return themeLocaleData.value.profile.projects
  }
  return []
})
</script>

<template>
  <div v-if="projects.length" class="projects">
    <div v-for="project in projects" :key="project.name" class="project">
      <a :href="project.link">
        <Icon v-if="project.icon" :icon="project.icon" size="32px" />
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
      </a>
    </div>
  </div>
</template>
