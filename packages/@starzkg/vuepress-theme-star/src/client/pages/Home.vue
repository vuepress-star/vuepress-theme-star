<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { computed, ref } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../shared/index.js'
import Content from '../components/Content.vue'
import Features from '../components/Features.vue'
import Footer from '../components/Footer.vue'
import GithubCorner from '../components/GithubCorner.vue'
import Hero from '../components/Hero.vue'
import HomeArrow from '../components/HomeArrow.vue'
import Navbar from '../components/Navbar.vue'
import { useThemeLocaleData } from '../composables/index.js'

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
        <Hero />
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
