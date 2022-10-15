---
title: 在 Markdown 中使用 Vue
icon: Open
---
# 在 Markdown 中使用 Vue

这一章节会介绍 Vue 在 Markdown 中一些基本用法。

可以前往 Vuepress [Cookbook > Markdown 和 Vue SFC](https://vuepress.github.io/zh/advanced/cookbook/markdown-and-vue-sfc.md) 来了解更多内容。

## 模板语法

我们知道：

- Markdown 中允许使用 HTML。
- Vue 模板语法是和 HTML 兼容的。

这意味着， Markdown 中允许直接使用 [Vue 模板语法](https://v3.vuejs.org/guide/template-syntax.html)。

**输入**

```md
一加一等于： {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>
```

**输出**

一加一等于： {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>

## 组件

你可以在 Markdown 中直接使用 Vue 组件。

**输入**

```md
这是默认主题内置的 `<Badge />` 组件 <Badge text="演示" />
```

**输出**

这是默认主题内置的 `<Badge />` 组件 <Badge text="演示" />

::: tip
前往 [内置组件](https://vuepress.github.io/zh/reference/components.md) 查看所有内置组件。

前往 [默认主题 > 内置组件](https://vuepress.github.io/zh/reference/default-theme/components.md) 查看默认主题中的所有内置组件。
:::
