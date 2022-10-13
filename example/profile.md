---
page: profile
title: Profile
heroImage: /images/hero.png
actions:
  - text: 快速上手
    link: /zh/guide/getting-started.html
    type: primary
  - text: 项目简介
    link: /zh/guide/
    type: secondary
features:
  - title: 简洁至上
    details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
  - title: Vue 驱动
    details: 享受 Vue 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
  - title: 高性能
    details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
  - title: 主题
    details: 提供了一个开箱即用的默认主题。你也可以挑选一个社区主题，或者创建一个你自己的主题。
  - title: 插件
    details: 灵活的插件API，使得插件可以为你的站点提供许多即插即用的功能。
  - title: 打包工具
    details: 既支持 Webpack 也支持 Vite。选一个你喜欢的来使用吧！
footer: MIT Licensed | Copyright © 2021-present Starzkg
---

- 👋 Hi, I’m @starzkg
- 👀 I’m interested in ...
- 🌱 I’m currently learning ...
- 💞️ I’m looking to collaborate on ...
- 📫 How to reach me ...

### 像数 1, 2, 3 一样容易

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
# 在你的项目中安装
yarn add - D @starzkg/vuepress-theme-star

# 新建一个 markdown 文件
echo '# Hello VuePress Theme Star' > README.md

# 开始写作
yarn vuepress dev

# 构建静态文件
yarn vuepress build
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
# 在你的项目中安装
npm install -D @starzkg/vuepress-theme-star

# 新建一个 markdown 文件
echo '# Hello VuePress Theme Star' > README.md

# 开始写作
npx vuepress dev

# 构建静态文件
npx vuepress build
```

  </CodeGroupItem>
</CodeGroup>
