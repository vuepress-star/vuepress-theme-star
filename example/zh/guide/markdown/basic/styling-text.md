---
title: 样式化文本
icon: FileText
categories:
  - Markdown
tags:
  - Markdown
---
# 样式化文本
让你的 VuePress 站点中的 Markdown 文件支持样式化文本。

目前支持**粗体**、*斜体*、~~删除线~~、==标记==、下~标~、上^标^ 进行文本的样式化

<!-- more -->

## 示例

| 样式	      | 语法                 | 示例                   | 输出      |
|----------|--------------------|----------------------|---------|
| 粗体       | ** ** 或 __ __      | `**这是粗体文本**	`        | **这是粗体文本** |
| 斜体       | * * 或 _ _          | 	`*这是斜体文本*`          |  	*这是斜体文本* |
| 删除线      | ~~ ~~	             | `~~这是错误文本~~`	        |  ~~这是错误文本~~ |
| 粗体和嵌入的斜体 | ** ** 和 _ _	       | 	`**此文本 _非常_ 重要**`   |   **此文本 _非常_ 重要** |
| 全部粗体和斜体  | *** ***	           | 	`***所有这些文本都很重要***`	 |     ***所有这些文本都很重要*** |
| 标记       | == ==	             | 	`==标记==`	           |     ==标记== |
| 下标       | <sub> </sub> 或 ~ ~ | 这是<sub>下标</sub>文本    |  H~2~O  |
| 上标       | <sup> </sup> 或 ^ ^ | 这是<sup>上标</sup>文本    |  19^th^ |


## 参考
- [markdown-it-mark](https://github.com/markdown-it/markdown-it-mark)
- [markdown-it-sub](https://github.com/markdown-it/markdown-it-sub)
- [markdown-it-sup](https://github.com/markdown-it/markdown-it-sup)
