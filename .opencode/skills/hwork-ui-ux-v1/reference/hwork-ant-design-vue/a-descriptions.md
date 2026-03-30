# Descriptions 描述列表

成组展示多个只读字段。

## 何时使用

常见于详情页的信息展示。

## 代码演示

### 基本

简单的展示。

### 带边框的

带边框和背景颜色列表。

### 自定义尺寸

自定义尺寸，适应在各种容器中展示。

### 响应式

通过响应式的配置可以实现在小屏幕设备上的完美呈现。

### 垂直

垂直的列表。

### 垂直带边框的

垂直带边框和背景颜色的列表。

## API

### Descriptions props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false | - |
| margin | 是否保留组件四周边距，注：仅在不展示边框时生效 | boolean | true | - |
| colon | 配置 `Descriptions.Item` 的 `colon` 的默认值 | boolean | true | - |
| column | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number | 3 | - |
| contentStyle | 自定义内容样式 | CSSProperties | - | 2.2.0 |
| ellipsis | 文字超出宽度自动省略配置，开启后默认一行省略，传入数字后可设置 N 行省略 | boolean \| string \| number \| [ellipsisType](#ellipsistype) | - | - |
| extra | 描述列表的操作区域，显示在右上方 | string \| VNode \| slot | - | 2.0.0 |
| labelStyle | 自定义标签样式 | CSSProperties | - | 2.2.0 |
| layout | 描述布局 | `horizontal` \| `vertical` | `horizontal` | - |
| size | 设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效） | `default` \| `middle` \| `small` | `default` | - |
| title | 描述列表的标题，显示在最顶部 | string \| VNode \| slot | - | - |

### Item props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| contentStyle | 自定义内容样式 | CSSProperties | - | 2.2.0 |
| ellipsis | 文字超出宽度自动省略配置，开启后默认一行省略，传入数字后可设置 N 行省略 | boolean \| string \| number \| [ellipsisType](#ellipsistype) | - | - |
| label | 内容的描述 | string \| VNode \| slot | - | - |
| labelStyle | 自定义标签样式 | CSSProperties | - | 2.2.0 |
| span | 包含列的数量 | number | 1 | - |

> span 是 Descriptions.Item 的数量。 span={2} 会占用两个 DescriptionsItem 的宽度。

### Item slots

| 名称 | 说明 | 参数 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| label | 内容的描述 | - | - | - |
| tooltip | 内容省略时展示的 tooltip 中的内容插槽 | - | - | - |
| expandText | 内容省略时展示的展开/收起按钮内容插槽 | `{ collapse: boolean }` | - | - |

### ellipsisType

> 详见 [Ellipsis 组件文档](/components/ellipsis-cn)

```typescript
{ 
  maxLines?: number | string; 
  tooltip?: boolean | string; 
  trigger?: 'hover' | 'click' | 'expand'; 
  mouseEnterDelay?: number; 
  mouseLeaveDelay?: number; 
}
```

---

*文档来源: Ant Design Vue 4.1.26-beta.1*
