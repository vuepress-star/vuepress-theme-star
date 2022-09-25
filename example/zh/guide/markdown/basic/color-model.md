---
title: 颜色
icon: color
categories:
  - Markdown
tags:
  - Markdown
---
# 颜色

您可以使用反引号在句子中标注颜色。 反引号内支持的颜色模型将显示颜色的可视化。

**输入**
```markdown
The background color should be `#ffffff` for light mode and `#0d1117` for dark mode.
```

**输出**

The background color should be `#ffffff` for light mode and `#0d1117` for dark mode.

## 支持的颜色格式
以下是当前支持的颜色模型。

| 颜色	  | 格式	            | 输入	                                      | 输出                          |
|------|----------------|------------------------------------------|-----------------------------|
| HEX  | 	`#RRGGBB`	    | `#0969DA`                                | 	`#0969DA`                  |
| RGB  | 	`rgb(R,G,B)`	 | `rgb(9, 105, 218)`   `rgb(9%, 10%, 21%)` | 	`rgb(9, 105, 218)`  `rgb(9%, 10%, 21%)`       |
| RGBA | 	`rgba(R,G,B)`	 | `rgba(9, 105, 218, 0.5)`                 | 	`rgba(9, 105, 218, 0.5)`   |
| HSL  | 	`hsl(H,S,L)`	 | `hsl(212, 92%, 45%)`                     | 	`hsl(212, 92%, 45%)`       |
| HSLA | 	`hsla(H,S,L)`	 | `hsla(212, 92%, 45%, 0.5)`               | 	`hsla(212, 92%, 45%, 0.5)` |
