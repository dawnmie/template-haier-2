<!--
  Ant Design Vue：`a-form` 的 @finish 仅在表单校验通过后触发。
  若未配置 :rules 且 a-form-item 无 name，finish 往往不会按预期触发。
  本示例：提交用按钮 `html-type="button"` + `@click`；`@submit.prevent` 仅防止回车触发原生提交（与 @finish 无关）。
  需要内置校验时再改用 `:rules` + `a-form-item` 的 `name` + `@finish`（或 submit 按钮 `html-type="submit"`）。
-->
<template>
  <a-card title="表单提交示例（推荐无校验场景）" size="small" style="max-width: 480px">
    <a-form :model="formState" layout="vertical" @submit.prevent>
      <a-form-item label="标题">
        <a-input v-model:value="formState.title" placeholder="可选" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="button" :loading="submitting" @click="handleSubmit">
            提交
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'

const formState = reactive({
  title: '',
})

const submitting = ref(false)

async function handleSubmit() {
  submitting.value = true
  try {
    // 此处调用 rpc、接口等；需要校验时可先在此处手写或改用 a-form rules + name + @finish
    await new Promise((r) => setTimeout(r, 300))
    message.success(`已提交：${formState.title || '（空）'}`)
  } finally {
    submitting.value = false
  }
}
</script>
