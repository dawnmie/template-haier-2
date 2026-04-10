<template>
  <div :class="['hwork-sidemenu', isCollapsed && 'hwork-sidemenu-collapsed']">
    <!-- 标题区域 -->
    <div class="hwork-sidemenu-title">
      <div class="hwork-sidemenu-title-bg">
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
            <span class="text">{{ title }}</span>
          </a-tooltip>
          <span v-else class="text">{{ title }}</span>
          <div class="desc" @click="handleInfoClick">
            <h-icon-info-circle />
          </div>
        </div>
      </div>
    </div>

    <!-- 菜单区域 -->
    <div class="hwork-sidemenu-container">
      <div class="hwork-sidemenu-container-wrapper">
        <a-menu
          id="sidemenu"
          mode="inline"
          :items="menuItems"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectedKeys"
          :inline-collapsed="isCollapsed"
          :get-popup-container="getPopupContainer"
          @click="handleClick"
        />
      </div>
    </div>

    <!-- 底部操作区域 -->
    <footer class="hwork-sidemenu-collapse">
      <div class="hwork-sidemenu-collapse-nav" @click="handleNavModeClick">
        <h-icon-settings />
        <span v-if="!isCollapsed" class="hwork-sidemenu-collapse-nav-text">导航模式切换</span>
      </div>
      <div class="hwork-sidemenu-collapse-wrapper" @click="toggleCollapsed">
        <h-icon-menu-fold v-if="!isCollapsed" />
        <h-icon-menu-unfold v-else />
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, h } from 'vue'
import '@hwork/icon/menu-fold'
import '@hwork/icon/menu-unfold'
import '@hwork/icon/settings'
import '@hwork/icon/info-circle'

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

const emit = defineEmits(['update:collapsed', 'menuClick', 'navModeClick', 'infoClick'])

const openKeys = ref([...props.defaultOpenKeys])
const selectedKeys = ref(props.defaultSelectedKey ? [props.defaultSelectedKey] : [])
const isCollapsed = computed({
  get: () => props.collapsed,
  set: (val) => emit('update:collapsed', val)
})

const createIconRender = (iconName) => {
  if (!iconName) return undefined
  return () => h(iconName, { class: 'menu-icon' })
}

const menuItems = computed(() => {
  return transformMenuList(props.menuList)
})

const transformMenuList = (list) => {
  if (!list || list.length === 0) return []
  return list.map((item) => {
    const menuItem = {
      key: item.key,
      label: item.title
    }
    if (item.icon) {
      menuItem.icon = createIconRender(item.icon)
    }
    if (item.children && item.children.length > 0) {
      menuItem.children = transformMenuList(item.children)
    }
    return menuItem
  })
}

watch(
  () => props.defaultSelectedKey,
  (val) => {
    selectedKeys.value = val ? [val] : []
  }
)

watch(
  () => props.defaultOpenKeys,
  (val) => {
    openKeys.value = [...val]
  },
  { deep: true }
)

const getPopupContainer = (node) => {
  return node?.parentNode || document.body
}

const getPopupContainerMenu = () => {
  return document.body
}

const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleClick = (e) => {
  selectedKeys.value = [e.key]
  emit('menuClick', e.key, e)
}

const handleNavModeClick = () => {
  emit('navModeClick')
}

const handleInfoClick = () => {
  emit('infoClick')
}
</script>

<style lang="less" scoped>
@import '../SideMenu/css变量.less';

.hwork-sidemenu {
  height: 100%;
  width: 100%;
  background: var(--default-sidemenu-bg-color, @default-sidemenu-bg-color);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  position: relative;
  box-shadow: @default-sidemenu-box-shadow;

  &-title {
    height: fit-content;
    width: inherit;

    &-bg {
      height: inherit;
      width: inherit;
      background: var(--default-sidemenu-title-bg-color);
      background-repeat: no-repeat;
      background-size: cover;
      background-clip: border-box;
      padding: 12px 12px;

      .title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 24px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 16px;
          letter-spacing: 0;
          line-height: 24px;
          padding: 0 12px;
          color: @color-white;
        }

        .desc {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          color: @default-sidemenu-second-font-color;
          cursor: pointer;

          &:hover {
            background: #edeeef;
            color: @default-logo-color;
          }
        }
      }
    }
  }

  &-container {
    flex: 1;
    width: inherit;
    overflow-x: hidden;
    padding: 4px 4px 4px 12px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: @default-sidemenu-bg-color-hover;
      border-radius: 3px;

      &:hover {
        background: rgba(255, 255, 255, 0.6);
      }
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &-wrapper {
      width: calc(@default-sidemenu-width - 12px - 12px);
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: @default-sidemenu-bg-color-hover;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }

    :deep(.hwork-menu) {
      background: transparent;
      border-inline-end: none !important;

      .hwork-menu-item,
      .hwork-menu-submenu-title {
        height: 40px;
        line-height: 40px;
        border-radius: 8px;
        margin: 2px 0;
        color: @default-sidemenu-font-color;

        &:hover {
          color: var(--default-sidemenu-font-color-hover, @default-sidemenu-font-color);
          background: var(--default-sidemenu-bg-color-hover, @default-sidemenu-bg-color-hover);
        }

        .hwork-menu-item-icon,
        .menu-icon {
          width: 16px;
          height: 16px;
          font-size: 16px;
          margin-right: 10px;
        }

        .hwork-menu-title-content {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }
      }

      .hwork-menu-submenu-arrow {
        color: @default-sidemenu-arrow-color;
        right: 8px;

        &:hover {
          color: @default-sidemenu-arrow-color-hover;
        }
      }

      .hwork-menu-sub {
        background: transparent !important;

        .hwork-menu-item,
        .hwork-menu-submenu-title {
          color: @default-sidemenu-second-font-color;

          &:hover {
            color: var(
              --default-sidemenu-font-color-hover,
              @default-sidemenu-font-color
            ) !important;
          }
        }
      }

      .hwork-menu-item-selected {
        background: @default-sidemenu-selected-bg-color-hover !important;
        color: var(--default-font-color-hover, @default-font-color-hover) !important;
        font-family: PingFangSC-Medium;
        font-weight: 500;

        &:hover {
          background: @default-sidemenu-selected-bg-color-hover !important;
          color: var(--default-font-color-hover, @default-font-color-hover) !important;
        }
      }

      .hwork-menu-submenu-selected > .hwork-menu-submenu-title {
        color: @default-sidemenu-font-color;
      }
    }
  }

  &-collapse {
    height: 48px;
    width: inherit;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid @default-sidemenu-border-color-collapsed;
    color: @default-sidemenu-font-color-collapsed;

    &-nav {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding-left: 16px;
      font-size: 12px;
      cursor: pointer;
      color: @color-white;

      h-icon-settings {
        font-size: 16px;
        margin-right: 4px;
      }

      &-text {
        max-width: 145px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &-wrapper {
      width: 52px;
      height: inherit;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: @color-white;

      h-icon-menu-fold,
      h-icon-menu-unfold {
        width: 20px;
        height: 20px;
        font-size: 20px;
      }
    }
  }

  &-collapsed {
    .hwork-sidemenu-container {
      padding: 4px 8px;
      display: flex;
      justify-content: center;

      &-wrapper {
        width: calc(@default-sidemenu-width-collapsed - 24px);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }
    }

    .hwork-sidemenu-title {
      &-bg {
        .title {
          .text {
            display: none;
          }

          .desc {
            display: none;
          }
        }
      }
    }

    .hwork-sidemenu-collapse {
      &-nav {
        display: none;
      }

      &-wrapper {
        width: @default-sidemenu-width-collapsed;

        h-icon-menu-fold,
        h-icon-menu-unfold {
          transform: rotate(180deg);
        }
      }
    }

    :deep(.hwork-menu) {
      width: 40px;

      .hwork-menu-item,
      .hwork-menu-submenu-title {
        margin-left: 0;
        margin-right: 0;
        padding: 0 12px !important;
        width: 40px;
        display: flex;
        align-items: center;
      }

      .hwork-menu-submenu-selected {
        border-radius: 8px;
        background: @default-sidemenu-selected-bg-color-hover;
        color: var(--default-font-color-hover, @default-font-color-hover);

        .hwork-menu-item-icon,
        .menu-icon {
          color: var(--default-font-color-hover, @default-font-color-hover);
        }
      }

      .hwork-menu-submenu {
        border-radius: 8px;
      }
    }
  }

  .tooltip-title {
    line-height: 18px;
    max-height: 100%;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
</style>
