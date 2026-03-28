# Breadcrumb 面包屑

## 概述

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## API

### Breadcrumb Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| itemRender | 自定义链接函数，和 vue-router 配置使用， 也可使用 #itemRender="props" | ({route, params, routes, paths}) => vNode | - | - |
| params | 路由的参数 | object | - | - |
| routes | router 的路由栈信息 | routes[] | - | - |
| separator | 分隔符自定义 | string \| slot | `/` | - |

### Breadcrumb.Item Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| href | 链接的目的地 | string | - | 1.5.0 |
| overlay | 下拉菜单的内容 | Menu \| () => Menu | - | 1.5.0 |

### Breadcrumb.Item 事件

| 事件名称 | 说明 | 回调参数 | 版本 |
|----------|------|----------|------|
| click | 单击事件 | (e:MouseEvent)=>void | 1.5.0 |

### Breadcrumb.Separator

分隔符组件，用于自定义面包屑分隔符。

> 注意：在使用 `Breadcrumb.Separator` 时，其父组件的分隔符必须设置为 `separator=""`，否则会出现父组件默认的分隔符。

### routes

```ts
interface Route {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
```

## 代码示例

### 基本用法

```vue
<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
</template>
```

最简单的用法。

### 带有图标的

```vue
<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <template #icon>
        <HomeOutlined />
      </template>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <a href="">
        <template #icon>
          <UserOutlined />
        </template>
        <span>Application List</span>
      </a>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <template #icon>
        <UserOutlined />
      </template>
      Application
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
```

图标放在文字前面。

### 自定义分隔符

```vue
<template>
  <a-breadcrumb separator="/">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item href="">Application Center</a-breadcrumb-item>
    <a-breadcrumb-item href="">Application List</a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
  
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-separator>/</a-breadcrumb-separator>
    <a-breadcrumb-item href="">Application Center</a-breadcrumb-item>
    <a-breadcrumb-separator>/</a-breadcrumb-separator>
    <a-breadcrumb-item href="">Application List</a-breadcrumb-item>
    <a-breadcrumb-separator>/</a-breadcrumb-separator>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
</template>
```

用 `separator="/"` 可以自定义分隔符，或者使用 `Breadcrumb.Separator` 自定义更复杂的分隔符。

### 带下拉菜单的面包屑

```vue
<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Ant Design Vue</a-breadcrumb-item>
    <a-breadcrumb-item href="">Component</a-breadcrumb-item>
    <a-breadcrumb-item :overlay="menu">
      <a href="">General</a>
    </a-breadcrumb-item>
    <a-breadcrumb-item>Button</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import { h } from 'vue';
import { Menu } from '@hwork/ant-design-vue';

const menu = h(Menu, {}, () => [
  h(Menu.Item, { key: '1' }, () => 'General'),
  h(Menu.Item, { key: '2' }, () => 'Layout'),
  h(Menu.Item, { key: '3' }, () => 'Navigation'),
]);
</script>
```

面包屑支持下拉菜单。

### 和 vue-router 配合使用

```vue
<template>
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route, params, routes, paths }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="paths.join('/')">
        {{ route.breadcrumbName }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script setup>
import { ref } from 'vue';

const routes = ref([
  {
    path: 'index',
    breadcrumbName: 'home',
  },
  {
    path: 'first',
    breadcrumbName: 'first',
    children: [
      {
        path: '/general',
        breadcrumbName: 'General',
      },
      {
        path: '/layout',
        breadcrumbName: 'Layout',
      },
      {
        path: '/navigation',
        breadcrumbName: 'Navigation',
      },
    ],
  },
  {
    path: 'second',
    breadcrumbName: 'second',
  },
]);
</script>
```

和 `vue-router` 进行结合使用。

## 和 browserHistory 配合

和 vue-router 一起使用时，默认生成的 url 路径是带有 `#` 的，如果和 browserHistory 一起使用的话，你可以使用 `itemRender` 属性定义面包屑链接。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/breadcrumb-cn
