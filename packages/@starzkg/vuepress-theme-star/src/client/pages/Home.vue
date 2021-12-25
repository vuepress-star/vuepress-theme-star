<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { ref } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../shared'
import Content from '../components/Content.vue'
import Features from '../components/Features.vue'
import Footer from '../components/Footer.vue'
import Hero from '../components/Hero.vue'
import Links from '../components/Links.vue'

const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()
const content = ref<HTMLElement>()
const gotoContent = (): void => {
  if (typeof content.value !== 'undefined') {
    content.value.scrollTo({ top: window.outerHeight, behavior: 'smooth' })
  }
}
</script>

<template>
  <main
    class="home"
    :style="{
      height: frontmatter.navbar === false ? '100vh' : '',
      paddingTop: frontmatter.navbar === false ? '0' : '',
    }"
  >
    <div ref="content" class="content">
      <header
        :style="{
          height: frontmatter.navbar === false ? '100vh' : undefined,
        }"
      >
        <Hero />
        <Links />
      </header>
      <div class="arrow">
        <IconArrowDownBold @click="gotoContent" />
      </div>
      <main
        :style="{
          minHeight:
            frontmatter.navbar === false ? 'calc(100vh - 2rem)' : undefined,
        }"
      >
        <Features />
        <Content class="custom" />
        <Footer />
      </main>
    </div>
  </main>
</template>
