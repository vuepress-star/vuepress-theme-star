<script setup lang="ts">
import { TabPane, Tabs } from '@starzkg/vuepress-star-shared/client'
import {
  Archive,
  CalendarGraph,
  Features,
  Footer,
  Navbar,
  ProfileCard,
  Timeline,
} from '@theme/components'
import { defineAsyncComponent, FunctionalComponent, h } from 'vue'

const OrderedTabs: FunctionalComponent = () => {
  return h(Tabs, {}, () =>
    [
      {
        name: 'Overview',
        component: defineAsyncComponent({
          // 加载函数
          loader: () => import('./Overview.vue'),

          // 加载异步组件时使用的组件
          // loadingComponent: LoadingComponent,
          // 展示加载组件前的延迟时间，默认为 200ms
          delay: 200,

          // 加载失败后展示的组件
          // errorComponent: ErrorComponent,
          // 如果提供了一个 timeout 时间限制，并超时了
          // 也会显示这里配置的报错组件，默认值是：Infinity
          timeout: 3000,
        }),
      },
      {
        name: 'Article',
        component: h('div', { class: 'article-list' }),
      },
      {
        name: 'Projects',
        component: Features,
      },
      {
        name: 'Calendar',
        component: CalendarGraph,
      },
      {
        name: 'Timeline',
        component: Timeline,
      },
      {
        name: 'Archive',
        component: Archive,
      },
    ].map((item) => h(TabPane, { title: item.name }, () => h(item.component)))
  )
}
</script>

<template>
  <div class="profile">
    <header class="profile-header">
      <slot name="navbar">
        <Navbar>
          <template #before>
            <slot name="navbar-before" />
          </template>
          <template #after>
            <slot name="navbar-after" />
          </template>
        </Navbar>
      </slot>
      <div class="profile-banner" />
    </header>

    <section class="profile-body">
      <aside class="profile-aside">
        <ProfileCard class="mobile-show" />
        <div class="profile-info-list"></div>
      </aside>
      <main class="profile-main">
        <OrderedTabs />
      </main>
    </section>

    <footer class="profile-footer">
      <Footer />
    </footer>
  </div>
</template>
