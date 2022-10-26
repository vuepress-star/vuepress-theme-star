<script setup lang="ts">
import {
  Content,
  Features,
  Footer,
  GithubCorner,
  Navbar,
} from '@theme/components'
import { ref } from 'vue'
import HomeArrow from './HomeArrow.vue'
import HomeHero from './HomeHero.vue'

const container = ref<HTMLElement>()
const gotoContainer = (): void => {
  if (typeof container.value !== 'undefined') {
    container.value.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="home">
    <header class="header">
      <slot name="header">
        <Navbar>
          <template #before>
            <slot name="navbar-before" />
          </template>
          <template #after>
            <slot name="navbar-after" />
          </template>
        </Navbar>
      </slot>
    </header>

    <main ref="container" class="container">
      <header class="container-header">
        <slot name="hero">
          <HomeHero />
        </slot>
        <GithubCorner />
        <HomeArrow @click="gotoContainer" />
      </header>
      <main class="container-content">
        <header>
          <Features />
        </header>
        <slot name="top" />
        <main>
          <Content class="custom" />
        </main>
        <slot name="bottom" />
        <footer>
          <Footer />
        </footer>
      </main>
    </main>
  </div>
</template>
