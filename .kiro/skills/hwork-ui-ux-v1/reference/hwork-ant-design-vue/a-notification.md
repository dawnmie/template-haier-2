# Notification 通知提醒框

## 概述

全局展示通知提醒信息。

## 何时使用

在系统四个角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## API

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warning(config)`
- `notification.warn(config)`
- `notification.open(config)`
- `notification.close(key: String)`
- `notification.destroy()`
- `notification.useNotification()`

### config 参数

| 参数         | 说明                                                                          | 类型                           | 默认值                | 版本                 |
| ------------ | ----------------------------------------------------------------------------- | ------------------------------ | --------------------- | -------------------- |
| bottom       | 消息从底部弹出时，距离底部的位置，单位像素。                                  | string                         | `24px`                | -                    |
| btn          | 自定义关闭按钮                                                                | VNode \| () => VNode           | -                     | -                    |
| class        | 自定义 CSS class                                                              | string                         | -                     | -                    |
| closeIcon    | 自定义关闭图标                                                                | VNode \| () => VNode           | -                     | -                    |
| description  | 通知提醒内容，必选                                                            | string \| VNode \| () => VNode | -                     | -                    |
| duration     | 默认 5 秒后自动关闭，配置为 null 则不自动关闭                                 | number                         | `5`                   | -                    |
| getContainer | 配置渲染节点的输出位置                                                        | () => HTMLNode                 | `() => document.body` | -                    |
| icon         | 自定义图标                                                                    | VNode \| () => VNode           | -                     | -                    |
| key          | 当前通知唯一标志                                                              | string                         | -                     | -                    |
| message      | 通知提醒标题，必选                                                            | string \| VNode \| () => VNode | -                     | -                    |
| placement    | 弹出位置，可选 `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | string                         | `topRight`            | `top` `bottom` 3.3.0 |
| style        | 自定义内联样式                                                                | Object \| string               | -                     | -                    |
| top          | 消息从顶部弹出时，距离顶部的位置，单位像素。                                  | string                         | `24px`                | -                    |
| onClick      | 点击通知时触发的回调函数                                                      | Function                       | -                     | -                    |
| onClose      | 点击默认关闭按钮时触发的回调函数                                              | Function                       | -                     | -                    |

### 全局配置

还提供了一个全局配置方法，在调用前提前配置，全局一次生效。

`notification.config(options)`

> 当你使用 `ConfigProvider` 进行全局化配置时，系统会默认自动开启 RTL 模式。(3.0+)
>
> 当你想单独使用，可通过如下设置开启 RTL 模式。

```javascript
notification.config({
  placement: 'bottomRight',
  bottom: '50px',
  duration: 3,
  rtl: true
})
```

#### options 参数

| 参数         | 说明                                                           | 类型                 | 默认值                | 版本 |
| ------------ | -------------------------------------------------------------- | -------------------- | --------------------- | ---- |
| bottom       | 消息从底部弹出时，距离底部的位置，单位像素。                   | string               | `24px`                | -    |
| closeIcon    | 自定义关闭图标                                                 | VNode \| () => VNode | -                     | -    |
| duration     | 默认自动关闭延时，单位秒                                       | number               | `5`                   | -    |
| getContainer | 配置渲染节点的输出位置                                         | () => HTMLNode       | `() => document.body` | -    |
| maxCount     | 最大显示数, 超过限制时，最早的消息会被自动关闭                 | number               | -                     | 3.0  |
| placement    | 弹出位置，可选 `topLeft` `topRight` `bottomLeft` `bottomRight` | string               | `topRight`            | -    |
| rtl          | 是否开启 RTL 模式                                              | boolean              | `false`               | 3.0  |
| top          | 消息从顶部弹出时，距离顶部的位置，单位像素。                   | string               | `24px`                | -    |

## 代码示例

### Hooks 调用（推荐）

通过 `notification.useNotification` 创建支持读取 context 的 `contextHolder`。请注意，我们推荐通过顶层注册的方式代替 `notification` 静态方法，因为静态方法无法消费上下文，因而 ConfigProvider 的数据也不会生效。

```vue
<template>
  <a-button type="primary" @click="openNotification">Open Notification</a-button>
  <component :is="contextHolder" />
</template>

<script setup>
import { notification } from '@hwork/ant-design-vue'

const [api, contextHolder] = notification.useNotification()

const openNotification = () => {
  api.open({
    message: 'Notification Title',
    description: 'This is the content of the notification.'
  })
}
</script>
```

### 基本用法

最简单的用法，5 秒后自动关闭。

```vue
<template>
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
</template>

<script setup>
import { notification } from '@hwork/ant-design-vue'

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification.'
  })
}
</script>
```

### 带有图标的通知提醒框

通知提醒框左侧有图标。

```vue
<template>
  <a-button
    @click="
      () => notification.success({ message: 'Success', description: 'This is a success message' })
    "
    >Success</a-button
  >
  <a-button
    @click="() => notification.info({ message: 'Info', description: 'This is an info message' })"
    >Info</a-button
  >
  <a-button
    @click="
      () => notification.warning({ message: 'Warning', description: 'This is a warning message' })
    "
    >Warning</a-button
  >
  <a-button
    @click="() => notification.error({ message: 'Error', description: 'This is an error message' })"
    >Error</a-button
  >
</template>
```

### 自动关闭的延时

自定义通知框自动关闭的延时，默认 `5s`，取消自动关闭只要将该值设为 `0` 即可。

```vue
<template>
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
</template>

<script setup>
import { notification } from '@hwork/ant-design-vue'

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'I will never close automatically. This is a purposely very long description.',
    duration: 0
  })
}
</script>
```

### 自定义图标

图标可以被自定义。

```vue
<template>
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
</template>

<script setup>
import { notification } from '@hwork/ant-design-vue'
import '@hwork/icon/face-smile'

import { h } from 'vue'

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification.',
    icon: () => h('h-icon-face-smile', { style: 'color: #108ee9' })
  })
}
</script>
```

### 自定义样式

使用 `style` 和 `class` 来定义样式。

```vue
<template>
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
</template>

<script setup>
import { notification } from '@hwork/ant-design-vue'

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification.',
    style: {
      width: '600px',
      marginLeft: `${335 - 600}px`
    }
  })
}
</script>
```

### 自定义按钮

自定义关闭按钮的样式和文字。

```vue
<template>
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
</template>

<script setup>
import { notification } from '@hwork/ant-design-vue'
import { h } from 'vue'

const openNotification = () => {
  const btn = h(
    'a-button',
    {
      type: 'primary',
      size: 'small',
      onClick: () => notification.destroy()
    },
    'Confirm'
  )

  notification.open({
    message: 'Notification Title',
    description: 'A function will be called after the notification is closed.',
    btn
  })
}
</script>
```

### 更新消息内容

可以通过唯一的 key 来更新内容, 或者通过响应式数据更新。

```vue
<template>
  <a-button type="primary" @click="openNotificationByKey"
    >Open the notification box (update by key)</a-button
  >
  <a-button type="primary" @click="openNotificationByReactive"
    >Open the notification box (update by reactive)</a-button
  >
</template>

<script setup>
import { notification } from '@hwork/ant-design-vue'

const key = 'updatable'

const openNotificationByKey = () => {
  notification.open({
    key,
    message: 'Notification Title',
    description: 'description.'
  })

  setTimeout(() => {
    notification.open({
      key,
      message: 'New Title',
      description: 'New description.'
    })
  }, 1000)
}
</script>
```

### 位置

使用 `placement` 可以配置通知从右上角、右下角、左下角、左上角弹出。

```vue
<template>
  <a-button @click="() => openNotification('top')">top</a-button>
  <a-button @click="() => openNotification('bottom')">bottom</a-button>
  <a-button @click="() => openNotification('topLeft')">topLeft</a-button>
  <a-button @click="() => openNotification('topRight')">topRight</a-button>
  <a-button @click="() => openNotification('bottomLeft')">bottomLeft</a-button>
  <a-button @click="() => openNotification('bottomRight')">bottomRight</a-button>
</template>

<script setup>
import { notification } from '@hwork/ant-design-vue'

const openNotification = (placement) => {
  notification.info({
    message: `Notification ${placement}`,
    description: 'This is the content of the notification.',
    placement
  })
}
</script>
```

## FAQ

### 为什么 notification 不能获取 context、Pinia 的内容和 ConfigProvider 的 `locale/prefixCls/theme` 等配置？

直接调用 notification 方法，antdv 会通过 `Vue.render` 动态创建新的 Vue 实体。其 context 与当前代码所在 context 并不相同，因而无法获取 context 信息。

当你需要 context 信息（例如 ConfigProvider 配置的内容）时，可以通过 `notification.useNotification` 方法会返回 `api` 实体以及 `contextHolder` 节点。将其插入到你需要获取 context 位置即可：

```vue
<template>
  <contextHolder />
  <!-- <component :is='contextHolder'/> -->
</template>

<script setup>
import { notification } from '@hwork/ant-design-vue'

const [notificationApi, contextHolder] = notification.useNotification()

notificationApi.open({
  // ...
})
</script>
```

**异同**：通过 hooks 创建的 `contextHolder` 必须插入到子元素节点中才会生效，当你不需要上下文信息时请直接调用。

> 可通过 [App 包裹组件](/components/app-cn) 简化 `useNotification` 等方法需要手动植入 contextHolder 的问题。

### 静态方法如何设置 prefixCls ？

你可以通过 [`ConfigProvider.config`](/components/config-provider-cn#configproviderconfig-4130) 进行设置。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/notification-cn
