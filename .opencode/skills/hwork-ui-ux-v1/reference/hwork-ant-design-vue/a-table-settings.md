# TableSettings 表格设置

## 何时使用

用户可通过该组件自行设置表格行高，以及表格列展示效果。

## 代码演示

### 基本用法

最简单的用法。

注：保存 columns 列描述数据时请使用 shallowRef。

```vue
<template>
  <a-table-settings v-model:size="size" v-model:columns="columns" />
</template>
<script lang="ts" setup>
import type { TableSettingsProps } from '@hwork/ant-design-vue';
import { ref, shallowRef } from 'vue';

const size = ref<TableSettingsProps['size']>('small');

const columns = shallowRef<TableSettingsProps['columns']>([]);
for (let i = 0; i < 20; i++) {
  const key = i + 1;
  columns.value.push({ title: `Column ${key}`, dataIndex: 'address', key });
}
</script>
```

### 行高设置

使用 sizeOptions 属性来定制下拉列表内的选项。

注：size / v-model:size 属性中必须传入有效值，才会展示行高设置按钮

```vue
<template>
  <a-table-settings v-model:size="size" :size-options="sizeOptions" />
</template>
<script lang="ts" setup>
import type { TableSettingsProps } from '@hwork/ant-design-vue';
import { ref } from 'vue';

const size = ref<TableSettingsProps['size']>('middle');

const sizeOptions = [
  { text: 'Default', value: 'middle' },
  { text: 'Large', value: 'large' },
  { text: 'Small', value: 'small' },
  { text: 'Mini', value: 'mini' },
];
</script>
```

### 列设置

可以通过一些特定的列描述数据对象属性来定制列信息的展示与行为。

- title：列头显示文字，仅可接收 string 类型，且必传
- fixed：可设置列是否固定，可选 true(等效于 left) 'left' 'right'。
- display：可设置该列是否展示，传入 false 时隐藏该列。
- disabledSettings：可设置该列是否允许被自定义。 传入 true 时禁用所有自定义功能，传入 'display' 后仅禁用列隐藏/展示切换功能，传入 'fixed' 后仅禁用列固定切换功能。

注：columns / v-model:columns 属性中必须传入非空数组，才会展示列设置按钮。

```vue
<template>
  <div class="table-container">
    <div class="container-header">
      <div class="header-left">左侧操作区域</div>
      <a-table-settings v-model:size="size" v-model:columns="columns" />
    </div>

    <a-table
      :size="size"
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 'max-content', y: 'flex' }"
      :pagination="{ defaultPageSize: 50 }"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a-button type="inline">action</a-button>
          <a-button type="inline" danger>delete</a-button>
        </template>
      </template>

      <template #summary>
        <a-table-summary fixed="top">
          <a-table-summary-row>
            <a-table-summary-cell>Summary 1</a-table-summary-cell>
            <a-table-summary-cell>
              <a-typography-text>All Age</a-typography-text>
            </a-table-summary-cell>
            <a-table-summary-cell :col-span="9">
              <a-typography-text>All Column 1</a-typography-text>
            </a-table-summary-cell>
          </a-table-summary-row>
          <a-table-summary-row>
            <a-table-summary-cell>Summary 2</a-table-summary-cell>
            <a-table-summary-cell :col-span="10">
              <a-typography-text>Full Name</a-typography-text>
            </a-table-summary-cell>
          </a-table-summary-row>
        </a-table-summary>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import type { TableSettingsProps } from '@hwork/ant-design-vue';
import { ref, shallowRef } from 'vue';

const size = ref<TableSettingsProps['size']>('small');

const columns = shallowRef<TableSettingsProps['columns']>([
  {
    title: 'Full Name',
    width: 150,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    ellipsis: true,
    disabledSetting: true,
  },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  {
    title: 'Column 1',
    width: 100,
    dataIndex: 'address',
    key: '1',
    ellipsis: true,
    disabledSetting: 'display',
  },
  {
    title: 'Column 2',
    width: 100,
    dataIndex: 'address',
    key: '2',
    ellipsis: 2,
    display: false,
    disabledSetting: 'fixed',
  },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    disabledSetting: true,
  },
]);

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i} Balabala Balabala ~~~`,
  });
}
</script>
<style lang="less" scoped>
.table-container {
  display: flex;
  flex-direction: column;
  height: 70vh;

  .container-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    margin-bottom: 12px;
    background: #f4f8fa;
    border-radius: 6px;

    .header-left {
      padding: 0 8px;
    }
  }
}
</style>
```

### 自定义列重置

可使用 columnsReset 属性来自定义重置逻辑。

默认情况下，组件内部将自动检测用户当前的设置与该次设置弹出框打开时的设置是否一致。 不一致时将展示重置按钮，并且在用户点击后，将当前设置还原为设置弹出框打开时的样子。

```vue
<template>
  <a-table-settings
    v-model:columns="columns"
    :columns-reset="columnsReset"
    @reset-columns="onResetColumns"
  />
</template>
<script lang="ts" setup>
import { message, type TableSettingsProps } from '@hwork/ant-design-vue';
import { reactive, shallowRef } from 'vue';

const defaultColumns: TableSettingsProps['columns'] = [
  {
    title: 'Full Name',
    width: 150,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    ellipsis: true,
    disabledSetting: true,
  },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  {
    title: 'Column 1',
    width: 100,
    dataIndex: 'address',
    key: '1',
    ellipsis: true,
    disabledSetting: 'display',
  },
  {
    title: 'Column 2',
    width: 100,
    dataIndex: 'address',
    key: '2',
    ellipsis: 2,
    display: false,
    disabledSetting: 'fixed',
  },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    disabledSetting: true,
  },
];

const columns = shallowRef(defaultColumns.map(_ => ({ ..._ })));

const columnsReset = reactive<TableSettingsProps['columnsReset']>({
  custom: true,
  enable: true,
  loading: false,
});

const onResetColumns = () => {
  columnsReset.loading = true;
  const timer = setTimeout(() => {
    clearTimeout(timer);

    columns.value = defaultColumns.map(_ => ({ ..._ }));
    message.success('重置成功');

    columnsReset.loading = false;
  }, 1000);
};
</script>
```

## API

### TableSettings Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| size(v-model) | 表格尺寸 | large \| middle \| small \| mini | - | - |
| sizeOptions | 表格尺寸选项 | { text: string, value: large \| middle \| small \| mini }[] | - | - |
| columns(v-model) | 表格列的配置描述 | array | - | - |
| columnsConfig | 列设置功能配置，详见下表 | object | - | - |
| columnsReset | 重置功能配置，详见下表 | object | - | - |

### columnsConfig

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| width | 弹出框宽度 | string \| number | 244 | - |
| maxHeight | 弹出框最大高度 | string \| number | 420 | - |
| lastHideMessage | 当用户试图隐藏所有列时的提示文案 | string \| number | 表格至少需保留一列 | - |

### columnsReset

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| custom | 当点击重置按钮时,是否仅触发事件，取消执行内部的重置逻辑 | boolean | - | - |
| enable | 是否启用重置功能 | boolean | - | - |
| disabled | 是否禁用重置按钮 | boolean | - | - |
| loading | 弹窗内是否进入 loading 状态 | boolean | - | - |

### 事件

| 事件名称 | 说明 | 类型 |
| --- | --- | --- |
| resetColumns | 当点击重置按钮时触发 | () => void |
