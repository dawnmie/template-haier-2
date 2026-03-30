# Form 表单

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## 表单

我们为 form 提供了以下三种排列方式:

- 水平排列:标签和表单控件水平排列;(默认)
- 垂直排列:标签和表单控件上下垂直排列;
- 行内排列:表单项水平行内排列。

## 表单域

表单一定会包含表单域,表单域可以是输入控件,标准表单域,标签,下拉菜单,文本域等。

## API

### Form Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| colon | 配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效) | boolean | false | - |
| disabled | 设置表单组件禁用,仅对 antdv 组件有效 | boolean | false | 4.0 |
| hideRequiredMark | 隐藏所有表单项的必选标记 | boolean | false | - |
| labelAlign | label 标签的文本对齐方式 | 'left' \| 'right' | 'right' | - |
| labelCol | label 标签布局,同 `<Col>` 组件,设置 `span` `offset` 值 | object | - | - |
| labelWrap | label 标签的文本换行方式 | boolean | false | 3.0 |
| layout | 表单布局 | 'horizontal' \| 'vertical' \| 'inline' | 'horizontal' | - |
| model | 表单数据对象 | object | - | - |
| name | 表单名称,会作为表单字段 `id` 前缀使用 | string | - | 2.0.0 |
| noStyle | 为 `true` 时不带样式,作为纯字段控件使用 | boolean | false | 3.0 |
| rules | 表单验证规则 | object | - | - |
| scrollToFirstError | 提交失败自动滚动到第一个错误字段 | boolean \| options | false | 2.0.0 |
| validateOnRuleChange | 是否在 rules 属性改变后立即触发一次验证 | boolean | true | - |
| validateTrigger | 统一设置字段校验规则 | string \| string[] | 'change' | 2.0.0 |
| wrapperCol | 需要为输入控件设置布局样式时,使用该属性,用法同 labelCol | object | - | - |

### Form Events

| 事件名称 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| finish | 提交表单且数据验证成功后回调事件 | function(values) | 2.0.0 |
| finishFailed | 提交表单且数据验证失败后回调事件 | function({ values, errorFields, outOfDate }) | 2.0.0 |
| submit | 数据验证成功后回调事件 | Function(e:Event) | - |
| validate | 任一表单项被校验后触发 | Function(name, status, errorMsgs) | - |

### Form Methods

| 方法名 | 说明 | 参数 | 版本 |
| --- | --- | --- | --- |
| clearValidate | 移除表单项的校验结果 | (nameList?: NamePath[]) => void | - |
| resetFields | 对整个表单进行重置,将所有字段值重置为初始值并移除校验结果 | (nameList?: NamePath[]) => void | - |
| scrollToField | 滚动到对应字段位置 | (name: NamePath, options: [ScrollOptions]) => void | - |
| validate | 触发表单验证, 同 validateFields | (nameList?: NamePath[]) => Promise | - |
| validateFields | 触发表单验证 | (nameList?: NamePath[]) => Promise | - |

### Form.Item Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoLink | 是否自动关联表单域 | boolean | true | - |
| colon | 配合 label 属性使用,表示是否显示 label 后面的冒号 | boolean | false | - |
| extra | 额外的提示信息,和 help 类似 | string \| slot | - | - |
| hasFeedback | 配合 validateStatus 属性使用,展示校验状态图标 | boolean | false | - |
| help | 提示信息,如不设置,则会根据校验规则自动生成 | string \| slot | - | - |
| htmlFor | 设置子元素 label `htmlFor` 属性 | string | - | - |
| label | label 标签的文本 | string \| slot | - | - |
| labelAlign | 标签文本对齐方式 | 'left' \| 'right' | 'right' | - |
| labelCol | label 标签布局,同 `<Col>` 组件 | object | - | - |
| name | 表单域 model 字段 | NamePath | - | - |
| required | 是否必填,如不设置,则会根据校验规则自动生成 | boolean | false | - |
| rules | 表单验证规则 | object \| array | - | - |
| tooltip | 配置提示信息 | string \| slot | - | 4.0.4 |
| validateFirst | 当某一规则校验不通过时,是否停止剩下的规则的校验 | boolean | false | 2.0.0 |
| validateStatus | 校验状态,可选:'success' 'warning' 'error' 'validating' | string | - | - |
| validateTrigger | 设置字段校验的时机 | string \| string[] | 'change' | 2.0.0 |
| wrapperCol | 需要为输入控件设置布局样式时,使用该属性 | object | - | - |

### 校验规则

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enum | 枚举类型 | string | - |
| len | 字段长度 | number | - |
| max | 最大长度 | number | - |
| message | 校验文案 | string | - |
| min | 最小长度 | number | - |
| pattern | 正则表达式校验 | RegExp | - |
| required | 是否必选 | boolean | false |
| transform | 校验前转换字段值 | function(value) => transformedValue:any | - |
| trigger | 校验触发的时机 | 'blur' \| 'change' \| ['change', 'blur'] | - |
| type | 内建校验类型 | string | 'string' |
| validator | 自定义校验(注意,callback 必须被调用) | function(rule, value, callback) | - |
| whitespace | 必选时,空格是否会被视为错误 | boolean | false |

更多高级用法可研究 async-validator。

## 使用示例

### 基本使用

```vue
<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>
```

### 表单验证

Form 组件提供了表单验证的功能,只需要通过 rules 属性传入约定的验证规则,并将 FormItem 的 name 属性设置为需校验的字段名即可。

### 自定义校验规则

```vue
<template>
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
  >
    <a-form-item has-feedback label="Password" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Confirm" name="checkPass">
      <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Age" name="age">
      <a-input-number v-model:value="formState.age" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { Rule } from '@hwork/ant-design-vue/es/form';
import type { FormInstance } from '@hwork/ant-design-vue';

interface FormState {
  pass: string;
  checkPass: string;
  age: number | undefined;
}

const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  pass: '',
  checkPass: '',
  age: undefined,
});

const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password');
  } else {
    if (formState.checkPass !== '') {
      formRef.value.validateFields('checkPass');
    }
    return Promise.resolve();
  }
};

const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password again');
  } else if (value !== formState.pass) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  pass: [{ required: true, validator: validatePass, trigger: 'change' }],
  checkPass: [{ validator: validatePass2, trigger: 'change' }],
  age: [{ validator: checkAge, trigger: 'change' }],
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const handleFinish = (values: FormState) => {
  console.log(values, formState);
};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>
```

### useForm

useForm 是一个可以独立 Form 组件运行的方法,它使用 Vue 响应式机制进行数据的监听和校验。

```vue
<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Activity name" v-bind="validateInfos.name">
      <a-input v-model:value="modelRef.name" />
    </a-form-item>
    <a-form-item label="Activity zone" v-bind="validateInfos.region">
      <a-select v-model:value="modelRef.region" placeholder="please select your zone">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, toRaw } from 'vue';
import { Form } from '@hwork/ant-design-vue';

const useForm = Form.useForm;

const labelCol = { span: 4 };
const wrapperCol = { span: 14 };
const modelRef = reactive({
  name: '',
  region: undefined,
});

const rulesRef = reactive({
  name: [
    {
      required: true,
      message: 'Please input name',
    },
  ],
  region: [
    {
      required: true,
      message: 'Please select region',
    },
  ],
});

const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);

const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(modelRef));
    })
    .catch(err => {
      console.log('error', err);
    });
};
</script>
```

## 注意事项

### 3.x 版本

自 3.0 版本以后,Form.Item 不再劫持子元素,而是通过 provider / inject 依赖注入的方式进行自动校验。

一个 Form.Item 只能收集一个表单项的数据,如果有多个表单项,会导致收集错乱。解决方案:

1. 使用多个 a-form-item
2. 使用自定义组件包裹,并调用 useInjectFormItemContext
3. 使用 a-form-item-rest 组件阻止数据收集
