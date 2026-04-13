<template>
  <AppLayout
    title="应用菜单"
    :menu-list="menuList"
    :collapsed="isCollapsed"
    :default-selected-key="selectedKey"
    @update:collapsed="isCollapsed = $event"
    @menu-click="handleMenuClick"
  >
    <!-- 业务代码 -->
    <div class="content">
      <p class="welcome-text">业务代码还未生成，等待明确需求</p>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/components/AppLayout/Index.vue'
import { useAppLayout } from './useAppLayout'
import '@hwork/icon/home'
import '@hwork/icon/settings'
import '@hwork/icon/user'
import '@hwork/icon/management'

const { isCollapsed, selectedKey, menuList, handleMenuClick } = useAppLayout()
</script>

<style lang="less" scoped>
.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.welcome-text {
  font-size: 18px;
  color: #4e5969;
  margin: 0;
}
</style>
