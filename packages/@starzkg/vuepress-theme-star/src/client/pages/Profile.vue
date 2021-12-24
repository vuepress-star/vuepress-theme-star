<script setup lang="ts">
import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import { computed } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../shared'
import ProfileInfo from '../components/ProfileInfo.vue'

const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()
const siteLocale = useSiteLocaleData()

// hero image and title
const heroImage = computed(() => {
  if (!frontmatter.value.heroImage) {
    return null
  }

  return withBase(frontmatter.value.heroImage)
})
const heroText = computed(() => {
  if (frontmatter.value.heroText === null) {
    return null
  }
  return frontmatter.value.heroText || siteLocale.value.title || 'Hello'
})
const heroAlt = computed(
  () => frontmatter.value.heroAlt || heroText.value || 'hero'
)
const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null
  }
  return (
    frontmatter.value.tagline ||
    siteLocale.value.description ||
    'Welcome to your VuePress site'
  )
})

// action buttons
const actions = computed(() => {
  if (!isArray(frontmatter.value.actions)) {
    return []
  }

  return frontmatter.value.actions.map(({ text, link, type = 'primary' }) => ({
    text,
    link,
    type,
  }))
})

// feature list
const features = computed(() => {
  if (isArray(frontmatter.value.features)) {
    return frontmatter.value.features
  }
  return []
})

// footer
const footer = computed(() => frontmatter.value.footer)
const footerHtml = computed(() => frontmatter.value.footerHtml)
</script>

<template>
  <main
    class="profile-page"
    :aria-labelledby="title ? 'main-title' : undefined"
  >
    <header class="profile-page-header"></header>

    <section class="profile-page-body">
      <aside class="profile-aside-wrapper">
        <ProfileInfo />
        <div class="profile-info-list"></div>
      </aside>

      <main class="profile-main-wrapper">
        <div v-if="features.length" class="features">
          <div v-for="feature in features" :key="feature.title" class="feature">
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.details }}</p>
          </div>
        </div>
        <div class="theme-star-content custom">
          <Content />
        </div>
        <div class="article-list"></div>
      </main>
    </section>

    <template v-if="footer">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <footer v-if="footerHtml" class="profile-page-footer" v-html="footer" />
      <footer v-else class="profile-page-footer" v-text="footer" />
    </template>
  </main>
</template>
