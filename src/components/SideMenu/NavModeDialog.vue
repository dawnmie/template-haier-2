<template>
  <div>
    <a-modal :open="show" :closable="false" :footer="null" centered :width="568"
             :z-index="2999" :mask-closable="false">
      <div class="hwork-navbar-theme">
        <header class="hwork-navbar-theme-header">
          <span>{{ $k('ML_szyhjsz_sp_S0071', '左侧导航模式切换') }}</span>
          <div class="hwork-navbar-theme-header-icon">
            <svg-icon icon-class="icon-close" @click="handleCancle"></svg-icon>
          </div>
        </header>

        <div class="hwork-navbar-theme-list">
          <div v-for="(item, index) in navModeList" :key="index" class="hwork-navbar-theme-list-item" @click="handleClick(item)">
            <div class="hwork-navbar-theme-list-item-img">
              <img :src="item.img" alt="">
            </div>
            <div class="hwork-navbar-theme-list-item-container">
              <div :class="['hwork-navbar-theme-list-item-container-circle', { 'active': currentNavMode === item.value }]"></div>
              <div class="hwork-navbar-theme-list-item-container-text">
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
        <footer class="hwork-navbar-theme-footer">
          <a-button class="mr-40" @click="handleCancle">
            {{ $k('ML_szyhjsz_sp_S0040', '取消') }}
          </a-button>
          <a-button type="primary" @click="handleConfirm">
            {{ $k('ML_szyhjsz_sp_S0041', '确认') }}
          </a-button>
        </footer>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import navMode1 from '@/assets/images/Layout/navMode1.png'
import navMode2 from '@/assets/images/Layout/navMode2.webp'
import { gioTrackPortal } from '@/utils/tools'

const { proxy } = getCurrentInstance()

const emit = defineEmits(['setMode', 'update:show'])
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const store = useStore()
const currentNavMode = ref('')

const sideMenuDisplayMode = computed(() => store.getters.sideMenuDisplayMode)
const navModeList = computed(() => [
  { img: navMode1, value: 1, label: proxy.$k('ML_szyhjsz_sp_S0092', '树形模式') },
  { img: navMode2, value: 2, label: proxy.$k('ML_szyhjsz_sp_S0093', '平铺模式') }
])

onMounted(() => {
  currentNavMode.value = sideMenuDisplayMode.value
})

const handleClick = (item) => {
  currentNavMode.value = item.value
}

const handleCancle = () => {
  emit('update:show', false)
}

const handleConfirm = () => {
  store.commit('n_user/SET_SIDEMENU_DISPLAY_MODE', currentNavMode.value)
  gioTrackPortal('AovLJ3YR_012369', {
    'navigation_mode': currentNavMode.value
  })
  emit('setMode')
}
</script>

<style lang="less" scoped>
.hwork-navbar-theme {
    max-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    user-select: none;
    &-header {
        height: 48px;
        .flex(row, space-between, center);
        padding: 0 20px 0 24px;
        font-weight: 500;
        font-size: 16px;
        color: @default-font-color;
        line-height: 24px;
        border-bottom: 1px solid @default-border-color;
        &-icon {
            width: 24px;
            height: 24px;
            border-radius: 6px;
            .flex(row, center, center);
            .cursor();
            &:hover {
                background: #4e596914;
            }
            &:active {
                background: #4e596929;
            }
        }
        .svg-icon {
            font-size: 16px;
            color: @default-svg-arrow-color;
        }
    }
    &-list {
        flex: 1;
        max-height: 488px;
        .flex(row, space-between, center);
        overflow-y: auto;
        .scroll(transparent);
        padding: 24px;
        &-item {
            .flex(column, flex-start, flex-start);
            position: relative;
            .cursor();
            &-img {
                width: 248px;
                height: 160px;
                border: 1px solid #E5E6EB;
                border-radius: 8px;
                overflow: hidden;
                img {
                    width: 100%;
                }
            }
            &-container {
                font-weight: 400;
                font-size: 14px;
                color: #4E5969;
                text-align: center;
                line-height: 22px;
                .flex(row, center, center);
                margin: 12px auto 0;
                &-circle {
                    width: 16px;
                    height: 16px;
                    background: #FFFFFF;
                    border: 1px solid #C9CDD4;
                    margin: 0 8px 0 0;
                    border-radius: 50%;
                    &.active {
                        position: relative;
                        border-color: #165DFF;
                        &::after {
                            content: '';
                            width: 10px;
                            height: 10px;
                            background: #165DFF;
                            border-radius: 50%;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }
                }
                &-text {
                    text-align: left;
                    width: 74px;
                    .text-ellipsis();
                }
            }
            &:hover {
                .hwork-navbar-theme-list-item-container-circle {
                    border-color: #165dff80;
                }
            }
        }
    }
    &-footer {
        height: 64px;
        .flex(row, center, center);
        border-top: 1px solid @default-border-color;
        .mr-40 {
            margin-right: 40px;
        }
        :deep(.@{ant-prefix}-btn) {
          height: 32px;
        }
    }
}
</style>
