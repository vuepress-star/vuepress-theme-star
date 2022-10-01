---
title: Markdown
icon: markdown
categories:
  - Markdown
tags:
  - Markdown
---
# Markdown
如果你还不了解 Markdown ，请先学习一些 [Markdown 教程](https://commonmark.org/help/)。

<!-- more -->

## markdown-it
VuePress 内置 [markdown-it](https://github.com/markdown-it/markdown-it) 来解析 Markdown 内容。

### markdown-it 内置

由 markdown-it 内置支持：

- [表格](https://help.github.com/articles/organizing-information-with-tables/) (GFM)
- [删除线](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) (GFM)


## Vuepress
VuePress 会使用 [markdown-it](https://github.com/markdown-it/markdown-it) 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 [语法扩展](https://github.com/markdown-it/markdown-it#syntax-extensions) 。

VuePress 内置支持的 [Markdown 语法扩展](https://vuepress.github.io/zh/guide/markdown.html)

### Vuepress 内置
由 Vuepress 内置支持：
- [标题锚点](https://vuepress.github.io/zh/guide/markdown.html#%E6%A0%87%E9%A2%98%E9%94%9A%E7%82%B9)
- [目录](https://vuepress.github.io/zh/guide/markdown.html#%E7%9B%AE%E5%BD%95)
- [代码块](https://vuepress.github.io/zh/guide/markdown.html#%E4%BB%A3%E7%A0%81%E5%9D%97)
- [导入代码块](https://vuepress.github.io/zh/guide/markdown.html#%E5%AF%BC%E5%85%A5%E4%BB%A3%E7%A0%81%E5%9D%97)

## Vuepress Star
VuePress Star 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 及其 markdown-it插件 和 [@mdit-vue](https://github.com/mdit-vue/mdit-vue) ，在 Markdown 中启用了更多的语法与新功能。

### Vuepress Star 扩展
#### [基础语法](./basic/)
- [x] [HTML 标签](./basic/html-tags.md)
  - [x] \<abbr\>
  - [x] ++\<ins\>++
  - [x] ==\<mark\>==
  - [x] ^\<sub\>^
  - [x] ~\<sup\>~

*[abbr]: Abbreviation

- [x] [样式化文本](./basic/styling-text.md)
  - [x] **粗体**
  - [x] *斜体*
  - [x] ~~删除线~~
  - [x] ==标记==
  - [x] 下~标~
  - [x] 上^标^
- [x] [引用](./basic/quote.md)
- [x] [颜色](./basic/color-model.md)
- [x] [脚注](./basic/footnote.md)
- [x] [定义列表](./basic/deflist.md)
- [x] [任务列表](./basic/task-list.md)
- [x] [emoji 表情](https://github.com/markdown-it/markdown-it-emoji)

#### [高级语法](./advanced/)
- [x] [自定义容器](./advanced/container.md)
- [x] [自定义对齐](./advanced/align.md)

- [x] [Chart](./advanced/chart.md)
- [x] [ECharts](./advanced/echarts.md)
- [x] [Mermaid](./advanced/markmap.md)
- [x] [flowchart](./advanced/flowchart.md)
- [x] [Markmap](./advanced/markmap.md)
- [ ] tex
  - [x] katex
  - [x] mathjax
- [x] reveal
- [ ] code demo

### Markdown Spec
- [CommonMark Spec](https://spec.commonmark.org/)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)

::: tip

并不需要担心你的网站大小，最终代码不会包含未启用功能的代码。

:::
