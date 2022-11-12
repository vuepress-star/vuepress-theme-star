<template>
  <div class="toc">
    <div class="toc-header">此页内容</div>
    <slot name="top" />
    <Toc class="anchor" />
    <slot name="bottom" />
  </div>
</template>

<style lang="scss" scoped>
.toc {
  .toc-header {
    margin: 0 0 0.75rem 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
  }
}
</style>
