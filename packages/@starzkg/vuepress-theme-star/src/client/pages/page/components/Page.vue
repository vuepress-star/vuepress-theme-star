<script setup lang="ts">
import { setupAside } from '@theme/composables'
import Aside from './Aside.vue'
import Container from './Container.vue'

setupAside()
</script>

<template>
  <div class="page">
    <Aside />
    <Container />
  </div>
</template>
