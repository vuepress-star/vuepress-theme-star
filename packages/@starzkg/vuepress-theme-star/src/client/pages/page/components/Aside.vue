<script lang="ts" setup>
import {
  Aside,
  AsideItem,
  Category,
  Menu,
  ProfileCard,
  Tag,
} from '@theme/components'
</script>

<template>
  <Aside class="aside">
    <ProfileCard />
    <AsideItem>
      <Menu mode="vertical" />
    </AsideItem>

    <AsideItem>
      <template #header> 标签 </template>
      <Tag />
    </AsideItem>

    <AsideItem>
      <template #header> 分类 </template>
      <Category />
    </AsideItem>
  </Aside>
</template>

<style lang="scss" scoped></style>
