<script lang="ts" setup>
import { Footer } from '@theme/components'
import { computed } from 'vue'
import { useScrollPromise } from '../../../composables/index.js'
import Content from './Content.vue'

// container classes
const containerClass = computed(() => ({
  container: true,
}))

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>

<template>
  <section ref="container" :class="containerClass">
    <slot name="page-main">
      <header class="container-header">
        <slot name="header" />
      </header>
      <Transition
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
      >
        <main class="container-content">
          <slot name="top" />
          <Content />
          <slot name="bottom" />
        </main>
      </Transition>
      <footer class="container-footer">
        <slot name="footer">
          <Footer />
        </slot>
      </footer>
    </slot>
  </section>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: auto;

  box-sizing: border-box;
  min-width: 0;
  transition: margin-left var(--t-transform), width var(--t-transform);
}

.container-header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 9;
}

.container-content {
  width: 100%;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  flex-direction: column;
}

.container-footer {
  min-width: min(60vw, var(--content-width));
  max-width: var(--content-width);
  width: 100%;
  margin: 0 auto;
}
</style>
