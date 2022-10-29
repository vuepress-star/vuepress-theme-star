<script lang="ts">
/* eslint-disable import/first, import/no-duplicates, import/order */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticleList',
})
</script>

<script lang="ts" setup>
import Icon from './Icon.js'
import { computed, PropType } from 'vue'
import { usePagesMata } from '../composables/index.js'
const props = defineProps({
  pages: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const articleList = computed(() => usePagesMata(props.pages))
</script>

<template>
  <ul class="article-list">
    <li v-for="article in articleList" :key="article.path" class="article-item">
      <article class="article-box">
        <RouterLink :to="article.path">
          <div class="article-title">
            <h4>
              <Icon v-if="article.icon" :icon="article.icon" />
              {{ article.title || '无标题' }}
            </h4>
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
</template>

<style lang="scss" scoped>
.article-list,
.article-item {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.article-item + .article-item {
  border-top: 1px solid #f0f0f2;
}

.article-box {
  a {
    color: inherit;
    display: block;
    padding: 24px 0;
    margin: 0 24px;
  }

  .article-title {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;

    h4 {
      .icon {
        margin-right: 4px;
      }
      display: flex;
      align-items: center;
      color: inherit;
      margin: 0;
      padding: 0;
      font-size: 18px;
      font-weight: 500;
      line-height: 24px;
      overflow: hidden;
      white-space: normal;
      word-break: break-word;
    }
  }

  .article-content {
    color: var(--c-text-lighter);
    padding: 0;
    margin-top: 8px;
    line-height: 24px;
    overflow: hidden;
    white-space: normal;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .article-info {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
}
</style>
