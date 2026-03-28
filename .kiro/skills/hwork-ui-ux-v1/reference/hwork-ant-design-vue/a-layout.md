# Layout 布局

## 何时使用

协助进行页面级整体布局。

## 设计规则

### 尺寸

一级导航项偏左靠近 logo 放置,辅助菜单偏右放置。

- 顶部导航(大部分系统):一级导航高度 `64px`,二级导航 `48px`。
- 顶部导航(展示类页面):一级导航高度 `80px`,二级导航 `56px`。
- 顶部导航高度的范围计算公式为:`48+8n`。
- 侧边导航宽度的范围计算公式:`200+8n`。

### 交互

- 一级导航和末级的导航需要在可视化的层面被强调出来;
- 当前项应该在呈现上优先级最高;
- 当导航收起的时候,当前项的样式自动赋予给它的上一个层级;
- 左侧导航栏的收放交互同时支持手风琴和全展开的样式,根据业务的要求进行适当的选择。

### 视觉

导航样式上需要根据信息层级合理的选择样式:

- **大色块强调**: 建议用于底色为深色系时,当前页面父级的导航项。
- **高亮火柴棍**: 当导航栏底色为浅色系时使用,可用于当前页面对应导航项,建议尽量在导航路径的最终项使用。
- **字体高亮变色**: 从可视化层面,字体高亮的视觉强化力度低于大色块,通常在当前项的上一级使用。
- **字体放大**: `12px`、`14px` 是导航的标准字号,14 号字体用在一、二级导航中。字号可以考虑导航项的等级做相应选择。

## 组件概述

- `Layout`:布局容器,其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身,可以放在任何父容器中。
- `Header`:顶部布局,自带默认样式,其下可嵌套任何元素,只能放在 `Layout` 中。
- `Sider`:侧边栏,自带默认样式及基本功能,其下可嵌套任何元素,只能放在 `Layout` 中。
- `Content`:内容部分,自带默认样式,其下可嵌套任何元素,只能放在 `Layout` 中。
- `Footer`:底部布局,自带默认样式,其下可嵌套任何元素,只能放在 `Layout` 中。

> 注意:采用 flex 布局实现,请注意浏览器兼容性问题。

## API

```vue
<Layout>
  <Header>header</Header>
  <Layout>
    <Sider>left sidebar</Sider>
    <Content>main content</Content>
    <Sider>right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>
```

### Layout

布局容器。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| class | 容器 class | string | - |
| hasSider | 表示子元素里有 Sider,一般不用指定。可用于服务端渲染时避免样式闪动 | boolean | - |
| style | 指定样式 | object | - |

### Layout.Sider

侧边栏。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| breakpoint | 触发响应式布局的断点 | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `xxl` | - | - |
| class | 容器 class | string | - | - |
| collapsed(v-model) | 当前收起状态 | boolean | - | - |
| collapsedWidth | 收缩宽度,设置为 0 会出现特殊 trigger | number | 80 | - |
| collapsible | 是否可收起 | boolean | false | - |
| defaultCollapsed | 是否默认收起 | boolean | false | - |
| reverseArrow | 翻转折叠提示箭头的方向,当 Sider 在右边时可以使用 | boolean | false | - |
| style | 指定样式 | object\|string | - | - |
| theme | 主题颜色 | `light` \| `dark` | `dark` | - |
| trigger | 自定义 trigger,设置为 null 时隐藏 trigger | string\|slot | - | - |
| width | 宽度 | number\|string | 200 | - |
| zeroWidthTriggerStyle | 指定当 collapsedWidth 为 0 时出现的特殊 trigger 的样式 | object | - | 1.5.0 |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| breakpoint | 触发响应式布局断点时的回调 | (broken) => {} |
| collapse | 展开-收起时的回调函数,有点击 trigger 以及响应式反馈两种方式可以触发 | (collapsed, type) => {} |

#### breakpoint width

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
  xxxl: '2000px',
}
```

## 使用示例

### 基本结构

典型的页面布局。

```vue
<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>

    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider>Sider</a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>

    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-content>Content</a-layout-content>
        <a-layout-sider>Sider</a-layout-sider>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>

    <a-layout>
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout>
        <a-layout-header>Header</a-layout-header>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-space>
</template>
```

### 上中下布局

最基本的『上-中-下』布局。一般主导航放置于页面的顶端,从左自右依次为:logo、一级导航项、辅助菜单(用户、设置、通知等)。

```vue
<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">Content</div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
```

### 侧边布局

侧边两列式布局。页面横向空间有限时,侧边导航可收起。侧边导航在页面布局上采用的是左右的结构,一般主导航放置于页面的左侧固定位置,辅助菜单放置于工作区顶部。

```vue
<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
```

### 自定义触发器

要使用自定义触发器,可以设置 `:trigger="null"` 来隐藏默认设定。

```vue
<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
```

### 响应式布局

Layout.Sider 支持响应式布局。配置 `breakpoint` 属性即生效,视窗宽度小于 `breakpoint` 时 Sider 缩小为 `collapsedWidth` 宽度,若将 `collapsedWidth` 设置为零,会出现特殊 trigger。

```vue
<template>
  <a-layout>
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">content</div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
```
