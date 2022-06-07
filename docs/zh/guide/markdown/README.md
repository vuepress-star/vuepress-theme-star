---
title: MarkDown
icon: markdown
---
# Markdown

在阅读本章节之前，请确保你已经对 Markdown 有所了解。如果你还不了解 Markdown ，请先学习一些 [Markdown 教程](https://commonmark.org/help/)。

## 基础语法

- [GFM](https://docs.github.com/cn/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Vuepress](https://vuepress.github.io/zh/guide/markdown.html)
- [Vuepress Theme Star](./basic-syntax.md)

## 高级语法

- [自定义容器](feature/container.md)
- [选项卡](feature/tabs.md)
- [代码组](feature/code-tabs.md)
- [脚注](feature/footnote.md)
- [任务列表](feature/tasklist.md)
- [图片增强](image.md)
- [自定义对齐](feature/align.md)
- [上下角标](feature/sup-sub.md)
- [标记](feature/mark.md)
- [图表](feature/chart.md)
- [Echarts](feature/echarts.md)
- [流程图](feature/flowchart.md)
- [Mermaid 图表](feature/mermaid.md)
- [Tex 支持](feature/tex.md)
- [文件导入](feature/include.md)
- [代码演示](feature/demo.md)
- [幻灯片](feature/presentation.md)
- [样式化](feature/stylize.md)
- [开箱即用的组件](feature/components.md)
- [自定义主题](interface/code-theme.md)

## 注意事项

### 非标准的 HTML 标签

非标准的 HTML 标签不会被 Vue 模板编译器识别成原生 HTML 标签。相反，Vue 会尝试将这些标签解析为 Vue 组件，而显然这些组件通常是不存在的。 例如：

- 已废弃的 HTML 标签，比如 [\<center>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/center) 和 [\<font>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/font) 等。
- [MathML 标签](https://developer.mozilla.org/zh-CN/docs/Web/MathML)，它们可能会被一些 markdown-it 的 LaTeX 插件用到。

如果你无论如何都要使用这些标签的话，可以尝试下面两种方法之一：

- 添加一个 [v-pre](https://v3.cn.vuejs.org/api/directives.html#v-pre) 指令来跳过这个元素和它的子元素的编译过程。注意所有的模板语法也都会失效。
- 设置 [compilerOptions.isCustomElement](https://v3.vuejs.org/api/application-config.html#compileroptions) 来告诉 Vue 模板编译器不要尝试作为组件来解析它们。
  - 对于 `@bundler-webpack` ，设置 [vue.compilerOptions](../reference/bundler/webpack.md#vue)
  - 对于 `@bundler-vite` ，设置 [vuePluginOptions.template.compilerOptions](../reference/bundler/vite.md#vuepluginoptions)
