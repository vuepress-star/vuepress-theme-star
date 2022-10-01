---
title: Reveal
icon: slides
---
# Reveal
让你的 VuePress 站点中的 Markdown 文件支持Reveal。

使用 [reveal.js](https://revealjs.com/) 来支持这一功能。

<!-- more -->

## 文档

相关详情，详见 [reveal.js](https://revealjs.com/) .

你也可以传入一个对象以进行更详细的配置。

`reveal.plugins` 接收一个字符串数组，可以自由配置是否启用一些预设的插件。

::: tip

可接受的插件有:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

:::

你还可以使用 `reveal.revealConfig` 来配置全局传递给 Reveal.js 的配置选项。

Reveal.js 还提供了[更多的插件](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware)。如果你需要某个特定的插件，请在 GitHub 上提出 [Feature Request](https://github.com/vuepress-star/vuepress-theme-star/issues/new?assignees=Mister-Hope&labels=enhancement&template=feature_request.md&title=%5BFeature+Request%5D)

## 语法

- 使用 `---` 分割幻灯片
- 使用 `--` 对幻灯片进行二次分割(垂直显示)

````md
```reveal

<!-- slide1 -->

---

<!-- slide2 -->

---

<!-- slide3 -->

```
````

目前可用的主题(请使用它们直接替换 `[theme]`):

- `auto` (默认)
- `black`
- `white`
- `league`
- `beige`
- `sky`
- `night`
- `serif`
- `simple`
- `solarized`
- `blood`
- `moon`

主题演示，请详见 [幻灯片主题][reveal-theme]

## 演示

````reveal

## 幻灯片 1

一个有文字和 [链接](https://mrhope.site) 的段落

---

## 幻灯片 2

- 项目 1
- 项目 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

````

````md
```reveal

## 幻灯片 1

一个有文字和 [链接](https://mrhope.site) 的段落

---

## 幻灯片 2

- 项目 1
- 项目 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

```
````

::: tip

详细与完整的演示详见 [幻灯片演示][reveal-demo]。

:::

## 选项

你可以在 Frontmatter 设置 `reveal` 以设置特定页面的 reveal.js 选项，也可以在插件选项中设置 `reveal` 以全局设置 reveal.js。

更多选项，请参见 [reveal.js config](https://revealjs.com/config/)

更多用法，请参阅 [reveal.js 文档](https://revealjs.com/)。

[reveal-theme]: ./themes.html
[reveal-demo]: ./demo.html
