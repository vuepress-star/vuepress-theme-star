---
title: Markdown 基础语法
icon: markdown
categories:
  - Markdown
tags:
  - Markdown
---

__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

# Markdown 基础语法
本章节介绍 VuePress Star 的 Markdown 基本语法。
## 标题
```markdown
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
```
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## 标题锚点

你可能已经注意到，当你把鼠标放在各个章节的标题上时，会显示出一个 `#` 锚点。点击这个 `#` 锚点，可以直接跳转到对应章节。

::: tip
标题锚点扩展由 [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) 支持。

配置参考： [markdown.anchor](../reference/config.md#markdown-anchor)
:::

## 水平分割线
```markdown

___

---

***

```

___

---

***

## 排版替换
```md

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'

```

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'

## 样式文本

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

|   样式	 | 语法     | 示例            | 输出      |
|----|--------|---------------|---------|
| 粗体 | ** ** 或 __ __ | `**这是粗体文本**	` | **这是粗体文本** |
| 斜体 | * * 或 _ _ | 	`*这是斜体文本*`   |  	*这是斜体文本* |
| 删除线 | ~~ ~~	 | `~~这是错误文本~~`	 |  ~~这是错误文本~~ |
| 粗体和嵌入的斜体 | ** ** 和 _ _	 | 	`**此文本 _非常_ 重要**` |   **此文本 _非常_ 重要** |
| 全部粗体和斜体 | *** ***	 | 	`***所有这些文本都很重要***`	 |     ***所有这些文本都很重要*** |
| 下标 | <sub> </sub> 或 ~ ~ |  <sub>这是下标文本</sub> |  H~2~O  |
| 上标 | <sup> </sup> 或 ^ ^ |  <sup>这是上标文本</sup> |  19^th^ |

[参考](./styling-text.md)

## 列表

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar

## 引用

> Blockquotes can also be nested...
> > ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

[参考](./quote.md)

## 代码

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## 表格

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |



## 链接

您可以通过将链接文本括在括号`[ ]`中，然后将 URL 括在括号中来创建内联链接`( )`

`This site was built using [GitHub Pages](https://pages.github.com/).`

This site was built using [GitHub Pages](https://pages.github.com/).

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## 图片

可以通过`!`在`[ ]`. 然后将图片的链接用括号括起来`( )`。

`![This is an image](https://myoctocat.com/assets/images/base-octocat.svg)`

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## 插件

The killer feature of `markdown-it` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
~ Definition 1

Term 2
~ Definition 2a
~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
