<script setup lang="ts">
import Archive from '@theme/Archive.vue'
import Content from '@theme/Content.vue'
import Features from '@theme/Features.vue'
import Footer from '@theme/Footer.vue'
import ProfileInfo from '@theme/ProfileInfo.vue'
</script>

<template>
  <main class="profile-page">
    <header class="profile-page-header"></header>

    <section class="profile-page-body">
      <aside class="profile-aside-wrapper">
        <ProfileInfo />
        <Archive />
        <div class="profile-info-list"></div>
      </aside>

      <main class="profile-main-wrapper">
        <Features />
        <Content class="custom" />
        <div class="article-list"></div>
      </main>
    </section>

    <Footer class="profile-page-footer" />
  </main>
</template>
