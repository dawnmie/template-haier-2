# Tooltip 文字提示

## 概述

简单的文字提示气泡框。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式,始终展现,不会自动消失,用户可以点击关闭。

## API

```vue
<a-tooltip title="提示文字">
  <span>Tooltip will show when mouse enter.</span>
</a-tooltip>
```

### Tooltip

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 提示文字 | string \| slot | 无 |
| icon | 触发文案提示的 icon | slot | - |

### 共同的 API

以下 API 为 Tooltip、Popconfirm、Popover 共享的 API。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| align | 该值将合并到 placement 的配置中，设置参考 [dom-align](https://github.com/yiminghe/dom-align) | Object | 无 | - |
| arrowPointAtCenter | 箭头是否指向目标元素中心 | boolean | `false` | - |
| autoAdjustOverflow | 气泡被遮挡时自动调整位置 | boolean | `true` | - |
| color | 背景颜色 | string | 无 | - |
| destroyTooltipOnHide | 隐藏后是否销毁 tooltip | boolean | false | - |
| getPopupContainer | 浮层渲染父节点，默认渲染到 body 上 | (triggerNode: HTMLElement) => HTMLElement | () => document.body | - |
| height | 内容高度 | string \| number | - | - |
| maxHeight | 内容最大高度 | string \| number | 228 | - |
| mouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：秒 | number | 0.1 | - |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 | number | 0.1 | - |
| overlayClassName | 卡片类名 | string | 无 | - |
| overlayStyle | 卡片样式 | object | 无 | - |
| overlayInnerStyle | 卡片内容区域样式 | object | 无 | 4.0 |
| placement | 气泡框位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | top | - |
| trigger | 触发行为，可选 `hover/focus/click/contextmenu` | string | hover | - |
| open(v-model) | 用于手动控制浮层显隐, 小于 4.0.0 使用 `visible` | boolean | false | 4.0 |

### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
|---------|------|---------|------|
| openChange | 显示隐藏的回调 | (visible) => void | 4.0 |

## 代码示例

### 基本用法

```vue
<template>
  <a-tooltip title="prompt text">
    <span>Tooltip will show when mouse enter.</span>
  </a-tooltip>
</template>
```

最简单的用法。

### 箭头指向

```vue
<template>
  <div>
    <a-button @click="arrowPointAtCenter = !arrowPointAtCenter">
      {{ arrowPointAtCenter ? 'Arrow points to center / 箭头指向中心' : 'Align edge / 边缘对齐' }}
    </a-button>
    <a-tooltip title="prompt text" :arrow-point-at-center="arrowPointAtCenter">
      <a-button>Tooltip</a-button>
    </a-tooltip>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const arrowPointAtCenter = ref(false);
</script>
```

设置了 `arrowPointAtCenter` 后，箭头将指向目标元素的中心。

### 多彩文字提示

```vue
<template>
  <div>
    <h4>Presets</h4>
    <a-tooltip title="prompt text" color="pink">
      <a-button>pink</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="red">
      <a-button>red</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="yellow">
      <a-button>yellow</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="orange">
      <a-button>orange</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="cyan">
      <a-button>cyan</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="green">
      <a-button>green</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="blue">
      <a-button>blue</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="purple">
      <a-button>purple</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="geekblue">
      <a-button>geekblue</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="magenta">
      <a-button>magenta</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="volcano">
      <a-button>volcano</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="gold">
      <a-button>gold</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="lime">
      <a-button>lime</a-button>
    </a-tooltip>
    
    <h4>Custom</h4>
    <a-tooltip title="prompt text" color="#f50">
      <a-button>#f50</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="#2db7f5">
      <a-button>#2db7f5</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="#87d068">
      <a-button>#87d068</a-button>
    </a-tooltip>
    <a-tooltip title="prompt text" color="#108ee9">
      <a-button>#108ee9</a-button>
    </a-tooltip>
  </div>
</template>
```

我们添加了多种预设色彩的文字提示样式，用作不同场景使用。

### 位置

```vue
<template>
  <div class="demo">
    <div style="margin-left: 60px;">
      <a-tooltip placement="topLeft">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>TL</a-button>
      </a-tooltip>
      <a-tooltip placement="top">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>Top</a-button>
      </a-tooltip>
      <a-tooltip placement="topRight">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>TR</a-button>
      </a-tooltip>
    </div>
    <div style="width: 60px; float: left;">
      <a-tooltip placement="leftTop">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>LT</a-button>
      </a-tooltip>
      <a-tooltip placement="left">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>Left</a-button>
      </a-tooltip>
      <a-tooltip placement="leftBottom">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>LB</a-button>
      </a-tooltip>
    </div>
    <div style="width: 60px; margin-left: 270px;">
      <a-tooltip placement="rightTop">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>RT</a-button>
      </a-tooltip>
      <a-tooltip placement="right">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>Right</a-button>
      </a-tooltip>
      <a-tooltip placement="rightBottom">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>RB</a-button>
      </a-tooltip>
    </div>
    <div style="margin-left: 60px; clear: both;">
      <a-tooltip placement="bottomLeft">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>BL</a-button>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>Bottom</a-button>
      </a-tooltip>
      <a-tooltip placement="bottomRight">
        <template #title>
          <span>prompt text</span>
        </template>
        <a-button>BR</a-button>
      </a-tooltip>
    </div>
  </div>
</template>
```

位置有 12 个方向。

### 自动调整位置

```vue
<template>
  <div>
    <a-button @click="autoAdjustOverflow = !autoAdjustOverflow">
      {{ autoAdjustOverflow ? 'Adjust automatically / 自动调整' : 'Ingore / 不处理' }}
    </a-button>
    <br />
    <a-tooltip 
      title="prompt text" 
      placement="topLeft" 
      :auto-adjust-overflow="autoAdjustOverflow"
    >
      <a-button>Tooltip</a-button>
    </a-tooltip>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const autoAdjustOverflow = ref(true);
</script>
```

气泡框不可见时自动调整位置。

## 注意

请确保 `Tooltip` 的子元素能接受 `mouseenter`、`mouseleave`、`focus`、`click` 事件。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/tooltip-cn
