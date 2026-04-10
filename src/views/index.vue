<template>
  <AppLayout
    title="应用菜单"
    :menu-list="menuList"
    :collapsed="isCollapsed"
    :default-selected-key="selectedKey"
    @update:collapsed="isCollapsed = $event"
    @menu-click="handleMenuClick"
  >
    <div class="content">
      <p class="welcome-text">
        欢迎使用本应用（根路径 <code>/</code>）。请在此页面扩展你的界面与业务逻辑。
      </p>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/AppLayout/Index.vue'
import '@hwork/icon/home'
import '@hwork/icon/settings'
import '@hwork/icon/user'
import '@hwork/icon/management'

const isCollapsed = ref(false)
const selectedKey = ref('home')

// 菜单数据示例
const menuList = ref([
  {
    key: 'home',
    title: '首页',
    icon: 'h-icon-home'
  },
  {
    key: 'apps',
    title: '应用管理',
    icon: 'h-icon-management',
    children: [
      { key: 'app-list', title: '应用列表' },
      { key: 'app-config', title: '应用配置' }
    ]
  },
  {
    key: 'user',
    title: '用户中心',
    icon: 'h-icon-user'
  },
  {
    key: 'settings',
    title: '系统设置',
    icon: 'h-icon-settings'
  }
])

// 菜单点击事件
const handleMenuClick = (key) => {
  selectedKey.value = key
}
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
