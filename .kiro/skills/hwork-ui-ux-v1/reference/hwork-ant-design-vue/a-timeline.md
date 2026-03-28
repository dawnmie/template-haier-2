# Timeline 时间轴

## 概述

垂直展示的时间流信息。

## 何时使用

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## API

```vue
<a-timeline>
  <a-timeline-item>创建服务现场 2015-09-01</a-timeline-item>
  <a-timeline-item>初步排除网络异常 2015-09-01</a-timeline-item>
  <a-timeline-item>技术测试异常 2015-09-01</a-timeline-item>
  <a-timeline-item>网络异常正在修复 2015-09-01</a-timeline-item>
</a-timeline>
```

### Timeline

时间轴。

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| mode | 通过设置 `mode` 可以改变时间轴和内容的相对位置 | `left` \| `alternate` \| `right` | - |
| pending | 指定最后一个幽灵节点是否存在或内容 | boolean \| string \| slot | `false` |
| pendingDot | 当最后一个幽灵节点存在時，指定其时间图点 | string \| slot | `<LoadingOutlined />` |
| reverse | 节点排序 | boolean | `false` |

### Timeline.Item

时间轴的每一个节点。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| color | 指定圆圈颜色 `blue, red, green`，或自定义的色值 | string | `blue` | - |
| dot | 自定义时间轴点 | string \| slot | - | - |
| dotPosition | 自定义时间轴点位置 | `top` \| `center` \| string \| number | `center` | - |
| label | 设置标签 | string \| slot | - | - |
| labelWidth | 设置标签的宽度 | string \| number | - | - |
| extra | 自定义额外内容 | string \| slot | - | 3.0 |
| position | 自定义节点位置 | `left` \| `right` | - | - |

## 代码示例

### 基本用法

```vue
<template>
  <a-timeline>
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
    <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
    <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
  </a-timeline>
</template>
```

基本的时间轴。

### 标签

```vue
<template>
  <a-radio-group v-model:value="mode">
    <a-radio-button value="left">Left</a-radio-button>
    <a-radio-button value="alternate">Alternate</a-radio-button>
  </a-radio-group>
  
  <a-timeline :mode="mode">
    <a-timeline-item label="2015-09-01">Create a services</a-timeline-item>
    <a-timeline-item label="2015-09-01 09:12:11">Solve initial network problems</a-timeline-item>
    <a-timeline-item>Technical testing</a-timeline-item>
    <a-timeline-item label="2015-09-01 09:12:11">Network problems being solved</a-timeline-item>
  </a-timeline>
</template>
```

使用 `label` 标签单独展示时间。

### 最后一个及排序

```vue
<template>
  <a-timeline pending="Recording..." reverse>
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
    <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
  </a-timeline>
  <a-button @click="handleClick">Toggle Reverse</a-button>
</template>
```

当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，当 `pending` 为真值时展示幽灵节点，如果 `pending` 是 `VNode` 可用于定制该节点内容，同时 `pendingDot` 将可以用于定制其轴点。reverse 属性用于控制节点排序，为 false 时按正序排列，为 true 时按倒序排列。

### 交替展现

```vue
<template>
  <a-timeline mode="alternate">
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
    <a-timeline-item>
      <template #dot>
        <ClockCircleOutlined style="font-size: 16px;" />
      </template>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </a-timeline-item>
    <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item>
      <template #dot>
        <ClockCircleOutlined style="font-size: 16px;" />
      </template>
      Technical testing 2015-09-01
    </a-timeline-item>
  </a-timeline>
</template>
```

内容在时间轴两侧轮流出现。

### 额外内容

```vue
<template>
  <a-timeline>
    <a-timeline-item>
      Create a services site 2015-09-01
      <template #extra>
        On this website, you can offer various services such as website development, design, content creation, marketing, and more.
      </template>
    </a-timeline-item>
    <a-timeline-item>
      Solve initial network problems 2015-09-01
      <template #extra>
        "Solve initial network problems" refers to addressing and resolving the initial issues that arise within a network system, such as connectivity problems, configuration errors, hardware failures, and software bugs.
      </template>
    </a-timeline-item>
    <a-timeline-item>
      Technical testing 2015-09-01
      <template #extra>
        "Technical testing" typically involves the process of evaluating a system or software application to ensure that it meets specified technical requirements and functions correctly.
      </template>
    </a-timeline-item>
    <a-timeline-item>
      Network problems being solved 2015-09-01
      <template #extra>
        "Network problems being solved" simply means that issues within a network are currently being addressed and resolved through troubleshooting and implementing solutions to ensure smooth operation.
      </template>
    </a-timeline-item>
  </a-timeline>
</template>
```

带有额外内容的时间轴。

### 圆圈颜色

```vue
<template>
  <a-timeline>
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item color="red">
      <p>Solve initial network problems 1</p>
      <p>Solve initial network problems 2</p>
      <p>Solve initial network problems 3 2015-09-01</p>
    </a-timeline-item>
    <a-timeline-item>
      <p>Technical testing 1</p>
      <p>Technical testing 2</p>
      <p>Technical testing 3 2015-09-01</p>
    </a-timeline-item>
    <a-timeline-item color="gray">
      <p>Technical testing 1</p>
      <p>Technical testing 2</p>
      <p>Technical testing 3 2015-09-01</p>
    </a-timeline-item>
    <a-timeline-item color="gray">
      <p>Technical testing 1</p>
      <p>Technical testing 2</p>
      <p>Technical testing 3 2015-09-01</p>
    </a-timeline-item>
    <a-timeline-item color="#00CCFF">
      <template #dot>
        <SmileOutlined />
      </template>
      <p>Custom color testing</p>
    </a-timeline-item>
  </a-timeline>
</template>
```

圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态。

### 自定义时间轴点

```vue
<template>
  <div>
    <div>
      轴点位置
      <a-radio-group v-model:value="dotPosition">
        <a-radio value="center">center（默认）</a-radio>
        <a-radio value="top">top</a-radio>
        <a-radio value="27px">自定义</a-radio>
      </a-radio-group>
    </div>
    <a-timeline>
      <a-timeline-item :dot-position="dotPosition">
        <template #label>
          <span>Create</span>
          <span>2015-09-01</span>
        </template>
        Create a services site
      </a-timeline-item>
      <a-timeline-item :dot-position="dotPosition">
        <template #label>
          <span>Solve problems</span>
          <span>2015-09-01</span>
        </template>
        Solve initial network problems
      </a-timeline-item>
      <a-timeline-item :dot-position="dotPosition">
        <template #dot>
          <ClockCircleOutlined style="font-size: 16px;" />
        </template>
        <template #label>
          <span>Testing</span>
          <span>2015-09-01</span>
        </template>
        Technical testing
      </a-timeline-item>
      <a-timeline-item :dot-position="dotPosition">
        <template #label>
          <span>Final</span>
          <span>2015-09-01</span>
        </template>
        Network problems being solved
      </a-timeline-item>
    </a-timeline>
  </div>
</template>
```

可以设置为图标或其他自定义元素。

> 使用 `dot-position` 属性可以设置时间轴点的对齐位置。默认居中对齐，设置为 `top` 等价于设置 `27px`，即时间轴点距离顶部 27px。

### 右侧时间轴点

```vue
<template>
  <a-timeline mode="right">
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
    <a-timeline-item>
      <template #dot>
        <ClockCircleOutlined style="font-size: 16px;" />
      </template>
      Technical testing 2015-09-01
    </a-timeline-item>
    <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
  </a-timeline>
</template>
```

时间轴点可以在内容的右边。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/timeline-cn
