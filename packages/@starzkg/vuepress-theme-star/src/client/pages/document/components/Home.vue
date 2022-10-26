<script setup lang="ts">
import { Content, Features, Footer } from '@theme/components'
import HomeHero from './HomeHero.vue'
</script>

<template>
  <div class="document-home">
    <header>
      <HomeHero />
      <Features />
    </header>

    <main>
      <Content />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>
