# Numeric 数字展示

## 概述

当需要以特定格式显示数字时使用。

## 何时使用

当需要以特定格式显示数字时使用。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| tag | 实际渲染的元素标签 | string | `span` | - |
| value | 需要格式化的数字 | number \| string | - | - |
| unit | 设置数字的单位 | NumericUnit | - | - |
| decimal | 需要保留的小数位数（截断，而非四舍五入） | number \| string | `2` | - |
| fixed | 是否始终显示指定的小数位数（补 0） | boolean | `false` | - |
| thousandth | 是否将数字转化为千分位 | boolean | `true` | - |

### 插槽

| 名称 | 说明 | 参数 | 版本 |
|------|------|------|------|
| customRender | 自定义渲染插槽 | `{ formatted: boolean, result: string, number: number, integer: string, decimal: string, thousandthList: string[] }` | - |

## 代码示例

### 基本用法

```vue
<template>
  <a-space direction="vertical" style="width: 100%">
    <h4>普通数字</h4>
    <a-numeric>123.456</a-numeric>
    <h4>金额数字</h4>
    <a-numeric :unit="Numeric.Yuan" fixed>123456</a-numeric>
  </a-space>
</template>

<script setup lang="ts">
import { Numeric } from '@hwork/ant-design-vue';
</script>
```

最简单的用法。

### 自定义

```vue
<template>
  <a-space direction="vertical" style="width: 100%">
    <a-input v-model:value="value" placeholder="输入些数字吧~" />
    <a-numeric :value="value" unit="棵">
      <template #customRender="{ formatted, number, result }">
        <template v-if="formatted && number > 0">
          <template v-if="number < 100">
            我家门前有100颗树，{{ result }}是枣树，另外{{ 100 - number }}棵也是枣树
          </template>
          <template v-else>我家住在枣山路</template>
        </template>
        <template v-else>我家门前没有树</template>
      </template>
    </a-numeric>
    <a-numeric tag="div" class="formatted-info" unit="棵">
      <template #customRender="{ formatted, result, number, integer, decimal, thousandthList }">
        <div>输入值：{{ value }}</div>
        <div>格式化：{{ formatted ? '是' : '否' }}</div>
        <div>产物：{{ result }}</div>
        <div>数字：{{ number }}</div>
        <div>整数：{{ integer }} -> 千分位：{{ thousandthList }}</div>
        <div>小数：{{ decimal }}</div>
      </template>
      {{ value }}
    </a-numeric>
  </a-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('2');
</script>

<style lang="less" scoped>
.formatted-info {
  padding: 20px;
  color: #86909c;
  background: #fafafa;
}
</style>
```

通过使用 `customRender` 插槽，以及其提供的格式化好的数据，可以实现完全的自定义内容展示。

### 数字单位

```vue
<template>
  <a-space direction="vertical" style="width: 100%">
    <h4>人民币（符号）</h4>
    <a-numeric :unit="Numeric.CNY" fixed>123456</a-numeric>
    <h4>人民币（文字）</h4>
    <a-numeric :unit="Numeric.Yuan" fixed>123456</a-numeric>
    <h4>美元</h4>
    <a-numeric :unit="Numeric.USD" fixed>123456</a-numeric>
    <h4>百分比</h4>
    <a-numeric :unit="Numeric.PCT" decimal="1">99.999999</a-numeric>
    <h4>自定义</h4>
    <a-numeric
      tag="a"
      href="https://www.bilibili.com/video/BV1GJ411x7h7/"
      target="_blank"
      value="123456"
      unit="我家门前有_棵树，其中_棵是枣树，你猜有几棵苹果树？"
      :thousandth="false"
    />
    <a-numeric style="color: red" unit="一共_元" fixed>123456</a-numeric>
  </a-space>
</template>

<script setup lang="ts">
import { Numeric } from '@hwork/ant-design-vue';
</script>
```

最简单的用法。

> 除了默认提供的 4 种单位之外，你还可以通过传入字符串模板的方式进行自定义，数字将渲染在字符串模板中 `_` 字符的位置。

## NumericUnit 类型

内置单位类型：

- `Numeric.CNY` - 人民币符号（￥）
- `Numeric.Yuan` - 人民币文字（元）
- `Numeric.USD` - 美元符号（$）
- `Numeric.PCT` - 百分比（%）
- 自定义字符串模板 - 使用 `_` 作为数字占位符

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/numeric-cn