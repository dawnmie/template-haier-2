# Switch 开关

开关选择器。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `checkbox` 的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 代码演示

### 基本用法

最简单的用法。

```vue
<template>
  <a-switch v-model:checked="checked" />
</template>
```

### 文字和图标

带有文字和图标。

```vue
<template>
  <a-switch v-model:checked="checked" checked-children="开" un-checked-children="关" />
  <a-switch v-model:checked="checked">
    <template #checkedChildren><CheckOutlined /></template>
    <template #unCheckedChildren><CloseOutlined /></template>
  </a-switch>
</template>
```

### 加载中

标识开关操作仍在执行中。

```vue
<template>
  <a-switch loading :checked="true" />
  <a-switch loading :checked="false" />
</template>
```

### 不可用

Switch 失效状态。

```vue
<template>
  <a-switch :checked="true" disabled />
  <a-switch :checked="false" disabled />
</template>
```

### 三种大小

`size="large"` 表示大号开关。`size="small"` 表示小号开关。

```vue
<template>
  <a-switch size="large" />
  <a-switch />
  <a-switch size="small" />
</template>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autofocus | 组件自动获取焦点 | boolean | false | |
| checked(v-model) | 指定当前是否选中 | checkedValue \| unCheckedValue | false | |
| childrenPosition | 选中时的内容的位置，可选值：`inner` `outer` `label` | string | inner | |
| checkedChildren | 选中时的内容 | string\|slot | | |
| checkedValue | 选中时的值 | boolean \| string \| number | true | 2.2.1 |
| disabled | 是否禁用 | boolean | false | |
| loading | 加载中的开关 | boolean | false | |
| size | 开关大小，可选值：`default` `small` | string | default | |
| unCheckedChildren | 非选中时的内容 | string\|slot | | |
| unCheckedValue | 非选中时的值 | boolean \| string \| number | false | 2.2.1 |

## 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 变化时回调函数 | Function(checked: boolean \| string \| number, event: Event) |
| click | 点击时回调函数 | Function(checked: boolean \| string \| number, event: Event) |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
