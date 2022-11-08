<script setup lang="ts">
import { Icon, ProfileCard, Sidebar } from '@theme/components'
import { useSidebar } from '../../../composables/index.js'
import Container from './Container.vue'

// sidebar
const sidebar = useSidebar()
</script>

<template>
  <div class="page">
    <aside class="aside">
      <div class="aside-container">
        <slot name="page-aside">
          <ProfileCard />
          <Sidebar>
            <template #top>
              <slot name="sidebar-top" />
            </template>
            <template #bottom>
              <slot name="sidebar-bottom" />
            </template>
          </Sidebar>
        </slot>
      </div>

      <div class="toggle-aside" @click="sidebar.toggle(!sidebar.open)">
        <Icon :icon="sidebar.open ? 'arrow-left-bold' : 'arrow-right-bold'" />
      </div>

      <div class="aside-mask" @click="sidebar.toggle(false)" />
    </aside>
    <Container />
  </div>
</template>
