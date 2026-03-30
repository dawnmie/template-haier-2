# Scrollbar 滚动条

H-work 标准滚动条实现，用于替换浏览器原生滚动条。

## 何时使用

- 需要统一滚动条样式时
- 需要自定义滚动条外观时
- 需要更好的跨浏览器滚动条体验时

## 代码演示

### 基本用法
最简单的用法。

### 横向滚动
当元素宽度大于滚动条宽度时，会显示横向滚动条。

### 最大高度
当元素高度超过最大高度，才会显示滚动条。

### 手动滚动
通过使用 `setScrollTop` 与 `setScrollLeft` 方法，可以手动控制滚动条滚动。

## API

### 属性

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| size | 滚动条尺寸 | `small` \| `default` | `default` | 4.1.19 |
| height | 滚动条高度 | `string` \| `number` | - | 4.1.19 |
| maxHeight | 滚动条最大高度 | `string` \| `number` | - | 4.1.19 |
| wrapClass | 包裹容器的自定义类名 | `string` | - | 4.1.19 |
| wrapStyle | 包裹容器的自定义样式 | `string` \| `CSSProperties` | - | 4.1.19 |
| viewClass | 视图的自定义类名 | `string` | - | 4.1.19 |
| viewStyle | 视图的自定义样式 | `string` \| `CSSProperties` | - | 4.1.19 |
| viewAttrs | 视图的自定义属性 | `HTMLAttributes` | - | 4.1.19 |
| viewTag | 视图的元素标签 | `string` | `div` | 4.1.19 |
| noresize | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 | `boolean` | `false` | 4.1.19 |
| always | 滚动条总是显示 | `boolean` | `true` | 4.1.19 |
| minSize | 滚动条最小尺寸 | `number` | `20` | 4.1.19 |

### 事件

| 事件名称 | 说明 | 类型 |
| --- | --- | --- |
| scroll | 当触发滚动事件时，返回滚动的距离 | `({ scrollLeft: number, scrollTop: number }) => void` |
| clickWrap | 点击包裹容器时触发 | `(event: MouseEvent) => void` |

### 方法

| 名称 | 描述 | 类型 |
| --- | --- | --- |
| scrollTo | 滚动到一组特定坐标 | `(options: ScrollToOptions \| number, yCoord?: number) => void` |
| setScrollTop | 设置滚动条到顶部的距离 | `(scrollTop: number) => void` |
| setScrollLeft | 设置滚动条到左边的距离 | `(scrollLeft: number) => void` |
| update | 手动更新滚动条状态 | `() => void` |
| wrapRef | 滚动条包裹的 ref 对象 | `Ref<HTMLDivElement>` |

## 使用示例

```vue
<template>
  <a-scrollbar height="200px">
    <div v-for="i in 20" :key="i">{{ i }}</div>
  </a-scrollbar>
</template>
```
