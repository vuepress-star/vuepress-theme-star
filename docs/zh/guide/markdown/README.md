---
title: MarkDown 增强
icon: markdown
---
# MarkDown 增强
## 内置增强
VuePress 自带的 GitHub 风格的表格，Emoji、TOC、代码行号、特定行高亮等都是开箱即用的。

详细语法详见 内置 [Markdown 扩展](https://v2.vuepress.vuejs.org/zh/guide/markdown.html#header-anchors)。

## 插件增强

通过安装 `vuepress-plugin-markdown-enhance` VuePress插件，你可以使用更多的语法格式在你的MarkDown文件中
### 一键启用
你可以设置 `themeconfig.mdEnhance.enableAll` 启用 [markdown-enhance](https://vuepress-theme-hope.github.io/markdown-enhance) 插件的所有功能。

::: tip

请不用担心你的网站大小，如果你不启用相关功能，最终代码不会包含这些功能相关的代码。
:::

```js {3-5}
module.exports = {
  themeConfig: {
    mdEnhance: {
      enableAll: true,
    },
  },
};
```

::: danger

请仅将此选项用于体验或测试。随着时间的增长，`vuepress-plugin-markdown-enhance` 变得越来越强大。它为 Markdown 解析器添加了更多语法，并输出了更多代码。 

启用不需要的功能将增加开发和构建时间。 (markdown-it 必须检查额外的语法) 

同样，幻灯片演示功能将在输出中添加 700KB 大小的代码 (主要是 reveal.js)。 

因此，请仅启用需要的功能。

:::


### 启用特定的功能

特定语法的配置项可以配置中找到。
