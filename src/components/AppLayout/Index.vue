<template>
  <a-layout class="app-layout ant-theme-default">
    <a-layout-sider
      v-model:collapsed="siderCollapsed"
      :trigger="null"
      collapsible
      :width="224"
      :collapsed-width="64"
      class="app-layout-sider"
    >
      <SideMenu
        :title="title"
        :menu-list="menuList"
        :default-selected-key="defaultSelectedKey"
        :default-open-keys="defaultOpenKeys"
        :collapsed="siderCollapsed"
        @update:collapsed="handleCollapsedChange"
        @menu-click="handleMenuClick"
      />
    </a-layout-sider>
    <a-layout-content class="app-layout-content">
      <slot />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import SideMenu from '@/components/SideMenu/Index.vue'
import { switchTheme, defaultThemeConfig } from '@/utils/theme'

onMounted(() => {
  switchTheme(defaultThemeConfig)
})

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  menuList: {
    type: Array,
    default: () => []
  },
  defaultSelectedKey: {
    type: String,
    default: ''
  },
  defaultOpenKeys: {
    type: Array,
    default: () => []
  },
  collapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:collapsed', 'menu-click'])

const siderCollapsed = computed({
  get: () => props.collapsed,
  set: (val) => emit('update:collapsed', val)
})

const handleCollapsedChange = (val) => {
  emit('update:collapsed', val)
}

const handleMenuClick = (key, e) => {
  emit('menu-click', key, e)
}
</script>

<style lang="less" scoped>
@import '../SideMenu/variables.less';

.app-layout {
  min-height: 100vh;
  background: #fff;

  :deep(&.@{ant-prefix}-layout),
  :deep(.@{ant-prefix}-layout) {
    background: #fff;
  }

  &-sider {
    background: var(--default-sidemenu-bg-color, #165dff) !important;
    box-shadow: var(--default-sidemenu-box-shadow, 0 0 8px 0 #0000001a);
    overflow: hidden;

    :deep(.@{ant-prefix}-layout-sider-children) {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }

  &-content {
    background: #fff !important;
    overflow: auto;
  }
}
</style>
