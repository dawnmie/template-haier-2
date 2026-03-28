# Segmented 分段控制器

## 概述

分段控制器。

## 何时使用

- 用于展示多个选项并允许用户选择其中单个选项；
- 当切换选中选项时，关联区域的内容会发生变化。

## API

### Segmented

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| block | 将宽度调整为父元素宽度的选项 | boolean | - | - |
| disabled | 是否禁用 | boolean | `false` | - |
| options | 数据化配置选项内容 | string[] \| number[] \| SegmentedOption[] | `[]` | - |
| size | 控件尺寸 | `large` \| `middle` \| `small` \| `mini` | - | - |
| value | 当前选中的值 | string \| number | - | - |
| label | 使用插槽自定义 label | v-slot:label="SegmentedBaseOption" | - | - |

### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
|----------|------|----------|------|
| change | 选项变化时的回调函数 | function(value: string \| number) | - |

### SegmentedBaseOption、SegmentedOption

```typescript
interface SegmentedBaseOption {
  value: string | number;
  disabled?: boolean;
  payload?: any; // payload more data
  /**
   * html `title` property for label
   */
  title?: string;
  className?: string;
}

interface SegmentedOption extends SegmentedBaseOption {
  label?: VueNode | ((option: SegmentedBaseOption) => VueNode);
}
```

## 代码示例

### 基本用法

```vue
<template>
  <a-segmented v-model:value="value" :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" />
</template>
```

最简单的用法。

### 不可用

```vue
<template>
  <a-segmented :options="['Map', 'Transit', 'Satellite']" disabled />
  <a-segmented 
    :options="[
      { label: 'Daily', value: 'Daily' },
      { label: 'Weekly', value: 'Weekly', disabled: true },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Quarterly', value: 'Quarterly', disabled: true },
      { label: 'Yearly', value: 'Yearly' }
    ]" 
  />
</template>
```

Segmented 不可用。

### 动态数据

```vue
<template>
  <a-segmented v-model:value="value" :options="options" />
  <a-button @click="loadMore">Load More</a-button>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('Daily');
const options = ref(['Daily', 'Weekly', 'Monthly']);

const loadMore = () => {
  options.value = [...options.value, 'Quarterly', 'Yearly'];
};
</script>
```

动态加载数据。

### Block分段控制器

```vue
<template>
  <a-segmented v-model:value="value" :options="['123', '456', 'longtext-longtext-longtext-longtext']" block />
</template>
```

`block` 属性使其适合父元素宽度。

### 自定义渲染

```vue
<template>
  <a-segmented v-model:value="value" :options="options">
    <template #label="{ value, label }">
      <div style="padding: 4px">
        <avatar :name="label" />
        <div>{{ label }}</div>
      </div>
    </template>
  </a-segmented>
</template>
```

自定义渲染每一个 Segmented Item。

### 四种大小

```vue
<template>
  <a-segmented v-model:value="value" :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" size="large" />
  <a-segmented v-model:value="value" :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" />
  <a-segmented v-model:value="value" :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" size="small" />
  <a-segmented v-model:value="value" :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" size="mini" />
</template>
```

我们为 `<a-segmented />` 组件定义了四种尺寸（大、默认、小、迷你），高度分别为 `40px`、`32px`、`28px` 和 `24px`。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/segmented-cn
