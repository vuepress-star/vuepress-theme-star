---
title: 组件
icon: component
---
# 组件

## Badge
在MarkDown中使用徽章

### 属性
text <Badge text="必填" type="danger" />

- 类型：`string`
- 默认值：""

  徽章文字内容

type

- 类型：`"tip" | "wraning" | "danger"`
- 默认值：`"tip"`

  徽章类型
  - <Badge text="tip" type="tip" />
  - <Badge text="warn" type="warning" />
  - <Badge text="error" type="danger" />

color <Badge text="可选" />
- 类型：`string`

  徽章颜色，CSS合法的颜色值

vertical
- 类型：`"top" | "middle" | "bottom" | undefined `
- 默认值：`"undefined"`

  徽章垂直方向的位置
  -  顶部<Badge text="top" vertical="top" />
  -  居中<Badge text="middle" vertical="middle" />
  -  底部<Badge text="bottom" vertical="bottom" />

is-dot
- 类型：Boolean
- 默认值：true

  不显示 `text`  内容，显示一个小圆点

小红点 <Badge  type="danger" is-dot/>


### 使用
在MarkDown中为标题或链接添加一些状态
```markdown
### Badge <Badge text="Building" type="warning" /> <Badge text="Starzkg" color="grey" />
```

### 示例
- <Badge text="type" type="warning" />
- <Badge text="color" color="grey" />

## CodeGroup

在MarkDown中可用的代码块分组

### 详情

[CodeGroupItem](components.md#codegroupitem) 组件的Wrapper

## CodeGroupItem
在MarkDown中可用的代码块分组项

### 属性
title <Badge text="必填" type="danger" />
- 类型： `string`

active
- 类型： `boolean`
- 默认值： `false`

### 详情

该组件必须放置在 [CodeGroup](#codegroup) 组件的内部。

可以通过 `active` Prop 来设置初始激活的元素。如果不设置，默认激活第一个元素。

### 使用
请使用 `<CodeGroup />` 包裹 `<CodeGroupItem />`。

对于每个 `<CodeGroupItem />`，你需要设置 `title` 属性作为选项卡的标题，并仅在选项卡内放置一个代码块。你还可以在其中一个 `<CodeGroupItem />` 上设置 active 属性使其默认激活。

::: tip

你需要在每个 `<CodeGroupItem />` 之间放置一个空行，否则 VuePress 可能无法正确的解析它们。

:::

### 示例

输入：

````markdown
<CodeGroup>
<CodeGroupItem title="yarn">
```bash
  yarn add -D vuepress-theme-hope
```
</CodeGroupItem>
<CodeGroupItem title="npm" active>
```bash
npm i -D vuepress-theme-hope
```
</CodeGroupItem>
</CodeGroup>
````

输出：

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash
yarn add -D vuepress-theme-hope
```
  </CodeGroupItem>

  <CodeGroupItem title="npm" active>

```bash
npm i -D vuepress-theme-hope
```
  </CodeGroupItem>
</CodeGroup>

## ExternalLinkIcon
- 使用

```html
<ExternalLinkIcon/>
```
- 详情

  该组件会渲染一个标识外部 URL 链接的图标。

  该组件主要是为了开发主题时使用。在绝大多数情况下你不会用到它。
- 示例
  <ExternalLinkIcon/>


## Element Plus
内置 Element Plus 组件库和图标库
::: tip
为了避免组件名称冲突，图标组件与Element相比需要加`icon-`前缀
:::
<el-row>
<el-button>Default</el-button>
<el-button type="primary">Primary</el-button>
<el-button type="success">Success</el-button>
<el-button type="info">Info</el-button>
<el-button type="warning">Warning</el-button>
<el-button type="danger">Danger</el-button>
<el-button>中文</el-button>
</el-row>

<el-row style="margin-top: 10px">
  <el-button plain>Plain</el-button>
  <el-button type="primary" plain>Primary</el-button>
  <el-button type="success" plain>Success</el-button>
  <el-button type="info" plain>Info</el-button>
  <el-button type="warning" plain>Warning</el-button>
  <el-button type="danger" plain>Danger</el-button>
</el-row>

<el-row style="margin-top: 10px">
  <el-button round>Round</el-button>
  <el-button type="primary" round>Primary</el-button>
  <el-button type="success" round>Success</el-button>
  <el-button type="info" round>Info</el-button>
  <el-button type="warning" round>Warning</el-button>
  <el-button type="danger" round>Danger</el-button>
</el-row>

<el-row style="margin-top: 10px">
  <el-button icon="icon-search" circle></el-button>
  <el-button type="primary" icon="icon-edit" circle></el-button>
  <el-button type="success" icon="icon-check" circle></el-button>
  <el-button type="info" icon="icon-message" circle></el-button>
  <el-button type="warning" icon="icon-star" circle></el-button>
  <el-button type="danger" icon="icon-delete" circle></el-button>
</el-row>
