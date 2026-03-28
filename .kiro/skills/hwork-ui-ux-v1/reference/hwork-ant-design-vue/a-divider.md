# Divider 分割线

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 代码演示

### 水平分割线

默认为水平分割线，可在中间加入文字。

```vue
<template>
  <div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <a-divider />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <a-divider>With Text</a-divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
</template>
```

### 垂直分割线

使用 `type="vertical"` 设置为行内的垂直分割线。

```vue
<template>
  <div>
    Text
    <a-divider type="vertical" />
    <a href="#">Link</a>
    <a-divider type="vertical" />
    <a href="#">Link</a>
  </div>
</template>
```

### 带文字的分割线

分割线中带有文字，可以用 `orientation` 指定文字位置。

```vue
<template>
  <div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <a-divider>Text</a-divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <a-divider orientation="left">Left Text</a-divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <a-divider orientation="right">Right Text</a-divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <a-divider orientation="left" :orientation-margin="0">Left Text with 0 orientationMargin</a-divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <a-divider orientation="right" :orientation-margin="50">Right Text with 50px orientationMargin</a-divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
</template>
```

### 样式自定义

测试一些 `style` 修改样式的行为。

```vue
<template>
  <div>
    <a-divider style="height: 2px; background-color: #7cb305" />
    <a-divider style="border-color: #7cb305" dashed />
    <a-divider type="vertical" style="height: 60px; background-color: #7cb305" />
    <a-divider type="vertical" style="height: 60px; border-color: #7cb305" dashed />
  </div>
</template>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| dashed | 是否虚线 | boolean | false | |
| orientation | 分割线标题的位置 | `left` \| `right` \| `center` | `center` | |
| orientationMargin | 标题和最近 left/right 边框之间的距离，去除了分割线，同时 `orientation` 必须为 `left` 或 `right` | string \| number | - | 3.0 |
| plain | 文字是否显示为普通正文样式 | boolean | false | 2.2.0 |
| type | 水平还是垂直类型 | `horizontal` \| `vertical` | `horizontal` | |
