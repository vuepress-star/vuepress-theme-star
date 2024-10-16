---
title: 引用
icon: flag
categories:
  - Markdown
tags:
  - Markdown
---
# 引用
让你的 VuePress 站点中的 Markdown 文件支持引用。

<!-- more -->

::: danger
Vuepress Star 并没有对此功能增强。
:::

## 引用文本
您可以使用 `>` 引用文本。

### 示例

**输入**
```markdown
> Blockquotes can also be nested...
> > ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.
```

**输出**
> Blockquotes can also be nested...
> > ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

## 引用代码
您可以在带有单个反引号的句子中调用代码或命令。 反引号内的文本不会被格式化。

### 示例

**输入**
```markdown
Use `git status` to list all new or modified files that haven't yet been committed.
```

**输出**

## 引用代码块

Use `git status` to list all new or modified files that haven't yet been committed.

要将代码或文本格式化为自己独特的块，请使用三重反引号。

### 示例

**输入**
````markdown
Some basic Git commands are:
```
git status
git add
git commit
```
````

**输出**

Some basic Git commands are:
```
git status
git add
git commit
```
::: tip

如果需要嵌套代码块，需要使用四重反引号。

:::
