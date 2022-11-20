<script setup lang="ts">
import { Footer, GithubCorner, Nav } from '@theme/components'
import { useScroll } from '@vueuse/core'
import { ref } from 'vue'
import HomeArrow from './HomeArrow.vue'
import HomeContent from './HomeContent.vue'
import HomeHero from './HomeHero.vue'

const container = ref<HTMLElement | null>(null)
const { y } = useScroll(container, { behavior: 'smooth' })
const gotoContainer = (): void => {
  y.value = window.innerHeight
}
</script>

<template>
  <div class="home">
    <section ref="container" class="container">
      <header class="container-header">
        <slot name="header">
          <Nav>
            <template #nav-bar-title-before>
              <slot name="nav-bar-title-before" />
            </template>
            <template #nav-bar-title-after>
              <slot name="nav-bar-title-after" />
            </template>
            <template #nav-bar-content-before>
              <slot name="nav-bar-content-before" />
            </template>
            <template #nav-bar-content-after>
              <slot name="nav-bar-content-after" />
            </template>
            <template #nav-screen-content-before>
              <slot name="nav-screen-content-before" />
            </template>
            <template #nav-screen-content-after>
              <slot name="nav-screen-content-after" />
            </template>
          </Nav>
          <slot name="hero">
            <HomeHero>
              <template #home-hero-before>
                <slot name="home-hero-before" />
              </template>
              <template #home-hero-after>
                <slot name="home-hero-after" />
              </template>
            </HomeHero>
          </slot>
          <HomeArrow @click="gotoContainer" />
        </slot>
      </header>

      <main class="container-content">
        <GithubCorner />
        <HomeContent class="container-content-wrapper">
          <template #home-content-top>
            <slot name="home-content-top" />
          </template>
          <template #home-content-bottom>
            <slot name="home-content-bottom" />
          </template>
        </HomeContent>
      </main>

      <footer class="container-footer">
        <slot name="home-footer-top" />
        <Footer />
        <slot name="home-footer-bottom" />
      </footer>
    </section>
  </div>
</template>
