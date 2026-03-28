# Table 表格

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 如何使用

指定表格的数据源 dataSource 为一个数组。

```vue
<template>
  <a-table :dataSource="dataSource" :columns="columns" />
</template>
<script>
  export default {
    setup() {
      return {
        dataSource: [
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
        ],
        columns: [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
        ],
      };
    },
  };
</script>
```

## API

### Table props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | 是否展示外边框和列边框 | boolean | false | - |
| columns | 表格列的配置描述，具体项见下表 | array | - | - |
| components | 覆盖默认的 table 元素 | object | - | - |
| dataSource | 数据数组 | object[] | - | - |
| defaultExpandAllRows | 初始时，是否展开所有行 | boolean | false | - |
| defaultExpandedRowKeys | 默认展开的行 | string[] | - | - |
| expandedRowKeys(v-model) | 展开的行，控制属性 | string[] | - | - |
| expandedRowRender | 额外的展开行 | Function(record, index, indent, expanded):VNode \| v-slot:expandedRowRender="{record, index, indent, expanded}" | - | - |
| expandFixed | 控制展开图标是否固定，可选 true left right | boolean \| string | false | 3.0 |
| expandIcon | 自定义展开图标 | Function(props):VNode \| v-slot:expandIcon="props" | - | - |
| expandRowByClick | 通过点击行来展开子行 | boolean | false | - |
| footer | 表格尾部 | Function(currentPageData)\| v-slot:footer="currentPageData" | - | - |
| indentSize | 展示树形数据时，每层缩进的宽度，以 px 为单位 | number | 15 | - |
| loading | 页面是否加载中 | boolean \| object (更多) | false | - |
| locale | 默认文案设置，目前包括排序、过滤、空数据文案 | object | filterConfirm: '确定' filterReset: '重置' emptyText: '暂无数据' | - |
| pagination | 分页器，参考配置项或 pagination 文档，设为 false 时不展示和进行分页 | object \| false | - | - |
| rowClassName | 表格行的类名 | Function(record, index):string | - | - |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string \| Function(record):string | 'key' | - |
| rowSelection | 表格行是否可选择，配置项 | object | - | - |
| scroll | 表格是否可滚动，也可以指定滚动区域的宽、高，配置项 | object | - | - |
| showHeader | 是否显示表头 | boolean | true | - |
| showSorterTooltip | 表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性 | boolean \| Tooltip props | true | 3.0 |
| size | 表格大小 | default \| middle \| small | default | - |
| sortDirections | 支持的排序方式，取值为 ascend descend | Array | [ascend, descend] | - |
| sticky | 设置粘性头部和滚动条 | boolean \| {offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement} | - | 3.0 |
| summary | 总结栏 | v-slot:summary | - | 3.0 |
| tableLayout | 表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局 | - \| auto \| fixed | 无 固定表头/列或使用了 column.ellipsis 时，默认值为 fixed | - |
| title | 表格标题 | Function(currentPageData)\| v-slot:title="currentPageData" | - | - |
| transformCellText | 数据渲染前可以再次改变，一般用于空数据的默认配置 | Function({ text, column, record, index }) => any | - | - |
| customHeaderRow | 设置头部行属性 | Function(columns, index) | - | - |
| customRow | 设置行属性 | Function(record, index) | - | - |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 分页、排序、筛选变化时触发 | Function(pagination, filters, sorter, { currentDataSource }) |
| expand | 点击展开图标时触发 | Function(expanded, record) |
| expandedRowsChange | 展开的行变化时触发 | Function(expandedRows) |
| resizeColumn | 拖动列时触发 | Function(width, column) |

### Column

列描述数据对象，是 columns 中的一项，Column 使用相同的 API。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 设置列的对齐方式 | left \| right \| center | left | - |
| colSpan | 表头列合并,设置为 0 时，不渲染 | number | - | - |
| customCell | 设置单元格属性 | Function(record, rowIndex) | - | - |
| customFilterDropdown | 自定义筛选菜单，需要配合 v-slot:customFilterDropdown 使用 | boolean | false | 3.0 |
| customFilterIcon | 自定义 filter 图标 | VNode \| ({filtered, column}) => vNode | false | - |
| customHeaderCell | 设置头部单元格属性 | Function(column) | - | - |
| customRender | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引 | Function({text, record, index, column}) \| v-slot:bodyCell="{text, record, index, column}" | - | - |
| dataIndex | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 | string \| string[] | - | - |
| defaultFilteredValue | 默认筛选值 | string[] | - | - |
| defaultSortOrder | 默认排序顺序 | ascend \| descend | - | - |
| ellipsis | 超过宽度将自动省略，暂不支持和排序筛选一起使用。设置为 true 或 { showTitle?: boolean } 时，表格布局将变成 tableLayout="fixed" | boolean \| {showTitle?: boolean } | false | 3.0 |
| filterDropdown | 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互 | VNode \| v-slot:filterDropdown="filterDropdownProps" | - | - |
| filterDropdownOpen(v-model) | 用于控制自定义筛选菜单是否可见 | boolean | - | - |
| filtered | 标识数据是否经过过滤，筛选图标会高亮 | boolean | false | - |
| filteredValue | 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组 | string[] | - | - |
| filterIcon | 自定义 filter 图标 | VNode \| ({filtered: boolean, column: Column}) => vNode \| v-slot:filterIcon="{filtered, column}" | false | - |
| filterMode | 指定筛选菜单的用户界面 | menu \| tree | menu | 3.0 |
| filterMultiple | 是否多选 | boolean | true | - |
| filters | 表头的筛选菜单项 | object[] | - | - |
| filterSearch | 筛选菜单项是否可搜索 | boolean \| function(input, filter):boolean | false | 3.0 |
| fixed | 列是否固定，可选 true(等效于 left) left right | boolean \| string | false | - |
| key | Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性 | string | - | - |
| maxWidth | 拖动列最大宽度，会受到表格自动调整分配宽度影响 | number | - | 3.0 |
| minWidth | 拖动列最小宽度，会受到表格自动调整分配宽度影响 | number | 50 | 3.0 |
| resizable | 是否可拖动调整宽度，此时 width 必须是 number 类型 | boolean | - | 3.0 |
| responsive | 响应式 breakpoint 配置列表。未设置则始终可见 | Breakpoint[] | - | 3.0 |
| rowScope | 设置列范围 | row \| rowgroup | - | 3.0 |
| showSorterTooltip | 表头显示下一次排序的 tooltip 提示, 覆盖 table 中 showSorterTooltip | boolean \| Tooltip props | true | 3.0 |
| sortDirections | 支持的排序方式，覆盖 Table 中 sortDirections， 取值为 ascend descend | Array | [ascend, descend] | - |
| sorter | 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true | Function \| boolean | - | - |
| sortOrder | 排序的受控属性，外界可用此控制列的排序，可设置为 ascend descend null | ascend \| descend \| null | - | - |
| title | 列头显示文字（函数用法 3.0 后支持） | string \| VNode \| v-slot:title | - | - |
| width | 列宽度（指定了也不生效？） | string \| number | - | - |

### ColumnGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列头显示文字 | string \| VNode \| v-slot:title | - |

### pagination

分页的配置项。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 指定分页显示的位置 | [top \| bottom \| both] | bottom |

更多配置项，请查看 Pagination。

### rowSelection

选择功能的配置。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| checkStrictly | checkable 状态下节点选择完全受控（父子数据选中状态不再关联） | boolean | true | 3.0 |
| columnTitle | 自定义列表选择框标题 | string \| VNode | - | - |
| columnWidth | 自定义列表选择框宽度 | string \| number | 60px \| 32px | - |
| fixed | 把选择框列固定在左边 | boolean | - | - |
| getCheckboxProps | 选择框的默认属性配置 | Function(record) | - | - |
| hideSelectAll | 隐藏全选勾选框与自定义选择项 | boolean | false | 3.0 |
| preserveSelectedRowKeys | 当数据被删除时仍然保留选项的 key | boolean | - | 3.0 |
| selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | string[] \| number[] | [] | - |
| selections | 自定义选择项 配置项, 设为 true 时使用默认选择项 | object[] \| boolean | true | - |
| type | 多选/单选，checkbox or radio | checkbox \| radio | checkbox | - |
| onChange | 选中项发生变化时的回调 | Function(selectedRowKeys, selectedRows) | - | - |
| onSelect | 用户手动选择/取消选择某行的回调 | Function(record, selected, selectedRows, nativeEvent) | - | - |
| onSelectAll | 用户手动选择/取消选择所有行的回调 | Function(selected, selectedRows, changeRows) | - | - |
| onSelectInvert | 用户手动选择反选的回调 | Function(selectedRowKeys) | - | - |
| onSelectNone | 用户清空选择的回调 | Function() | - | 3.0 |
| onSelectMultiple | 用户使用键盘 shift 选择多行的回调 | Function(selected, selectedRows, changeRows) | - | 3.0 |

### scroll

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| scrollToFirstRowOnChange | 当分页、排序、筛选变化后是否滚动到表格顶部 | boolean | - |
| x | 设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，true 和 'max-content' | string \| number \| true | - |
| y | 设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值 | string \| number | - |

### selection

自定义选择配置项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | Vue 需要的 key，建议设置 | string | - |
| text | 选择项显示的文字 | string \| VNode | - |
| onSelect | 选择项点击回调 | Function(changeableRowKeys) | - |

## 代码示例

### 基本使用

简单的表格，最后一列是各种操作。

### 可选择

第一列是联动的选择框。可以通过 rowSelection.type 属性指定选择类型，默认为 checkbox。

### 筛选和排序

对某一列数据进行筛选，使用列的 filters 属性来指定需要筛选菜单的列，onFilter 用于筛选当前数据，filterMultiple 用于指定多选和单选。

对某一列数据进行排序，通过指定列的 sorter 函数即可启动排序功能。sorter: function(rowA, rowB) { ... }， rowA、rowB 为比较的两个行数据。

### 可展开

当表格内容较多不能一次性完全展示时。

### 树形数据展示

表格支持树形数据的展示，当数据中有 children 字段时会自动展示为树形表格，如果不需要或使用其他字段可以用 childrenColumnName 进行配置。

### 固定头和列

适合同时展示有大量数据和数据列。

### 固定列

对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 scroll.x 配合使用。

### 表头分组

columns[n] 可以内嵌 children，以渲染分组表头。

### 可编辑单元格

带单元格编辑功能的表格。

### 可编辑行

带行编辑功能的表格。

### 嵌套子表格

展示每行数据更详细的信息。

### 表格行/列合并

表头只支持列合并，使用 column 里的 colSpan 进行设置。

表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。

### 自定义筛选菜单

通过 filterDropdown 定义自定义的列筛选功能，并实现一个搜索列的示例。

### Ajax 异步加载数据

这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。

### 紧凑型

两种紧凑型的列表，小型列表只用于对话框内。

### 带边框

添加表格边框线，页头和页脚。

### 动态控制表格属性

选择不同配置组合查看效果。

### 自定义渲染

自定义渲染表格内容。

### 拖拽排序

使用自定义元素，我们可以集成 react-dnd 来实现拖拽排序。

### 拖拽调整列宽

集成 react-resizable 来实现可伸缩列。

### 省略

通过设置 column.ellipsis 可以让单元格内容根据宽度自动省略。

### 总结栏

通过 summary 设置总结栏。

### 虚拟滚动

结合虚拟滚动，实现超长列表的高性能显示。

### 响应式

响应式配置列的展示。

## 注意

按照 Vue 的规范，所有的数组必须添加 :key。但是在 Table 中，dataSource 和 columns 里的数据值都需要指定 key 值。对于 dataSource 默认将每列数据的 key 属性作为唯一的标识。

如果 dataSource[i].key 没有提供，你应该使用 rowKey 来指定 dataSource 的主键。

## FAQ

### 如何在 Table 中使用 Component？

在 customRender 里返回 Component 即可。

### 数据源改变后表格不更新？

由于 Vue 的限制，如果直接修改 dataSource 里的数据，表格不会自动更新，需要配合 rowKey 或者使用新的 dataSource 来触发更新。

### 设置 scroll.x 后，表格列宽度不生效？

指定 scroll.x 后，列宽度的设置会转化为 min-width，当所有列的 min-width 总和小于 scroll.x 时，列宽度会自动调整。

### 表格分页为什么不能正常工作？

请检查是否正确设置了 rowKey。
