<script setup lang="ts">
import { Typed } from '@starzkg/vuepress-star-shared/client'
import { AutoLink } from '@theme/components'
import { useDarkMode } from '@theme/composables'
import {
  ClientOnly,
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import type { FunctionalComponent } from 'vue'
import { computed, h } from 'vue'
import type { StarThemeHomePageFrontmatter } from '../../../../shared/index.js'

const frontmatter = usePageFrontmatter<StarThemeHomePageFrontmatter>()
const siteLocale = useSiteLocaleData()
const isDarkMode = useDarkMode()

const heroImage = computed(() => {
  if (isDarkMode.value && frontmatter.value.heroImageDark !== undefined) {
    return frontmatter.value.heroImageDark
  }
  return frontmatter.value.heroImage
})

const heroAlt = computed(
  () => frontmatter.value.heroAlt || heroText.value || 'hero'
)

const heroHeight = computed(() => frontmatter.value.heroHeight || 280)

const heroText = computed(() => {
  if (frontmatter.value.heroText === null) {
    return null
  }
  return (
    frontmatter.value.heroText ||
    siteLocale.value.title ||
    'Hello VuePress Star'
  )
})

const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null
  }
  return (
    frontmatter.value.tagline ||
    siteLocale.value.description ||
    'Welcome to your VuePress Star site'
  )
})

const actions = computed(() => {
  if (!isArray(frontmatter.value.actions)) {
    return []
  }

  return frontmatter.value.actions.map(({ text, link, type = 'primary' }) => ({
    text,
    link,
    type,
  }))
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
          : (icon.startsWith('icon-social-') ? '' : 'social-') + icon,
      link: url,
    }
  })
})

const HeroImage: FunctionalComponent = () => {
  if (!heroImage.value) return null
  const img = h('img', {
    class: 'hero-image',
    src: withBase(heroImage.value),
    alt: heroAlt.value,
    height: heroHeight.value,
  })
  if (frontmatter.value.heroImageDark === undefined) {
    return img
  }
  // wrap hero image with <ClientOnly> to avoid ssr-mismatch
  // when using a different hero image in dark mode
  return h(ClientOnly, img)
}

// @fixme this is a bug when use template
const HeroSlogan: FunctionalComponent = () => {
  return h(
    'p',
    {
      class: 'slogan',
    },
    h(ClientOnly, () =>
      h(h(Typed), {
        strings: frontmatter.value.slogan || [
          'Hello World!',
          'Hello Vuepress!',
          'Hello Vuepress Star!',
        ],
        loop: true,
      })
    )
  )
}
</script>

<template>
  <div class="hero">
    <slot name="home-hero-before" />
    <HeroImage />
    <div class="hero-info">
      <h1 v-if="heroText" id="main-title" class="title">
        {{ heroText }}
      </h1>

      <p v-if="tagline" class="description">
        {{ tagline }}
      </p>

      <HeroSlogan />

      <p v-if="actions.length" class="actions">
        <AutoLink
          v-for="action in actions"
          :key="action.text"
          class="action-button"
          :class="[action.type]"
          :item="action"
        />
      </p>

      <p v-if="links.length" :class="{ links: links.length }">
        <AutoLink
          v-for="link in links"
          :key="link.url"
          :item="link"
          circle
          :class="'link-' + link.text"
        />
      </p>
    </div>
    <slot name="home-hero-after" />
  </div>
</template>
