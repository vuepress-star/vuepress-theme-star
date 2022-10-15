---
title: HTML 标签
icon: Html5
---
# HTML 标签 
让你的 VuePress 站点中的 Markdown 文件支持使用缩写来使用特殊的 HTML 标签。

<!-- more -->

## \<abbr\> 标签
The \<abbr\> HTML element represents an abbreviation or acronym.

参考：
- [\<abbr\> HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr)
- [markdown-it-abbr](https://github.com/markdown-it/markdown-it-abbr)
### 示例

**输入**
```md
This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language
```

**输出**

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

## ++\<ins\>++ 标签
The \<ins\> HTML element represents a range of text that has been added to a document.

参考：
- [\<ins\> HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins)
- [markdown-it-ins](https://github.com/markdown-it/markdown-it-ins)
### 示例

**输入**
```md
++Inserted text++
```

**输出**

++Inserted text++

## ==\<mark\>== 标签
The \<mark\> HTML element represents text which is marked or highlighted for reference or notation purposes, due to the marked passage's relevance or importance in the enclosing context

参考：
- [\<mark\> HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)
- [markdown-it-mark](https://github.com/markdown-it/markdown-it-mark)
### 示例

**输入**
```md
==Marked text==
```

**输出**

==Marked text==

## ^\<sub\>^ 标签
The \<sub\> HTML element specifies inline text which should be displayed as subscript for solely typographical reasons. 

参考：
- [\<sub\> HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub)
- [markdown-it-sub](https://github.com/markdown-it/markdown-it-sub)
### 示例

**输入**
```md
19^th^
```

**输出**

19^th^

## ~\<sup\>~ 标签
The \<sup\> HTML element specifies inline text which is to be displayed as superscript for solely typographical reasons.

参考：
- [\<sup\> HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup)
- [markdown-it-sup](https://github.com/markdown-it/markdown-it-sup)
### 示例

**输入**
```md
H~2~O
```

**输出**

H~2~O
