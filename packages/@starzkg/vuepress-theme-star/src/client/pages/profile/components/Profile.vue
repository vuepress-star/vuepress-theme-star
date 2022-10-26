<script setup lang="ts">
import { TabPane, Tabs } from '@starzkg/vuepress-star-shared/client'
import {
  Archive,
  CalendarGraph,
  Content,
  Features,
  Footer,
  Navbar,
  ProfileCard,
  Timeline,
} from '@theme/components'
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
        <Tabs>
          <TabPane title="Overview">
            <Content class="custom" />
          </TabPane>
          <TabPane title="Article">
            <div class="article-list"></div>
          </TabPane>
          <TabPane title="Projects">
            <Features />
          </TabPane>
          <TabPane title="Calendar">
            <CalendarGraph />
          </TabPane>
          <TabPane title="Timeline">
            <Timeline />
          </TabPane>
          <TabPane title="Archive">
            <Archive />
          </TabPane>
        </Tabs>
      </main>
    </section>

    <footer class="profile-footer">
      <Footer />
    </footer>
  </div>
</template>
