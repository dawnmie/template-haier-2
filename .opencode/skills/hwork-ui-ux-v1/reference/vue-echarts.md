# vue-echarts 图表实现规范

> 🚨 **强制要求**：所有图表必须完整实现，禁止使用占位图、空容器或示例伪代码代替。图表必须包含真实数据和完整的 ECharts 配置项。

基于 Vue 3 的 ECharts 图表组件使用指南。

## 1. 引入 CDN

package.json 必须依赖 `echarts`,`vue-echarts`

## 2. 注册组件

在 JS 中注册：

```javascript
import VChart from 'vue-echarts'
```

## 3. 模板使用

```html
<v-chart :option="chartOption" style="width: 100%; height: 400px;" autoresize />
```

## 4. 配置项

在 setup 中定义：

```javascript
const chartOption = ref({
  title: { text: '图表标题' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150, 80, 70], type: 'bar' }]
})

// return 中必须包含 chartOption
return { chartOption /* 其他变量 */ }
```

## 5. 组件属性

| 属性       | 类型          | 说明                   |
| ---------- | ------------- | ---------------------- |
| option     | Object        | ECharts 配置项（必填） |
| autoresize | Boolean       | 自动响应容器大小变化   |
| loading    | Boolean       | 显示加载动画           |
| theme      | String/Object | 主题配置               |

## 6. 常用图表类型

- 柱状图: `type: 'bar'`
- 折线图: `type: 'line'`
- 饼图: `type: 'pie'`
- 散点图: `type: 'scatter'`
- 雷达图: `type: 'radar'`
- 仪表盘: `type: 'gauge'`

## 7. 完整示例

### 柱状图

```html
<v-chart :option="barOption" style="height: 300px;" autoresize />
```

```javascript
const barOption = ref({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['一月', '二月', '三月', '四月', '五月'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [120, 200, 150, 80, 70],
      itemStyle: { color: '#165DFF' }
    }
  ]
})
```

### 折线图

```javascript
const lineOption = ref({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: '访问量',
      type: 'line',
      data: [150, 230, 224, 218, 135],
      smooth: true,
      itemStyle: { color: '#165DFF' }
    }
  ]
})
```

### 饼图

```javascript
const pieOption = ref({
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' }
      ]
    }
  ]
})
```

## 8. 注意事项

- **禁止使用占位图代替图表**，必须实现完整的 vue-echarts 图表
- 图表容器必须设置高度，否则不会显示
- 使用 `autoresize` 属性自动响应容器大小变化
- 配置项变量必须在 setup 的 return 中暴露给模板
