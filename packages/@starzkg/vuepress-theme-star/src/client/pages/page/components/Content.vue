<script lang="ts" setup>
import {
  BreadCrumb,
  Catalogue,
  Comment,
  Content,
  PageInfo,
  PageMeta,
  PageNav,
  Toc,
} from '@theme/components'
</script>

<template>
  <div class="content">
    <header class="content-header">
      <slot name="page-content-header-top" />
      <BreadCrumb />
      <PageInfo />
      <slot name="page-content-header-bottom" />
    </header>
    <aside class="content-aside">
      <div class="aside-container">
        <slot name="page-content-aside-top" />
        <Toc />
        <Catalogue />
        <slot name="page-content-aside-bottom" />
      </div>
    </aside>
    <main class="content-main">
      <slot name="page-content-main-top" />
      <Content>
        <template #content-top>
          <slot name="page-content-top" />
        </template>
        <template #content-bottom>
          <slot name="page-content-bottom" />
        </template>
      </Content>
      <slot name="page-content-main-bottom" />
    </main>
    <footer class="content-footer">
      <slot name="page-content-footer-top" />
      <PageMeta />

      <PageNav />

      <Comment />
      <slot name="page-content-footer-bottom" />
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

  .content-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 40vh;
    min-height: 400px;
  }

  .content-aside {
    position: sticky;
    top: 0;
    z-index: 9;

    .aside-container {
      position: absolute;
      left: 100%;
      margin-left: 1rem;
      padding-top: 0.5rem;
      height: max-content;
      max-height: 100vh;
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      background: transparent;
      background: var(--c-bg);

      width: var(--page-aside-width);
      z-index: 10;
      top: 0;
      right: 0;
      bottom: 0;
      box-sizing: border-box;
      border-radius: 2px;
      flex-shrink: 0;
      background-color: var(--c-bg-sidebar);
      transition: transform var(--t-transform), background-color var(--t-color),
        border-color var(--t-color), right var(--t-transform);

      > * {
        flex-shrink: 0;
        flex-grow: 1;
        border-radius: 2px;
        overflow-y: auto;
      }
      > * + * {
        margin-top: 1rem;
      }

      &::-webkit-scrollbar-track-piece {
        background: transparent;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar {
        width: 3px;
      }

      &::-webkit-scrollbar-thumb:vertical {
        background: var(--c-fg);
      }
    }
  }

  .content-main {
    width: 100%;
    flex-shrink: 0;

    .theme-star-content,
    .theme-star-content {
      @include content_wrapper;
      padding-top: 0;
      background: var(--c-bg);
    }
  }

  .content-footer {
    width: 100%;
    background: var(--c-bg);
  }
}

@media (max-width: $lg) {
  .content {
    .content-aside {
      .aside-container {
        position: fixed;
        height: 100vh;
        right: calc(-1 * var(--page-aside-width));
        left: unset;
        z-index: 9;
      }
    }
  }
}
</style>

<style lang="scss">
@import '../styles/variables';
@media (max-width: $lg) {
  .sidebar-open .content {
    .content-aside {
      .aside-container {
        right: 0;
      }
    }
  }
}
</style>
