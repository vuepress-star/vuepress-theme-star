<script lang="ts" setup>
import {
  BreadCrumb,
  Content,
  PageInfo,
  PageMeta,
  PageNav,
  Toc,
} from '@theme/components'
import { useDarkMode } from '@theme/composables'

const darkMode = useDarkMode()
</script>

<template>
  <div class="content">
    <header class="content-header">
      <BreadCrumb />
      <PageInfo />
    </header>
    <section class="content-container">
      <main class="content-main">
        <Content />
      </main>
      <aside class="content-aside">
        <Toc />
      </aside>
    </section>
    <footer class="content-footer">
      <PageMeta />

      <PageNav />

      <Comment :dark-mode="darkMode" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixins';
@import '../styles/variables';

.content {
  min-width: min(60vw, var(--content-width));
  max-width: var(--content-width);
  width: 100%;
  margin: 0 auto;
  border-radius: 2px;
  position: relative;

  .content-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 40vh;
  }

  .content-container {
    position: relative;
  }

  .content-aside {
    position: absolute;
    top: 0;
    left: 100%;
    padding-left: 2rem;
    width: 100%;
    max-width: 256px;
  }

  .content-main {
    .theme-star-content,
    .theme-star-content {
      @include content_wrapper;
      padding-top: 0;
      background: var(--c-bg);
    }
  }

  .content-footer {
    background: var(--c-bg);
  }

  @media (max-width: ($md)) {
    .content-aside {
      display: none;
    }
  }
}
</style>
