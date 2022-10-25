<script setup lang="ts">
import Archive from '@theme/Archive.vue'
import CalendarGraph from '@theme/CalendarGraph.vue'
import Content from '@theme/Content.vue'
import Features from '@theme/Features.vue'
import Footer from '@theme/Footer.vue'
import Navbar from '@theme/Navbar.vue'
import ProfileCard from '@theme/ProfileCard.vue'
import Timeline from '@theme/Timeline.vue'
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
