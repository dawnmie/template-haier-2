# Alert 警告提示

## 概述

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失,用户可以点击关闭。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| action | 自定义操作项 | slot | - | 4.0.0 |
| afterClose | 关闭动画结束后触发的回调函数 | () => void | - | - |
| banner | 是否用作顶部公告 | boolean | `false` | - |
| size | 可设置大小尺寸: `small`, `large` | string | `small` | - |
| closable | 默认不显示关闭按钮 | boolean | 无 | - |
| closeIcon | 自定义关闭 Icon | slot | `<CloseOutlined />` | 3.0 |
| closeText | 自定义关闭按钮 | string\|slot | 无 | - |
| description | 警告提示的辅助性文字介绍 | string\|slot | 无 | - |
| icon | 自定义图标，`showIcon` 为 `true` 时有效 | vnode\|slot | - | - |
| message | 警告提示内容 | string\|slot | 无 | - |
| showIcon | 是否显示辅助图标 | boolean | `false`,`banner` 模式下默认值为 `true` | - |
| type | 指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`error` | string | `info`,`banner` 模式下默认值为 `warning` | - |

### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
|----------|------|----------|------|
| close | 关闭时触发的回调函数 | (e: MouseEvent) => void | - |

## 代码示例

### 基本用法

```vue
<template>
  <a-alert message="Success Text" type="success" />
  <a-alert message="Success Text" type="success" />
</template>
```

最简单的用法，适用于简短的警告提示。

### 可关闭的警告提示

```vue
<template>
  <a-alert
    message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
    type="warning"
    closable
  />
  <a-alert
    message="Error Text"
    description="Error Description Error Description Error Description Error Description Error Description Error Description"
    type="error"
    closable
  />
</template>
```

显示关闭按钮，点击可关闭警告提示。

### 图标

```vue
<template>
  <a-alert message="Success Tips" type="success" show-icon />
  <a-alert message="Informational Notes" type="info" show-icon />
  <a-alert message="Warning" type="warning" show-icon />
  <a-alert message="Error" type="error" show-icon />
  
  <a-alert
    message="Success Tips"
    description="Detailed description and advices about successful copywriting."
    type="success"
    show-icon
  />
  <a-alert
    message="Informational Notes"
    description="Additional description and informations about copywriting."
    type="info"
    show-icon
  />
  <a-alert
    message="Warning"
    description="This is a warning notice about copywriting."
    type="warning"
    show-icon
  />
  <a-alert
    message="Error"
    description="This is an error message about copywriting."
    type="error"
    show-icon
  />
</template>
```

可口的图标让信息类型更加醒目。

### 顶部公告

```vue
<template>
  <a-alert message="Warning text" type="warning" banner />
  <a-alert
    message="Very long warning text warning text text text text text text text"
    banner
    closable
  />
  <a-alert message="Warning text without icon" banner :show-icon="false" />
  <a-alert message="Error text" type="error" banner />
</template>
```

最简单的用法，适用于简短的警告提示。

### 平滑地卸载

```vue
<template>
  <a-alert
    v-if="visible"
    message="Alert Message Text"
    type="success"
    closable
    @close="handleClose"
  />
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(true);

const handleClose = () => {
  visible.value = false;
};
</script>
```

平滑、自然的卸载提示。

### 四种样式

```vue
<template>
  <a-alert message="Success Text" type="success" />
  <a-alert message="Info Text" type="info" />
  <a-alert message="Warning Text" type="warning" />
  <a-alert message="Error Text" type="error" />
</template>
```

共有四种样式 `success`、`info`、`warning`、`error`。

### 含有辅助性文字介绍

```vue
<template>
  <a-alert
    message="Success Text"
    description="Success Description Success Description Success Description"
    type="success"
  />
  <a-alert
    message="Info Text"
    description="Info Description Info Description Info Description Info Description"
    type="info"
  />
  <a-alert
    message="Warning Text"
    description="Warning Description Warning Description Warning Description Warning Description"
    type="warning"
  />
  <a-alert
    message="Error Text"
    description="Error Description Error Description Error Description Error Description"
    type="error"
  />
</template>
```

含有辅助性文字介绍的警告提示。

### 自定义关闭

```vue
<template>
  <a-alert message="Info Text" type="info" close-text="Close Now" />
</template>
```

自定义图标让信息类型更加醒目。

### 自定义图标

```vue
<template>
  <a-alert message="showIcon = false" :show-icon="false" />
  <a-alert message="Success Tips" type="success" show-icon>
    <template #icon>
      <SmileOutlined />
    </template>
  </a-alert>
  <a-alert message="Informational Notes" type="info" show-icon>
    <template #icon>
      <SmileOutlined />
    </template>
  </a-alert>
  <a-alert message="Warning" type="warning" show-icon>
    <template #icon>
      <SmileOutlined />
    </template>
  </a-alert>
  <a-alert message="Error" type="error" show-icon>
    <template #icon>
      <SmileOutlined />
    </template>
  </a-alert>
  
  <a-alert
    message="Success Tips"
    description="Detailed description and advices about successful copywriting."
    type="success"
    show-icon
  >
    <template #icon>
      <SmileOutlined />
    </template>
  </a-alert>
  <a-alert
    message="Informational Notes"
    description="Additional description and informations about copywriting."
    type="info"
    show-icon
  >
    <template #icon>
      <SmileOutlined />
    </template>
  </a-alert>
  <a-alert
    message="Warning"
    description="This is a warning notice about copywriting."
    type="warning"
    show-icon
  >
    <template #icon>
      <SmileOutlined />
    </template>
  </a-alert>
  <a-alert
    message="Error"
    description="This is an error message about copywriting."
    type="error"
    show-icon
  >
    <template #icon>
      <SmileOutlined />
    </template>
  </a-alert>
</template>
```

可以自定义关闭，自定义的文字会替换原先的关闭 `Icon`。

### 操作

```vue
<template>
  <a-alert message="Success Tips" type="success" show-icon closable>
    <template #action>
      <a-button size="small" type="text">UNDO</a-button>
    </template>
  </a-alert>
  
  <a-alert
    message="Error Text"
    description="Error Description Error Description Error Description Error Description"
    type="error"
    show-icon
  >
    <template #action>
      <a-button size="small" danger>Detail</a-button>
    </template>
  </a-alert>
  
  <a-alert message="Warning Text" type="warning" closable>
    <template #action>
      <a-button size="small" type="ghost">Done</a-button>
    </template>
  </a-alert>
  
  <a-alert
    message="Info Text"
    description="Info Description Info Description Info Description Info Description"
    type="info"
    closable
  >
    <template #action>
      <a-space>
        <a-button size="small" type="primary">Accept</a-button>
        <a-button size="small" danger type="ghost">Decline</a-button>
      </a-space>
    </template>
  </a-alert>
</template>
```

可以在右上角自定义操作项。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/alert-cn