---
title: 标记
icon: write
---

# 标记

Make Markdown files in your VuePress site support markup.

<!-- more -->

## Configuration

```js {7}
module.exports = {
  plugins: [
    [
      "markdown-enhance",
      {
        // open tag
        mark: true,
      },
    ],
  ],
};
```

## Syntax

Use `== ==` to mark.

## Demo

Mr. Hope is ==handsome==.

```md
Mr. Hope is ==handsome==.
```
