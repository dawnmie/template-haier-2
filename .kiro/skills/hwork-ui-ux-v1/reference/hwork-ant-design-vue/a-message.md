# Message 全局提示

## 概述

全局展示操作反馈信息。

## 何时使用

- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## API

组件提供了一些静态方法，使用方式和参数如下:

- `message.success(content, [duration], onClose)`
- `message.error(content, [duration], onClose)`
- `message.info(content, [duration], onClose)`
- `message.warning(content, [duration], onClose)`
- `message.warn(content, [duration], onClose)` // alias of warning
- `message.loading(content, [duration], onClose)`

### 基础参数

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 提示内容 | string \| VNode \| () => VNode | - |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭。 | number | 3 |
| onClose | 关闭时触发的回调函数 | function | - |

### Promise 接口

组件同时提供 promise 接口:

- `message[level](content, [duration]).then(afterClose)`
- `message[level](content, [duration], onClose).then(afterClose)`

其中 `message[level]` 是组件已经提供的静态方法。`then` 接口返回值是 Promise。

### 对象形式调用

也可以对象的形式传递参数:

- `message.open(config)`
- `message.success(config)`
- `message.error(config)`
- `message.info(config)`
- `message.warning(config)`
- `message.warn(config)` // alias of warning
- `message.loading(config)`

`config` 对象属性如下:

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| class | 自定义 CSS class | string | - | - |
| content | 提示内容 | string \| VNode \| ()=> VNode | - | - |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭。 | number | 3 | - |
| icon | 自定义图标 | VNode \| () => VNode | - | - |
| key | 当前提示的唯一标志 | string \| number | - | - |
| style | 自定义内联样式 | CSSProperties | - | - |
| onClick | 点击 message 时触发的回调函数 | function | - | - |
| onClose | 关闭时触发的回调函数 | function | - | - |

## 全局方法

还提供了全局配置和全局销毁方法:

- `message.config(options)`
- `message.destroy()`
- `message.useMessage()`

### message.config

```javascript
message.config({
  top: `100px`,
  duration: 2,
  rtl: true,
  prefixCls: 'my-message',
});
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| duration | 默认自动关闭延时，单位秒 | number | 3 | - |
| getContainer | 配置渲染节点的输出位置 | () => HTMLElement | () => document.body | - |
| prefixCls | 消息节点的 className 前缀 | string | `ant-message` | 3.0 |
| rtl | 是否开启 RTL 模式 | boolean | false | - |
| top | 消息距离顶部的位置 | string | `8px` | - |

## 代码示例

### Hooks 调用（推荐）

```vue
<template>
  <contextHolder />
  <a-button @click="showMessage">Display normal message</a-button>
</template>

<script setup>
import { message } from '@hwork/ant-design-vue';

const [messageApi, contextHolder] = message.useMessage();

const showMessage = () => {
  messageApi.open({
    content: 'This is a normal message',
  });
};
</script>
```

通过 `message.useMessage` 创建支持读取 context 的 `contextHolder`。请注意，我们推荐通过顶层注册的方式代替 `message` 静态方法，因为静态方法无法消费上下文，因而 ConfigProvider 的数据也不会生效。

### 修改延时

```vue
<template>
  <a-button @click="showMessage">Customized display duration</a-button>
</template>

<script setup>
import { message } from '@hwork/ant-design-vue';

const showMessage = () => {
  message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
};
</script>
```

自定义时长 `10s`，默认时长为 `3s`。

### 加载中

```vue
<template>
  <a-button @click="showLoading">Display a loading indicator</a-button>
</template>

<script setup>
import { message } from '@hwork/ant-design-vue';

const showLoading = () => {
  const hide = message.loading('Action in progress..', 0);
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500);
};
</script>
```

进行全局 loading，异步自行移除。

### 更新消息内容

```vue
<template>
  <a-button @click="updateByKey">Open the message box (update by key)</a-button>
  <a-button @click="updateByReactive">Open the message box (update by reactive)</a-button>
</template>

<script setup>
import { message } from '@hwork/ant-design-vue';

const updateByKey = () => {
  const key = 'updatable';
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: 'Loaded!', key, duration: 2 });
  }, 1000);
};

const updateByReactive = () => {
  const [messageApi, contextHolder] = message.useMessage();
  messageApi.open({
    content: 'Loading...',
  });
};
</script>
```

可以通过唯一的 `key` 来更新内容、或者响应式数据。

### 普通提示

```vue
<template>
  <a-button @click="info">Display normal message</a-button>
</template>

<script setup>
import { message } from '@hwork/ant-design-vue';

const info = () => {
  message.info('This is a normal message');
};
</script>
```

信息提醒反馈。

> 属性 content 支持传入 VNode，可以搭配 h 函数或 jsx 语法来自定义提醒内容。

### 其他提示类型

```vue
<template>
  <a-button @click="success">Success</a-button>
  <a-button @click="error">Error</a-button>
  <a-button @click="warning">Warning</a-button>
  <a-button @click="info">Info</a-button>
</template>

<script setup>
import { message } from '@hwork/ant-design-vue';

const success = () => {
  message.success('This is a success message');
};

const error = () => {
  message.error('This is an error message');
};

const warning = () => {
  message.warning('This is a warning message');
};

const info = () => {
  message.info('This is an info message');
};
</script>
```

包括成功、失败、警告。

### Promise 接口

```vue
<template>
  <a-button @click="showMessages">Display a sequence of message</a-button>
</template>

<script setup>
import { message } from '@hwork/ant-design-vue';

const showMessages = () => {
  message.loading('Action in progress..', 2.5)
    .then(() => message.success('Loading finished', 2.5))
    .then(() => message.info('Loading finished is finished', 2.5));
};
</script>
```

可以通过 then 接口在关闭后运行 callback。以上用例将在每个 message 将要结束时通过 then 显示新的 message。

### 自定义样式

```vue
<template>
  <a-button @click="customStyle">Customized style</a-button>
</template>

<script setup>
import { message } from '@hwork/ant-design-vue';

const customStyle = () => {
  message.success({
    content: 'This is a prompt message with custom className and style',
    class: 'custom-class',
    style: {
      marginTop: '20vh',
    },
  });
};
</script>
```

使用 `style` 和 `class` 来定义样式。

## FAQ

### 为什么 message 不能获取 context、Pinia 的内容和 ConfigProvider 的 `locale/prefixCls/theme` 等配置？

直接调用 message 方法，antdv 会通过 `Vue.render` 动态创建新的 Vue 实体。其 context 与当前代码所在 context 并不相同，因而无法获取 context 信息。

当你需要 context 信息（例如 ConfigProvider 配置的内容）时，可以通过 `message.useMessage` 方法会返回 `api` 实体以及 `contextHolder` 节点。将其插入到你需要获取 context 位置即可:

```vue
<template>
  <contextHolder />
  <!-- <component :is='contextHolder'/> -->
</template>

<script setup>
import { message } from '@hwork/ant-design-vue';

const [messageApi, contextHolder] = message.useMessage();

messageApi.open({
  // ...
});
</script>
```

**异同**: 通过 hooks 创建的 `contextHolder` 必须插入到子元素节点中才会生效，当你不需要上下文信息时请直接调用。

> 可通过 [App 包裹组件](/components/app-cn) 简化 `useMessage` 等方法需要手动植入 contextHolder 的问题。

### 静态方法如何设置 prefixCls？

你可以通过 [`ConfigProvider.config`](/components/config-provider-cn#configproviderconfig-4130) 进行设置。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/message-cn
