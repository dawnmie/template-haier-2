# List 列表

## 概述

通用列表。

## 何时使用

最基础的列表展示,可承载文字、列表、图片、段落,常用于后台数据展示页面。

## API

### List

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| bordered | 是否展示边框 | boolean | `false` | - |
| dataSource | 列表数据源 | any[] | - | 1.5.0 |
| footer | 列表底部 | string\|slot | - | - |
| grid | 列表栅格配置 | object | - | - |
| header | 列表头部 | string\|slot | - | - |
| itemLayout | 设置 `List.Item` 布局, 设置成 `vertical` 则竖直样式显示, 默认横排 | string | - | - |
| loading | 当卡片内容还在加载中时,可以用 `loading` 展示一个占位 | boolean\|object | `false` | - |
| loadMore | 加载更多 | string\|slot | - | - |
| locale | 默认文案设置,目前包括空数据文案 | object | emptyText: '暂无内容' | - |
| pagination | 对应的 `pagination` 配置, 设置 `false` 不显示 | boolean\|object | `false` | - |
| renderItem | 自定义Item函数,也可使用 #renderItem="{item, index}" | ({item, index}) => vNode | - | - |
| rowKey | 各项 key 的取值,可以是字符串或一个函数 | item => string\|number | - | - |
| size | list 的尺寸 | `default` \| `middle` \| `small` | `default` | - |
| split | 是否展示分割线 | boolean | `true` | - |

### pagination

分页的配置项。

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| position | 指定分页显示的位置 | 'top' \| 'bottom' \| 'both' | 'bottom' |

更多配置项,请查看 [Pagination](https://www.antdv.com/components/pagination-cn/#api)。

### List grid props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| column | 列数 | number oneOf [ 1, 2, 3, 4, 6, 8, 12, 24] | - | - |
| gutter | 栅格间隔 | number | 0 | - |
| xxxl | `≥2000px` 展示的列数 | number | - | 3.0 |
| xs | `<576px` 展示的列数 | number | - | - |
| sm | `≥576px` 展示的列数 | number | - | - |
| md | `≥768px` 展示的列数 | number | - | - |
| lg | `≥992px` 展示的列数 | number | - | - |
| xl | `≥1200px` 展示的列数 | number | - | - |
| xxl | `≥1600px` 展示的列数 | number | - | - |

### List.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| actions | 列表操作组,根据 `itemLayout` 的不同, 位置在卡片底部或者最右侧 | vNode[] \| slot | - | - |
| extra | 额外内容, 通常用在 `itemLayout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 | string\|slot | - | - |

### List.Item.Meta

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| avatar | 列表元素的图标 | slot | - |
| description | 列表元素的描述内容 | string\|slot | - |
| title | 列表元素的标题 | string\|slot | - |

## 代码示例

### 基本用法

```vue
<template>
  <a-list :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
```

基础列表。

### 简单列表

```vue
<template>
  <div>
    <h3>Small Size</h3>
    <a-list size="small" bordered :data-source="data">
      <template #header>
        <div>Header</div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item>{{ item }}</a-list-item>
      </template>
      <template #footer>
        <div>Footer</div>
      </template>
    </a-list>
    
    <h3>Default Size</h3>
    <a-list bordered :data-source="data">
      <template #header>
        <div>Header</div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item>{{ item }}</a-list-item>
      </template>
      <template #footer>
        <div>Footer</div>
      </template>
    </a-list>
    
    <h3>Large Size</h3>
    <a-list size="large" bordered :data-source="data">
      <template #header>
        <div>Header</div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item>{{ item }}</a-list-item>
      </template>
      <template #footer>
        <div>Footer</div>
      </template>
    </a-list>
  </div>
</template>
```

列表拥有大、中、小三种尺寸。通过设置 `size` 为 `large`、`small` 分别把按钮设为大、小尺寸。若不设置 `size`,则尺寸为中。可通过设置 `header` 和 `footer`,来自定义列表头部和尾部。

### 加载更多

```vue
<template>
  <a-list :data-source="data" :loading="loading">
    <template #loadMore>
      <div style="text-align: center; margin-top: 12px;">
        <a-button @click="onLoadMore">加载更多</a-button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
```

可通过 `loadMore` 属性实现加载更多功能。

### 竖排列表样式

```vue
<template>
  <a-list
    item-layout="vertical"
    :data-source="data"
    :pagination="pagination"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <span><star-outlined /> 156</span>
          <span><like-outlined /> 156</span>
          <span><message-outlined /> 2</span>
        </template>
        <template #extra>
          <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>
</template>
```

通过设置 `itemLayout` 属性为 `vertical` 可实现竖排列表样式。

### 栅格列表

```vue
<template>
  <a-list
    :grid="{ gutter: 16, column: 4 }"
    :data-source="data"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card :title="item.title">{{ item.content }}</a-card>
      </a-list-item>
    </template>
  </a-list>
</template>
```

可以通过设置 `List` 的 `grid` 属性来实现栅格列表,`column` 可设置期望显示的列数。

### 响应式的栅格列表

```vue
<template>
  <a-list
    :grid="{ 
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3
    }"
    :data-source="data"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card :title="item.title">{{ item.content }}</a-card>
      </a-list-item>
    </template>
  </a-list>
</template>
```

响应式的栅格列表。尺寸与 [Layout Grid](https://www.antdv.com/components/grid-cn/#col) 保持一致。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/list-cn
