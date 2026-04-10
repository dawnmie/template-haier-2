<template>
  <div class="hwork-sidemenu-space-dialog">
    <div class="space-title" v-text="`${$k('ML_szyhjsz_sp_S0072', '切换')}${currentAppInfo && currentAppInfo.switchTitle || $k('ML_szyhjsz_sp_S0073', '空间')}`"></div>
    <div class="body">
      <div class="search hwork-sidemenu-space-input">
        <a-input :placeholder="$k('ML_szyhjsz_sp_S0089', '搜索')" size="default" :value="searchValue" @change="handleInput">
          <template #suffix>
            <div className="space-input">
              <svg-icon icon-class="icon-search" />
            </div>
          </template>
        </a-input>
      </div>
      <div ref="spaceList" class="list">
        <div v-for="(item, index) in spaceSearchList" :key="index" :class="['hwork-web-space-list-item', 'list-item', item.active ? 'active' : '']" @click="handleClick(item)">
          <div class="icon">
            <img src="../../../assets/images/Layout/icon-space.png" alt="">
          </div>
          <div class="content">
            {{ $k(item.authorityCode, item.authorityName) }}
          </div>
          <div class="code">
            {{ item.authorityCode }}
          </div>
        </div>
        <div v-if="spaceSearchList.length > 12" class="mask"></div>
        <div v-if="spaceSearchList.length <= 0" class="list-empty">
          <div class="mb">
            {{ $k('ML_szyhjsz_sp_S0074', '没有找到相关内容') + '...' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance, onMounted } from 'vue'
import { useStore } from 'vuex'
import { deepClone } from '@/utils/index'
import { getDimensionValueList, setDimensionValueList } from '@/router/switch'

const { proxy } = getCurrentInstance()
const emit = defineEmits(['showDialog'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const store = useStore()
const searchValue = ref('')
const spaceSearchList = ref([])

const dimensionList = computed(() => store.getters['n_sidemenu/dimensionList'])
const dimensionId = computed(() => store.getters['n_sidemenu/dimensionId'])
const currentAppInfo = computed(() => store.getters['n_sidemenu/currentAppInfo'])
const showWebSpaceDialog = computed(() => store.getters['n_app/showWebSpaceDialog'])
const resolveFunc = computed(() => store.getters['n_app/resolveFunc'])

const dimensionValueList = computed(() => {
  const list = dimensionList.value.get(currentAppInfo.value.resrId) || {}
  return list.dimensionValue || []
})

const setCurDimensionProject = (val) => store.commit('n_sidemenu/SET_CUR_DIMENSION_PROJECT', val)
const setDimensionId = (val) => store.commit('n_sidemenu/SET_DIMENSION_ID', val)
const setShowWebSpaceDialog = (val) => store.commit('n_app/SET_SHOW_WRB_SPACE_DIALOG', val)

const setState = (list, id) => {
  list.forEach(el => {
    let state = false
    if (el.authorityCode === id) {
      state = true
    }
    Object.assign(el, {
      active: state
    })
  })
  return list
}

const handleInput = (value) => {
  searchValue.value = value && value.target.value || ''
  const list = dimensionValueList.value.filter(el => el.authorityName.toLowerCase().includes(searchValue.value.toLowerCase()) || el.authorityCode.toLowerCase().includes(searchValue.value.toLowerCase()))
  spaceSearchList.value = deepClone(setState(list, dimensionId.value))
}

const handleClick = (value) => {
  // 更新点击高亮
  spaceSearchList.value = deepClone(setState(spaceSearchList.value, value.authorityCode))
  // 更新缓存数据
  const dimensionInfo = getDimensionValueList(currentAppInfo.value.resrId) // 维度信息
  setDimensionValueList(dimensionInfo, value.authorityCode)
  // 更新store数据
  setDimensionId(value.authorityCode)
  setCurDimensionProject(value)
  // 向子应用传递变化的空间值
  proxy.$eventEmitter.emit('main.changeZone', {
    value: value.authorityName,
    key: value.authorityCode
  })
  // 弹框显示隐藏
  if (showWebSpaceDialog.value) {
    setShowWebSpaceDialog(false)
    resolveFunc.value(1)
  } else {
    emit('showDialog', false)
  }
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      searchValue.value = ''
      handleInput('')
    }
  },
  { immediate: true }
)

onMounted(() => {
  spaceSearchList.value = deepClone(setState(dimensionValueList.value || [], dimensionId.value))
})
</script>

<style lang="less" scoped>
.hwork-sidemenu-space-dialog {
    max-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    user-select: none;
    .space-title {
        height: 48px;
        line-height: 48px;
        box-sizing: border-box;
        padding: 0 24px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 16px;
        color: #1D2129;
        letter-spacing: 0;
        border-bottom: 1px solid #E5E6EB;
    }
    .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        .search {
            height: 64px;
            padding: 16px 24px;
            .svg-icon {
                width: 16px;
                height: 16px;
                font-size: 16px;
                color: @default-svg-arrow-color;
            }
        }
        .list {
            flex: 1;
            max-height: 488px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 0 0 24px 24px;
            overflow-y: auto;
            .scroll(transparent);
            .list-item {
                width: 136px;
                height: 130px;
                background: #FFFFFF;
                border: 1px solid #E5E6EB;
                border-radius: 8px;
                margin: 16px 16px 0 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0 12px;
                .icon {
                    width: 48px;
                    height: 48px;
                    background: #165dff1a;
                    border-radius: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 8px;
                    img {
                        width: 33px;
                        height: 26px;
                    }
                }
                .content {
                    width: 112px;
                    height: 22px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    font-size: 14px;
                    color: #1D2129;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 22px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .code {
                    width: 112px;
                    height: 20px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    font-size: 12px;
                    color: #86909C;
                    letter-spacing: 0;
                    text-align: center;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                &:hover {
                    cursor: pointer;
                    border: 1px solid #165DFF;
                    box-shadow: 0 0 8px 0 #0000001a;
                    .content {
                        color: #165DFF;
                    }
                }
                &.active {
                    border: 1px solid #165DFF;
                    box-shadow: 0 0 8px 0 #0000001a;
                }
            }
            .list-item:nth-child(1), .list-item:nth-child(2), .list-item:nth-child(3), .list-item:nth-child(4) {
                margin-top: 0;
            }
            .list-empty {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .mb {
                    margin-top: 50px;
                    margin-bottom: 50px;
                }
            }
        }
        .mask {
            position: absolute;
            width: calc(100% - 24px);
            height: 24px;
            bottom: 0;
            left: 0;
            background-image: linear-gradient(180deg, #ffffff00 0%, #FFFFFF 60%);
            border-bottom-left-radius: 12px;
        }
    }
}
</style>

<style lang="less" scoped>
.hwork-sidemenu-space-dialog {
  :deep(.@{ant-prefix}-input-affix-wrapper .@{ant-prefix}-input-prefix :not(.anticon)) {
    line-height: 1;
  }
  :deep(.@{ant-prefix}-input-affix-wrapper .@{ant-prefix}-input-suffix :not(.anticon)){
    line-height: 1;
  }
}
</style>
