# Grid 栅格

## 何时使用

24 栅格系统。

## 设计理念

在多数业务情况下，Ant Design Vue 需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。

## 概述

布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。下面简单介绍一下它的工作原理：

- 通过 `row` 在水平方向建立一组 `column`（简写 col）
- 你的内容应当放置于 `col` 内，并且，只有 `col` 可以作为 `row` 的直接元素
- 栅格系统中的列是指 1 到 24 的值来表示其跨越的范围。例如，三个等宽的列可以使用 `<a-col :span="8" />` 来创建
- 如果一个 `row` 中的 `col` 总和超过 24，那么多余的 `col` 会作为一个整体另起一行排列

## Flex 布局

我们的栅格化系统支持 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。Flex 布局是基于 24 栅格来定义每一个『盒子』的宽度，但不拘泥于栅格。

## 代码示例

### 基础栅格

```vue
<a-row>
  <a-col :span="24">col</a-col>
</a-row>
<a-row>
  <a-col :span="12">col-12</a-col>
  <a-col :span="12">col-12</a-col>
</a-row>
<a-row>
  <a-col :span="8">col-8</a-col>
  <a-col :span="8">col-8</a-col>
  <a-col :span="8">col-8</a-col>
</a-row>
<a-row>
  <a-col :span="6">col-6</a-col>
  <a-col :span="6">col-6</a-col>
  <a-col :span="6">col-6</a-col>
  <a-col :span="6">col-6</a-col>
</a-row>
```

### 区块间隔

栅格常常需要和间隔进行配合，你可以使用 `Row` 的 `gutter` 属性，我们推荐使用 `(16+8n)px` 作为栅格间隔(n 是自然数)。

```vue
<a-row :gutter="16">
  <a-col :span="6">col-6</a-col>
  <a-col :span="6">col-6</a-col>
  <a-col :span="6">col-6</a-col>
  <a-col :span="6">col-6</a-col>
</a-row>

<!-- 响应式间隔 -->
<a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
  <a-col :span="6">col-6</a-col>
  <a-col :span="6">col-6</a-col>
</a-row>

<!-- 垂直间距 -->
<a-row :gutter="[16, 24]">
  <a-col :span="6">col-6</a-col>
  <a-col :span="6">col-6</a-col>
</a-row>
```

### 左右偏移

使用 `offset` 可以将列向右侧偏移。

```vue
<a-row>
  <a-col :span="8">col-8</a-col>
  <a-col :span="8" :offset="8">col-8</a-col>
</a-row>
<a-row>
  <a-col :span="6" :offset="6">col-6 col-offset-6</a-col>
  <a-col :span="6" :offset="6">col-6 col-offset-6</a-col>
</a-row>
```

### 栅格排序

通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。

```vue
<a-row>
  <a-col :span="18" :push="6">col-18 col-push-6</a-col>
  <a-col :span="6" :pull="18">col-6 col-pull-18</a-col>
</a-row>
```

### 排版

子元素根据不同的值 `start`、`center`、`end`、`space-between`、`space-around`，分别定义其在父节点里面的排版方式。

```vue
<a-row justify="start">
  <a-col :span="4">col-4</a-col>
  <a-col :span="4">col-4</a-col>
</a-row>
<a-row justify="center">
  <a-col :span="4">col-4</a-col>
  <a-col :span="4">col-4</a-col>
</a-row>
<a-row justify="end">
  <a-col :span="4">col-4</a-col>
  <a-col :span="4">col-4</a-col>
</a-row>
```

### 对齐

子元素垂直对齐。

```vue
<a-row align="top">
  <a-col :span="4">col-4</a-col>
  <a-col :span="4">col-4</a-col>
</a-row>
<a-row align="middle">
  <a-col :span="4">col-4</a-col>
  <a-col :span="4">col-4</a-col>
</a-row>
<a-row align="bottom">
  <a-col :span="4">col-4</a-col>
  <a-col :span="4">col-4</a-col>
</a-row>
```

### 排序

通过 `order` 来改变元素的排序。

```vue
<a-row>
  <a-col :span="6" :order="4">1 col-order-4</a-col>
  <a-col :span="6" :order="3">2 col-order-3</a-col>
  <a-col :span="6" :order="2">3 col-order-2</a-col>
  <a-col :span="6" :order="1">4 col-order-1</a-col>
</a-row>
```

### Flex 填充

Col 提供 `flex` 属性以支持填充。

```vue
<a-row>
  <a-col :flex="2">2 / 5</a-col>
  <a-col :flex="3">3 / 5</a-col>
</a-row>
<a-row>
  <a-col flex="100px">100px</a-col>
  <a-col flex="auto">auto</a-col>
</a-row>
```

### 响应式布局

参照 Bootstrap 的响应式设计，预设六个响应尺寸：`xs`、`sm`、`md`、`lg`、`xl`、`xxl`。

```vue
<a-row>
  <a-col :xs="24" :sm="12" :md="8" :lg="6">Col</a-col>
  <a-col :xs="24" :sm="12" :md="8" :lg="6">Col</a-col>
  <a-col :xs="24" :sm="12" :md="8" :lg="6">Col</a-col>
</a-row>
```

### 其他属性的响应式

`span`、`pull`、`push`、`offset`、`order` 属性可以通过内嵌到 `xs`、`sm`、`md`、`lg`、`xl`、`xxl` 属性中来使用。

```vue
<a-row>
  <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</a-col>
</a-row>
```

## API

### Row

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 垂直对齐方式 | `top` \| `middle` \| `bottom` \| `stretch` \| `{[key in 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl']: 'top' \| 'middle' \| 'bottom' \| 'stretch'}` | `top` | object: 4.0 |
| gutter | 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 `{ xs: 8, sm: 16, md: 24}`。或者使用数组形式同时设置 `[水平间距, 垂直间距]`（1.5.0 后支持）。 | `number` \| `object` \| `array` | `0` | - |
| justify | 水平排列方式 | `start` \| `end` \| `center` \| `space-around` \| `space-between` \| `space-evenly` \| `{[key in 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl']: 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'}` | `start` | object: 4.0 |
| wrap | 是否自动换行 | `boolean` | `false` | - |

### Col

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| flex | flex 布局填充 | `string` \| `number` | - | |
| offset | 栅格左侧的间隔格数，间隔内不可以有栅格 | `number` | `0` | |
| order | 栅格顺序，flex 布局模式下有效 | `number` | `0` | |
| pull | 栅格向左移动格数 | `number` | `0` | |
| push | 栅格向右移动格数 | `number` | `0` | |
| span | 栅格占位格数，为 0 时相当于 `display: none` | `number` | - | |
| xs | `<768px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | `number` \| `object` | - | |
| sm | `≥768px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | `number` \| `object` | - | |
| md | `≥992px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | `number` \| `object` | - | |
| lg | `≥1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | `number` \| `object` | - | |
| xl | `≥1440px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | `number` \| `object` | - | |
| xxl | `≥1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | `number` \| `object` | - | |

## 响应式断点

响应式栅格的断点扩展自 BootStrap 4 的规则：

- `xs`: `<768px`
- `sm`: `≥768px`
- `md`: `≥992px`
- `lg`: `≥1200px`
- `xl`: `≥1440px`
- `xxl`: `≥1600px`
