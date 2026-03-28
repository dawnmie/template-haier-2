# Tabs 标签页

选项卡切换组件。

## 何时使用

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

Ant Design 依次提供了三级选项卡，分别用于不同的场景。

- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 标准线条式页签，用于容器内部的主功能切换，这是最常用的 Tabs。
- RadioButton 可作为更次级的页签来使用。

## 代码演示

### 基本用法

默认选中第一项。

### 禁用

禁用某一项。

### 居中

标签居中展示。

### 图标

有图标的标签。

### 滑动

可以左右、上下滑动，容纳更多标签。

### 箭头滑动

可以左右、上下滑动，容纳更多标签。传入 `overflow-show-arrow` 属性。

### 附加内容

可以在页签右边添加附加操作。

### 大小

大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。

### 位置

有四个位置，`tabPosition="left|right|top|bottom"`。在移动端下，`bottom|right` 会自动切换成 `top`。

### 卡片式页签

另一种样式的页签，不提供对应的垂直样式。

### 新增和关闭页签

只有卡片样式的页签支持新增和关闭选项。使用 `:closable="false"` 禁止关闭。

### 卡片式页签容器

用于容器顶部，需要一点额外的样式覆盖。

### 自定义新增页签触发器

隐藏默认的页签增加图标，给自定义触发器绑定事件。

### 自定义页签头

自定义页签头。

## API

### Tabs props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| activeKey(v-model) | 当前激活 tab 面板的 key | string | 无 | - |
| animated | 是否使用动画切换 Tabs，在 `tabPosition="top"` \| `"bottom"` 时有效 | boolean \| {inkBar:boolean, tabPane:boolean} | true, 当 `type="card"` 时为 false | - |
| centered | 标签居中展示 | boolean | false | 3.0 |
| destroyInactiveTabPane | 被隐藏时是否销毁 DOM 结构 | boolean | false | - |
| hideAdd | 是否隐藏加号图标，在 `type="editable-card"` 时有效 | boolean | false | - |
| size | 大小，提供 `large` `middle` 和 `small` 三种大小 | string | `middle` | - |
| tabBarGutter | tabs 之间的间隙 | number | 无 | - |
| tabBarStyle | tab bar 的样式对象 | CSSProperties | - | - |
| tabPosition | 页签位置，可选值有 `top` `right` `bottom` `left` | string | `top` | - |
| tabLine | 是否展示页签与内容中间的分割线，可选值有 `auto` `show` | string | `auto` | - |
| lineGrow | 是否延展页签与内容中间的分割线，注：其本质上是设置线的 `margin-inline` 属性，且仅在 `tabPosition="top"` \| `"bottom"` 时有效 | string | - | - |
| type | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 | string | `line` | - |
| overflowShowArrow | 超出显示箭头 | boolean | false | - |

### Tabs 插槽

| 插槽名称 | 说明 | 参数 |
| --- | --- | --- |
| addIcon | 自定义添加按钮 | - |
| leftExtra | tab bar 上左侧额外的元素 | - |
| moreIcon | 自定义折叠 icon | - |
| renderTabBar | 替换 TabBar，用于二次封装标签头 | { DefaultTabBar } |
| rightExtra | tab bar 上右侧额外的元素 | - |

### Tabs 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换面板的回调 | Function(activeKey) {} |
| edit | 新增和删除页签的回调，在 `type="editable-card"` 时有效 | (action === 'add' ? event : targetKey, action): void |
| tabClick | tab 被点击的回调 | Function |
| tabScroll | 滚动 TabBar 时触发 | { direction: 'left' \| 'right' \| 'top' \| 'bottom' } |

### Tabs.TabPane

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closable | 是否可关闭该页签，在 `type="editable-card"` 时有效 | boolean | true |
| disabled | 是否禁用该页签 | boolean | false |
| forceRender | 被隐藏时是否渲染 DOM 结构 | boolean | false |
| key | 对应 activeKey | string | 无 |
| tab | 选项卡头显示文字 | string\|slot | 无 |

### Tabs.TabPane 插槽

| 插槽名称 | 说明 | 参数 |
| --- | --- | --- |
| closeIcon | 自定义关闭图标，在 `type="editable-card"` 时有效 | - |
| tab | 选项卡头显示文字 | - |

---

*文档来源: Ant Design Vue 4.1.26-beta.1*
