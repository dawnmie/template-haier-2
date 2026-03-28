# Anchor 锚点

## 概述

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接,以及快速在锚点之间跳转。

## API

### Anchor Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| affix | 固定模式 | boolean | `true` | - |
| bounds | 锚点区域边界 | number | `5(px)` | - |
| getContainer | 指定滚动的容器 | () => HTMLElement | `() => window` | - |
| getCurrentAnchor | 自定义高亮的锚点 | (activeLink: string) => string | - | 3.3 |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number | - | - |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number | - | - |
| showInkInFixed | `:affix="false"` 时是否显示小方块 | boolean | `false` | - |
| targetOffset | 锚点滚动偏移量,默认与 offsetTop 相同 | number | `offsetTop` | 1.5.0 |
| wrapperClass | 容器的类名 | string | - | - |
| wrapperStyle | 容器样式 | object | - | - |
| items | 数据化配置选项内容,支持通过 children 嵌套 | { key, href, title, target, children }[] | - | 4.0 |
| direction | 设置导航方向 | `vertical` \| `horizontal` | `vertical` | 4.0 |
| customTitle | 使用插槽自定义选项 title | v-slot="AnchorItem" | - | 4.0 |

### AnchorItem

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| key | 唯一标志 | string \| number | - | - |
| href | 锚点链接 | string | - | - |
| target | 该属性指定在何处显示链接的资源 | string | - | - |
| title | 文字内容 | VueNode \| (item: AnchorItem) => VueNode | - | - |
| children | 嵌套的 Anchor Link,注意:水平方向该属性不支持 | AnchorItem[] | - | - |

### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
|----------|------|----------|------|
| change | 监听锚点链接改变 | (currentActiveLink: string) => void | 1.5.0 |
| click | click 事件的 handler | Function(e: MouseEvent, link: Object) | - |

### Link Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| href | 锚点链接 | string | - | - |
| target | 该属性指定在何处显示链接的资源 | string | - | 1.5.0 |
| title | 文字内容 | string \| slot | - | - |

## 代码示例

### 基本使用

```vue
<template>
  <a-anchor
    :items="[
      {
        key: 'part-1',
        href: '#part-1',
        title: 'Part 1',
      },
      {
        key: 'part-2',
        href: '#part-2',
        title: 'Part 2',
      },
      {
        key: 'part-3',
        href: '#part-3',
        title: 'Part 3',
      },
    ]"
  />
</template>
```

最简单的用法。

### 静态位置

```vue
<template>
  <a-anchor
    :affix="false"
    :items="[
      {
        key: '1',
        href: '#components-anchor-demo-basic',
        title: 'Basic demo',
      },
      {
        key: '2',
        href: '#components-anchor-demo-static',
        title: 'Static demo',
      },
      {
        key: '3',
        href: '#api',
        title: 'API',
        children: [
          {
            key: '4',
            href: '#anchor-props',
            title: 'Anchor Props',
          },
          {
            key: '5',
            href: '#link-props',
            title: 'Link Props',
          },
        ],
      },
    ]"
  />
</template>
```

不浮动,状态不随页面滚动变化。

### 自定义锚点高亮

```vue
<template>
  <a-anchor
    :affix="false"
    :get-current-anchor="getCurrentAnchor"
    :items="[
      {
        key: '1',
        href: '#components-anchor-demo-basic',
        title: 'Basic demo',
      },
      {
        key: '2',
        href: '#components-anchor-demo-static',
        title: 'Static demo',
      },
    ]"
  />
</template>
<script lang="ts" setup>
const getCurrentAnchor = () => {
  return '#components-anchor-demo-static';
};
</script>
```

自定义锚点高亮。

### 监听锚点链接改变

```vue
<template>
  <a-anchor
    :affix="false"
    :items="items"
    @change="onChange"
  />
</template>
<script lang="ts" setup>
const onChange = (link: string) => {
  console.log('Anchor:OnChange', link);
};
</script>
```

监听锚点链接改变。

### 横向 Anchor

```vue
<template>
  <div style="padding: 20px">
    <a-anchor
      direction="horizontal"
      :items="[
        {
          key: 'horizontally-part-1',
          href: '#horizontally-part-1',
          title: 'Part 1',
        },
        {
          key: 'horizontally-part-2',
          href: '#horizontally-part-2',
          title: 'Part 2',
        },
        {
          key: 'horizontally-part-3',
          href: '#horizontally-part-3',
          title: 'Part 3',
        },
      ]"
    />
  </div>
</template>
```

横向 Anchor。

### 自定义 click 事件

```vue
<template>
  <a-anchor
    :affix="false"
    :items="items"
    @click="handleClick"
  />
</template>
<script lang="ts" setup>
import type { AnchorProps } from '@hwork/ant-design-vue';
const handleClick: AnchorProps['onClick'] = (e, link) => {
  e.preventDefault();
  console.log(link);
};
</script>
```

点击锚点不记录历史。

### 设置锚点滚动偏移量

```vue
<template>
  <a-anchor
    :target-offset="targetOffset"
    :items="items"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const targetOffset = ref<number | undefined>(undefined);
onMounted(() => {
  targetOffset.value = window.innerHeight / 2;
});
</script>
```

锚点目标滚动到屏幕正中间。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/anchor-cn