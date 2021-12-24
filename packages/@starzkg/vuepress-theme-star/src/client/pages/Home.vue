<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { onMounted } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../shared'
import Content from '../components/Content.vue'
import Features from '../components/Features.vue'
import Footer from '../components/Footer.vue'
import Hero from '../components/Hero.vue'
import Links from '../components/Links.vue'

const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()

onMounted(() => {
  const renderCanvas = document.getElementById(
    'vuepress-canvas-hack'
  ) as HTMLCanvasElement
  const yPositions: number[] = Array(500)
  for (let i = 0; i < 500; i++) {
    yPositions[i] = 0
  }
  let width = (renderCanvas.width = window.innerWidth)
  let height = (renderCanvas.height = window.innerHeight)
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
  window.addEventListener('resize', () => {
    width = renderCanvas.width = window.innerWidth
    height = renderCanvas.height = window.innerHeight
  })
})
</script>

<template>
  <div
    class="home"
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
  </div>
</template>
