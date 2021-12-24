<script setup lang="ts">
import Content from '../../components/Content.vue'
import Features from '../../components/Features.vue'
import Footer from '../../components/Footer.vue'
import Hero from '../../components/Hero.vue'
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
