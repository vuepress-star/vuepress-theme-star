<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import type { StarThemeHomePageFrontmatter } from '../../shared'
import Content from '../components/Content.vue'
import Features from '../components/Features.vue'
import Footer from '../components/Footer.vue'
import Hero from '../components/Hero.vue'
import Links from '../components/Links.vue'

const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()
</script>

<template>
  <main
    class="home"
    :style="{
      height: frontmatter.navbar === false ? '100vh' : '',
      paddingTop: frontmatter.navbar === false ? '0' : '',
    }"
  >
    <div class="content">
      <header
        :style="{
          height: frontmatter.navbar === false ? '100vh' : undefined,
        }"
      >
        <Hero />
        <Links />
      </header>
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
