<script setup lang="ts">
import {
  Content,
  Features,
  Footer,
  GithubCorner,
  Hero,
  HomeArrow,
  Navbar,
} from '@theme/components'
import { ref } from 'vue'

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
          <Hero />
        </slot>
        <GithubCorner />
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
