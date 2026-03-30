# PageLayout 通用布局

## 概述

H-work 标准页面布局实现。

## 何时使用

H-work 标准页面布局实现。

## API

### PageLayout Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| header | 自定义 PageHeader | slot | - | - |
| title | 标题文字 | string \| slot | - | - |
| subTitle | 二级标题文字 | string \| slot | - | - |
| extra | 操作区内容，位于 PageHeader 的行尾 | slot | - | - |
| back | 是否展示返回上一页的按钮 | boolean | - | - |
| onBack | 自定义点击返回按钮时的处理逻辑，默认将返回上一页 | () => void | - | - |
| loading | 是否进入页面内容 loading 状态，不包括页头 | boolean | - | - |
| top | 页头 PageHeader 距离页面顶部的距离，默认情况将自行检测，但也可手动传入 | string \| number | - | - |
| mixin | 是否融合展示页面内容 | boolean | - | - |
| scroll | 设置滚动的容器，可选：page（默认，页面层级）、content（内容层级）。当作为插槽使用时可以自定义滚动容器 | page \| content \| v-slot:scroll="{ content: VNode }" | - | - |
| skeleton | 是否展示骨架屏，组件提供了 3 种预设：details（详情页，默认）、form（表单页）、card（卡片列表） | boolean \| slot \| details \| form \| card | - | - |
| background | 设置页面内容容器的背景色 | string | - | - |

### PageLayout 事件

| 事件名称 | 说明 | 类型 |
|----------|------|------|
| scroll | 当触发滚动事件时，返回滚动的距离 | (event: Event) => void |

### PageLayout 方法

| 名称 | 描述 | 类型 |
|------|------|------|
| backTop | 滚动到内容顶部，注意：自定义布局时不可使用 | () => void |

### PageCard Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| title | 标题文字 | string \| slot | - | - |
| background | 卡片背景色 | string | "#ffffff" | - |

## 代码示例

### 基本用法

```vue
<template>
  <a-page-layout
    title="页面标题"
    sub-title="页面副标题"
  >
    <a-page-card title="卡片标题">
      <!-- 页面内容 -->
    </a-page-card>
  </a-page-layout>
</template>
```

### 带返回按钮

```vue
<template>
  <a-page-layout
    title="页面标题"
    back
    @back="handleBack"
  >
    <a-page-card title="卡片标题">
      <!-- 页面内容 -->
    </a-page-card>
  </a-page-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleBack = () => {
  router.back();
};
</script>
```

### 自定义页头操作区

```vue
<template>
  <a-page-layout title="页面标题">
    <template #extra>
      <a-button type="primary">新建</a-button>
      <a-button>导出</a-button>
    </template>
    
    <a-page-card title="卡片标题">
      <!-- 页面内容 -->
    </a-page-card>
  </a-page-layout>
</template>
```

### 加载状态

```vue
<template>
  <a-page-layout
    title="页面标题"
    :loading="loading"
  >
    <a-page-card title="卡片标题">
      <!-- 页面内容 -->
    </a-page-card>
  </a-page-layout>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(true);

// 模拟数据加载
setTimeout(() => {
  loading.value = false;
}, 2000);
</script>
```

### 自定义骨架屏

```vue
<template>
  <a-page-layout
    title="页面标题"
    skeleton="form"
  >
    <a-page-card title="表单">
      <!-- 表单内容 -->
    </a-page-card>
  </a-page-layout>
</template>
```

### 分屏视图

```vue
<template>
  <a-page-layout title="分屏视图">
    <template #scroll="{ content }">
      <div class="split-view">
        <a-scrollbar class="left-panel">
          <component :is="content" />
        </a-scrollbar>
        <a-scrollbar class="right-panel">
          <!-- 右侧面板内容 -->
        </a-scrollbar>
      </div>
    </template>
    
    <a-page-card title="左侧内容">
      <!-- 左侧内容 -->
    </a-page-card>
  </a-page-layout>
</template>

<style scoped>
.split-view {
  display: flex;
  height: 100%;
}

.left-panel,
.right-panel {
  flex: 1;
}
</style>
```

## 注意事项

1. 使用 scroll 插槽自定义布局时，无法使用组件的 backTop 方法
2. 自定义布局时需要自行处理滚动条样式（可使用 Scrollbar 组件）
3. 自定义布局时需要使用 ConfigProvider 来处理内容弹出层插入位置等问题
4. skeleton 属性提供了 3 种预设：details（详情页）、form（表单页）、card（卡片列表）

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/page-layout-cn