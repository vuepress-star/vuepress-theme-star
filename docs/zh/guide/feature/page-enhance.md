---
title: 页面增强
icon: info
category: feature
tags:
  - feature
  - page enhance
---

通过内置 [`@mr-hope/vuepress-plugin-comment`](https://vuepress-theme-hope.github.io/comment/zh/)，`vuepress-theme-hope` 实现了文章信息展示。

<!-- more -->

## 启用

页面信息默认全局启用，同时支持页面配置[^applypartically]。你可以在特定页面的 front matter 中设置 `pageInfo: false` 来局部禁用它。

[^applypartically]: **支持页面配置** <Badge text="支持页面配置" />

    **支持页面配置** 指主题允许页面的配置覆盖全局的配置。这意味着你可以在全局启用的情况下，在特定页面将其禁用，或在全局禁用的情况下在特定页面启用。

    ::: details 例子

    以路径导航为例:

    该功能默认全局启用，即 `themeConfig.breadcrumb` 默认为 `true`，同时你可以在特定页面的 front matter 中设置 `breadcrumb: false` 来局部禁用它。

    当然你也可以将 `themeConfig.breadcrumb` 选项设置为 `false` 来全局禁用它，之在特定页面的 front matter 中设置 `breadcrumb: true` 来局部启用它。

    :::

如果你需要保持全局禁用，请设置 `themeConfig.pageInfo` 为 `false`。这样你可以在特定页面的 front matter 中设置 `pageInfo` 来局部启用它。

## 参数 <Badge text="支持页面配置" />

`pageInfo` 默认接受一个字符串数组，可以填入各条目名称，填入的顺序即是各条目显示的顺序。

条目可选的值和对应内容如下:

| 条目             | 对应内容     | 页面 frontmatter 值     | 主题设置的配置项 |
| ---------------- | ------------ | ----------------------- | ---------------- |
| `'author'`       | 作者         | author                  | author           |
| `'time'`         | 写作日期     | time                    | N/A              |
| `'category'`     | 分类         | category                | N/A              |
| `'tag'`          | 标签         | tags                    | N/A              |
| `'reading-time'` | 预计阅读时间 | N/A(自动生成)           | N/A              |
| `'word'`         | 字数         | N/A(自动生成)           | N/A              |
| `'visitor'`      | 访问量       | visitor(仅 Valine 可用) | comment.visitor  |

默认会显示 “作者，访问量，写作日期，分类，标签，预计阅读时间”。

### 作者 <Badge text="支持页面配置" />

例子:

```md
---
author: Mr.Hope
---
```

作者姓名也可以在 `themeConfig.author` 中全局配置，这样每篇文章都会显示默认作者。这时，你仍可以在页面中配置 front matter 中的 `author` 为一个新值来覆盖默认作者，或者设置 `author` 为 `false` 取消作者显示。

### 写作日期

建议 time 以标准格式输入日期，即 `xxxx-xx-xx` 的形式，如 “2020 年 4 月 1 日” 应当输入为 `2020-04-01`

例子:

```md
---
time: 2020-01-01
---
```

### 分类与标签

详见 [博客章节](../blog/category-and-tags.md)

### 阅读时间

默认的统计方式是一分钟 300 字，你可以设置 `themeConfig.wordPerminute` 来覆盖它，该选项不支持在页面单独配置。

### 浏览量 <Badge text="支持页面配置" />

当配置 [评论功能](comment.md) 为 Valine 时，该功能默认启用。

例子:

```md
---
visitor: false
---
```
## 评论

通过内置**** [`@mr-hope/vuepress-plugin-comment`](https://vuepress-theme-hope.github.io/comment/zh/)，`vuepress-theme-hope` 实现了评论功能。

<!-- more -->

## 启用 <Badge text="支持页面配置" />

```js {5,8,9}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    comment: {
      type: "waline", // "waline", "valine" 或 "vssue"

      // waline 模式下
      serverURL: "...", // your serverURL
    },
  },
};
```

评论功能默认全局启用，配置项为 `comment`。

::: info

受篇幅限制，完整的评论插件配置，详见 [@mr-hope/vuepress-plugin-comment 插件文档](https://vuepress-theme-hope.github.io/comment)。

:::

## 评论服务

有三个评论插件可以选择: Waline、Vssue 和 Valine。

::: tip 评论服务的比较

- Waline 需要后端服务器以及额外的配置，支持页面访问量统计，无需登录账号即可评论。可以使用 Vercel。
- Vssue 使用代码平台仓库的 issue 面板，需要用户登录或注册相应平台账号。
- Valine 使用 leancloud，支持页面访问量统计，无需登录账号即可评论

如果你的站点面向大众而非程序员，推荐使用 Waline。

:::

## Waline

### 获取 APP ID 和 APP Key

请先 [登录](https://console.leancloud.app/login.html#/signin) 或 [注册](https://console.leancloud.app/login.html#/signup) `LeanCloud 国际版`, 进入 [控制台](https://console.leancloud.app/applist.html#/apps) 后点击左下角 [创建应用](https://console.leancloud.app/applist.html#/newapp)。创建应用后进入该应用，选择左下角的 `设置` > `应用Key`，然后记下 `APP ID`,`APP Key` 和 `Master Key`。

之后点击下方按钮，跳转至 Vercel 进行快速部署。

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

按照要求输入 Vercel 项目名称与 GitHub 仓库名称。Vercel 会基于 waline 模板帮助你新建并初始化该仓库。仓库初始化完毕后，需要在 Environment Variables 中配置 `LEAN_ID`, `LEAN_KEY` 和 `LEAN_MASTER_KEY` 三个环境变量。它们的值分别对应上一步在 LeanCloud 中获得的 `APP ID`, `APP KEY`, `Master Key`。

设置好环境变量后，点击 `Deploy` 部署，一两分钟即可部署完成。之后在主题设置中设置 vercel 地址:

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    comment: {
      type: "waline",
      serverURL: "YOUR_SERVER_URL", // your server url
    },
  },
});
```

Waline 评论的其他配置将在 [配置](http://vuepress-theme-hope.github.io/comment/zh/config/waline/) 中列出。

::: tip

更多配置与使用，请见 [Waline 官方文档](https://waline.js.org)。

:::

## Vssue

### 选择你要使用的代码托管平台

Vssue 支持通过 GitHub, Gitlab, Bitbucket 或者 Gitee 的 Issue 系统来为你的静态页面提供评论功能，你可以选择其中之一来使用。

前往 [支持的代码托管平台 - 创建 OAuth App](http://vuepress-theme-hope.github.io/comment/zh/guide/supported-platforms/) 查看详细指引。

完成这一步之后，你将会配置好一个 OAuth App，并得到对应的 `client id` 和 `client secret`，它们将会用于 Vssue 的使用。

- `owner`: 对应 repository 的拥有者帐号或者团队
- `repo`: 用来存储评论的 repository
- `clientId`: OAuth App 的 `client id`
- `clientSecret`: OAuth App 的 `client secret` (只有在使用某些平台时需要)

### 使用插件

```js {5-15}
// .vuepress/config.js

module.exports = {
  plugins: {
    "@mr-hope/comment": {
      type: "vssue",
      // 设置 `platform` 而不是 `api`
      platform: "github",

      // 其他的 Vssue 配置
      owner: "OWNER_OF_REPO",
      repo: "NAME_OF_REPO",
      clientId: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
    },
  },
};
```

::: tip

唯一的区别在于，你需要设置 `platform` 而不是对应的 `api` 包。

`@vssue/vuepress-plugin-vssue` 会自动根据你设置的 `platform` 为你解析对应的 API 包:

- Platform `github` - API 包 `@vssue/api-github-v3`
- Platform `github-v4` - API 包 `@vssue/api-github-v4`
- Platform `gitlab` - API 包 `@vssue/api-gitlab-v4`
- Platform `bitbucket` - API 包 `@vssue/api-bitbucket-v2`
- Platform `gitee` - API 包 `@vssue/api-gitee-v5`
- Platform `gitea` - API 包 `@vssue/api-gitea-v1`

:::

## Valine

借助 Valine，主题实现了无后端开启阅读量展示与评论功能。

### 获取 APP ID 和 APP Key

请先 [登录](https://leancloud.cn/dashboard/login.html#/signin) 或 [注册](https://leancloud.cn/dashboard/login.html#/signup) LeanCloud, 进入控制台后点击左下角创建应用。

应用创建好以后，进入刚刚创建的应用，选择左下角的 `设置 > 应用Key`，然后就能看到你的 `APP ID` 和 `APP Key` 了。

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    comment: {
      type: "valine",
      appId: "...", // your appId
      appKey: "...", // your appKey
    },
  },
});
```

将对应的 `APP ID` 和 `APP Key` 填入， Valine 即配置完成。

Valine 评论的其他配置将在 [配置](http://vuepress-theme-hope.github.io/comment/zh/config/valine/) 中列出。

::: tip

更多配置与使用，请见 [Valine 官方文档](https://valine.js.org)。

:::
