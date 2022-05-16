<script setup lang="ts">
import Content from '@theme/Content.vue'
import Features from '@theme/Features.vue'
import Footer from '@theme/Footer.vue'
import Hero from '@theme/Hero.vue'
</script>

<template>
  <main class="document-home">
    <header>
      <Hero />
    </header>

    <Features />

    <main>
      <Content />
    </main>

    <footer>
      <Footer />
    </footer>
  </main>
</template>
