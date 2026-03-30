# Statistic 统计数值

## 概述

展示统计数值。

## 何时使用

- 当需要突出某个或某组数字时
- 当需要展示带描述的统计类数据时使用

## API

### Statistic

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| decimalSeparator | 设置小数点 | string | `.` | - |
| formatter | 自定义数值展示 | v-slot \| ({value}) => VNode | - | - |
| groupSeparator | 设置千分位标识符 | string | `,` | - |
| precision | 数值精度 | number | - | - |
| prefix | 设置数值的前缀 | string \| v-slot | - | - |
| suffix | 设置数值的后缀 | string \| v-slot | - | - |
| title | 数值的标题 | string \| v-slot | - | - |
| value | 数值内容 | string \| number | - | - |
| valueStyle | 设置数值的样式 | style | - | - |

### Statistic.Countdown

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| format | 格式化倒计时展示，参考 [dayjs](https://day.js.org/) | string | `'HH:mm:ss'` | - |
| prefix | 设置数值的前缀 | string \| v-slot | - | - |
| suffix | 设置数值的后缀 | string \| v-slot | - | - |
| title | 数值的标题 | string \| v-slot | - | - |
| value | 数值内容 | number \| dayjs | - | - |
| valueStyle | 设置数值的样式 | style | - | - |

### 事件

#### Statistic.Countdown

| 事件名称 | 说明 | 回调参数 | 版本 |
|----------|------|----------|------|
| finish | 倒计时完成时触发 | () => void | - |

## 代码示例

### 基本用法

```vue
<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-statistic title="Active Users" :value="112893" />
    </a-col>
    <a-col :span="12">
      <a-statistic title="Account Balance (CNY)" :value="112893" :precision="2" />
    </a-col>
  </a-row>
</template>
```

简单展示。

### 在卡片中使用

```vue
<template>
  <div style="background: #ececec; padding: 30px;">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <a-statistic
            title="Feedback"
            :value="11.28"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card>
          <a-statistic
            title="Idle"
            :value="9.3"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#cf1322' }"
          >
            <template #prefix>
              <arrow-down-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
```

在卡片中展示统计数值。

### 单位

```vue
<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-statistic title="Feedback" :value="1128">
        <template #suffix>
          <like-outlined />
        </template>
      </a-statistic>
    </a-col>
    <a-col :span="12">
      <a-statistic title="Unmerged" :value="93" suffix="/ 100" />
    </a-col>
  </a-row>
</template>
```

通过前缀和后缀添加单位。

### 倒计时

```vue
<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-statistic-countdown title="Countdown" :value="deadline" format="HH:mm:ss" />
    </a-col>
    <a-col :span="12">
      <a-statistic-countdown title="Million Seconds" :value="deadline" format="HH:mm:ss:SSS" />
    </a-col>
    <a-col :span="24" style="margin-top: 32px;">
      <a-statistic-countdown title="Day Level" :value="deadline" format="D 天 H 时 m 分 s 秒" />
    </a-col>
  </a-row>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const deadline = ref(dayjs().add(2, 'days'));
</script>
```

倒计时组件。

### 倒计时组件

```vue
<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-statistic-countdown title="Countdown" :value="deadline">
        <template #title>
          <span>Countdown</span>
          <question-circle-outlined style="margin-left: 4px;" />
        </template>
      </a-statistic-countdown>
    </a-col>
    <a-col :span="12">
      <a-statistic-countdown title="Million Seconds countdown" :value="deadline" format="HH:mm:ss:SSS">
        <template #formatter="{ value }">
          <span>There's only {{ value }} left for the end.</span>
        </template>
      </a-statistic-countdown>
    </a-col>
  </a-row>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';

const deadline = ref(dayjs().add(2, 'days'));
</script>
```

倒计时组件使用插槽。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/statistic-cn
