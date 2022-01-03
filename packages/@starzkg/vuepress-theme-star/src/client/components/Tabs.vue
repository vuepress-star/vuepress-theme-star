<script>
export default {
  name: 'Tabs',
}
</script>

<template>
  <div class="tabs">
    <Transition name="fade-slide-y" mode="out-in">
      <div class="tabs-switch">11</div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  display: flex;
}
</style>
