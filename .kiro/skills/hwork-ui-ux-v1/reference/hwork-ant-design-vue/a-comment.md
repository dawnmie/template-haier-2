# Comment 评论

## 概述

对网站内容的反馈、评价和讨论。

## 何时使用

评论组件可用于对事物的讨论,例如页面、博客文章、问题等等。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| actions | 在评论内容下面呈现的操作项列表 | Array\|slot | - |
| author | 要显示为注释作者的元素 | string\|slot | - |
| avatar | 要显示为评论头像的元素 - 通常是 antd Avatar 或者 src | string\|slot | - |
| content | 评论的主要内容 | string\|slot | - |
| datetime | 展示时间描述 | string\|slot | - |

## 代码示例

### 基本评论

```vue
<template>
  <a-comment>
    <template #author>
      <span>Han Solo</span>
    </template>
    <template #avatar>
      <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
    </template>
    <template #content>
      <p>
        We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), 
        to help people create their product prototypes beautifully and efficiently.
      </p>
    </template>
    <template #datetime>
      <span>几秒前</span>
    </template>
    <template #actions>
      <span>
        <LikeOutlined />
        <span>0</span>
      </span>
      <span>
        <DislikeOutlined />
        <span>0</span>
      </span>
      <span>Reply to</span>
    </template>
  </a-comment>
</template>
```

一个基本的评论组件,带有作者、头像、时间和操作。

### 嵌套评论

```vue
<template>
  <a-comment>
    <template #author>
      <span>Han Solo</span>
    </template>
    <template #content>
      <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
    </template>
    <template #actions>
      <span>Reply to</span>
    </template>
    <a-comment>
      <template #author>
        <span>Han Solo</span>
      </template>
      <template #content>
        <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
      </template>
      <template #actions>
        <span>Reply to</span>
      </template>
    </a-comment>
  </a-comment>
</template>
```

评论可以嵌套。

### 配合 List 组件

```vue
<template>
  <a-list
    :data-source="data"
    :header="`${data.length} replies`"
    item-layout="horizontal"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-comment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime"
        >
          <template #actions>
            <span>Reply to</span>
          </template>
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
</template>
```

配合 List 组件展现评论列表。

### 回复框

```vue
<template>
  <div>
    <a-comment>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="value" :rows="4" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary">
            Add Comment
          </a-button>
        </a-form-item>
      </template>
    </a-comment>
  </div>
</template>
```

评论编辑器组件提供了相同样式的封装以支持自定义评论编辑器。

---

**文档来源**: https://design.hwork.haier.net/fe-docs/ant-design-vue4/components/comment-cn
