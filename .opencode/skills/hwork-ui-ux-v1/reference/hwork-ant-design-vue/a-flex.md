# Flex 弹性布局

## 何时使用

- 适合设置元素之间的间距。
- 适合设置各种水平、垂直对齐方式。

### 与 Space 组件的区别

- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

## 代码演示

### 基本布局

最简单的用法。

```vue
<template>
  <a-flex gap="middle" vertical>
    <a-radio-group v-model:value="value">
      <a-radio value="horizontal">horizontal</a-radio>
      <a-radio value="vertical">vertical</a-radio>
    </a-radio-group>
    <a-flex :vertical="value === 'vertical'">
      <div
        v-for="(item, index) in new Array(4)"
        :key="item"
        :style="{ ...baseStyle, background: `${index % 2 ? '#1677ff' : '#1677ffbf'}` }"
      />
    </a-flex>
  </a-flex>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { CSSProperties } from 'vue';
const value = ref('horizontal');
const baseStyle: CSSProperties = {
  width: '25%',
  height: '54px',
};
</script>
```

### 对齐方式

设置对齐方式。

```vue
<template>
  <a-flex gap="middle" align="start" vertical>
    <p>Select justify :</p>
    <a-segmented v-model:value="justify" :options="justifyOptions" />
    <p>Select align :</p>
    <a-segmented v-model:value="alignItems" :options="alignOptions" />
    <a-flex :style="{ ...boxStyle }" :justify="justify" :align="alignItems">
      <a-button type="primary">Primary</a-button>
      <a-button type="primary">Primary</a-button>
      <a-button type="primary">Primary</a-button>
      <a-button type="primary">Primary</a-button>
    </a-flex>
  </a-flex>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { CSSProperties } from 'vue';
import type { FlexProps } from '@hwork/ant-design-vue';
const justifyOptions = reactive<FlexProps['justify'][]>([
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
]);

const alignOptions = reactive<FlexProps['align'][]>(['flex-start', 'center', 'flex-end']);
const justify = ref(justifyOptions[0]);
const alignItems = ref(alignOptions[0]);
const boxStyle: CSSProperties = {
  width: '100%',
  height: '120px',
  borderRadius: '6px',
  border: '1px solid #40a9ff',
};
</script>
```

### 设置间隙

使用 `gap` 设置元素之间的间距，预设了 `small`、`middle`、`large` 三种尺寸，也可以自定义间距。

```vue
<template>
  <a-flex gap="middle" vertical>
    <a-radio-group v-model:value="gapSize">
      <a-radio value="small">small</a-radio>
      <a-radio value="middle">middle</a-radio>
      <a-radio value="large">large</a-radio>
      <a-radio value="customize">customize</a-radio>
    </a-radio-group>
    <template v-if="gapSize === 'customize'">
      <a-slider v-model:value="customGapSize" />
    </template>
    <a-flex :gap="gapSize !== 'customize' ? gapSize : customGapSize">
      <a-button type="primary">Primary</a-button>
      <a-button>Default</a-button>
      <a-button type="dashed">Dashed</a-button>
      <a-button type="link">Link</a-button>
    </a-flex>
  </a-flex>
</template>
<script setup lang="ts">
import { ref } from 'vue';

type SizeType = 'small' | 'middle' | 'large' | undefined;

const gapSize = ref<SizeType | 'customize'>('small');

const customGapSize = ref<number>(0);
</script>
```

### 自动换行

自动换行。

```vue
<template>
  <a-flex wrap="wrap" gap="small">
    <a-button v-for="item in new Array(24)" :key="item" type="primary">Button</a-button>
  </a-flex>
</template>
```

### 组合使用

嵌套使用，可以实现更复杂的布局。

```vue
<template>
  <a-card :style="cardStyle" :body-style="{ padding: 0, overflow: 'hidden' }">
    <a-flex justify="space-between">
      <img
        alt="avatar"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        :style="imgStyle"
      />
      <a-flex vertical align="flex-end" justify="space-between" :style="{ padding: '32px' }">
        <a-typography>
          <a-typography-title :level="3">
            "antd is an enterprise-class UI design language and Vue UI library."
          </a-typography-title>
        </a-typography>
        <a-button type="primary" href="https://antdv.com" target="_blank">Get Start</a-button>
      </a-flex>
    </a-flex>
  </a-card>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue';
const cardStyle: CSSProperties = {
  width: '620px',
};
const imgStyle: CSSProperties = {
  display: 'block',
  width: '273px',
};
</script>
```

## API

> 自 `ant-design-vue@4.0.7` 版本开始提供该组件。Flex 组件默认行为在水平模式下，为向上对齐，在垂直模式下，为拉伸对齐，你可以通过属性进行调整。

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| vertical | flex 主轴的方向是否垂直，使用 `flex-direction: column` | boolean | `false` | |
| wrap | 设置元素单行显示还是多行显示 | 参考 [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) | nowrap | |
| justify | 设置元素在主轴方向上的对齐方式 | 参考 [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | normal | |
| align | 设置元素在交叉轴方向上的对齐方式 | 参考 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) | normal | |
| flex | flex CSS 简写属性 | 参考 [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex) | normal | |
| gap | 设置网格之间的间隙 | `small` \| `middle` \| `large` \| string \| number | - | |
| component | 自定义元素类型 | Component | `div` | |
