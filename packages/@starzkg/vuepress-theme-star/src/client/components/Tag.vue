<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tag',
})
</script>

<script lang="ts" setup>
import { useSiteLocaleData } from '@theme/composables'
import { computed } from 'vue'

const siteLocaleData = useSiteLocaleData()

const tags = computed(() => {
  return siteLocaleData.value.classifications?.tag || {}
})
</script>

<template>
  <ul class="tag-list">
    <li v-for="tag in Object.keys(tags)" :key="tag" class="tag rainbow">
      <RouterLink :to="tags[tag].path">
        {{ tag }}
        <span class="tag-num inner">{{ tags[tag].pages.length }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.tag-list {
  margin: 0;
  padding: 0;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  list-style: none;

  a {
    color: inherit;
  }

  .tag {
    position: relative;

    display: inline-block;
    vertical-align: middle;

    overflow: hidden;

    min-width: 24px;
    margin: 4px 6px;
    padding: 3px 8px;
    border-radius: 8px;

    box-shadow: 0 1px 6px 0 var(--box-shadow);

    font-size: 12px;
    text-align: center;

    cursor: pointer;

    transition: background var(--color-transition),
      box-shadow var(--color-transition), transform var(--color-transition);

    &:hover {
      cursor: pointer;
    }

    &.active {
      transform: scale(1.1, 1.1);
    }
  }

  .tag-num {
    display: inline-block;

    min-width: 1rem;
    height: 1.2rem;
    margin-left: 0.2em;
    padding: 0 0.1rem;
    border-radius: 0.6rem;

    color: #fff;

    font-size: 0.7rem;
    line-height: 1.2rem;
    text-align: center;
  }
}
</style>
