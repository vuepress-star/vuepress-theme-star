<script lang="ts" setup>
import { Comment, Content, Features, GithubCorner } from '@theme/components'
</script>

<template>
  <main>
    <header>
      <GithubCorner />
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
  </main>
</template>

<style lang="scss" scoped></style>
