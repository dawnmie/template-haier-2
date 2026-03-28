# Pagination 分页

## 何时使用

采用分页的形式分隔长列表，每次只加载一个页面。

## 基本使用

```vue
<a-pagination @change="onChange" :total="50" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| current(v-model) | 当前页数 | number | - | |
| defaultPageSize | 默认的每页条数 | number | 10 | |
| disabled | 禁用分页 | boolean | - | 1.5.0 |
| hideOnSinglePage | 只有一页时是否隐藏分页器 | boolean | false | |
| itemRender | 用于自定义页码的结构，可用于优化 SEO | ({page, type: 'page' \| 'prev' \| 'next', originalElement}) => vNode \| v-slot | - | |
| pageSize(v-model) | 每页条数 | number | - | |
| pageSizeOptions | 指定每页可以显示多少条 | string[] \| number[] | ['10', '20', '50', '100'] | |
| responsive | 当 size 未指定时，根据屏幕宽度自动调整尺寸 | boolean | - | 3.1 |
| showLessItems | 是否显示较少页面内容 | boolean | false | 1.5.0 |
| showQuickJumper | 是否可以快速跳转至某页 | boolean | false | |
| showSizeChanger | 是否展示 pageSize 切换器，当 simple 不为 true 且 total 大于 50 时默认为 true | boolean | - | |
| showTotal | 用于显示数据总量和当前数据顺序 | Function(total, range) | - | |
| simple | 当添加该属性时，显示为简单分页 | boolean | - | |
| size | 当为「small」时，是小尺寸分页 | string | "" | |
| total | 数据总数 | number | 0 | |
| bordered | 是否有描边 | boolean | true | |

### Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数 | Function(page, pageSize) |
| showSizeChange | pageSize 变化的回调 | Function(current, size) |

## 使用示例

### 基础分页

```vue
<template>
  <a-pagination v-model:current="current" :total="50" />
</template>

<script setup>
import { ref } from 'vue';

const current = ref(1);
</script>
```

### 改变每页显示条目数

```vue
<template>
  <a-pagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :total="250"
    show-size-changer
  />
</template>

<script setup>
import { ref } from 'vue';

const current = ref(1);
const pageSize = ref(20);
</script>
```

### 快速跳转

```vue
<template>
  <a-pagination
    v-model:current="current"
    :total="500"
    show-quick-jumper
    show-size-changer
  />
</template>

<script setup>
import { ref } from 'vue';

const current = ref(1);
</script>
```

### 迷你版本

```vue
<template>
  <a-pagination v-model:current="current" :total="50" size="small" />
</template>

<script setup>
import { ref } from 'vue';

const current = ref(1);
</script>
```

### 简单翻页

```vue
<template>
  <a-pagination v-model:current="current" :total="50" simple />
</template>

<script setup>
import { ref } from 'vue';

const current = ref(2);
</script>
```

### 显示总数

```vue
<template>
  <a-pagination
    v-model:current="current"
    :total="85"
    :show-total="total => `Total ${total} items`"
    :page-size="20"
  />
</template>

<script setup>
import { ref } from 'vue';

const current = ref(1);
</script>
```

### 无描边

```vue
<template>
  <a-pagination v-model:current="current" :total="50" :bordered="false" />
</template>

<script setup>
import { ref } from 'vue';

const current = ref(1);
</script>
```
