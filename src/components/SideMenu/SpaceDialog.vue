<template>
  <div>
    <a-modal :open="show" :closable="false" :footer="null" :width="640" :z-index="2999"
             :mask-closable="false">
      <WebSpace :show="show" @showDialog="showDialog"></WebSpace>
    </a-modal>
  </div>
</template>

<script setup>
import WebSpace from './Space.vue'

const emit = defineEmits(['update:show'])
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const showDialog = () => {
  emit('update:show', false)
}
</script>
