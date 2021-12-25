<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import PageMeta from '@vuepress/theme-default/lib/client/components/PageMeta.vue'
// eslint-disable-next-line import/no-extraneous-dependencies
import PageNav from '@vuepress/theme-default/lib/client/components/PageNav.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Page',

  components: {
    PageMeta,
    PageNav,
  },
})
</script>

<template>
  <main class="page">
    <slot name="top" />

    <PageInfo />

    <div class="theme-default-content">
      <Content />
    </div>

    <PageMeta />

    <PageNav />

    <Comment />

    <slot name="bottom" />
  </main>
</template>
