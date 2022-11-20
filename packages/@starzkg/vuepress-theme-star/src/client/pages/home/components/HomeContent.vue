<script lang="ts" setup>
import { Comment, Content, Features } from '@theme/components'
</script>

<template>
  <div>
    <header>
      <Features />
    </header>
    <main>
      <Content>
        <template #content-top>
          <slot name="home-content-top" />
        </template>
        <template #content-bottom>
          <slot name="home-content-bottom" />
        </template>
      </Content>
    </main>
    <footer>
      <Comment />
    </footer>
  </div>
</template>

<style lang="scss" scoped></style>
