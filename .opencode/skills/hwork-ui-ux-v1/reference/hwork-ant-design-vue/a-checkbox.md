# Checkbox 多选框

## 概述

多选框。

## 何时使用

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## API

### Checkbox

#### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| autofocus | 自动获取焦点 | boolean | `false` | - |
| checked(v-model) | 指定当前是否选中 | boolean | `false` | - |
| disabled | 失效状态 | boolean | `false` | - |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | `false` | - |
| value | 与 CheckboxGroup 组合使用时的值 | boolean \| string \| number | - | - |

#### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
|----------|------|----------|------|
| change | 变化时回调函数 | Function(e:Event) | - |

### Checkbox Group

#### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| disabled | 整组失效 | boolean | `false` | - |
| name | CheckboxGroup 下所有 `input[type="checkbox"]` 的 `name` 属性 | string | - | 1.5.0 |
| options | 指定可选项，可以通过 slot="label" slot-scope="option" 定制 `label` | string[] \| Array<{ label: string value: string disabled?: boolean, indeterminate?: boolean, onChange?: function }> | `[]` | - |
| value(v-model) | 指定选中的选项 | (boolean \| string \| number)[] | `[]` | - |

#### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
|----------|------|----------|------|
| change | 变化时回调函数 | Function(checkedValue) | - |

### 方法

#### Checkbox

| 名称 | 描述 | 版本 |
|------|------|------|
| blur() | 移除焦点 | - |
| focus() | 获取焦点 | - |

## 代码示例

### 基本用法

```vue
<template>
  <a-checkbox>Checkbox</a-checkbox>
</template>
```

简单的 checkbox

### 受控的 checkbox

```vue
<template>
  <p>
    <a-checkbox v-model:checked="checked">
      {{ checked ? 'Checked' : 'Unchecked' }}-{{ disabled ? 'Disabled' : 'Enabled' }}
    </a-checkbox>
  </p>
  <p>
    <a-button type="primary" size="small" @click="checked = !checked">
      {{ !checked ? 'Check' : 'Uncheck' }}
    </a-button>
    <a-button style="margin-left: 10px" type="primary" size="small" @click="disabled = !disabled">
      {{ !disabled ? 'Disable' : 'Enable' }}
    </a-button>
  </p>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
const disabled = ref(false);
</script>
```

联动 checkbox

### Checkbox 组

```vue
<template>
  <a-checkbox-group v-model:value="checkedList" :options="plainOptions" />
</template>

<script setup>
import { ref } from 'vue';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const checkedList = ref(['Apple', 'Orange']);
</script>
```

方便的从数组生成 checkbox

### 全选

```vue
<template>
  <div>
    <a-checkbox
      v-model:checked="checkAll"
      :indeterminate="indeterminate"
      @change="onCheckAllChange"
    >
      Check all
    </a-checkbox>
  </div>
  <a-divider />
  <a-checkbox-group v-model:value="checkedList" :options="plainOptions" @change="onChange" />
</template>

<script setup>
import { ref, watch } from 'vue';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const checkedList = ref(['Apple', 'Orange']);
const indeterminate = ref(true);
const checkAll = ref(false);

watch(checkedList, val => {
  indeterminate.value = !!val.length && val.length < plainOptions.length;
  checkAll.value = val.length === plainOptions.length;
});

const onCheckAllChange = e => {
  Object.assign(checkedList, e.target.checked ? plainOptions : []);
};

const onChange = list => {
  indeterminate.value = !!list.length && list.length < plainOptions.length;
  checkAll.value = list.length === plainOptions.length;
};
</script>
```

在实现全选效果时，你可能会用到 `indeterminate` 属性

### 不可用

```vue
<template>
  <div>
    <a-checkbox disabled />
    <a-checkbox checked disabled />
  </div>
</template>
```

checkbox 不可用

### 布局

```vue
<template>
  <a-checkbox-group v-model:value="checkedList">
    <a-row>
      <a-col :span="8">
        <a-checkbox value="A">A</a-checkbox>
      </a-col>
      <a-col :span="8">
        <a-checkbox value="B">B</a-checkbox>
      </a-col>
      <a-col :span="8">
        <a-checkbox value="C">C</a-checkbox>
      </a-col>
      <a-col :span="8">
        <a-checkbox value="D">D</a-checkbox>
      </a-col>
      <a-col :span="8">
        <a-checkbox value="E">E</a-checkbox>
      </a-col>
    </a-row>
  </a-checkbox-group>
</template>

<script setup>
import { ref } from 'vue';

const checkedList = ref([]);
</script>
```

Checkbox.Group 内嵌 Checkbox 并与 Grid 组件一起使用，可以实现灵活的布局

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/checkbox-cn