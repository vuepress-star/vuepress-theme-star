---
title: 任务列表
icon: Checked
categories:
  - Markdown
tags:
  - Markdown
---
# 任务列表
让你的 VuePress 站点中的 Markdown 文件支持任务列表。

<!-- more -->

## 语法

- 使用 `- [ ] 一些文字` 渲染一个未勾选的任务项
- 使用 `- [x] 一些文字` 渲染一个勾选了的任务项 (也支持大写的 `X`)

## 示例
**输入**
```markdown
- [x] #739
- [X] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:
```

**输出**
- [x] #739
- [X] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:
