---
title: 上下角标
icon: superscript
---

# 上下角标

让你的 VuePress 站点中的 Markdown 文件支持上下角标。

<!-- more -->

## 配置

```js {7,9}
module.exports = {
  plugins: [
    [
      "markdown-enhance",
      {
        // Enable Subscript
        sub: true,
        // Enable  Superscript
        sup: true,
      },
    ],
  ],
};
```

## 语法

- Use `^ ^` to mark the superscript.
- Use `~ ~` to mark the subscript.

## 示例

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```
