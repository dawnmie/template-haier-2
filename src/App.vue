<template>
  <ConfigProvider :locale="zhCN" :append-to="appendTo" :namespace="name">
    <div v-if="pageLoading" class="auth-boot">
      <a-spin size="large" tip="加载中…" />
    </div>
    <router-view v-else />
  </ConfigProvider>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ConfigProvider } from '@hwork/ant-design-vue'
import zhCN from '@hwork/ant-design-vue/es/locale/zh_CN'
import { useAppAuth } from '@/composables/useAppAuth'
import { container } from '@/main'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
// const pageLoading = ref(false)
const pageLoading = ref(true)

const name = import.meta.env.VITE_SUB_APP_NAME
const appendTo = container ? container.querySelector('#app') : '#app'
const ENV_QIANKUN = qiankunWindow.__POWERED_BY_QIANKUN__

// if (!ENV_QIANKUN) {
//   const { loading } = useAppAuth()
//   watch(
//     () => loading.value,
//     () => {
//       pageLoading.value = loading.value
//     }
//   )
// } else {
pageLoading.value = false
// }
</script>

<style lang="less">
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
