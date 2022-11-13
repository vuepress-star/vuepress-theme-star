<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Category',
})
</script>

<script lang="ts" setup>
import { useSiteLocaleData } from '@theme/composables'
import { computed } from 'vue'

const siteLocaleData = useSiteLocaleData()

const categories = computed(() => {
  return siteLocaleData.value.classifications?.category || {}
})
</script>

<template>
  <ul class="category-list">
    <li
      v-for="category in Object.keys(categories)"
      :key="category"
      class="category rainbow"
    >
      <RouterLink :to="categories[category].path">
        {{ category }}
        <span class="category-num inner">{{
          categories[category].pages.length
        }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.category-list {
  margin: 0;
  padding: 0;
  list-style: none;

  font-size: 14px;

  a {
    color: inherit;
  }

  .category {
    vertical-align: middle;

    overflow: hidden;

    margin: 0.3rem 0.6rem 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.25rem;

    box-shadow: 0 1px 4px 0 var(--card-shadow);

    cursor: pointer;

    transition: background var(--color-transition),
      color var(--color-transition);

    .category-num {
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
}
</style>
