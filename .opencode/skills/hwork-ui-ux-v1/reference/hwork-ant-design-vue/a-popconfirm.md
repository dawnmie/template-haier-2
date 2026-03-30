# Popconfirm 气泡确认框

## 概述

点击元素,弹出气泡式的确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时,在目标元素附近弹出浮层提示,询问用户。和 confirm 弹出的全屏居中模态对话框相比,交互形式更轻量。

## API

### Props

| 参数              | 说明                                     | 类型           | 默认值                               | 版本 |
| ----------------- | ---------------------------------------- | -------------- | ------------------------------------ | ---- |
| cancelButton      | 完全自定义取消按钮                       | slot           | -                                    | 3.0  |
| cancelButtonProps | cancel 按钮 props                        | ButtonProps    | -                                    | -    |
| cancelText        | 取消按钮文字                             | string \| slot | `取消`                               | -    |
| disabled          | 点击 Popconfirm 子元素是否弹出气泡确认框 | boolean        | `false`                              | -    |
| icon              | 自定义弹出气泡 Icon 图标                 | vNode          | `<Icon type="exclamation-circle" />` | -    |
| okButton          | 完全自定义确认按钮                       | slot           | -                                    | 3.0  |
| okButtonProps     | ok 按钮 props                            | ButtonProps    | -                                    | -    |
| okText            | 确认按钮文字                             | string \| slot | `确定`                               | -    |
| okType            | 确认按钮类型                             | string         | `primary`                            | -    |
| showCancel        | 是否显示取消按钮                         | boolean        | `true`                               | 3.0  |
| title             | 确认框的描述                             | string \| slot | 无                                   | -    |
| description       | 确认内容的详细描述                       | string \| slot | -                                    | 4.0  |
| open (v-model)    | 是否显示                                 | boolean        | -                                    | 4.0  |

### 事件

| 事件名称   | 说明           | 回调参数       | 版本 |
| ---------- | -------------- | -------------- | ---- |
| cancel     | 点击取消的回调 | function(e)    | -    |
| confirm    | 点击确认的回调 | function(e)    | -    |
| openChange | 显示隐藏的回调 | function(open) | 4.0  |

更多属性请参考 [Tooltip](/components/tooltip-cn/#api)。

## 代码示例

### 基本用法

```vue
<template>
  <a-popconfirm
    title="Are you sure delete this task?"
    description="Are you sure delete this task?Are you sure delete this task?Are you sure delete this task?"
    ok-text="Yes"
    cancel-text="No"
    @confirm="confirm"
    @cancel="cancel"
  >
    <a href="#">Delete</a>
  </a-popconfirm>
</template>
<script lang="ts" setup>
import { message } from '@hwork/ant-design-vue'

const confirm = (e: MouseEvent) => {
  console.log(e)
  message.success('Click on Yes')
}

const cancel = (e: MouseEvent) => {
  console.log(e)
  message.error('Click on No')
}
</script>
```

最简单的用法。

### 自定义 Icon 图标

```vue
<template>
  <a-popconfirm title="Are you sure？">
    <template #icon> <h-icon-question-circle style="color: red" /></template>
    <a href="#">Delete</a>
  </a-popconfirm>
</template>
<script lang="ts" setup>
import '@hwork/icon/question-circle'
</script>
```

使用 `icon` 自定义提示 `icon`。

### 条件触发

```vue
<template>
  <div>
    <a-popconfirm
      title="Are you sure delete this task?"
      :open="visible"
      ok-text="Yes"
      cancel-text="No"
      @openChange="handleVisibleChange"
      @confirm="confirm"
      @cancel="cancel"
    >
      <a href="#">Delete a task</a>
    </a-popconfirm>
    <br />
    <br />
    Whether directly execute：
    <a-checkbox v-model:checked="condition" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from '@hwork/ant-design-vue'
const visible = ref<boolean>(false)
const condition = ref<boolean>(true)

const confirm = () => {
  visible.value = false
  message.success('Next step.')
}

const cancel = () => {
  visible.value = false
  message.error('Click on cancel.')
}

const handleVisibleChange = (bool: boolean) => {
  if (!bool) {
    visible.value = false
    return
  }
  // Determining condition before show the popconfirm.
  console.log(condition.value)
  if (condition.value) {
    confirm() // next step
  } else {
    visible.value = true
  }
}
</script>
```

可以判断是否需要弹出。

### 国际化

```vue
<template>
  <a-popconfirm title="Are you sure？" ok-text="Yes" cancel-text="No">
    <a href="#">Delete</a>
  </a-popconfirm>
</template>
```

使用 `okText` 和 `cancelText` 自定义按钮文字。

### 位置

```vue
<template>
  <div id="components-a-popconfirm-demo-placement">
    <div :style="{ marginLeft: `${buttonWidth}px`, whiteSpace: 'nowrap' }">
      <a-popconfirm placement="topLeft" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>TL</a-button>
      </a-popconfirm>
      <a-popconfirm placement="top" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>Top</a-button>
      </a-popconfirm>
      <a-popconfirm placement="topRight" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>TR</a-button>
      </a-popconfirm>
    </div>
    <div :style="{ width: `${buttonWidth}px`, float: 'left' }">
      <a-popconfirm placement="leftTop" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>LT</a-button>
      </a-popconfirm>
      <a-popconfirm placement="left" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>Left</a-button>
      </a-popconfirm>
      <a-popconfirm placement="leftBottom" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>LB</a-button>
      </a-popconfirm>
    </div>
    <div :style="{ width: `${buttonWidth}px`, marginLeft: `${buttonWidth * 4 + 24}px` }">
      <a-popconfirm placement="rightTop" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>RT</a-button>
      </a-popconfirm>
      <a-popconfirm placement="right" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>Right</a-button>
      </a-popconfirm>
      <a-popconfirm placement="rightBottom" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>RB</a-button>
      </a-popconfirm>
    </div>
    <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
      <a-popconfirm placement="bottomLeft" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>BL</a-button>
      </a-popconfirm>
      <a-popconfirm placement="bottom" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>Bottom</a-button>
      </a-popconfirm>
      <a-popconfirm placement="bottomRight" ok-text="Yes" cancel-text="No" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
          <p>{{ text }}</p>
        </template>
        <a-button>BR</a-button>
      </a-popconfirm>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { message } from '@hwork/ant-design-vue'
const buttonWidth = 70

const text = 'Are you sure to delete this task?'

const confirm = () => {
  message.info('Clicked on Yes.')
}
</script>
<style scoped>
:deep(#components-a-popconfirm-demo-placement) .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
```

位置有十二个方向。如需箭头指向目标元素中心,可以设置 `arrowPointAtCenter`。

### 基于 Promise 的异步关闭 (3.0+)

```vue
<template>
  <a-popconfirm title="Title" @confirm="confirm" @cancel="cancel">
    <a-button type="primary">Open Popconfirm with Promise</a-button>
  </a-popconfirm>
</template>
<script lang="ts" setup>
import { message } from '@hwork/ant-design-vue'
const confirm = (e: MouseEvent) => {
  console.log(e)
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 3000)
  })
}

const cancel = (e: MouseEvent) => {
  console.log(e)
  message.error('Click on No')
}
</script>
```

点击确定后异步关闭 Popconfirm,例如提交表单。

## 注意

请确保 Popconfirm 的子元素能接受 `mouseenter`、`mouseleave`、`focus`、`click` 事件。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/popconfirm-cn
