---
title: 自定义对齐
icon: align
---
# 自定义对齐
让你的 VuePress 站点中的 Markdown 文件支持自定义对齐。

通过对 `vuepress-plugin-container` 进行额外的配置注入，你可以使用自定义容器语法实现自定义对齐。

<!-- more -->

## 语法
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

## 示例

**输入**
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
**输出**
:::: danger vuepress-theme-star v2 is still in W.I.P, the API may have

::: center 
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[Mention an issue](https://github.com/vuepress-theme-star/vuepress-theme-star/issues).
:::
::::

## 参考
- [vuepress-plugin-container](https://vuepress.github.io/zh/reference/plugin/container.html)
