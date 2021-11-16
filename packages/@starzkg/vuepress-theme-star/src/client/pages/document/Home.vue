<template>
  <div
    class="document home"
    :style="{
      height: frontmatter.navbar === false ? '100vh' : '',
      paddingTop: frontmatter.navbar === false ? '0' : '',
    }"
    :aria-labelledby="heroText ? 'main-title' : undefined"
  >
    <div
      class="wrapper"
      :style="{
        height: frontmatter.navbar === false ? '100vh' : '',
      }"
    >
      <canvas id="vuepress-canvas-hack" style=""></canvas>
    </div>

    <div
      class="content"
      :style="{ height: frontmatter.navbar === false ? '100vh' : '' }"
    >
      <header>
        <div class="hero">
          <img v-if="heroImage" :src="heroImage" :alt="heroAlt" />

          <h1 v-if="heroText" id="main-title">
            {{ heroText }}
          </h1>

          <p v-if="tagline" class="description">
            {{ tagline }}
          </p>

          <p v-if="actions.length" class="actions">
            <NavLink
              v-for="action in actions"
              :key="action.text"
              class="action-button"
              :class="[action.type]"
              :item="action"
            />
          </p>
        </div>
      </header>
      <main
        :style="{
          minHeight:
            frontmatter.navbar === false ? 'calc(100vh - 2rem)' : undefined,
          marginTop: frontmatter.navbar === false ? '100vh' : undefined,
        }"
      >
        <div v-if="features.length" class="features">
          <div v-for="feature in features" :key="feature.title" class="feature">
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.details }}</p>
          </div>
        </div>

        <div class="theme-star-content custom">
          <Content />
        </div>

        <template v-if="footer">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-if="footerHtml" class="footer" v-html="footer" />
          <div v-else class="footer" v-text="footer" />
        </template>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import { computed, onMounted } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../../shared'
import NavLink from '../../components/NavLink.vue'

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

onMounted(() => {
  const renderCanvas = document.getElementById(
    'vuepress-canvas-hack'
  ) as HTMLCanvasElement
  const yPositions: number[] = Array(500)
  for (let i = 0; i < 500; i++) {
    yPositions[i] = 0
  }
  const width = (renderCanvas.width = window.innerWidth)
  const height = (renderCanvas.height = window.innerHeight)
  const ctx = renderCanvas.getContext('2d')
  if (ctx != null) {
    setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = 'green'
      ctx.font = '10pt Georgia'

      // eslint-disable-next-line array-callback-return
      yPositions.map((y, index) => {
        const text = String.fromCharCode(1e2 + Math.random() * 33)
        const x = index * 10 + 10
        ctx.fillText(text, x, y)
        if (y > Math.random() * 1e4) {
          yPositions[index] = 0
        } else {
          yPositions[index] = y + 10
        }
      })
    }, 30)
  }
})
</script>
