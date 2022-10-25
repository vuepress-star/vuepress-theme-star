<script setup lang="ts">
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
        <Archive />
        <Timeline />
        <div class="profile-info-list"></div>
      </aside>

      <main class="profile-main">
        <nav>
          <ul>
            <li></li>
          </ul>
        </nav>
        <section></section>
        <Features />
        <CalendarGraph />
        <Content class="custom" />
        <div class="article-list"></div>
      </main>
    </section>

    <footer class="profile-footer">
      <Footer />
    </footer>
  </div>
</template>
