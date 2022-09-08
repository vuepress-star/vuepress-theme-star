<script setup lang="ts">
import Content from '@theme/Content.vue'
import Features from '@theme/Features.vue'
import Footer from '@theme/Footer.vue'
import GithubCorner from '@theme/GithubCorner.vue'
import Hero from '@theme/Hero.vue'
import HomeArrow from '@theme/HomeArrow.vue'
import Navbar from '@theme/Navbar.vue'
import { usePageFrontmatter } from '@vuepress/client'
import { computed, ref } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../../shared/index.js'
import { useThemeLocaleData } from '../../composables/index.js'

defineEmits(['toggle-sidebar', 'toggle-navbar'])

const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()
const themeLocale = useThemeLocaleData()

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
)

const content = ref<HTMLElement>()
const gotoContent = (): void => {
  if (typeof content.value !== 'undefined') {
    content.value.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="home-container">
    <slot name="navbar">
      <Navbar
        v-if="shouldShowNavbar"
        @toggle-navbar="$emit('toggle-navbar')"
        @toggle-sidebar="$emit('toggle-sidebar')"
      >
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>
    <div ref="content" class="content">
      <header>
        <slot name="hero">
          <Hero />
        </slot>
        <GithubCorner />
        <HomeArrow @click="gotoContent" />
      </header>
      <main class="page">
        <Features />
        <slot name="top" />
        <Content class="custom" />
        <slot name="bottom" />
        <Footer />
      </main>
    </div>
  </div>
</template>
