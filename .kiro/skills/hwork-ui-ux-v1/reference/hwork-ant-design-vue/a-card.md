# Card 卡片

通用卡片容器。

## 何时使用

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## 代码演示

### 典型卡片

包含标题、内容、操作区域。可通过设置 size 为 `default` 或者 `small`，控制尺寸。

```vue
<a-card title="Default size card" :extra="extra" style="width: 300px">
  <p>card content</p>
  <p>card content</p>
  <p>card content</p>
</a-card>

<a-card size="small" title="Small size card" :extra="extra" style="width: 300px">
  <p>card content</p>
  <p>card content</p>
  <p>card content</p>
</a-card>
```

### 更灵活的内容展示

可以利用 `Card.Meta` 支持更灵活的内容。

```vue
<a-card hoverable style="width: 240px">
  <template #cover>
    <img alt="example" src="https://example.com/image.jpg" />
  </template>
  <a-card-meta title="Europe Street beat" description="www.instagram.com" />
</a-card>
```

### 栅格卡片

在系统概览页面常常和栅格进行配合。

```vue
<a-row :gutter="16">
  <a-col :span="8">
    <a-card title="Card title" :bordered="false">
      <p>card content</p>
    </a-card>
  </a-col>
  <a-col :span="8">
    <a-card title="Card title" :bordered="false">
      <p>card content</p>
    </a-card>
  </a-col>
  <a-col :span="8">
    <a-card title="Card title" :bordered="false">
      <p>card content</p>
    </a-card>
  </a-col>
</a-row>
```

### 预加载的卡片

数据读入前会有文本块样式。

```vue
<a-card :loading="loading" title="Card title">
  <a-skeleton :loading="loading" active />
</a-card>
```

### 简洁卡片

只包含内容区域。

```vue
<a-card :bordered="false">
  <p>Card content</p>
  <p>Card content</p>
  <p>Card content</p>
</a-card>
```

### 无边框

在灰色背景上使用无边框的卡片。

```vue
<div style="background: #ececec; padding: 20px">
  <a-card title="Card title" :bordered="false">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </a-card>
</div>
```

### 网格型内嵌卡片

一种常见的卡片内容区隔模式。

```vue
<a-card title="Card Title">
  <a-card-grid style="width: 25%">Content</a-card-grid>
  <a-card-grid style="width: 25%">Content</a-card-grid>
  <a-card-grid style="width: 25%">Content</a-card-grid>
  <a-card-grid style="width: 25%">Content</a-card-grid>
  <a-card-grid style="width: 25%">Content</a-card-grid>
  <a-card-grid style="width: 25%">Content</a-card-grid>
  <a-card-grid style="width: 25%">Content</a-card-grid>
  <a-card-grid style="width: 25%">Content</a-card-grid>
</a-card>
```

### 内部卡片

可以放在普通卡片内部，展示多层级结构的信息。

```vue
<a-card title="Card title">
  <p>Group title</p>
  <a-card type="inner" title="Inner card title">
    <a>More</a>
    Inner Card content
  </a-card>
  <a-card type="inner" title="Inner card title">
    <a>More</a>
    Inner Card content
  </a-card>
</a-card>
```

### 支持更多内容配置

一种支持封面、头像、标题和描述信息的卡片。

```vue
<a-card hoverable style="width: 300px">
  <template #cover>
    <img alt="example" src="https://example.com/image.jpg" />
  </template>
  <a-card-meta title="Card title" description="This is the description">
    <template #avatar>
      <a-avatar src="https://example.com/avatar.jpg" />
    </template>
  </a-card-meta>
  <template #actions>
    <setting-outlined key="setting" />
    <edit-outlined key="edit" />
    <ellipsis-outlined key="ellipsis" />
  </template>
</a-card>
```

### 带页签的卡片

可承载更多内容。

```vue
<a-card
  title="Card title"
  :tab-list="tabList"
  :active-tab-key="activeTabKey"
  @tabChange="onTabChange"
>
  <template #extra>
    <a>More</a>
  </template>
  {{ contentList[activeTabKey] }}
</a-card>
```

## API

### Card

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| activeTabKey | 当前激活页签的 key | string | - | - |
| bodyStyle | 内容区域自定义样式 | object | - | - |
| bordered | 是否有边框 | boolean | true | - |
| defaultActiveTabKey | 初始化选中页签的 key，如果没有设置 activeTabKey | string | 第一个页签 | - |
| extra | 卡片右上角的操作区域 | string\|slot | - | - |
| headStyle | 自定义标题区域样式 | object | - | - |
| hoverable | 鼠标移过时可浮起 | boolean | false | - |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean | false | - |
| size | card 的尺寸 | `default` \| `small` | `default` | - |
| tabList | 页签标题列表, 可以通过 customTab(v3.0) 插槽自定义 tab | Array<{key: string, tab: any}> | - | - |
| title | 卡片标题 | string\|slot | - | - |
| type | 卡片类型，可设置为 `inner` 或 不设置 | string | - | - |

### Card 插槽

| 插槽名称 | 说明 | 参数 |
| --- | --- | --- |
| actions | 卡片操作组，位置在卡片底部 | - |
| cover | 卡片封面 | - |
| customTab | 自定义 tabList tab 标签 | { item: tabList[number] } |
| extra | 卡片右上角的操作区域 | - |
| tabBarExtraContent | tab bar 上额外的元素 | - |
| title | 卡片标题 | - |

### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| tabChange | 页签切换的回调 | (key) => void | - |

### Card.Grid

网格型内嵌卡片，用于将卡片内容分割成网格布局。

### Card.Meta

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| avatar | 头像/图标 | slot | - | - |
| description | 描述内容 | string\|slot | - | - |
| title | 标题内容 | string\|slot | - | - |
