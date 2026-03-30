# Image 图片

## 概述

可预览的图片。

## 何时使用

- 需要展示图片时使用。
- 加载大图时显示 loading 或加载失败时容错处理。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| alt | 图像描述 | string | - | 2.0.0 |
| fallback | 加载失败容错地址 | string | - | 2.0.0 |
| height | 图像高度 | string \| number | - | 2.0.0 |
| placeholder | 加载占位, 为 `true` 时使用默认占位 | boolean \| slot | - | 2.0.0 |
| preview | 预览参数，为 `false` 时禁用 | boolean \| [previewType](#previewtype) | true | 2.0.0 |
| src | 图片地址 | string | - | 2.0.0 |
| previewMask | 自定义 mask | false \| function \| slot | - | 3.2.0 |
| width | 图像宽度 | string \| number | - | 2.0.0 |

### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
|----------|------|----------|------|
| error | 加载错误回调 | (event: Event) => void | 3.2.0 |

### previewType

```typescript
{
  visible?: boolean;
  onVisibleChange?: (visible, prevVisible) => void;
  // 若 configProvider.getPopupContainer 已经设置，则此处默认将使用其指示的位置
  getContainer: string | HTMLElement | (() => HTMLElement);
  src?: string;
  maskClassName?: string;
  current?: number;
  // 开启后将不再渲染图片，适用于纯粹的受控预览
  hideImage?: number;
  customTools?: (
    | 'rotateLeft'
    | 'rotateRight'
    | 'zoomIn'
    | 'zoomOut'
    | 'flipX'
    | 'flipY'
    | 'download'
    | {
        icon: VNode;
        disabled?: (data: { src: string; alt: string }) => boolean;
        onClick: (data: { src: string; alt: string }) => void;
      }
  )[];
}
```

其他属性见 [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

## 代码示例

### 基本用法

```vue
<template>
  <a-image
    width="200"
    src="https://example.com/image.jpg"
  />
</template>
```

单击图像可以放大显示。

### 渐进加载

```vue
<template>
  <a-image
    width="200"
    :placeholder="true"
    src="https://example.com/large-image.jpg"
  />
</template>
```

大图使用 placeholder 渐进加载。

### 容错处理

```vue
<template>
  <a-image
    width="200"
    src="https://example.com/error.jpg"
    fallback="https://example.com/fallback.jpg"
  />
</template>
```

加载失败显示图像占位符。

### 多张图片预览

```vue
<template>
  <a-image-preview-group>
    <a-image
      width="200"
      src="https://example.com/image1.jpg"
    />
    <a-image
      width="200"
      src="https://example.com/image2.jpg"
    />
    <a-image
      width="200"
      src="https://example.com/image3.jpg"
    />
  </a-image-preview-group>
</template>
```

点击左右切换按钮可以预览多张图片。

### 受控的预览

```vue
<template>
  <a-button @click="visible = true">显示图片预览</a-button>
  <a-image
    :preview="{ visible, onVisibleChange: vis => visible = vis }"
    width="200"
    src="https://example.com/image.jpg"
  />
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>
```

可以使预览受控。如果你需要自定义预览控制区域的按钮，可使用 `preview.customTools` 属性。

### 自定义预览图片

```vue
<template>
  <a-image
    width="200"
    src="https://example.com/thumbnail.jpg"
    :preview="{ src: 'https://example.com/full-size.jpg' }"
  />
</template>
```

可以设置不同的预览图片。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/image-cn
