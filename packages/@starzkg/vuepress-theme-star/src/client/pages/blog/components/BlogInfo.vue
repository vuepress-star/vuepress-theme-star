<template>
  <div class="blog-info" vocab="https://schema.org/" typeof="Person">
    <div
      class="blogger"
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
      <div v-if="blogger" class="name" property="name" v-text="blogger" />
      <meta
        v-if="hasIntro"
        property="url"
        :content="$withBase(blogConfig.intro)"
      />
    </div>
    <div class="num-wrapper">
      <div @click="navigate('/article/')">
        <div class="num">{{ articleNumber }}</div>
        <div>文章</div>
      </div>
      <div @click="navigate('/category/')">
        <div class="num">33</div>
        <div>分类</div>
      </div>
      <div @click="navigate('/tag/')">
        <div class="num">53</div>
        <div>标签</div>
      </div>
      <div @click="navigate('/timeline/')">
        <div class="num">716</div>
        <div>--</div>
      </div>
    </div>
    <p class="links">
      <ExternalLink v-for="link in links" :key="link.url" v-bind="link" />
    </p>
  </div>
</template>

<script setup lang="ts">
import {
  usePageFrontmatter,
  usePagesData,
  useSiteData,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import { computed, defineComponent, onMounted, ref } from 'vue'
import PanThumb from '../../../components/PanThumb.vue'
interface BlogInfoFrontmatter {
  blogger?: string
  avatar?: string
  intro?: string
  links?: {
    text: string
    icon: string
    url: string
  }[]
}

const siteData = useSiteData()
const pagesData = usePagesData()
const frontmatter = usePageFrontmatter<BlogInfoFrontmatter>()

usePagesData()
const blogger = computed(() => {
  return frontmatter.value.blogger
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

// links list
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

const articleNumber = ref<number>(0)

onMounted(async () => {
  const pages = pagesData.value
  for (const key in pages) {
    const page = await pages[key]()
    const { frontmatter, title } = page
    if (
      title !== undefined &&
      title !== '' &&
      (frontmatter.page === undefined ||
        (frontmatter.page as string).toLowerCase().indexOf('home') === -1)
    ) {
      articleNumber.value++
    }
  }
})
</script>

<style scoped lang="scss">
.blog-info {
  &.page {
    background: var(--bgcolor);
  }

  .blogger {
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
