# ListLayout 列表布局

## 概述

H-work 标准列表页面布局实现，针对列表场景进行专门优化。

## 何时使用

插槽 search 内的内容将随着内容的滚动而自动收起。该组件内的表格请一定要使用 Table 组件，并且开启 `sticky` 属性。如果有内容希望可以始终展示在页面中，可在 Table 的 extra、title、footer 插槽中放置这部分内容。

## API

### Props

| 属性               | 说明                                                                   | 类型                                          | 默认值 | 版本 |
| ------------------ | ---------------------------------------------------------------------- | --------------------------------------------- | ------ | ---- |
| header             | 自定义 PageHeader                                                      | slot                                          | -      | -    |
| title              | 标题文字                                                               | string \| slot                                | -      | -    |
| subTitle           | 二级标题文字                                                           | string \| slot                                | -      | -    |
| extra              | 操作区内容，位于 PageHeader 的行尾                                     | slot                                          | -      | -    |
| back               | 是否展示返回上一页的按钮                                               | boolean                                       | -      | -    |
| onBack             | 自定义点击返回按钮时的处理逻辑，默认将返回上一页                       | () => void                                    | -      | -    |
| loading            | 是否进入页面内容 loading 状态，不包括页头                              | boolean                                       | -      | -    |
| top                | 页头 PageHeader 距离页面顶部的距离，默认情况将自行检测，但也可手动传入 | string \| number                              | -      | -    |
| search             | 页面查询内容，随着容器滚动，其内容将被收起                             | slot                                          | -      | -    |
| searchOptimization | 是否启用查询内容功能优化                                               | boolean \| ('backTop' \| 'contentClosable')[] | true   | -    |

### SearchOptimization

传入 true 时启用下面所有的功能优化项：

| 优化项名称      | 说明                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------- |
| backTop         | 点击内部 Search 的查询按钮，或者在 Table sticky 模式下分页、排序、筛选变化后，页面将自动滚动到顶部 |
| contentClosable | 在展开高级筛选的时候，点击页面主体内容（不包括页头部分）时自动将其收起                             |

### 事件

| 事件名称 | 说明                             | 类型                   |
| -------- | -------------------------------- | ---------------------- |
| search   | 点击内部 Search 的查询按钮时触发 | () => void             |
| reset    | 点击内部 Search 的重置按钮时触发 | () => void             |
| scroll   | 当触发滚动事件时，返回滚动的距离 | (event: Event) => void |

### 方法

| 名称    | 描述                                       | 类型       |
| ------- | ------------------------------------------ | ---------- |
| backTop | 滚动到内容顶部，注意：自定义布局时不可使用 | () => void |

## 代码示例

### 基本用法

```vue
<template>
  <a-list-layout
    ref="pageRef"
    title="列表页面标题"
    sub-title="列表页面功能描述"
    :loading="loading"
    @search="onSearch"
    @reset="onReset"
  >
    <template #extra>
      <a-button type="primary">新增</a-button>
    </template>

    <template #search>
      <a-search>
        <a-search-item label="选择查询">
          <a-select
            v-model:value="searchParams.select"
            mode="multiple"
            placeholder="请选择"
            allow-clear
          >
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="jackJack">JackJack</a-select-option>
            <a-select-option value="jackJackJack">JackJackJack</a-select-option>
          </a-select>
        </a-search-item>

        <a-search-item label="输入查询">
          <a-input v-model:value="searchParams.input" placeholder="请输入" />
        </a-search-item>

        <a-search-item label="时间查询">
          <a-date-picker v-model:value="searchParams.date" />
        </a-search-item>

        <a-search-item label="时间范围查询" span="2">
          <a-range-picker v-model:value="searchParams.dateRange" show-time />
        </a-search-item>

        <a-search-item label="文字查询">
          <a-input v-model:value="searchParams.input" placeholder="请输入" />
        </a-search-item>

        <a-search-item label="数字查询">
          <a-input-number
            v-model:value="searchParams.input"
            placeholder="请输入"
          />
        </a-search-item>

        <a-search-item label="级联查询">
          <a-cascader
            v-model:value="searchParams.cascader"
            :options="cascaderOptions"
            placeholder="请选择"
            multiple
          />
        </a-search-item>

        <a-search-item label="树查询">
          <a-tree-select
            v-model:value="searchParams.tree"
            :tree-data="cascaderOptions"
            placeholder="请选择"
            multiple
          />
        </a-search-item>
      </a-search>
    </template>

    <a-alert
      message="Informational Notes"
      type="info"
      show-icon
      style="margin-bottom: 8px"
    />

    <a-table
      sticky
      :columns="columns"
      :data-source="list"
      :scroll="{ x: 'max-content' }"
      :pagination="{ defaultPageSize: 50 }"
    >
      <template #extra>
        <a-button>导出数据</a-button>
        <a-button>下载模板</a-button>
        <a-switch
          v-model:checked="empty"
          checked-children="空列表"
          un-checked-children="空列表"
        />
      </template>

      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a-button type="inline" @click="onClickAction('A')"
            >Action A</a-button
          >
          <a-button type="inline" @click="onClickAction('B')"
            >Action B</a-button
          >
          <a-button type="inline" @click="onClickAction('C')"
            >Action C</a-button
          >
          <a-button type="inline" danger @click="onClickDelete"
            >Delete</a-button
          >
        </template>
      </template>

      <template #summary>
        <a-table-summary fixed="top">
          <a-table-summary-row>
            <a-table-summary-cell>Summary 2</a-table-summary-cell>
            <a-table-summary-cell :col-span="10">
              <a-typography-text>Full Name</a-typography-text>
            </a-table-summary-cell>
          </a-table-summary-row>
        </a-table-summary>
      </template>
    </a-table>
  </a-list-layout>
</template>
<script lang="ts" setup>
import {
  message,
  Modal,
  type TableProps,
  type ListLayoutInstance,
} from "@hwork/ant-design-vue";
import { computed, ref, shallowRef } from "vue";

const pageRef = ref<ListLayoutInstance>();

const loading = ref(false);

const cascaderOptions = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const searchParams = ref({
  select: undefined,
  cascader: undefined,
  tree: undefined,
  input: "",
  date: "",
  dateRange: [],
});

const empty = ref(false);

const onSearch = () => {
  message.success("点击了查询~");

  loading.value = true;
  const timer = setTimeout(() => {
    loading.value = false;
    clearTimeout(timer);
  }, 1000);
};

const onReset = () => {
  message.info("点击了重置~");
};

const columns = shallowRef<TableProps["columns"]>([
  {
    title: "Full Name",
    width: 150,
    dataIndex: "name",
    key: "name",
    fixed: "left",
    ellipsis: true,
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
  {
    title: "Column 1",
    width: 100,
    dataIndex: "address",
    key: "1",
    ellipsis: true,
  },
  {
    title: "Column 2",
    width: 100,
    dataIndex: "address",
    key: "2",
    ellipsis: 2,
  },
  { title: "Column 3", dataIndex: "address", width: 300, key: "3" },
  { title: "Column 4", dataIndex: "address", width: 300, key: "4" },
  { title: "Column 5", dataIndex: "address", width: 300, key: "5" },
  { title: "Column 6", dataIndex: "address", width: 300, key: "6" },
  { title: "Column 7", dataIndex: "address", width: 300, key: "7" },
  { title: "Column 8", dataIndex: "address", width: 300, key: "8" },
  {
    title: "Action",
    width: 100,
    key: "operation",
    fixed: "right",
    collapseActions: true,
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
const list = computed(() => (empty.value ? [] : data));

const onClickAction = (type: string) => {
  message.info(`You click Action ${type}`);
};

const onClickDelete = () => {
  Modal.error({
    title: "Are you sure delete this item?",
    content: "Some descriptions",
    okCancel: true,
    onOk() {
      pageRef.value?.backTop();
      message.success("Deleted");
    },
    onCancel() {
      message.info("Cancel");
    },
  });
};
</script>
```

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/list-layout-cn
