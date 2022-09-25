---
title: 自定义对齐
icon: align
---

# 自定义对齐

通过引入 `vuepress-plugin-container` 插件, 你可以使用

```md
::: center
Paragraph to center
:::

::: right
Right paragraph
:::
```

进行段落对齐的自定义

<!-- more -->

## 配置

```js {7}
module.exports = {
  plugins: [
    [
      "markdown-enhance",
      {
        // Enable Align
        align: true,
      },
    ],
  ],
};
```

## 示例

:::: danger vuepress-theme-star v2 is still in W.I.P, the API may have

::: center 
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[Mention an issue](https://github.com/vuepress-theme-star/vuepress-theme-star/issues).
:::
::::

```md
:::: danger
vuepress-theme-star v2 is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[Mention an issue](https://github.com/vuepress-theme-star/vuepress-theme-star/issues).
:::
::::
```

## 其他自定义容器

::: info
Information container
:::

::: tip
Tip container
:::

::: warning
Warning container
:::

::: danger
Dangerous container
:::

::: details
Details container
:::

::: info custom title
A custom information container
:::

::: tip custom title
A custom tip container
:::

::: warning custom title
A custom warning container
:::

::: danger custom Title
A custom danger container
:::

::: details custom title
A custom details container
:::

```md
::: info
Information container
:::

::: tip
Tip container
:::

::: warning
Warning container
:::

::: danger
Dangerous container
:::

::: details
Details container
:::

::: info custom title
A custom information container
:::

::: tip custom title
A custom tip container
:::

::: warning custom title
A custom warning container
:::

::: danger custom Title
A custom danger container
:::

::: details custom title
A custom details container
:::
```
