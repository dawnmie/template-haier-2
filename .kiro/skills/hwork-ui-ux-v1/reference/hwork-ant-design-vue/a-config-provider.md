# ConfigProvider 全局化配置

## 概述

为组件提供统一的全局化配置。

## 何时使用

为组件提供统一的全局化配置。

## 使用

ConfigProvider 使用 Vue 的 [provide / inject](https://vuejs.org/v2/api/#provide-inject) 特性，只需在应用外围包裹一次即可全局生效。

```vue
<template>
  <a-config-provider
    :locale="zhCN"
    :get-popup-container="getPopupContainer"
    :get-target-container="getPopupContainer"
    :theme="{
      token: {
        zIndexPopupBase: 2100,
      }
    }"
  >
    <a-app>
      <router-view />
    </a-app>
  </a-config-provider>
</template>

<script setup>
import zhCN from '@hwork/ant-design-vue/es/locale/zh_CN';
import { message, Modal, notification } from '@hwork/ant-design-vue';

function getPopupContainer() {
  return document.body.querySelector('#app');
}

message.config({
  top: '58px',
  getContainer: getPopupContainer,
});

Modal.config({
  getContainer: getPopupContainer,
});

notification.config({
  getContainer: getPopupContainer,
});
</script>

<style>
#app {
  /* 用于解决 select 等 popup 在页面滚动时不跟随输入框的问题 */
  position: relative;
}
</style>
```

### Content Security Policy

部分组件为了支持波纹效果，使用了动态样式。如果开启了 Content Security Policy (CSP)，你可以通过 `csp` 属性来进行配置：

```vue
<a-config-provider :csp="{ nonce: 'YourNonceCode' }">
  <a-button>My Button</a-button>
</a-config-provider>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| autoInsertSpaceInButton | 设置为 `false` 时，移除按钮中 2 个汉字之间的空格 | boolean | `false` | - |
| componentSize | 设置 antd 组件大小 | `small` \| `middle` \| `large` | - | 3.0 |
| csp | 设置 [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 配置 | `{ nonce: string }` | - | - |
| direction | 设置文本展示方向 | `ltr` \| `rtl` | `ltr` | 3.0 |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。`false` 时会关闭虚拟滚动 | boolean \| number | - | - |
| select | 设置 Select 组件的通用属性 | `{ showSearch?: boolean, maxTagCount?: number \| responsive }` | - | - |
| cascader | 设置 Cascader 组件的通用属性 | `{ maxTagCount?: number \| responsive }` | - | - |
| treeSelect | 设置 TreeSelect 组件的通用属性 | `{ maxTagCount?: number \| responsive }` | - | - |
| form | 设置 Form 组件的通用属性 | `{ validateMessages?: ValidateMessages, requiredMark?: boolean \| optional, colon?: boolean }` | - | 3.0 |
| modal | 设置 Modal 组件的通用属性，注：仅 Modal 组件可用，Modal.methods 不可使用 | `{ maskClosable?: boolean }` | - | - |
| drawer | 设置 Drawer 组件的通用属性 | `{ maskClosable?: boolean }` | - | - |
| getPopupContainer | 弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上 | Function(triggerNode, dialogContext) | `() => document.body` | - |
| getTargetContainer | 配置 Affix、Anchor 滚动监听容器 | `() => HTMLElement` | `() => window` | 3.0 |
| input | 设置 Input 组件的通用属性 | `{ autocomplete?: string, formatter?: (value: string) => string, deprecatedTextareaAllowClear?: boolean }` | - | 3.0 |
| locale | 语言包配置，语言包可到 [ant-design-vue/es/locale](http://unpkg.com/ant-design-vue/es/locale/) 目录下寻找 | object | `zhCN` | 1.5.0 |
| pageHeader | 统一设置 pageHeader 的 ghost | `{ ghost: boolean }` | `true` | 1.5.0 |
| prefixCls | 设置统一样式前缀。注意：需要配合 `less` 变量 `@ant-prefix` 使用 | string | `ant` | - |
| renderEmpty | 自定义组件空状态 | slot \| Function(componentName: string): VNode | - | - |
| space | 设置 Space 的 `size` | `{ size: small \| middle \| large \| number }` | - | 3.0 |
| transformCellText | Table 数据渲染前可以再次改变，一般用户空数据的默认配置 | Function({ text, column, record, index }) => any | - | 1.5.4 |
| virtual | 设置 `false` 时关闭虚拟滚动 | boolean | - | 3.0 |
| wave | 设置水波纹特效 | `{ disabled?: boolean }` | - | 4.0.7 |

### ConfigProvider.config() `3.0.0+`

设置 `Modal`、`Message`、`Notification` rootPrefixCls。

```js
ConfigProvider.config({
  prefixCls: 'ant',
});
```

或

```js
// 如下配置支持响应式数据，你可以通过 prefixCls.value = 'other' 直接改变
const prefixCls = ref('ant');
ConfigProvider.config({
  prefixCls,
});
```

## FAQ

### 为什么我使用了 ConfigProvider `locale`，时间类组件的国际化还有问题？

请检查是否设置了 `dayjs.locale('zh-cn')`，或者是否有两个版本的 dayjs 共存。

### 配置 `getPopupContainer` 导致 Modal 报错？

当如下全局设置 `getPopupContainer` 为触发节点的 parentNode 时，由于 Modal 的用法不存在 `triggerNode`，这样会导致 `triggerNode is undefined` 的报错，需要增加一个判断条件。

```jsx
<ConfigProvider
-  getPopupContainer={triggerNode => triggerNode.parentNode}
+  getPopupContainer={node => {
+    if (node) {
+      return node.parentNode;
+    }
+    return document.body;
+  }}
>
  <App />
</ConfigProvider>
```

### 为什么 message.info、notification.open 或 Modal.confirm 等方法内的 VueNode 无法继承 ConfigProvider 的属性？比如 `prefixCls` 和 `theme`。

静态方法是使用 Vue.render 重新渲染一个 Vue 根节点上，和主应用的 Vue 节点是脱离的。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/config-provider-cn
