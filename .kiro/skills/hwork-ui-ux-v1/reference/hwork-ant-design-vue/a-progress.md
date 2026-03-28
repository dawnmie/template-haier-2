# Progress 进度条

## 概述

展示操作的当前进度。

## 何时使用

在操作需要较长时间才能完成时,为用户显示该操作的当前进度和状态。

- 当一个操作会打断当前界面,或者需要在后台运行,且耗时可能超过 2 秒时;
- 当需要显示一个操作完成的百分比时。

## API

各类型共用的属性。

### Props

| 属性          | 说明                                                         | 类型                                                                                                                         | 默认值                     | 版本 |
| ------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---- |
| format        | 内容的模板函数                                               | function(percent, successPercent)                                                                                            | (percent) => percent + `%` | -    |
| percent       | 百分比                                                       | number                                                                                                                       | 0                          | -    |
| showInfo      | 是否显示进度数值或状态图标                                   | boolean                                                                                                                      | true                       | -    |
| status        | 状态,可选:`success` `exception` `normal` `active`(仅限 line) | string                                                                                                                       | -                          | -    |
| strokeColor   | 进度条的色彩                                                 | string                                                                                                                       | -                          | -    |
| strokeLinecap | 进度条的样式                                                 | `round` \| `butt` \| `square`,区别详见 [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) | `round`                    | -    |
| success       | 成功进度条相关配置                                           | { percent: number, strokeColor: string }                                                                                     | -                          | -    |
| title         | html 标签 title                                              | string                                                                                                                       | -                          | 3.0  |
| trailColor    | 未完成的分段的颜色                                           | string                                                                                                                       | -                          | -    |
| type          | 类型,可选 `line` `circle` `dashboard`                        | string                                                                                                                       | `line`                     | -    |
| size          | 进度条的尺寸                                                 | number \| [number, number] \| "small" \| "default"                                                                           | "default"                  | -    |

### type="line"

| 属性        | 说明                                                                 | 类型                                                                  | 默认值 | 版本 |
| ----------- | -------------------------------------------------------------------- | --------------------------------------------------------------------- | ------ | ---- |
| steps       | 进度条总共步数                                                       | number                                                                | -      | -    |
| strokeColor | 进度条的色彩,传入 object 时为渐变。当有 `steps` 时支持传入一个数组。 | string \| string[] \| { from: string; to: string; direction: string } | -      | -    |

### type="circle"

| 属性        | 说明                                            | 类型             | 默认值 | 版本 |
| ----------- | ----------------------------------------------- | ---------------- | ------ | ---- |
| strokeColor | 圆形进度条线的色彩,传入 object 时为渐变         | string \| object | -      | -    |
| strokeWidth | 圆形进度条线的宽度,单位是进度条画布宽度的百分比 | number           | 12     | -    |

### type="dashboard"

| 属性        | 说明                                              | 类型                                   | 默认值   | 版本 |
| ----------- | ------------------------------------------------- | -------------------------------------- | -------- | ---- |
| gapDegree   | 仪表盘进度条缺口角度,可取值 0 ~ 295               | number                                 | 75       | -    |
| gapPosition | 仪表盘进度条缺口位置                              | `top` \| `bottom` \| `left` \| `right` | `bottom` | -    |
| strokeWidth | 仪表盘进度条线的宽度,单位是进度条画布宽度的百分比 | number                                 | 12       | -    |

## 代码示例

### 进度条

```vue
<template>
  <a-progress :percent="30" />
  <a-progress :percent="50" status="active" />
  <a-progress :percent="70" status="exception" />
  <a-progress :percent="100" />
  <a-progress :percent="50" :show-info="false" />
</template>
```

标准的进度条。

### 小型进度条

```vue
<template>
  <a-progress :percent="30" size="small" />
  <a-progress :percent="50" size="small" status="active" />
  <a-progress :percent="70" size="small" status="exception" />
  <a-progress :percent="100" size="small" />
</template>
```

适合放在较狭窄的区域内。

### 进度圈

```vue
<template>
  <a-progress type="circle" :percent="75" />
  <a-progress type="circle" :percent="70" status="exception" />
  <a-progress type="circle" :percent="100" />
</template>
```

圈形的进度。

### 小型进度圈

```vue
<template>
  <a-progress type="circle" :percent="30" :width="80" />
  <a-progress type="circle" :percent="70" :width="80" status="exception" />
  <a-progress type="circle" :percent="100" :width="80" />
</template>
```

小一号的圈形进度。

### 响应式进度圈

```vue
<template>
  <a-progress type="circle" :percent="75" :width="20" />
  <span>代码发布</span>
</template>
```

响应式的圈形进度,当 `width` 小于等于 20 的时候,进度信息将不会显示在进度圈里面,而是以 Tooltip 的形式显示。

### 动态展示

```vue
<template>
  <a-progress :percent="percent" />
  <a-button-group>
    <a-button @click="decline">
      <h-icon-minus />
    </a-button>
    <a-button @click="increase">
      <h-icon-plus />
    </a-button>
  </a-button-group>
</template>

<script setup>
import '@hwork/icon/plus'
import '@hwork/icon/minus'

import { ref } from 'vue'

const percent = ref(0)

const increase = () => {
  let newPercent = percent.value + 10
  if (newPercent > 100) {
    newPercent = 100
  }
  percent.value = newPercent
}

const decline = () => {
  let newPercent = percent.value - 10
  if (newPercent < 0) {
    newPercent = 0
  }
  percent.value = newPercent
}
</script>
```

会动的进度条才是好进度条。

### 进度圈动态展示

```vue
<template>
  <a-progress type="circle" :percent="percent" />
  <a-button-group>
    <a-button @click="decline"> - </a-button>
    <a-button @click="increase"> + </a-button>
  </a-button-group>
</template>
```

会动的进度条才是好进度条。

### 自定义文字格式

```vue
<template>
  <a-progress type="circle" :percent="75" :format="(percent) => `${percent} Days`" />
  <a-progress type="circle" :percent="100" :format="() => 'Done'" />
  <a-progress type="circle" :percent="75" :format="(percent) => `${percent}`" />
</template>
```

`format` 属性指定格式。

### 仪表盘

```vue
<template>
  <a-progress type="dashboard" :percent="75" />
</template>
```

通过设置 `type=dashboard`,可以很方便地实现仪表盘样式的进度条。若想要修改缺口的角度,可以设置 `gapDegree` 为你想要的值。

### 圆角/方角边缘

```vue
<template>
  <a-progress :percent="75" stroke-linecap="square" />
  <a-progress type="circle" :percent="75" stroke-linecap="square" />
  <a-progress type="dashboard" :percent="75" stroke-linecap="square" />
</template>
```

`strokeLinecap="square|round"` 可以调整进度条边缘的形状。

### 步骤进度条

```vue
<template>
  <a-progress :percent="50" :steps="3" />
  <a-progress :percent="30" :steps="5" />
  <a-progress :percent="100" :steps="5" />
  <a-progress :percent="60" :steps="5" stroke-color="#52c41a" />
</template>
```

带步骤的进度条。

### 分段进度条

```vue
<template>
  <a-progress :percent="60" :success="{ percent: 30 }" />
  <a-progress type="circle" :percent="60" :success="{ percent: 30 }" />
  <a-progress type="dashboard" :percent="60" :success="{ percent: 30 }" />
</template>
```

标准的进度条。

### 自定义进度条渐变色

```vue
<template>
  <a-progress :percent="99.9" :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }" />
  <a-progress :percent="99.9" :stroke-color="{ from: '#108ee9', to: '#87d068' }" status="active" />
  <a-progress type="circle" :percent="90" :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }" />
  <a-progress type="circle" :percent="100" :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }" />
</template>
```

`linear-gradient` 的封装。推荐只传两种颜色。

### 进度条尺寸

```vue
<template>
  <div>
    <a-progress :percent="50" />
    <a-progress :percent="50" size="small" />
    <a-progress :percent="50" :size="[300, 20]" />
  </div>
  <div>
    <a-progress type="circle" :percent="50" />
    <a-progress type="circle" :percent="50" :width="80" />
    <a-progress type="circle" :percent="50" :width="120" />
  </div>
  <div>
    <a-progress type="dashboard" :percent="50" />
    <a-progress type="dashboard" :percent="50" :width="80" />
    <a-progress type="dashboard" :percent="50" :width="120" />
  </div>
  <div>
    <a-progress :steps="3" :percent="50" />
    <a-progress :steps="3" :percent="50" size="small" />
    <a-progress :steps="3" :percent="50" :size="[300, 20]" />
    <a-progress :steps="3" :percent="50" :size="[300, 30]" />
  </div>
</template>
```

进度条尺寸。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/progress-cn
