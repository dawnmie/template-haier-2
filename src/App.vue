<template>
  <StyleProvider :container="styleContainer">
    <ConfigProvider :locale="zhCN" :get-popup-container="getPopupContainer" :namespace="name">
      <div v-if="pageLoading" class="auth-boot">
        <a-spin size="large" tip="加载中…" />
      </div>
      <router-view v-else />
    </ConfigProvider>
  </StyleProvider>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { ConfigProvider, StyleProvider } from '@hwork/ant-design-vue'
import zhCN from '@hwork/ant-design-vue/es/locale/zh_CN'
import { useAppAuth } from '@/composables/useAppAuth'
import { container } from '@/main'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const pageLoading = ref(true)

const name = import.meta.env.VITE_SUB_APP_NAME
const ENV_QIANKUN = qiankunWindow.__POWERED_BY_QIANKUN__

/**
 * 获取 CSS-in-JS 样式注入的目标容器
 * 在 qiankun strictStyleIsolation (Shadow DOM) 模式下，
 * 需要将样式注入到 Shadow DOM 内部，而不是 document.head
 */
const styleContainer = computed(() => {
  if (ENV_QIANKUN && container) {
    // qiankun Shadow DOM 模式：返回子应用容器
    // StyleProvider 会将 CSS-in-JS 生成的 <style> 标签注入到此容器
    return container.querySelector('#app') || document.body
  }
  return undefined // 默认使用 document.head
})

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
