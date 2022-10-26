---
page: DocumentHome
title: Home
heroImage: /images/hero.png
actions:
  - text: Get Started
    link: /guide/getting-started.html
    type: primary
  - text: Introduction
    link: /guide/
    type: secondary
features:
  - title: Simplicity First
    details: Minimal setup with markdown-centered project structure helps you focus on writing.
  - title: Vue-Powered
    details: Enjoy the dev experience of Vue, use Vue components in markdown, and develop custom themes with Vue.
  - title: Performant
    details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
  - title: Themes
    details: Providing a default theme out of the box. You can also choose a community theme or create your own one.
  - title: Plugins
    details: Flexible plugin API, allowing plugins to provide lots of plug-and-play features for your site.
  - title: Bundlers
    details: Default bundler is Vite, while Webpack is also supported. Choose the one you like!
footer: MIT Licensed | Copyright © 2021-present Starzkg
---


### 像数 1, 2, 3 一样容易

:::: code-group

::: code-group-item title="NPM" active

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

:::

::: code-group-item title="YARN"

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

:::

::: code-group-item title="PNPM"

```bash
# 在你的项目中安装
pnpm add - D @starzkg/vuepress-theme-star

# 新建一个 markdown 文件
echo '# Hello VuePress Theme Star' > README.md

# 开始写作
pnpm vuepress dev

# 构建静态文件
pnpm vuepress build
```

:::

:::: 
