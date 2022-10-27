<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Article',
})
</script>

<script lang="ts" setup>
import type { ArticleRecord } from '../../../../shared/index.js'
import { articles } from '@internal/articles'
import { useInfiniteScroll } from '@vueuse/core'
import { onMounted, ref } from 'vue'
const articleList = ref<ArticleRecord[]>(articles.slice(0, 10))

onMounted(() => {
  useInfiniteScroll(
    window,
    () => {
      // load more
      articleList.value.push(
        ...articles
          .slice(articleList.value.length, articleList.value.length + 5)
          .map((item) => {
            const div = document.createElement('div')
            div.innerHTML = item.excerpt
            item.excerpt = div.innerText
            return item
          })
      )
    },
    { distance: 10 }
  )
})
</script>

<template>
  <div class="article">
    <ul>
      <li
        v-for="article in articleList"
        :key="article.path"
        class="article-item"
      >
        <article class="article-box">
          <RouterLink :to="article.path">
            <div class="article-title">
              <h4>{{ article.title || '无标题' }}</h4>
            </div>
            <div class="article-content">
              {{ article.excerpt }}
            </div>
            <div class="article-info">
              <div class="article-info-left">{{ article.date }}</div>
            </div>
          </RouterLink>
        </article>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
