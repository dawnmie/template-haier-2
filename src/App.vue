<template>
  <StyleProvider :hash-priority="hashPriority">
    <ConfigProvider :locale="zhCN" :get-popup-container="getPopupContainer" :namespace="name">
      <div v-if="pageLoading" class="auth-boot">
        <a-spin size="large" tip="加载中…" />
      </div>
      <router-view v-else />
    </ConfigProvider>
  </StyleProvider>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ConfigProvider, StyleProvider } from '@hwork/ant-design-vue'
import zhCN from '@hwork/ant-design-vue/es/locale/zh_CN'
import { useAppAuth } from '@/composables/useAppAuth'
import { container } from '@/main'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const pageLoading = ref(true)

const name = import.meta.env.VITE_SUB_APP_NAME
const ENV_QIANKUN = qiankunWindow.__POWERED_BY_QIANKUN__

/**
 * CSS-in-JS 选择器优先级配置
 *
 * 问题：qiankun experimentalStyleIsolation 会给静态 CSS 添加 div[data-qiankun="xxx"] 前缀
 * 但 Ant Design Vue 4.x CSS-in-JS 默认使用 :where(.css-xxx) 选择器（优先级为 0）
 * 导致被 qiankun 处理过的 reset.css 样式覆盖了组件样式
 *
 * 解决：设置 hashPriority="high" 将 :where(.css-xxx) 改为 .css-xxx（正常优先级）
 */
const hashPriority = ENV_QIANKUN ? 'high' : 'low'

/**
 * 弹出层渲染容器
 * 确保 Modal、Select 下拉框等弹出层渲染在正确的容器中
 */
const getPopupContainer = (triggerNode) => {
  if (ENV_QIANKUN && container) {
    // 在 qiankun 中，弹出层应该渲染在子应用容器内
    return container.querySelector('#app') || document.body
  }
  // 非微前端环境，如果传入了 triggerNode，渲染在其父节点
  if (triggerNode) {
    return triggerNode.parentNode || document.body
  }
  return document.body
}

if (!ENV_QIANKUN) {
  const { loading } = useAppAuth()
  watch(
    () => loading.value,
    () => {
      pageLoading.value = loading.value
    }
  )
} else {
  pageLoading.value = false
}
</script>

<style lang="scss">
body {
  margin: 0;
}

.auth-boot {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
