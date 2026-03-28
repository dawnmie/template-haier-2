# Skeleton 骨架屏

## 概述

在需要等待加载内容的位置提供一个占位图形组合。

## 何时使用

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只在第一次加载数据的时候使用。
- 可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验。

## API

### Skeleton

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| active | 是否展示动画效果 | boolean | `false` |
| avatar | 是否显示头像占位图 | boolean \| SkeletonAvatarProps | `false` |
| loading | 为 `true` 时，显示占位图。反之则直接展示子组件 | boolean | - |
| paragraph | 是否显示段落占位图 | boolean \| SkeletonParagraphProps | `true` |
| title | 是否显示标题占位图 | boolean \| SkeletonTitleProps | `true` |
| form | 是否为表单占位图，注：开启后 `avatar`、`paragraph`、`title` 属性将会失效 | boolean | `false` |

### SkeletonAvatarProps

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| shape | 指定头像的形状 | `circle` \| `square` | - |
| size | 设置头像占位图的大小 | number \| `large` \| `small` \| `default` | - |

### SkeletonTitleProps

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 设置标题占位图的宽度 | number \| string | - |

### SkeletonParagraphProps

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| rows | 设置段落占位图的行数 | number | - |
| width | 设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度 | number \| string \| Array<number \| string> | - |

### SkeletonButtonProps (3.0+)

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| active | 是否展示动画效果 | boolean | `false` | - |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | `false` | - |
| shape | 指定按钮的形状 | `circle` \| `round` \| `default` | - | - |
| size | 设置按钮的大小 | `large` \| `small` \| `default` | - | - |

### SkeletonInputProps (3.0+)

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| active | 是否展示动画效果 | boolean | `false` |
| size | 设置输入框的大小 | `large` \| `small` \| `default` | - |

## 代码示例

### 基本用法

```vue
<template>
  <a-skeleton />
</template>
```

最简单的占位效果。

### 复杂的组合

```vue
<template>
  <a-skeleton avatar :paragraph="{ rows: 4 }" />
</template>
```

更复杂的组合。

### 动画效果

```vue
<template>
  <a-skeleton active />
</template>
```

显示动画效果。

### 包含子组件

```vue
<template>
  <a-skeleton :loading="loading">
    <div>
      <h4>Ant Design Vue, a design language</h4>
      <p>
        We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), 
        to help people create their product prototypes beautifully and efficiently.
      </p>
    </div>
  </a-skeleton>
  <a-button @click="loading = !loading">
    {{ loading ? 'Show Content' : 'Show Skeleton' }}
  </a-button>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
```

加载占位图包含子组件。

### 列表

```vue
<template>
  <a-switch v-model:checked="loading" />
  <a-list item-layout="vertical" :data-source="list">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-skeleton :loading="loading" active avatar>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a :href="item.href">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.avatar" />
            </template>
          </a-list-item-meta>
          {{ item.content }}
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
</template>
```

在列表组件中使用加载占位符。

### 按钮/头像/输入框/图像

```vue
<template>
  <div>
    <a-skeleton-button :active="active" :size="size" :shape="buttonShape" :block="block" />
    <a-skeleton-avatar :active="active" :size="size" :shape="avatarShape" />
    <a-skeleton-input :active="active" :size="size" />
  </div>
</template>
```

骨架按钮、头像、输入框和图像。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/skeleton-cn
