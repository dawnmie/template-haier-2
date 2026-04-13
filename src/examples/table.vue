<template>
  <a-list-layout
    title="订单管理"
    sub-title="订单列表查询与管理"
    :loading="loading"
    @search="onSearch"
    @reset="onReset"
  >
    <template #search>
      <a-search>
        <a-search-item label="订单号">
          <a-input v-model:value="searchParams.orderNo" placeholder="请输入订单号" allow-clear />
        </a-search-item>
        <a-search-item label="下单时间" span="2">
          <a-range-picker v-model:value="searchParams.orderTime" />
        </a-search-item>
        <a-search-item label="下单人">
          <a-input
            v-model:value="searchParams.orderPerson"
            placeholder="请输入下单人"
            allow-clear
          />
        </a-search-item>
      </a-search>
    </template>

    <a-table
      sticky
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :scroll="{ x: 'max-content' }"
      row-key="orderNo"
      @change="onTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button type="inline" @click="onView(record)">
            <template #icon><h-icon-eye /></template>
            查看
          </a-button>
          <a-button type="inline" @click="onShip(record)">
            <template #icon><h-icon-export /></template>
            发货
          </a-button>
          <a-button type="inline" danger @click="onRefund(record)">
            <template #icon><h-icon-withhold /></template>
            退款
          </a-button>
        </template>
      </template>
    </a-table>
  </a-list-layout>
</template>

<script setup>
import { ref, reactive, shallowRef } from 'vue'
import { message } from '@hwork/ant-design-vue'
import '@hwork/icon/eye'
import '@hwork/icon/export'
import '@hwork/icon/withhold'

const loading = ref(false)

const searchParams = reactive({
  orderNo: '',
  orderTime: [],
  orderPerson: ''
})

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 50,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => `共 ${total} 条`
})

const columns = shallowRef([
  { title: '订单号', dataIndex: 'orderNo', key: 'orderNo', width: 200 },
  { title: '下单人', dataIndex: 'orderPerson', key: 'orderPerson', width: 120 },
  { title: '下单时间', dataIndex: 'orderTime', key: 'orderTime', width: 180 },
  { title: '支付时间', dataIndex: 'payTime', key: 'payTime', width: 180 },
  { title: '操作', key: 'action', width: 220, fixed: 'right' }
])

// 模拟数据
const generateData = () => {
  const data = []
  for (let i = 1; i <= 50; i++) {
    data.push({
      orderNo: `ORD${String(i).padStart(8, '0')}`,
      orderPerson: `用户${i}`,
      orderTime: `2026-03-${String((i % 28) + 1).padStart(2, '0')} ${String(8 + (i % 12)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:00`,
      payTime: `2026-03-${String((i % 28) + 1).padStart(2, '0')} ${String(9 + (i % 12)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:00`
    })
  }
  return data
}

const allData = generateData()
const dataSource = ref(allData.slice(0, 10))

const onSearch = () => {
  loading.value = true
  setTimeout(() => {
    // 模拟筛选
    let filtered = allData
    if (searchParams.orderNo) {
      filtered = filtered.filter((item) => item.orderNo.includes(searchParams.orderNo))
    }
    if (searchParams.orderPerson) {
      filtered = filtered.filter((item) => item.orderPerson.includes(searchParams.orderPerson))
    }
    pagination.total = filtered.length
    pagination.current = 1
    dataSource.value = filtered.slice(0, pagination.pageSize)
    loading.value = false
  }, 500)
}

const onReset = () => {
  searchParams.orderNo = ''
  searchParams.orderTime = []
  searchParams.orderPerson = ''
  pagination.current = 1
  pagination.total = allData.length
  dataSource.value = allData.slice(0, pagination.pageSize)
}

const onTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  const start = (pag.current - 1) * pag.pageSize
  dataSource.value = allData.slice(start, start + pag.pageSize)
}

const onView = (record) => {
  message.info(`查看订单：${record.orderNo}`)
}

const onShip = (record) => {
  message.success(`发货订单：${record.orderNo}`)
}

const onRefund = (record) => {
  message.warning(`退款订单：${record.orderNo}`)
}
</script>
