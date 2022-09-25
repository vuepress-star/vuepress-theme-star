# CodeGroup

在MarkDown中可用的代码块分组

## 详情

[CodeGroupItem](components.md#codegroupitem) 组件的Wrapper

## CodeGroupItem
在MarkDown中可用的代码块分组项

## 属性
title <Badge text="必填" type="danger" />
- 类型： `string`

active
- 类型： `boolean`
- 默认值： `false`

## 详情

该组件必须放置在 [CodeGroup](#codegroup) 组件的内部。

可以通过 `active` Prop 来设置初始激活的元素。如果不设置，默认激活第一个元素。

## 使用
请使用 `<CodeGroup />` 包裹 `<CodeGroupItem />`。

对于每个 `<CodeGroupItem />`，你需要设置 `title` 属性作为选项卡的标题，并仅在选项卡内放置一个代码块。你还可以在其中一个 `<CodeGroupItem />` 上设置 active 属性使其默认激活。

::: tip

你需要在每个 `<CodeGroupItem />` 之间放置一个空行，否则 VuePress 可能无法正确的解析它们。

:::

## 示例

输入：

````markdown
<CodeGroup>
<CodeGroupItem title="yarn">
```bash
  yarn add -D vuepress-theme-star
```
</CodeGroupItem>
<CodeGroupItem title="npm" active>
```bash
npm i -D vuepress-theme-star
```
</CodeGroupItem>
</CodeGroup>
````

输出：

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash
yarn add -D vuepress-theme-star
```
  </CodeGroupItem>

  <CodeGroupItem title="npm" active>

```bash
npm i -D vuepress-theme-star
```
  </CodeGroupItem>
</CodeGroup>
