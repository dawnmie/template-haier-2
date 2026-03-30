# FloatButton 悬浮按钮

## 概述

悬浮按钮。自 `4.0.0` 版本开始提供该组件。

## 何时使用

- 用于网站上的全局功能；
- 无论浏览到何处都可以看见的按钮。

## API

> 自 `ant-design-vue@4.0.0` 版本开始提供该组件。

### 共同的 API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| icon | 自定义图标 | slot | - | |
| description | 文字及其它内容 | string \| slot | - | |
| tooltip | 气泡卡片的内容 | string \| slot | - | |
| type | 设置按钮类型 | `default` \| `primary` | `default` | |
| shape | 设置按钮形状 | `circle` \| `square` | `circle` | |
| onClick | 点击按钮时的回调 | (event) => void | - | |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - | |
| target | 相当于 a 标签的 target 属性，href 存在时生效 | string | - | |
| badge | 带徽标数字的悬浮按钮（不支持 status 以及相关属性） | [BadgeProps](/components/badge-cn#api) | - | |

### 共同的 events

| 事件名称 | 说明 | 回调参数 | 版本 |
|----------|------|----------|------|
| click | 点击按钮时的回调 | `(event) => void` | - |

### FloatButton.Group

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| shape | 设置包含的 FloatButton 按钮形状 | `circle` \| `square` | `circle` | |
| trigger | 触发方式（有触发方式为菜单模式） | `click` \| `hover` | - | |
| open(v-model) | 受控展开 | boolean | - | |

### FloatButton.Group Events

| 事件名称 | 说明 | 回调参数 | 版本 |
|----------|------|----------|------|
| openChange | 展开收起时的回调 | (open: boolean) => void | - |

### FloatButton.BackTop

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| duration | 回到顶部所需时间（ms） | number | 450 | |
| target | 设置需要监听其滚动事件的元素 | () => HTMLElement | () => window | |
| visibilityHeight | 滚动高度达到此参数值才出现 BackTop | number | 400 | |
| onClick | 点击按钮的回调函数 | () => void | - | |

## 代码示例

### 基本

```vue
<template>
  <a-float-button />
</template>
```

最简单的用法。

### 形状

```vue
<template>
  <a-float-button shape="circle" />
  <a-float-button shape="square" />
</template>
```

悬浮按钮支持圆形和方形两种形状。

### 含有气泡卡片的悬浮按钮

```vue
<template>
  <a-float-button tooltip="帮助文档" />
</template>
```

设置 `tooltip` 属性，即可开启气泡卡片。

### 菜单模式

```vue
<template>
  <a-float-button-group trigger="hover">
    <a-float-button />
    <a-float-button />
  </a-float-button-group>
</template>
```

设置 `trigger` 属性即可开启菜单模式。提供 `hover` 和 `click` 两种触发方式。

### 徽标数

```vue
<template>
  <a-float-button :badge="{ count: 5 }" />
</template>
```

右上角附带圆形徽标数字的悬浮按钮。

### 类型

```vue
<template>
  <a-float-button type="default" />
  <a-float-button type="primary" />
</template>
```

通过 `type` 改变悬浮按钮的类型。

### 描述

```vue
<template>
  <a-float-button shape="square" description="HELP" />
</template>
```

可以通过 `description` 设置文字内容。

> 仅当 `shape` 属性为 `square` 时支持。由于空间较小，推荐使用比较精简的双数文字。

### 浮动按钮组

```vue
<template>
  <a-float-button-group shape="circle">
    <a-float-button />
    <a-float-button />
    <a-float-button />
  </a-float-button-group>
</template>
```

按钮组合使用时，推荐使用 `<FloatButton.Group />`，并通过设置 `shape` 属性改变悬浮按钮组的形状。悬浮按钮组的 `shape` 会覆盖内部 FloatButton 的 `shape` 属性。

### 回到顶部

```vue
<template>
  <a-float-button-back-top />
</template>
```

返回页面顶部的操作按钮。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/float-button-cn
