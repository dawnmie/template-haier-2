# Space 间距

设置组件之间的间距。

## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。
- 需要表单组件之间紧凑连接且合并边框时，使用 Space.Compact（自 ant-design-vue@4.0.0 版本开始提供该组件）。

## API

### Space

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 对齐方式 | `start` \| `end` \| `center` \| `baseline` | - | 1.6.5 |
| direction | 间距方向 | `vertical` \| `horizontal` | `horizontal` | 1.6.5 |
| size | 间距大小 | `small` \| `middle` \| `large` \| `number` | `small` | 1.6.5 |
| split | 设置拆分 | VueNode \| v-slot | - | 2.2.0 |
| wrap | 是否自动换行，仅在 horizontal 时有效 | boolean | false | 2.2.0 |

### Space.Compact

> 自 ant-design-vue@4.0.0 版本开始提供该组件。

需要表单组件之间紧凑连接且合并边框时，使用 Space.Compact。支持的组件有：

- Button
- AutoComplete
- Cascader
- DatePicker
- Input/Input.Search
- Select
- TimePicker
- TreeSelect

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| block | 将宽度调整为父元素宽度的选项 | boolean | false | 4.0.0 |
| direction | 指定排列方向 | `vertical` \| `horizontal` | `horizontal` | 4.0.0 |
| size | 子组件大小 | `large` \| `middle` \| `small` | `middle` | 4.0.0 |

## 基本用法

```vue
<template>
  <a-space>
    <a-button>Button</a-button>
    <a-upload>
      <a-button>
        <upload-outlined />
        Click to Upload
      </a-button>
    </a-upload>
    <a-button>Confirm</a-button>
  </a-space>
</template>
```

## 示例

### 垂直间距

```vue
<template>
  <a-space direction="vertical" style="width: 100%">
    <a-card title="Card">
      <p>Card content</p>
      <p>Card content</p>
    </a-card>
    <a-card title="Card">
      <p>Card content</p>
      <p>Card content</p>
    </a-card>
  </a-space>
</template>
```

### 间距大小

```vue
<template>
  <div>
    <a-radio-group v-model:value="size">
      <a-radio value="small">Small</a-radio>
      <a-radio value="middle">Middle</a-radio>
      <a-radio value="large">Large</a-radio>
    </a-radio-group>
    <a-space :size="size">
      <a-button type="primary">Primary</a-button>
      <a-button>Default</a-button>
      <a-button type="dashed">Dashed</a-button>
      <a-button type="link">Link</a-button>
    </a-space>
  </div>
</template>
```

### 对齐方式

```vue
<template>
  <a-space align="center">
    <span>center</span>
    <a-button type="primary">Primary</a-button>
    <span>Block</span>
  </a-space>
</template>
```

### 自动换行

```vue
<template>
  <a-space wrap>
    <a-button v-for="i in 20" :key="i">Button</a-button>
  </a-space>
</template>
```

### 分隔符

```vue
<template>
  <a-space :split="divider">
    <a-typography-link>Link</a-typography-link>
    <a-typography-link>Link</a-typography-link>
    <a-typography-link>Link</a-typography-link>
  </a-space>
</template>
```

### 紧凑布局

```vue
<template>
  <a-space-compact>
    <a-input placeholder="https://ant.design" />
    <a-button type="primary">Submit</a-button>
  </a-space-compact>
</template>
```
