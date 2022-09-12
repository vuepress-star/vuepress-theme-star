<script setup lang="ts">
import Content from '@theme/Content.vue'
import Features from '@theme/Features.vue'
import Footer from '@theme/Footer.vue'
import GithubCorner from '@theme/GithubCorner.vue'
import Hero from '@theme/Hero.vue'
import HomeArrow from '@theme/HomeArrow.vue'
import Navbar from '@theme/Navbar.vue'
import VueTypedJs from '@theme/VueTypedJs.vue'
import { usePageFrontmatter } from '@vuepress/client'
import { computed, ref } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../../shared/index.js'
import { useThemeLocaleData } from '../../composables/index.js'

const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()
const themeLocale = useThemeLocaleData()

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
)

const container = ref<HTMLElement>()
const gotoContainer = (): void => {
  if (typeof container.value !== 'undefined') {
    container.value.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="home">
    <slot name="navbar">
      <Navbar v-if="shouldShowNavbar">
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>
    <main ref="container" class="container">
      <header class="container-header">
        <slot name="hero">
          <Hero />
        </slot>
        <GithubCorner />
        <div style="height: 2rem">
          <VueTypedJs :strings="['Hello World!', 'Hello Vuepress!']" loop />
        </div>
        <HomeArrow @click="gotoContainer" />
      </header>
      <main class="container-content">
        <Features />
        <slot name="top" />
        <Content class="custom" />
        <slot name="bottom" />
        <Footer />
      </main>
    </main>
  </div>
</template>
