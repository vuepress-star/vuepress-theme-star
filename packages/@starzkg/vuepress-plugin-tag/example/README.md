---
home: true
title: "vuepress-plugin-tag"
heroImage: /logo.svg
heroText: "vuepress-plugin-tag"
tagline: 为 VuePress 提供 档案 支持
footer: MIT Licensed | Copyright © 2021 - present Starzkg
---

## 使用插件

### 安装

```bash
npm i -D @starzkg/vuepress-plugin-tag
```

### 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "archive",
      {
        // 你的配置选项
      },
    ],
  ],
};
```
