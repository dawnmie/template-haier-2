<template>
  <ConfigProvider :locale="zhCN" :append-to="appendTo" :namespace="name">
    <div
      v-if="loading"
      class="auth-boot"
    >
      <a-spin
        size="large"
        tip="加载中…"
      />
    </div>
    <router-view v-else />
  </ConfigProvider>
</template>

<script setup>
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useAppAuth } from '@/composables/useAppAuth'
import { container } from '@/main'

const name = import.meta.env.VITE_SUB_APP_NAME
const appendTo = container ? container.querySelector('#app') : '#app'
const { loading } = useAppAuth()
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
