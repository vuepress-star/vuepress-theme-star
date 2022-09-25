# 徽章
在MarkDown中使用徽章

## 属性
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


## 使用
在MarkDown中为标题或链接添加一些状态
```markdown
### Badge <Badge text="Building" type="warning" /> <Badge text="Starzkg" color="grey" />
```

## 示例
- <Badge text="type" type="warning" />
- <Badge text="color" color="grey" />
