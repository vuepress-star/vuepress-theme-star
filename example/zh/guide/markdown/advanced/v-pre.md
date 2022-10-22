---
title: v-pre 容器
icon: present
---

<!-- more -->
# v-pre 容器
让你 VuePress 站点中的 Markdown 文件支持 `v-pre` 容器。

由于 VuePress2 已经在 `@vuepress/core` 中移除了 V1 的 v-pre 容器，插件提供了一个选项 `v-pre` 支持它。

换言之当设置 `plugins.markdown.v-pre: true` 时，你可以在下面的容器中使用任何 Mustache 语法。

## 语法
```md
::: v-pre

{{ abc }}

:::
```
