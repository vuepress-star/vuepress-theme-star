---
title: 脚注
icon: footnote
category: markdown
tags:
  - feature
  - markdown
---

# 脚注

Let the Markdown file in your VuePress site support footnotes.

<!-- more -->

## Configuration

```js {7}
module.exports = {
  plugins: [
    [
      "markdown-enhance",
      {
        // Enable Footnote
        footnote: true,
      },
    ],
  ],
};
```

## Syntax

- Use `[^Anchor text]` in Markdown to define a footnote

- Use `[^Anchor text]: ...` to describe footnote content

- If there are muti paragraph in footnote, the paragraph show be double indented

## Case

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

```md
Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.
```
