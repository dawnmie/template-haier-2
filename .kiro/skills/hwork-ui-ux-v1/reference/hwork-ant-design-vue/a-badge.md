# Badge 徽标数

## 概述

图标右上角的圆形徽标数字。

## 何时使用

一般出现在通知图标或头像的右上角,用于显示需要处理的消息条数,通过醒目视觉形式吸引用户处理。

## API

### Badge

| 参数          | 说明                                                                   | 类型                                                           | 默认值  | 版本  |
| ------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- | ------- | ----- |
| color         | 自定义小圆点的颜色                                                     | string                                                         | -       | 1.5.0 |
| count         | 展示的数字,大于 overflowCount 时显示为 `${overflowCount}+`,为 0 时隐藏 | number \| string \| slot                                       | -       | -     |
| dot           | 不展示数字,只有一个小红点                                              | boolean                                                        | `false` | -     |
| numberStyle   | 设置状态点的样式                                                       | object                                                         | -       | -     |
| offset        | 设置状态点的位置偏移,格式为 [x, y]                                     | [number\|string, number\|string]                               | -       | -     |
| overflowCount | 展示封顶的数字值                                                       | number                                                         | `99`    | -     |
| showZero      | 当数值为 0 时,是否展示 Badge                                           | boolean                                                        | `false` | -     |
| status        | 设置 Badge 为状态点                                                    | `success` \| `processing` \| `default` \| `error` \| `warning` | -       | -     |
| text          | 在设置了 status 的前提下有效,设置状态点的文本                          | string                                                         | -       | -     |
| title         | 设置鼠标放在状态点上时显示的文字                                       | string                                                         | `count` | -     |

### Badge.Ribbon (2.0.1+)

| 参数      | 说明                                               | 类型                    | 默认值 | 版本 |
| --------- | -------------------------------------------------- | ----------------------- | ------ | ---- |
| color     | 自定义缎带的颜色                                   | string                  | -      | -    |
| placement | 缎带的位置,start 和 end 随文字方向(RTL 或 LTR)变动 | `start` \| `end`        | `end`  | -    |
| text      | 缎带中填入的内容                                   | string \| VNode \| slot | -      | -    |

## 代码示例

### 基本

```vue
<template>
  <a-badge :count="5">
    <a href="#" class="head-example" />
  </a-badge>
</template>
```

简单的徽章展示,当 `count` 为 `0` 时,默认不显示,但是可以使用 `showZero` 修改为显示。count设置为new时展示new角标。

### 独立使用

```vue
<template>
  <a-badge :count="25" />
  <a-badge :count="4" />
  <a-badge :count="99" show-zero />
</template>
```

不包裹任何元素即是独立使用,可自定样式展现。在右上角的 badge 则限定为红色。

### 封顶数字

```vue
<template>
  <a-badge :count="99">
    <a href="#" class="head-example" />
  </a-badge>
  <a-badge :count="100">
    <a href="#" class="head-example" />
  </a-badge>
  <a-badge :count="99" :overflow-count="10">
    <a href="#" class="head-example" />
  </a-badge>
  <a-badge :count="1000" :overflow-count="999">
    <a href="#" class="head-example" />
  </a-badge>
</template>
```

超过 `overflowCount` 的会显示为 `${overflowCount}+`,默认的 `overflowCount` 为 `99`。

### 讨嫌的小红点

```vue
<template>
  <a-badge dot>
    <a-icon type="notification" />
  </a-badge>
  <a-badge dot>
    <a href="#">Link something</a>
  </a-badge>
</template>
```

没有具体的数字。

### 状态点

```vue
<template>
  <a-badge status="success" />
  <a-badge status="error" />
  <a-badge status="default" />
  <a-badge status="processing" />
  <a-badge status="warning" />

  <a-badge status="success" text="Success" />
  <a-badge status="error" text="Error" />
  <a-badge status="default" text="Default" />
  <a-badge status="processing" text="Processing" />
  <a-badge status="warning" text="Warning" />
</template>
```

用于表示状态的小圆点。

### 动态

```vue
<template>
  <div>
    <a-badge :count="count">
      <a href="#" class="head-example" />
    </a-badge>
    <a-button-group>
      <a-button @click="decline"> - </a-button>
      <a-button @click="increase"> + </a-button>
    </a-button-group>

    <a-badge :dot="show">
      <a href="#" class="head-example" />
    </a-badge>
    <a-switch v-model:checked="show" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(5)
const show = ref(true)

const decline = () => {
  if (count.value > 0) {
    count.value--
  }
}

const increase = () => {
  count.value++
}
</script>
```

展示动态变化的效果。

### 自定义标题

```vue
<template>
  <a-badge :count="5" title="Custom hover text">
    <a href="#" class="head-example" />
  </a-badge>
</template>
```

设置鼠标放在状态点上时显示的文字。

### 缎带

```vue
<template>
  <a-badge-ribbon text="Hippies">
    <a-card title="Pushes open the window" size="small"> and raises the spyglass. </a-card>
  </a-badge-ribbon>

  <a-badge-ribbon text="Hippies" color="pink">
    <a-card title="Pushes open the window" size="small"> and raises the spyglass. </a-card>
  </a-badge-ribbon>

  <a-badge-ribbon text="Hippies" color="red">
    <a-card title="Pushes open the window" size="small"> and raises the spyglass. </a-card>
  </a-badge-ribbon>

  <a-badge-ribbon text="Hippies" color="cyan">
    <a-card title="Pushes open the window" size="small"> and raises the spyglass. </a-card>
  </a-badge-ribbon>

  <a-badge-ribbon text="Hippies" color="green">
    <a-card title="Pushes open the window" size="small"> and raises the spyglass. </a-card>
  </a-badge-ribbon>

  <a-badge-ribbon text="Hippies" color="purple">
    <a-card title="Pushes open the window" size="small"> and raises the spyglass. </a-card>
  </a-badge-ribbon>

  <a-badge-ribbon text="Hippies" color="volcano">
    <a-card title="Pushes open the window" size="small"> and raises the spyglass. </a-card>
  </a-badge-ribbon>

  <a-badge-ribbon text="Hippies" color="magenta">
    <a-card title="Pushes open the window" size="small"> and raises the spyglass. </a-card>
  </a-badge-ribbon>
</template>
```

使用缎带型的徽标。

### 多彩徽标

```vue
<template>
  <div>
    <h4>Presets:</h4>
    <a-badge color="pink" text="pink" />
    <a-badge color="red" text="red" />
    <a-badge color="yellow" text="yellow" />
    <a-badge color="orange" text="orange" />
    <a-badge color="cyan" text="cyan" />
    <a-badge color="green" text="green" />
    <a-badge color="blue" text="blue" />
    <a-badge color="purple" text="purple" />
    <a-badge color="geekblue" text="geekblue" />
    <a-badge color="magenta" text="magenta" />
    <a-badge color="volcano" text="volcano" />
    <a-badge color="gold" text="gold" />
    <a-badge color="lime" text="lime" />

    <a-divider>Custom</a-divider>
    <a-badge color="#f50" text="#f50" />
    <a-badge color="#2db7f5" text="#2db7f5" />
    <a-badge color="#87d068" text="#87d068" />
    <a-badge color="#108ee9" text="#108ee9" />
  </div>
</template>
```

1.5.0 后新增。我们添加了多种预设色彩的徽标样式,用作不同场景使用。如果预设值不能满足你的需求,可以设置为具体的色值。

### 可点击

```vue
<template>
  <a href="#">
    <a-badge :count="5">
      <span class="head-example" />
    </a-badge>
  </a>
</template>
```

用 a 标签进行包裹即可。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/badge-cn
