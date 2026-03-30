# DatePicker 日期选择框

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## 共同的 API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 是否显示清除按钮 | boolean | true | |
| autofocus | 自动获取焦点 | boolean | false | |
| bordered | 是否有边框 | boolean | true | |
| dateRender | 自定义日期单元格的内容 | v-slot:dateRender="{current, today}" | - | |
| disabled | 禁用 | boolean | false | |
| disabledDate | 不可选择的日期 | (currentDate: dayjs) => boolean | - | |
| format | 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 dayjs，支持自定义格式 | formatType | YYYY-MM-DD | |
| dropdownClassName | 额外的弹出日历 className | string | - | |
| getPopupContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | - | |
| inputReadOnly | 设置输入框为只读（避免在移动设备上打开虚拟键盘） | boolean | false | |
| locale | 国际化配置 | object | 默认配置 | - |
| mode | 日期面板的状态 | time \| date \| month \| year \| decade | - | |
| nextIcon | 自定义下一个图标 | slot | - | 3.0 |
| open | 控制弹层是否展开 | boolean | - | |
| picker | 设置选择器类型 | date \| week \| month \| quarter \| year | date | quarter |
| placeholder | 输入框提示文字 | string \| [string, string] | - | |
| placement | 选择框弹出的位置 | bottomLeft bottomRight topLeft topRight | bottomLeft | 3.3.0 |
| popupStyle | 额外的弹出日历样式 | CSSProperties | {} | |
| prevIcon | 自定义上一个图标 | slot | - | 3.0 |
| presets | 预设时间范围快捷选择 | { label: slot, value: dayjs }[] | - | 4.0 |
| size | 输入框大小，large 高度为 40px，small 为 28px，mini 为 24px，默认是 32px | large \| middle \| small \| mini | - | |
| status | 设置校验状态 | 'error' \| 'warning' | - | 3.3.0 |
| prefix | 自定义的选择框前缀 | string\|slot | | |
| suffixIcon | 自定义的选择框后缀图标 | v-slot:suffixIcon | - | |
| superNextIcon | 自定义 << 切换图标 | slot | - | 3.0 |
| superPrevIcon | 自定义 >> 切换图标 | slot | - | 3.0 |
| valueFormat | 可选，绑定值的格式，对 value、defaultValue、defaultPickerValue 起作用。不指定则绑定值为 dayjs 对象 | string，具体格式 | - | |

### 共同的事件

| 事件名称 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| openChange | 弹出日历和关闭日历的回调 | function(status) | |
| panelChange | 日期面板变化时的回调 | function(value, mode) | - |

### 共同的方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

## DatePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultPickerValue | 默认面板日期 | dayjs | - | |
| disabledTime | 不可选择的时间 | function(date) | - | |
| format | 展示的日期格式，配置参考 dayjs | formatType | YYYY-MM-DD | |
| renderExtraFooter | 在面板中添加额外的页脚 | v-slot:renderExtraFooter="mode" | - | |
| showNow | 当设定了 showTime 的时候，面板是否显示"此刻"按钮 | boolean | - | |
| showTime | 增加时间选择功能 | Object \| boolean | TimePicker Options | |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，例子 | dayjs | dayjs() | |
| showToday | 是否展示"今天"按钮 | boolean | true | |
| value(v-model) | 日期 | dayjs | - | |

### DatePicker 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 时间发生变化的回调 | function(date: dayjs \| string, dateString: string) |
| ok | 点击确定按钮的回调 | function(date: dayjs \| string) |

## DatePicker[picker=year]

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| format | 展示的日期格式，配置参考 dayjs | formatType | YYYY | |

## DatePicker[picker=quarter]

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| format | 展示的日期格式，配置参考 dayjs | formatType | YYYY-\\QQ | |

## DatePicker[picker=month]

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| format | 展示的日期格式，配置参考 dayjs | formatType | YYYY-MM | |
| monthCellRender | 自定义的月份内容渲染方法 | v-slot:monthCellRender="{current, locale}" | - | |

## DatePicker[picker=week]

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| format | 展示的日期格式，配置参考 dayjs | formatType | YYYY-wo | |

## RangePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowEmpty | 允许起始项部分为空 | [boolean, boolean] | [false, false] | |
| dateRender | 自定义日期单元格的内容。 | v-slot:dateRender="{current: dayjs, today: dayjs, info: { range: start \| end }}" | - | |
| defaultPickerValue | 默认面板日期 | dayjs[] | - | |
| disabled | 禁用起始项 | [boolean, boolean] | - | |
| disabledTime | 不可选择的时间 | function(date: dayjs, partial: start \| end) | - | |
| format | 展示的日期格式 | formatType | YYYY-MM-DD HH:mm:ss | |
| presets | 预设时间范围快捷选择 | { label: slot, value: dayjs[] }[] | - | 4.0 |
| ranges | 预设时间范围快捷选择 | { [range: string]: dayjs[] } \| { [range: string]: () => dayjs[] } | - | |
| renderExtraFooter | 在面板中添加额外的页脚 | v-slot:renderExtraFooter="mode" | - | |
| separator | 设置分隔符 | string \| v-slot:separator | <SwapRightOutlined /> | |
| showTime | 增加时间选择功能 | Object\|boolean | TimePicker Options | |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，例子 | dayjs[] | [dayjs(), dayjs()] | |
| value(v-model) | 日期 | dayjs[] | - | |

### RangePicker 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| calendarChange | 待选日期发生变化的回调 | function(dates: [dayjs, dayjs] \| [string, string], dateStrings: [string, string], info: { range:start\|end }) |
| change | 日期范围发生变化的回调 | function(dates: [dayjs, dayjs] \| [string, string], dateStrings: [string, string]) |
| ok | 点击确定按钮的回调 | function(dates: [dayjs, dayjs] \| [string, string]) |
