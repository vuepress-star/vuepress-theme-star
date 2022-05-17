<script setup lang="ts">
import { usePageFrontmatter, withBase } from '@vuepress/client'
import { computed } from 'vue'
import { useSiteData } from '../composables'
import Links from './Links.vue'
import PanThumb from './PanThumb.vue'

interface ProfileInfoFrontmatter {
  author?: string
  avatar?: string
  intro?: string
  links?: {
    text: string
    icon: string
    url: string
  }[]
}

const siteData = useSiteData()
const frontmatter = usePageFrontmatter<ProfileInfoFrontmatter>()

const author = computed(() => {
  return frontmatter.value.author
})

const avatar = computed(() => {
  if (frontmatter.value.avatar === undefined) {
    return ''
  }
  return frontmatter.value.avatar.startsWith('http')
    ? frontmatter.value.avatar
    : withBase(frontmatter.value.avatar)
})

const intro = computed(() => {
  return frontmatter.value.intro
})

const pageNum = computed(() => {
  return siteData.value.classifications?.type?.Page?.length || 0
})

const categoryNum = computed(() => {
  return Object.keys(siteData.value.classifications?.category).length || 0
})

const tagNum = computed(() => {
  return Object.keys(siteData.value.classifications?.tag).length || 0
})
</script>

<template>
  <div class="profile-info" vocab="https://schema.org/" typeof="Person">
    <div
      class="author"
      :class="{ hasIntro: intro !== undefined }"
      :data-balloon-pos="intro !== undefined ? 'down' : ''"
      role="navigation"
    >
      <PanThumb
        class="avatar"
        :class="{ round: true }"
        property="image"
        alt="Blogger Avatar"
        :image="avatar"
      />
      <div v-if="author" class="name" property="name" v-text="author" />
      <meta v-if="intro" property="url" :content="intro" />
    </div>
    <div class="num-wrapper">
      <div @click="navigate('/article/')">
        <div class="num">{{ pageNum }}</div>
        <div>文章</div>
      </div>
      <div @click="navigate('/category/')">
        <div class="num">{{ categoryNum }}</div>
        <div>分类</div>
      </div>
      <div @click="navigate('/tag/')">
        <div class="num">{{ tagNum }}</div>
        <div>标签</div>
      </div>
      <div @click="navigate('/timeline/')">
        <div class="num">{{ $archive.length }}</div>
        <div>归档</div>
      </div>
    </div>
    <Links />
  </div>
</template>

<style scoped lang="scss">
.profile-info {
  &.page {
    background: var(--bgcolor);
  }

  .author {
    padding: 8px 0;
    text-align: center;

    &.hasIntro {
      cursor: pointer;
    }

    .avatar {
      width: 128px;
      height: 128px;
      margin: 0 auto;

      &.round {
        border-radius: 50%;
      }
    }

    .name {
      margin: 16px auto;
      font-size: 22px;
    }
  }
  .num-wrapper {
    display: flex;
    margin: 0 auto 16px;
    width: 80%;

    > div {
      width: 25%;
      text-align: center;
      font-size: 13px;
      cursor: pointer;

      &:hover {
        color: var(--accent-color);
      }

      .num {
        position: relative;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 20px;
      }
    }
  }

  .links {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 8px auto;
  }
}
</style>
