<script lang="ts">
import { defineComponent } from 'vue'
import BackToTop from './BackToTop'
import ScreenFull from './ScreenFull'
export default defineComponent({
  name: 'Suspension',
  components: {
    BackToTop,
    ScreenFull,
  },
  setup() {
    const l = 0
  },
})
</script>

<template>
  <div class="suspension">
    <TransitionGroup name="fade">
      <BackToTop class="suspension-item" />
      <ScreenFull class="suspension-item" />
    </TransitionGroup>
  </div>
</template>
