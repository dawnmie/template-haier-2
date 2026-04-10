<template>
  <div :class="['ant-sidemenu', isCollapsed && 'ant-sidemenu-collapsed']">
    <!-- 标题区域（收起时隐藏） -->
    <div v-if="title && !isCollapsed" class="ant-sidemenu-title">
      <div class="ant-sidemenu-title-bg">
        <div class="title">
          <a-tooltip
            v-if="isTitleOverflow"
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
        </div>
      </div>
    </div>

    <!-- 菜单区域 -->
    <div class="ant-sidemenu-container">
      <div class="ant-sidemenu-container-wrapper">
        <a-menu
          mode="inline"
          :items="menuItems"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectedKeys"
          :inline-collapsed="isCollapsed"
          @click="handleClick"
        />
      </div>
    </div>

    <!-- 底部操作区域 -->
    <footer class="ant-sidemenu-collapse">
      <div v-show="!isCollapsed" class="ant-sidemenu-collapse-nav" @click="handleNavModeClick">
        <h-icon-settings />
        <span class="ant-sidemenu-collapse-nav-text">导航模式切换</span>
      </div>
      <div class="ant-sidemenu-collapse-wrapper" @click="toggleCollapsed">
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

const emit = defineEmits(['update:collapsed', 'menu-click', 'nav-mode-click'])

const openKeys = ref([...props.defaultOpenKeys])
const selectedKeys = ref(props.defaultSelectedKey ? [props.defaultSelectedKey] : [])

const isCollapsed = computed({
  get: () => props.collapsed,
  set: (val) => emit('update:collapsed', val)
})

const isTitleOverflow = computed(() => {
  if (!props.title) return false
  return props.title.length > 12
})

const createIconRender = (iconName) => {
  if (!iconName) return undefined
  return () => h(iconName, { class: 'menu-icon' })
}

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

const menuItems = computed(() => transformMenuList(props.menuList))

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

const getPopupContainerMenu = () => document.body

const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleClick = (e) => {
  selectedKeys.value = [e.key]
  emit('menu-click', e.key, e)
}

const handleNavModeClick = () => {
  emit('nav-mode-click')
}
</script>

<style lang="less" scoped>
@import './variables.less';
@import './mixins.less';

.ant-@{theme-default} {
  .ant-sidemenu {
    box-shadow: @default-sidemenu-box-shadow;
    &-title {
      &-bg {
        .title {
          color: @color-white;
        }
        .space {
          color: @color-white;
          background: @default-sidemenu-space-bg-color;
          border: 1px solid @default-sidemenu-space-border-color;
          &:hover {
            background: @color-white;
            border-color: @default-sidemenu-space-border-color-hover;
            color: @default-font-color;
            .h-icon {
              color: @default-svg-arrow-color;
            }
          }
        }
      }
    }
    :deep(.ant-sidemenu-container) {
      .@{ant-prefix}-menu {
        background: transparent; // @default-sidemenu-bg-color;
      }
      .ant-menu-arrow(@default-sidemenu-arrow-color);
      .ant-sidemenu-font-color(@default-sidemenu-font-color);
      .@{ant-prefix}-menu:not(:first-child) .@{ant-prefix}-menu-submenu-title,
      .@{ant-prefix}-menu:not(:first-child) .@{ant-prefix}-menu-item {
        color: @default-sidemenu-second-font-color;
      }
      .@{ant-prefix}-menu:not(.@{ant-prefix}-menu-horizontal) .@{ant-prefix}-menu-item-selected {
        background: @default-sidemenu-selected-bg-color-hover !important;
        &:hover {
          background: @default-sidemenu-selected-bg-color-hover !important;
        }
      }
    }
    &-collapse {
      border-top: 1px solid @default-sidemenu-border-color-collapsed;
      color: @default-sidemenu-font-color-collapsed;
    }
  }
}
.ant-@{theme-default}.ant-layout-sider-collapsed .ant-sidemenu-container-wrapper {
  :deep(.ant-menu-submenu-selected) {
    background: @default-sidemenu-selected-bg-color-hover;
  }
}

.ant-@{theme-light} {
  .ant-sidemenu {
    &-title {
      &-bg {
        .title {
          color: @light-sidemenu-font-color;
        }
        .space {
          color: @light-sidemenu-font-color;
          background: @light-sidemenu-space-bg-color;
          border: 1px solid @light-sidemenu-space-border-color;
          &:hover {
            border-color: @light-sidemenu-space-border-color;
          }
        }
      }
    }
    :deep(.ant-sidemenu-container-wrapper) {
      // 箭头
      .ant-menu-arrow(@light-sidemenu-arrow-color);
      .ant-sidemenu-font-color(@light-sidemenu-font-color);
      .@{ant-prefix}-menu:not(:first-child) .@{ant-prefix}-menu-submenu-title,
      .@{ant-prefix}-menu:not(:first-child) .@{ant-prefix}-menu-item {
        color: @light-sidemenu-second-font-color;
      }
      .@{ant-prefix}-menu:not(.@{ant-prefix}-menu-horizontal) .@{ant-prefix}-menu-item-selected {
        background: @light-sidemenu-selected-bg-color-hover !important;
        &:hover {
          background: @light-sidemenu-selected-bg-color-hover !important;
        }
      }
    }
    &-collapse {
      border-top: 1px solid @light-sidemenu-border-color-collapsed;
      color: @light-sidemenu-font-color-collapsed;
    }
  }
}

.ant-@{theme-light}.ant-layout-sider-collapsed {
  :deep(.ant-sidemenu-container-wrapper) {
    .ant-menu-vertical .ant-menu-submenu-selected,
    .ant-menu-vertical-left .ant-menu-submenu-selected,
    .ant-menu-vertical-right .ant-menu-submenu-selected {
      background: @light-sidemenu-selected-bg-color-hover;
    }
  }
}

.ant-sidemenu {
  height: 100%;
  width: 100%;
  background: var(--default-sidemenu-bg-color);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0% 100%;
  .flex(column, flex-start, center);
  .unselected();
  position: relative;
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
        .text-ellipsis();
        .flex(row, flex-start, center);
        .text {
          .text-ellipsis();
          height: 24px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 16px;
          letter-spacing: 0;
          line-height: 24px;
          padding: 0 12px;
        }
        .desc {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          .flex(row, center, center);
          &:hover {
            background: #edeeef;
            color: #165dff;
            cursor: pointer;
          }
        }
        :deep(.@{ant-prefix}-tooltip-inner) {
          background-color: rgba(78, 89, 105, 0.9);
          min-height: 28px;
          font-size: 12px;
          border-radius: 6px;
          padding: 6px 12px;
          max-width: 192px;
          white-space: pre-wrap;
        }
        :deep(.@{ant-prefix}-tooltip-arrow::before) {
          width: 7px;
          height: 7px;
        }
        :deep(.@{ant-prefix}-tooltip-arrow::after) {
          background: rgba(78, 89, 105, 0.9);
        }
      }
      :deep(.@{ant-prefix}-popover) {
        width: 652px;
        .@{ant-prefix}-popover-inner {
          padding: 0;
          border-radius: 12px;
          box-shadow:
            0 12px 48px 16px #02091908,
            0 9px 28px 0 #0209190d,
            0 6px 16px -8px #02091914;
          .@{ant-prefix}-popover-inner-content {
            padding: 0;
          }
        }
      }
      .space {
        height: 32px;
        border-radius: 6px;
        padding: 0 12px;
        font-size: 14px;
        box-sizing: border-box;
        &.collapse {
          margin: 8px 0 0 0;
        }
        .cursor();
        div {
          .text-ellipsis();
        }
        .h-icon {
          width: 16px;
          height: 16px;
          font-size: 16px;
        }
        .flex(row, space-between, center);
      }
    }
  }
  &-container {
    flex: 1;
    width: inherit;
    overflow-x: hidden;
    padding: 4px 4px 4px 12px;
    .scroll(transparent, #ffffff4d, #ffffff99);
    &-wrapper {
      width: calc(@default-sidemenu-width - 12px - 12px);
      height: 100%;
    }
    :deep(.ant-sidemenu-container-wrapper) {
      .ant-menu-root.ant-menu-vertical > .ant-menu-item > .ant-menu-title-content > span,
      .ant-menu-root
        > .ant-menu-submenu-vertical
        > .ant-menu-submenu-title
        > .ant-menu-title-content
        > .ant-sidemenu-container-wrapper-title
        > span {
        display: none;
      }

      .ant-menu .ant-menu-submenu,
      .ant-menu .ant-menu-submenu-inline {
        transition: none;
      }
      .ant-menu-hover {
        color: var(--default-sidemenu-font-color-hover);
        background: var(--default-sidemenu-bg-color-hover);
      }
      .ant-menu-inline-collapsed-tooltip .iconfont-portal {
        display: none;
      }
      .@{ant-prefix}-menu-submenu-arrow {
        right: 8px;
      }
      .ant-menu-width();
      .ant-menu-border-right();
      // 箭头hover
      .ant-menu-arrow-hover(var(--default-sidemenu-arrow-color-hover));
      // 菜单展开后 每一级菜单的padding-left
      .ant-menu-padding();
      .ant-menu-margin(2px);

      .@{ant-prefix}-menu-inline > .@{ant-prefix}-menu-item {
        .flex(row, flex-start, center);
        span {
          .text-ellipsis();
          flex: 1;
        }
      }
      .@{ant-prefix}-menu-vertical > .@{ant-prefix}-menu-item,
      .@{ant-prefix}-menu-vertical-left > .@{ant-prefix}-menu-item,
      .@{ant-prefix}-menu-vertical-right > .@{ant-prefix}-menu-item,
      .@{ant-prefix}-menu-inline > .@{ant-prefix}-menu-item,
      .@{ant-prefix}-menu-vertical
        > .@{ant-prefix}-menu-submenu
        > .@{ant-prefix}-menu-submenu-title,
      .@{ant-prefix}-menu-vertical-left
        > .@{ant-prefix}menu-submenu
        > .@{ant-prefix}-menu-submenu-title,
      .@{ant-prefix}-menu-vertical-right
        > .@{ant-prefix}-menu-submenu
        > .@{ant-prefix}-menu-submenu-title,
      .@{ant-prefix}-menu-inline > .@{ant-prefix}-menu-submenu > .@{ant-prefix}-menu-submenu-title {
        height: 40px;
        line-height: 40px;
        border-radius: 8px;
        &:hover {
          color: var(--default-sidemenu-font-color-hover);
          background: var(--default-sidemenu-bg-color-hover);
        }
        .anticon {
          margin-right: 10px;
        }
        .anticon + span {
          margin: 0;
        }
        .anticon.h-icon {
          width: 16px;
          height: 16px;
          font-size: 16px;
        }
        .ant-menu-icon {
          width: 16px;
          height: 16px;
          background-size: 100%;
        }
        .ant-sidemenu-container-wrapper-title {
          .flex(row, flex-start, center);
          span {
            .text-ellipsis();
            flex: 1;
          }
        }
      }
      .@{ant-prefix}-menu:not(:first-child) .@{ant-prefix}-menu-submenu-title,
      .@{ant-prefix}-menu:not(:first-child) .@{ant-prefix}-menu-item {
        .anticon,
        .iconfont-portal {
          display: none;
        }
        &:hover {
          color: var(--default-sidemenu-font-color-hover) !important;
        }
      }
      .@{ant-prefix}-menu:not(.@{ant-prefix}-menu-horizontal) .@{ant-prefix}-menu-item-selected {
        color: var(--default-font-color-hover) !important;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        &:hover {
          color: var(--default-font-color-hover) !important;
        }
      }
    }
    :deep(.ant-sidemenu-container-classifyApp) {
      .ant-menu-padding(12px, 22px);
    }
  }
  &-collapse {
    height: 48px;
    width: inherit;
    box-sizing: border-box;
    .flex(row, space-between, center);
    &-nav {
      .flex(row, flex-start, center);
      padding-left: 16px;
      font-size: 12px;
      cursor: pointer;
      .h-icon {
        color: @color-white;
        font-size: 16px;
        margin-right: 4px;
      }
      &-text {
        max-width: 145px;
        .text-ellipsis();
      }
    }
    &-wrapper {
      width: 52px;
      height: inherit;
      .flex(row, center, center);
      .cursor();
      .h-icon {
        width: 20px;
        height: 20px;
        font-size: 18px;
        .arrow-transform(0);
      }
    }
  }

  :deep(.ant-scrollbar-wrap) {
    padding: 6px 12px;
  }

  :deep(.ant-popover .ant-scrollbar-wrap) {
    padding: 0;
  }

  :deep(.ant-tooltip-inner-wrap .ant-scrollbar-wrap .ant-tooltip-inner) {
    max-width: 192px !important;
    max-height: 108px !important;
    min-height: 20px;
    padding: 0 !important;
    background: transparent !important;
    overflow: hidden;
    box-shadow: none !important;
  }
  :deep(.ant-menu-inline-collapsed-tooltip .ant-tooltip-inner-wrap) {
    background-color: #fff !important;
    box-shadow:
      0 12px 48px 16px #02091908,
      0 9px 28px 0 #0209190d,
      0 6px 16px -8px #02091914;
  }
  .tooltip-title {
    line-height: 18px;
    max-height: 100%;
  }
}

.ant-layout-sider-collapsed {
  .ant-sidemenu {
    &-container {
      padding: 4px 8px;
      display: flex;
      justify-content: center;
      &-wrapper {
        width: calc(@default-sidemenu-width-collapsed - 24px);
        .flex(column, flex-start, center);
      }
      :deep(.ant-sidemenu-container-wrapper) {
        // 收起 图标
        .ant-menu-inline-collapsed > .ant-menu-item,
        .ant-menu-inline-collapsed
          > .ant-menu-item-group
          > .ant-menu-item-group-list
          > .ant-menu-item,
        .ant-menu-inline-collapsed
          > .ant-menu-item-group
          > .ant-menu-item-group-list
          > .ant-menu-submenu
          > .ant-menu-submenu-title,
        .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
          margin-left: 0;
          margin-right: 0;
          padding: 0 12px !important;
          width: 40px;
          display: flex;
          align-items: center;
        }
        // 收起
        .ant-menu-inline-collapsed {
          width: 40px;
        }
        .h-icon {
          line-height: 1;
        }
        .ant-menu-vertical .ant-menu-submenu-selected,
        .ant-menu-vertical-left .ant-menu-submenu-selected,
        .ant-menu-vertical-right .ant-menu-submenu-selected {
          border-radius: 8px;
          color: var(--default-font-color-hover);
          height: 40px;
          .anticon,
          .iconfont-portal {
            color: var(--default-font-color-hover);
          }
        }
        .ant-menu-vertical .ant-menu-submenu,
        .ant-menu-vertical-left .ant-menu-submenu,
        .ant-menu-vertical-right .ant-menu-submenu,
        .ant-menu-inline .ant-menu-submenu {
          border-radius: 8px;
        }
        // 菜单收起后 多级菜单弹框样式
        // .ant-menu-vertical.ant-menu-sub,
        // .ant-menu-vertical-left.ant-menu-sub,
        // .ant-menu-vertical-right.ant-menu-sub {
        //   width: 220px;
        // }
        .ant-menu-sub .ant-menu-submenu .ant-menu-submenu.ant-menu-submenu-popup {
          padding: 0;
        }
        .ant-menu-submenu.ant-menu-submenu-popup {
          z-index: 9999;
          .ant-menu {
            background: #fff;
            // box-shadow: 0 0 8px 0 #0000001a;
            border-radius: 8px;
            padding: 12px 0;
            // max-height: 400px;
            // overflow-y: auto;
            // overflow-x: hidden;
          }
          .@{ant-prefix}-menu-vertical > .@{ant-prefix}-menu-item,
          .@{ant-prefix}-menu-vertical-left > .@{ant-prefix}-menu-item,
          .@{ant-prefix}-menu-vertical-right > .@{ant-prefix}-menu-item,
          .@{ant-prefix}-menu-inline > .@{ant-prefix}-menu-item,
          .@{ant-prefix}-menu-vertical
            > .@{ant-prefix}-menu-submenu
            > .@{ant-prefix}-menu-submenu-title,
          .@{ant-prefix}-menu-vertical-left
            > .@{ant-prefix}menu-submenu
            > .@{ant-prefix}-menu-submenu-title,
          .@{ant-prefix}-menu-vertical-right
            > .@{ant-prefix}-menu-submenu
            > .@{ant-prefix}-menu-submenu-title,
          .@{ant-prefix}-menu-inline
            > .@{ant-prefix}-menu-submenu
            > .@{ant-prefix}-menu-submenu-title {
            font-weight: 500;
            color: #1d2129;
            padding: 0 16px;
            &:hover {
              color: var(--default-popover-font-color-hover);
              background: var(--default-popover-bg-color-hover);
            }
            .anticon,
            .iconfont-portal {
              display: none;
            }
            .anticon + span {
              margin: 0;
            }
          }
          .ant-menu-vertical .ant-menu-submenu-selected,
          .ant-menu-vertical-left .ant-menu-submenu-selected,
          .ant-menu-vertical-right .ant-menu-submenu-selected {
            background: var(--default-popover-bg-color-active);
            border-radius: 8px;
            .ant-menu-submenu-title {
              color: var(--default-popover-font-color-active);
            }
          }
          .@{ant-prefix}-menu:not(.@{ant-prefix}-menu-horizontal) .@{ant-prefix}-menu-item {
            width: 160px;
            margin: 0 4px;
          }
          .@{ant-prefix}-menu:not(.@{ant-prefix}-menu-horizontal)
            .@{ant-prefix}-menu-item-selected {
            color: var(--default-popover-font-color-active) !important;
            background: var(--default-popover-bg-color-active) !important;
            &:hover {
              color: var(--default-popover-font-color-active) !important;
            }
          }
        }
        // 箭头
        .ant-menu-arrow(#86909C);
        // 箭头hover
        .ant-menu-arrow-hover(#86909C);
      }
    }
    &-title {
      &-bg {
        .space {
          padding: 0 11px;
        }
      }
    }
    &-collapse {
      &-wrapper {
        width: @default-sidemenu-width-collapsed;
        .h-icon {
          .arrow-transform(180);
        }
      }
    }
  }
}
</style>
