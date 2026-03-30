# Radio 单选框

单选框。

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见,方便用户在比较中选择，因此选项不宜过多。

## API

### Radio/Radio.Button

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autofocus | 自动获取焦点 | boolean | false |
| checked(v-model) | 指定当前是否选中 | boolean | false |
| disabled | 禁用 Radio | boolean | false |
| value | 根据 value 进行比较，判断是否选中 | any | - |

### RadioGroup

单选框组合，用于包裹一组 `Radio`。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| buttonStyle | RadioButton 的风格样式，目前有描边和填色两种风格 | `outline` \| `solid` | `outline` | |
| disabled | 禁选所有子单选器 | boolean | false | |
| name | RadioGroup 下所有 `input[type="radio"]` 的 `name` 属性 | string | - | |
| options | 以配置形式设置子元素 | string[] \| number[] \| Array<{ label: string value: string disabled?: boolean }> | - | |
| optionType | 用于设置 Radio `options` 类型 | `default` \| `button` | `default` | 3.0.0 |
| size | 大小，只对按钮样式生效 | `large` \| `default` \| `small` \| `mini` | `default` | |
| value(v-model) | 用于设置当前选中的值 | any | - | |

### RadioGroup 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选项变化时的回调函数 | Function(e:Event) |

## 方法

### Radio

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

## 代码示例

### 基本用法

最简单的用法。

```vue
<template>
  <a-radio v-model:checked="checked">Radio</a-radio>
</template>
```

### 单选组合

一组互斥的 Radio 配合使用。

```vue
<template>
  <a-radio-group v-model:value="value">
    <a-radio value="A">A</a-radio>
    <a-radio value="B">B</a-radio>
    <a-radio value="C">C</a-radio>
    <a-radio value="D">D</a-radio>
  </a-radio-group>
</template>
```

### 按钮样式

按钮样式的单选组合。

```vue
<template>
  <a-radio-group v-model:value="value">
    <a-radio-button value="Hangzhou">Hangzhou</a-radio-button>
    <a-radio-button value="Shanghai">Shanghai</a-radio-button>
    <a-radio-button value="Beijing">Beijing</a-radio-button>
    <a-radio-button value="Chengdu">Chengdu</a-radio-button>
  </a-radio-group>
</template>
```

### 填底的按钮样式

实色填底的单选按钮样式。

```vue
<template>
  <a-radio-group v-model:value="value" button-style="solid">
    <a-radio-button value="Hangzhou">Hangzhou</a-radio-button>
    <a-radio-button value="Shanghai">Shanghai</a-radio-button>
    <a-radio-button value="Beijing">Beijing</a-radio-button>
    <a-radio-button value="Chengdu">Chengdu</a-radio-button>
  </a-radio-group>
</template>
```

### 不可用

Radio 不可用。

```vue
<template>
  <a-radio :disabled="disabled">Disabled</a-radio>
</template>
```

### 大小

大中小迷你四种组合，可以和表单输入框进行对应配合。

```vue
<template>
  <a-radio-group v-model:value="value" size="large">
    <a-radio-button value="Hangzhou">Hangzhou</a-radio-button>
    <a-radio-button value="Shanghai">Shanghai</a-radio-button>
    <a-radio-button value="Beijing">Beijing</a-radio-button>
    <a-radio-button value="Chengdu">Chengdu</a-radio-button>
  </a-radio-group>
</template>
```

### RadioGroup 垂直

垂直的 RadioGroup，配合更多输入框选项。

```vue
<template>
  <a-radio-group v-model:value="value">
    <a-radio value="A">Option A</a-radio>
    <a-radio value="B">Option B</a-radio>
    <a-radio value="C">Option C</a-radio>
    <a-radio value="More">More...</a-radio>
  </a-radio-group>
</template>
```

### 单选组合 - 配合 name 使用

可以为 Radio.Group 配置 `name` 参数，为组合内的 input 元素赋予相同的 `name` 属性，使浏览器把 Radio.Group 下的 Radio 真正看作是一组（例如可以通过方向键始终**在同一组内**更改选项）。

```vue
<template>
  <a-radio-group v-model:value="value" name="radioGroup">
    <a-radio value="A">A</a-radio>
    <a-radio value="B">B</a-radio>
    <a-radio value="C">C</a-radio>
    <a-radio value="D">D</a-radio>
  </a-radio-group>
</template>
```

### RadioGroup 组合 - 配置方式

通过配置 `options` 参数来渲染单选框。

```vue
<template>
  <a-radio-group v-model:value="value" :options="options" />
</template>

<script setup>
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
];
</script>
```
