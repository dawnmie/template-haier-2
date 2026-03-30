# Empty 空状态

## 概述

空状态时的展示占位图。

## 何时使用

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| description | 自定义描述内容 | string \| v-slot | - | - |
| image | 设置显示图片，为 string 时表示自定义图片地址 | string \| v-slot | `false` | - |
| imageStyle | 图片样式 | CSSProperties | - | - |

## 代码示例

### 基本用法

```vue
<template>
  <a-empty />
</template>
```

简单的展示。

### 自定义

```vue
<template>
  <a-empty>
    <template #image>
      <img src="custom-image.svg" />
    </template>
    <template #description>
      <span>Customize Description</span>
    </template>
    <a-button type="primary">Create Now</a-button>
  </a-empty>
</template>
```

自定义图片、描述、附属内容。

### 无描述

```vue
<template>
  <a-empty :description="false" />
</template>
```

无描述展示。

### 全局化配置

```vue
<template>
  <a-config-provider>
    <template #renderEmpty>
      <a-empty>
        <template #image>
          <img src="custom-empty.svg" />
        </template>
      </a-empty>
    </template>
    <!-- 其他组件 -->
  </a-config-provider>
</template>
```

自定义全局组件的 Empty 样式。

## 内置图片

Empty 组件提供了多种内置的空状态图片：

- `Empty.PRESENTED_IMAGE_DEFAULT` - 默认图片
- `Empty.PRESENTED_IMAGE_SIMPLE` - 简单图片

```vue
<template>
  <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" />
</template>

<script setup>
import { Empty } from '@hwork/ant-design-vue';
</script>
```

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/empty-cn
