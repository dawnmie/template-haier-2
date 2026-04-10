<template>
  <div class="welcome-wrap">
    <Sidebar
      title="应用菜单"
      :menu-list="menuList"
      :collapsed="isCollapsed"
      :default-selected-key="selectedKey"
      @update:collapsed="isCollapsed = $event"
      @menu-click="handleMenuClick"
    />
    <div class="content">
      <p class="welcome-text">
        欢迎使用本应用（根路径 <code>/</code>）。请在此页面扩展你的界面与业务逻辑。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/SideMenu'
import '@hwork/icon/home'
import '@hwork/icon/settings'

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
    icon: 'h-icon-settings',
    children: [
      { key: 'app-list', title: '应用列表' },
      { key: 'app-config', title: '应用配置' }
    ]
  },
  {
    key: 'user',
    title: '用户中心',
    icon: 'h-icon-settings'
  },
  {
    key: 'settings',
    title: '系统设置',
    icon: 'h-icon-settings'
  }
])

// 菜单点击事件
const handleMenuClick = (key) => {
  console.log('Menu clicked:', key)
  selectedKey.value = key
}
</script>

<style lang="scss" scoped>
.welcome-wrap {
  min-height: 100vh;
  display: flex;
  background: #fafafa;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-text {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
  margin: 0;
}
</style>
