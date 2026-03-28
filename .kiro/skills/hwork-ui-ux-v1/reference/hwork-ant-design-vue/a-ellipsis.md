# Ellipsis 文字缩略

## 概述

当文字超长时将其省略展示，并且显示 tooltip

## 何时使用

- 当文本内容超出容器宽度时，自动省略多余文本
- 需要在鼠标悬停时显示完整内容
- 支持单行或多行文本省略

## API

### Ellipsis Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| tag | 实际渲染的元素标签 | string | `div` | 4.1.19 |
| maxLines | 设置最多展示几行 | number \| string | `1` | 4.1.19 |
| tooltip | 当内容过长被隐藏时显示 tooltip | boolean \| string \| slot | `true` | 4.1.19 |
| trigger | tooltip 触发行为 | `hover` \| `click` | `hover` | 4.1.19 |
| mouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：秒 | number | `0.1` | 4.1.19 |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 | number | `0.1` | 4.1.19 |

### Ellipsis.Expand Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| expandText | 展开/收起按钮内容插槽 | v-slot:expandText="{ collapse: boolean }" | - | 4.1.19 |
| maxLines | 设置最多展示几行 | number \| string | `1` | 4.1.19 |

## 代码示例

### 基本用法

```vue
<template>
  <a-space direction="vertical" style="width: 100%">
    <h4>单行省略</h4>
    <a-ellipsis style="width: 160px">超出一行显示省略号并展示tooltip</a-ellipsis>

    <h4 style="margin-top: 16px">多行省略</h4>
    <a-ellipsis max-lines="3" style="width: 160px">
      <span v-for="i in 10" :key="i">超出三行显示省略号并展示tooltip</span>
    </a-ellipsis>
  </a-space>
</template>
```

最简单的用法，支持单行和多行省略。

### 自定义 tooltip 展示内容

```vue
<template>
  <a-space direction="vertical" style="width: 100%">
    <h4>自定义展示文案</h4>
    <a-ellipsis tooltip="自定义展示内容" style="width: 160px">
      超出一行显示省略号并展示tooltip
    </a-ellipsis>

    <a-ellipsis trigger="click" style="width: 160px">
      <template #tooltip>自定义展示内容</template>
      超出一行显示省略号并展示tooltip
    </a-ellipsis>

    <h4 style="margin-top: 16px">不展示 tooltip</h4>
    <a-ellipsis :tooltip="false" style="width: 160px">超出一行显示省略号不展示tooltip</a-ellipsis>
  </a-space>
</template>
```

可以自定义 tooltip 的展示内容，或者完全禁用 tooltip。

### 自定义 tag

```vue
<template>
  <a-ellipsis
    tag="a"
    href="https://www.baidu.com"
    target="_blank"
    style="display: inline-block; width: 10vw"
    :mouse-enter-delay="0.5"
  >
    跳转到百度（www.baidu.com）
  </a-ellipsis>
</template>
```

通过 `tag` 属性可以自定义渲染的元素标签，例如渲染为链接。

### 展开/收起

```vue
<template>
  <a-space direction="vertical" style="width: 100%">
    <a-ellipsis-expand>
      <span v-for="i in 3" :key="i">超出一行显示省略号并展示【展开/收起】按钮</span>
    </a-ellipsis-expand>

    <a-ellipsis-expand max-lines="3" style="font-size: 16px; line-height: 24px; color: #86909c">
      <span v-for="i in 10" :key="i">超出三行显示省略号并展示【展开/收起】按钮</span>

      <template #expandText="{ collapse }">
        {{ collapse ? 'Less' : 'More' }}
      </template>
    </a-ellipsis-expand>
  </a-space>
</template>
```

使用 `a-ellipsis-expand` 组件可以实现展开/收起功能，支持自定义按钮文案。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/ellipsis-cn
