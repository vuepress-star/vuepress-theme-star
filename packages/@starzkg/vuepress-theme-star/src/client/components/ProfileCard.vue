<script setup lang="ts">
import { usePageFrontmatter, withBase } from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSiteData, useThemeLocaleData } from '../composables/index.js'
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

const route = useRoute()
const router = useRouter()

const siteData = useSiteData()
const themeLocale = useThemeLocaleData()
const frontmatter = usePageFrontmatter<ProfileInfoFrontmatter>()

const author = computed(() => {
  return frontmatter.value.author || themeLocale.value.profile?.name
})

const avatar = computed(() => {
  const avatar = frontmatter.value.avatar || themeLocale.value.profile?.avatar
  if (avatar === undefined) {
    return ''
  }
  return avatar.startsWith('http') ? avatar : withBase(avatar)
})

const intro = computed(() => {
  return frontmatter.value.intro || themeLocale.value.profile?.intro
})

const navigate = (path: string): void => {
  if (route.path !== path) router.push(path)
}

const pageNum = computed(() => {
  return siteData.value.classifications?.type?.Page?.length || 0
})

const categoryNum = computed(() => {
  return Object.keys(siteData.value.classifications?.category).length || 0
})

const tagNum = computed(() => {
  return Object.keys(siteData.value.classifications?.tag).length || 0
})

const archiveNum = computed(() => {
  return Object.keys(siteData.value.classifications?.date).length || 0
})

const links = computed(() => {
  if (!isArray(frontmatter.value.links)) {
    return []
  }
  return frontmatter.value.links.map(({ text, icon, url }) => {
    return {
      text,
      icon:
        icon === undefined
          ? icon
          : (icon.startsWith('icon-social-') ? '' : 'icon-social-') + icon,
      url,
    }
  })
})
</script>

<template>
  <div class="profile-card" vocab="https://schema.org/" typeof="Person">
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
        <div class="num">{{ archiveNum }}</div>
        <div>归档</div>
      </div>
    </div>
    <div class="links">
      <ExternalLink v-for="link in links" :key="link.url" v-bind="link" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-card {
  background: var(--c-bg);

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
