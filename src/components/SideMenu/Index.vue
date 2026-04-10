<template>
  <div :class="['hwork-sidemenu', isCollapsed && 'hwork-sidemenu-collapsed']">
    <!-- 标题区域 -->
    <div class="hwork-sidemenu-title">
      <div v-show="!isCollapsed" class="hwork-sidemenu-title-bg">
        <div class="title">
          <a-tooltip
            v-if="title && title.length > 10"
            placement="topLeft"
            :get-popup-container="getPopupContainerMenu"
          >
            <template #title>
              <div class="tooltip-title">
                <span>{{ title }}</span>
              </div>
            </template>
            <div class="text">{{ title }}</div>
          </a-tooltip>
          <div v-else class="text">{{ title }}</div>
        </div>
      </div>
    </div>

    <!-- 菜单区域 -->
    <div class="hwork-sidemenu-container">
      <div class="hwork-sidemenu-container-wrapper">
        <a-menu
          id="sidemenu"
          mode="inline"
          theme="light"
          :open-keys="openKeys"
          :selected-keys="[selectedKey]"
          :inline-collapsed="isCollapsed"
          :get-popup-container="getPopupContainer"
          @click="handleClick"
          @openChange="handleOpenChange"
        >
          <template v-for="item in menuList" :key="item.key">
            <a-menu-item v-if="!item.children || item.children.length === 0" :key="item.key">
              <i v-if="item.icon" :class="['menu-icon', item.icon]" />
              <span>{{ item.title }}</span>
            </a-menu-item>
            <a-sub-menu v-else :key="item.key">
              <template #title>
                <i v-if="item.icon" :class="['menu-icon', item.icon]" />
                <span>{{ item.title }}</span>
              </template>
              <a-menu-item v-for="child in item.children" :key="child.key">
                <i v-if="child.icon" :class="['menu-icon', child.icon]" />
                <span>{{ child.title }}</span>
              </a-menu-item>
            </a-sub-menu>
          </template>
        </a-menu>
      </div>
    </div>

    <!-- 底部折叠区域 -->
    <footer class="hwork-sidemenu-collapse">
      <div class="hwork-sidemenu-collapse-wrapper" @click="toggleCollapsed">
        <i class="h-icon-menu-fold" v-if="!isCollapsed" />
        <i class="h-icon-menu-unfold" v-else />
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import '@hwork/icon/menu-fold'
import '@hwork/icon/menu-unfold'

const props = defineProps({
  // 菜单标题
  title: {
    type: String,
    default: ''
  },
  // 菜单数据
  menuList: {
    type: Array,
    default: () => []
    // 格式: [{ key: '1', title: '菜单1', icon: 'h-icon-xxx', children: [...] }]
  },
  // 默认选中的菜单项
  defaultSelectedKey: {
    type: String,
    default: ''
  },
  // 默认展开的子菜单
  defaultOpenKeys: {
    type: Array,
    default: () => []
  },
  // 是否折叠
  collapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:collapsed', 'menuClick'])

// 内部状态
const openKeys = ref([...props.defaultOpenKeys])
const selectedKey = ref(props.defaultSelectedKey)
const isCollapsed = computed({
  get: () => props.collapsed,
  set: (val) => emit('update:collapsed', val)
})

// 监听默认值变化
watch(
  () => props.defaultSelectedKey,
  (val) => {
    selectedKey.value = val
  }
)

watch(
  () => props.defaultOpenKeys,
  (val) => {
    openKeys.value = [...val]
  },
  { deep: true }
)

// 获取弹出容器
const getPopupContainer = (node) => {
  return node?.parentNode || document.body
}

// 获取tooltip容器
const getPopupContainerMenu = () => {
  return document.body
}

// 折叠/展开菜单
const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
}

// 菜单点击事件
const handleClick = (e) => {
  selectedKey.value = e.key
  emit('menuClick', e.key, e)
}

// 展开/关闭的回调
const handleOpenChange = (keys) => {
  openKeys.value = keys
}
</script>

<style lang="scss" scoped>
.hwork-sidemenu {
  height: 100%;
  width: 224px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  transition: width 0.2s;

  &-collapsed {
    width: 48px;

    .hwork-sidemenu-title {
      display: none;
    }
  }

  &-title {
    width: 100%;
    flex-shrink: 0;

    &-bg {
      width: 100%;
      padding: 12px 16px;
      background: linear-gradient(135deg, #165dff 0%, #4080ff 100%);

      .title {
        display: flex;
        align-items: center;

        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 24px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 16px;
          color: #fff;
          line-height: 24px;
        }
      }
    }
  }

  &-container {
    flex: 1;
    width: 100%;
    overflow: hidden;

    &-wrapper {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: #d9d9d9;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      :deep(.ant-menu) {
        border: none;
        background: transparent;

        .ant-menu-item,
        .ant-menu-submenu-title {
          margin: 0;
          height: 40px;
          line-height: 40px;
          padding: 0 16px !important;

          &:hover {
            background: #f2f3f5;
          }

          .menu-icon {
            margin-right: 8px;
            font-size: 16px;
          }
        }

        .ant-menu-item-selected {
          background: #e8f3ff !important;
          color: #165dff;

          &::after {
            border-right: 3px solid #165dff;
          }
        }

        .ant-menu-submenu-selected {
          color: #165dff;
        }
      }
    }
  }

  &-collapse {
    width: 100%;
    border-top: 1px solid #e5e6eb;
    flex-shrink: 0;

    &-wrapper {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #4e5969;
      transition: all 0.2s;

      &:hover {
        color: #165dff;
        background: #f2f3f5;
      }

      i {
        font-size: 16px;
      }
    }
  }
}

.tooltip-title {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
