<template>
  <div :class="['hwork-sidemenu-tile-dialog', isCollapsed ? 'hwork-sidemenu-tile-dialog-location' : '']">
    <div class="hwork-sidemenu-tile-dialog-container">
      <Application v-if="showAppList" :side-menu-item="treeRoot" :show-collect="false" />
      <ApplicationMenu :side-menu-item="treeRoot" :show-collect="false" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import { useStore } from 'vuex'
import Application from '../AppMenu/Application.vue'
import ApplicationMenu from '../AppMenu/ApplicationMenu.vue'

const emit = defineEmits(['update:showTileDialog'])
const props = defineProps({
  showTileDialog: {
    type: Boolean,
    default: false,
    require: true
  },
  treeRoot: {
    type: Object,
    default: () => ({})
  },
  showAppList: {
    type: Boolean,
    default: false
  }
})

const showCollect = ref(false)
const store = useStore()
const isCollapsed = computed(() => store.getters['isCollapsed'])

const handleSetVisibleDrawer = () => {
  emit('update:showTileDialog', false)
}

provide('visibleDrawer', props.showTileDialog)
provide('setVisibleDrawer', handleSetVisibleDrawer)
provide('showCollect', showCollect)
</script>

<style scoped lang="less">
.hwork-sidemenu-tile-dialog {
  position: absolute;
  top: 0;
  left: 224px;
  overflow: hidden;
  border-radius: 0 12px 12px 0;
  box-shadow: @default-navbar-box-shadow;
  height: calc(100vh - @default-navbar-height);
  width: calc(100vw - 224px - 240px);
  background: var(--default-navbar-drawer-bg-color);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 100%;
  z-index: 3999;
  &-container {
    height: inherit;
    .flex(row, flex-start, flex-start);
  }
  &.hwork-sidemenu-tile-dialog-location {
    left: 64px;
  }
}

@media only screen and (min-width: 0) and (max-width: 989px) {
  .hwork-sidemenu-tile-dialog {
    width: 826px;
  }
}

@media only screen and (max-width: 1920px) and (min-width: 990px) {
  .hwork-sidemenu-tile-dialog {
    width: calc(86vw - 224px);
  }
}

</style>
