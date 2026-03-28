# Search 搜索区域

H-work 标准列表搜索区域实现，用就完事了~

## 何时使用

列表需要查询的时候。

## 代码演示

### 基本用法

最简单的用法。

```vue
<template>
  <a-search>
    <a-search-item label="选择查询">
      <a-select placeholder="请选择" />
    </a-search-item>
    <a-search-item label="输入查询">
      <a-input placeholder="请输入" />
    </a-search-item>
    <a-search-item label="时间查询">
      <a-date-picker placeholder="请选择日期" />
    </a-search-item>
  </a-search>
</template>
```

### 定制 label 内容

你可以使用 props label 以及 v-slot:label 来定义其对应的展示内容，或者简单的不用，完全自行实现也是可以的。

值得注意的是，label 是通过查询项的 props prefix 属性来展示的，如果你使用到的查询项（比如checkbox）没有这个属性，那你铁定是要自己去实现了的。

> 注：若 ASearchItem 中的查询项为多选的Select、TreeSelect、Cascader，请勿在 `v-slot:label` 中嵌入单选的Select，否则将会出现样式异常问题，反之亦然。

```vue
<template>
  <a-search>
    <a-search-item :label="[
      { label: '预告中', value: 1 },
      { label: '上映中', value: 2 }
    ]" v-model:labelValue="labelValue" required>
      <a-select placeholder="请选择" />
    </a-search-item>
    <a-search-item>
      <template #label="{ maxWidth }">
        <a-select :style="{ maxWidth: maxWidth + 'px' }" placeholder="预告中" />
      </template>
      <a-input placeholder="请输入" />
    </a-search-item>
  </a-search>
</template>
```

### 展开/收起

默认情况下，只要查询项超过 2 行，该组件就会自动将超出部分隐藏，同时显示展开/收起按钮。

- 如果你希望超过 N 行才自动收起，则可以使用 `collapsed-row-count` 进行设置。但是当你设置了 1 行自动收起，而页面的宽度却只能容纳 1 列时，为了保证功能完整性，组件将展示 2 行内容。
- 如果你想指定收起的查询项，为其设置 `collapsible` 属性即可，此时展开/收起按钮将始终显示，并且该组件将仅仅收起你指定的查询项，而其余的查询项将始终展示，不管是否超出 2 行。

#### 自动收起：查询项超过 N 行时自动收起

```vue
<template>
  <div>
    <div>设置 N 值：<a-input-number v-model:value="rowCount" placeholder="默认为 2" /></div>
    <a-search :collapsed-row-count="rowCount">
      <a-search-item label="查询项1">
        <a-input placeholder="请输入" />
      </a-search-item>
      <a-search-item label="查询项2">
        <a-input placeholder="请输入" />
      </a-search-item>
      <a-search-item label="查询项3">
        <a-input placeholder="请输入" />
      </a-search-item>
    </a-search>
  </div>
</template>
```

#### 手动收起：仅收起设置了 collapsible 的查询项

```vue
<template>
  <a-search>
    <a-search-item label="查询项1">
      <a-input placeholder="请输入" />
    </a-search-item>
    <a-search-item label="查询项3" collapsible>
      <a-input placeholder="请输入" />
    </a-search-item>
    <a-search-item label="查询项5" collapsible>
      <a-input placeholder="请输入" />
    </a-search-item>
    <!-- 更多查询项... -->
  </a-search>
</template>
```

### 在弹窗中使用

使用 `column-count` 属性即可固定展示的列数。

> 注：组件内部存在列宽检测，当列宽小于 200px 后，列数的最小值将为 `Math.max(Math.floor(容器宽度 / 200), 1)`。

```vue
<template>
  <a-modal v-model:visible="visible" title="搜索">
    <a-search :column-count="2">
      <a-search-item label="查询项1">
        <a-input placeholder="请输入" />
      </a-search-item>
      <a-search-item label="查询项2">
        <a-input placeholder="请输入" />
      </a-search-item>
    </a-search>
  </a-modal>
</template>
```

## API

### Search Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| columnCount | 展示的列数 | number \| `responsive` | `responsive` | |
| collapsedRowCount | 设置查询项超过 N 行时自动收起 | number \| string | `2` | |
| disabled | 设置搜索区域组件禁用，仅对 antdv 组件有效 | boolean | `false` | |

### Search 插槽

| 插槽名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 默认插槽 | - |
| actions | 搜索操作区域插槽 | { onSearch: () => void, onReset: () => void, onShowMore: () => void, showMore: boolean, enableShowMore: boolean } |

### Search Events

| 事件名称 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| search | 点击查询按钮时触发 | function | |
| reset | 点击重置按钮时触发 | function | |

### Search.Item Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| label | 查询项内部左侧的内容，传入数组时表示该 label 可选 | string \| { label: string, value: number \| string }[] \| v-slot:label="{ maxWidth: number }" | | |
| labelValue(v-model) | 当 label 为可选状态后（即传入数组），该值标识当前选中的 label.value 的值 | number \| string | | |
| maxLabelWidth | 手动设置 label 的最大宽度 | number \| string | | |
| span | 查询项占位格数，注：仅支持传入大于 1 的正整数 | number | `1` | |
| collapsible | 是否默认收起该查询项 | boolean | `false` | |
| required | 是否展示必填星号 | boolean | `false` | |

## 版本信息

- 组件版本：4.1.6
- Vue 版本：3.4.21
- Ant Design Vue 版本：4.1.26-beta.2
