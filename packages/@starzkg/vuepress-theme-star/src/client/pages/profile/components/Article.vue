<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Article',
})
</script>

<script lang="ts" setup>
import { ArticleList } from '@theme/components'
import { useSiteLocaleData } from '@theme/composables'
import { computed } from 'vue'

const siteLocaleData = useSiteLocaleData()

const pages = computed((): string[] => {
  return siteLocaleData.value.classifications?.type?.page?.pages || []
})
</script>

<template>
  <ArticleList :pages="pages" />
</template>

<style lang="scss" scoped></style>
