<script setup lang="ts">
import { Content, PageMeta, PageNav } from '@theme/components'
</script>

<template>
  <div class="document-page">
    <slot name="top" />

    <Content />

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </div>
</template>
