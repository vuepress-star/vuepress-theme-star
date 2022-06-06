<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { computed, ref } from 'vue'
import type { StarThemePageFrontmatter } from '../../shared'
import Content from '../components/Content.vue'
import Features from '../components/Features.vue'
import Footer from '../components/Footer.vue'
import Hero from '../components/Hero.vue'
import Links from '../components/Links.vue'
import Navbar from '../components/Navbar.vue'
import { useThemeLocaleData } from '../composables'

const frontmatter = usePageFrontmatter<StarThemePageFrontmatter>()
const themeLocale = useThemeLocaleData()

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
)

const content = ref<HTMLElement>()
const gotoContent = (): void => {
  if (typeof content.value !== 'undefined') {
    content.value.scrollTo({ top: window.outerHeight, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="home-container">
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
    <div ref="content" class="content">
      <header>
        <Hero />
        <Links />
      </header>
      <div class="arrow">
        <IconArrowDownBold @click="gotoContent" />
      </div>
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
