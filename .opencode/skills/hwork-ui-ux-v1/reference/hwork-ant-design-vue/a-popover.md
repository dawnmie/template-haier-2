# Popover 气泡卡片

## 概述

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时,可以收纳到卡片中,根据用户的操作行为进行展现。

和 `Tooltip` 的区别是,用户可以对浮层上的元素进行操作,因此它可以承载更复杂的内容,比如链接或按钮等。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| content | 卡片内容 | string \| slot \| VNode | - | - |
| title | 卡片标题 | string \| slot \| VNode | - | - |
| maxHeight | 内容最大高度 | string \| number | - | - |

更多属性请参考 [Tooltip](/components/tooltip-cn/#api)。

## 代码示例

### 基本用法

```vue
<template>
  <a-popover title="Title" content="Content">
    <a-button>Hover me</a-button>
  </a-popover>
</template>
```

最简单的用法,浮层的大小由内容区域决定。

### 位置

```vue
<template>
  <div>
    <a-popover placement="topLeft" title="Title" content="Content">
      <a-button>TL</a-button>
    </a-popover>
    <a-popover placement="top" title="Title" content="Content">
      <a-button>Top</a-button>
    </a-popover>
    <a-popover placement="topRight" title="Title" content="Content">
      <a-button>TR</a-button>
    </a-popover>
    <a-popover placement="leftTop" title="Title" content="Content">
      <a-button>LT</a-button>
    </a-popover>
    <a-popover placement="left" title="Title" content="Content">
      <a-button>Left</a-button>
    </a-popover>
    <a-popover placement="leftBottom" title="Title" content="Content">
      <a-button>LB</a-button>
    </a-popover>
    <a-popover placement="rightTop" title="Title" content="Content">
      <a-button>RT</a-button>
    </a-popover>
    <a-popover placement="right" title="Title" content="Content">
      <a-button>Right</a-button>
    </a-popover>
    <a-popover placement="rightBottom" title="Title" content="Content">
      <a-button>RB</a-button>
    </a-popover>
    <a-popover placement="bottomLeft" title="Title" content="Content">
      <a-button>BL</a-button>
    </a-popover>
    <a-popover placement="bottom" title="Title" content="Content">
      <a-button>Bottom</a-button>
    </a-popover>
    <a-popover placement="bottomRight" title="Title" content="Content">
      <a-button>BR</a-button>
    </a-popover>
  </div>
</template>
```

位置有十二个方向。

### 箭头指向

```vue
<template>
  <div>
    <a-popover placement="topLeft" title="Title" content="Content">
      <a-button>Align edge / 边缘对齐</a-button>
    </a-popover>
    <a-popover 
      placement="topLeft" 
      title="Title" 
      content="Content"
      arrow-point-at-center
    >
      <a-button>Arrow points to center / 箭头指向中心</a-button>
    </a-popover>
  </div>
</template>
```

设置了 `arrowPointAtCenter` 后,箭头将指向目标元素的中心。

### 三种触发方式

```vue
<template>
  <div>
    <a-popover title="Title" content="Content" trigger="hover">
      <a-button>Hover me</a-button>
    </a-popover>
    <a-popover title="Title" content="Content" trigger="focus">
      <a-button>Focus me</a-button>
    </a-popover>
    <a-popover title="Title" content="Content" trigger="click">
      <a-button>Click me</a-button>
    </a-popover>
  </div>
</template>
```

鼠标移入、聚集、点击。

### 从浮层内关闭

```vue
<template>
  <a-popover 
    v-model:visible="visible" 
    title="Title" 
    trigger="click"
  >
    <template #content>
      <p>Content</p>
      <a-button @click="hide">Close</a-button>
    </template>
    <a-button>Click me</a-button>
  </a-popover>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);

const hide = () => {
  visible.value = false;
};
</script>
```

使用 `visible` 属性控制浮层显示。

### 悬停点击弹出窗口

```vue
<template>
  <a-popover 
    v-model:visible="visible"
    title="Title"
    content="Content"
    trigger="click"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <a-button>Hover and click / 悬停并单击</a-button>
  </a-popover>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const hovered = ref(false);

const handleMouseEnter = () => {
  hovered.value = true;
};

const handleMouseLeave = () => {
  hovered.value = false;
  if (!visible.value) {
    visible.value = false;
  }
};
</script>
```

以下示例显示如何创建可悬停和单击的弹出窗口。

## 注意

请确保 `Popover` 的子元素能接受 `mouseenter`、`mouseleave`、`focus`、`click` 事件。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/popover-cn
