# InputNumber 数字输入框

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。

## API

属性如下

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签 | slot | - | 3.0 |
| addonBefore | 带标签的 input，设置前置标签 | slot | - | 3.0 |
| autofocus | 自动获取焦点 | boolean | false | - |
| bordered | 是否有边框 | boolean | true | 3.0 |
| controls | 是否显示增减按钮 | boolean | true | 3.0 |
| decimalSeparator | 小数点 | string | - | - |
| defaultValue | 初始值 | number | - | - |
| disabled | 禁用 | boolean | false | - |
| formatter | 指定输入框展示值的格式 | `function(value: number \| string, info: { userTyping: boolean, input: string }): string` | - | info: 3.0 |
| keyboard | 是否启用键盘快捷行为 | boolean | true | 3.0 |
| max | 最大值 | number | Infinity | - |
| min | 最小值 | number | -Infinity | - |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | `function(string): number` | - | - |
| precision | 数值精度 | number | - | - |
| prefix | 带有前缀图标的 input | slot | - | 3.0 |
| size | 输入框大小 | string | 无 | - |
| status | 设置校验状态 | 'error' \| 'warning' | - | 3.3.0 |
| step | 每次改变步数，可以为小数 | number\|string | 1 | - |
| stringMode | 字符值模式，开启后支持高精度小数。同时 `change` 事件将返回 string 类型 | boolean | false | 3.0 |
| upIcon | 自定义上箭头图标 | slot | `<UpOutlined />` | 3.3.0 |
| downIcon | 自定义下箭头图标 | slot | `<DownOutlined />` | 3.3.0 |
| value(v-model) | 当前值 | number | - | - |
| allowClear | 是否显示清除按钮 | boolean | false | - |

### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| change | 变化回调 | `Function(value: number \| string)` | - |
| pressEnter | 按下回车的回调 | function(e) | - |
| step | 点击上下箭头的回调 | `(value: number, info: { offset: number, type: 'up' \| 'down' }) => void` | 3.0 |

## 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

## 代码示例

### 基本用法

数字输入框。

### 四种大小

四种大小的数字输入框，当 size 分别为 `large`、`small`、`mini` 时，输入框高度为 `40px`、`28px`、`24px`，默认高度为 `32px`。

### 高精度小数

通过 `stringMode` 开启高精度小数支持，`change` 事件将返回 string 类型。对于旧版浏览器，你需要 BigInt polyfill。

### 键盘行为

使用 `keyboard` 属性可以控制键盘行为。

### 无边框

没有边框。

### 自定义状态

使用 `status` 为 InputNumber 添加状态，可选 `error` 或者 `warning`。

### 可清除的数字输入框

可清除的数字输入框。

### 前置/后置标签

用于配置一些固定组合。

### 不可用

点击按钮切换可用状态。

### 格式化展示

通过 `formatter` 格式化数字，以展示具有具体含义的数据，往往需要配合 `parser` 一起使用。

### 超出边界

当通过受控将 `value` 超出边界时，提供警告样式。

### 前缀

在输入框上添加前缀图标。

### 图标按钮

使用 `upIcon` `downIcon` 插槽自定义图标。

## FAQ

### 为何受控模式下，value 可以超出 min 和 max 范围？

在受控模式下，开发者可能自行存储相关数据。如果组件将数据约束回范围内，会导致展示数据与实际存储数据不一致的情况。这使得一些如表单场景存在潜在的数据问题。

### 为何动态修改 min 和 max 让 value 超出范围不会触发 change 事件？

`change` 事件为用户触发事件，自行触发会导致表单库误以为变更来自用户操作。我们以错误样式展示超出范围的数值。
