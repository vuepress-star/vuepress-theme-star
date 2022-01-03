<script setup lang="ts">
import { ref } from 'vue'
import Content from '../components/Content.vue'
import Features from '../components/Features.vue'
import Footer from '../components/Footer.vue'
import Hero from '../components/Hero.vue'
import Links from '../components/Links.vue'

const content = ref<HTMLElement>()
const gotoContent = (): void => {
  if (typeof content.value !== 'undefined') {
    content.value.scrollTo({ top: window.outerHeight, behavior: 'smooth' })
  }
}
</script>

<template>
  <main class="home">
    <div ref="content" class="content">
      <header>
        <Hero />
        <Links />
      </header>
      <div class="arrow">
        <IconArrowDownBold @click="gotoContent" />
      </div>
      <main>
        <Features />
        <Content class="custom" />
        <Footer />
      </main>
    </div>
  </main>
</template>
