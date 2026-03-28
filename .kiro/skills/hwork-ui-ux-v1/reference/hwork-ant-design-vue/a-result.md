# Result 结果

## 概述

用于反馈一系列操作任务的处理结果。

## 何时使用

当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| extra | 操作区 | slot | - |
| icon | 自定义 icon | slot | - |
| status | 结果的状态,决定图标和颜色 | `success` \| `error` \| `info` \| `warning` \| `404` \| `403` \| `500` | `'info'` |
| subTitle | subTitle 文字 | string \| VNode \| slot | - |
| title | title 文字 | string \| VNode \| slot | - |

## 代码示例

### Success 成功

```vue
<template>
  <a-result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  >
    <template #extra>
      <a-button type="primary">Go Console</a-button>
      <a-button>Buy Again</a-button>
    </template>
  </a-result>
</template>
```

成功的结果。

### Info 信息

```vue
<template>
  <a-result
    status="info"
    title="Your operation has been executed"
  >
    <template #extra>
      <a-button type="primary">Go Console</a-button>
    </template>
  </a-result>
</template>
```

展示处理结果。

### Warning 警告

```vue
<template>
  <a-result
    status="warning"
    title="There are some problems with your operation."
  >
    <template #extra>
      <a-button type="primary">Go Console</a-button>
    </template>
  </a-result>
</template>
```

警告类型的结果。

### 403 无权限

```vue
<template>
  <a-result
    status="403"
    title="403"
    sub-title="Sorry, you are not authorized to access this page."
  >
    <template #extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>
```

你没有此页面的访问权限。

### 404 页面未找到

```vue
<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>
```

此页面未找到。

### 500 服务器错误

```vue
<template>
  <a-result
    status="500"
    title="500"
    sub-title="Sorry, the server is wrong."
  >
    <template #extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>
```

服务器发生了错误。

### Error 错误

```vue
<template>
  <a-result
    status="error"
    title="Submission Failed"
    sub-title="Please check and modify the following information before resubmitting."
  >
    <template #extra>
      <a-button type="primary">Go Console</a-button>
      <a-button>Buy Again</a-button>
    </template>
    <div>
      <p><strong>The content you submitted has the following error:</strong></p>
      <p><CloseCircleOutlined /> Your account has been frozen Thaw immediately ></p>
      <p><CloseCircleOutlined /> Your account is not yet eligible to apply Apply Unlock ></p>
    </div>
  </a-result>
</template>
```

复杂的错误反馈。

### 自定义 icon

```vue
<template>
  <a-result title="Great, we have done all the operations!">
    <template #icon>
      <SmileOutlined />
    </template>
    <template #extra>
      <a-button type="primary">Next</a-button>
    </template>
  </a-result>
</template>
```

自定义 icon。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/result-cn
