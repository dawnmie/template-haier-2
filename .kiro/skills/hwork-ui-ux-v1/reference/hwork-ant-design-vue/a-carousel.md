# Carousel 走马灯

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## 基本使用

```vue
<a-carousel autoplay>
  <div><h3>1</h3></div>
  <div><h3>2</h3></div>
  <div><h3>3</h3></div>
  <div><h3>4</h3></div>
</a-carousel>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoplay | 是否自动切换 | boolean | false | - |
| dotPosition | 面板指示点位置，可选 `top` `bottom` `left` `right` | string | `bottom` | 1.5.0 |
| dots | 是否显示面板指示点 | boolean | true | - |
| dotsClass | 面板指示点类名 | string | `slick-dots` | - |
| easing | 动画效果 | string | `linear` | - |
| effect | 动画效果函数 | `scrollx` \| `fade` | `scrollx` | - |
| afterChange | 切换面板的回调 | function(current) | - | - |
| beforeChange | 切换面板的回调 | function(from, to) | - | - |

## 方法

| 名称 | 描述 |
| --- | --- |
| goTo(slideNumber, dontAnimate) | 切换到指定面板, dontAnimate = true 时，不使用动画 |
| next() | 切换到下一面板 |
| prev() | 切换到上一面板 |

## 示例

### 基本

最简单的用法。

```vue
<a-carousel>
  <div><h3>1</h3></div>
  <div><h3>2</h3></div>
  <div><h3>3</h3></div>
  <div><h3>4</h3></div>
</a-carousel>
```

### 位置

位置有 4 个方向。

```vue
<a-carousel dot-position="top">
  <div><h3>1</h3></div>
  <div><h3>2</h3></div>
  <div><h3>3</h3></div>
  <div><h3>4</h3></div>
</a-carousel>
```

### 渐显

切换效果为渐显。

```vue
<a-carousel effect="fade">
  <div><h3>1</h3></div>
  <div><h3>2</h3></div>
  <div><h3>3</h3></div>
  <div><h3>4</h3></div>
</a-carousel>
```

### 自动切换

定时切换下一张。

```vue
<a-carousel autoplay>
  <div><h3>1</h3></div>
  <div><h3>2</h3></div>
  <div><h3>3</h3></div>
  <div><h3>4</h3></div>
</a-carousel>
```

### 自定义分页

自定义分页展示。

```vue
<template>
  <a-carousel>
    <div v-for="item in 4" :key="item">
      <img :src="`/img${item}.jpg`" />
    </div>
    <template #customPaging="props">
      <a>
        <img :src="`/img${props.i + 1}.jpg`" />
      </a>
    </template>
  </a-carousel>
</template>
```

### 自定义箭头

自定义箭头展示。

```vue
<template>
  <a-carousel arrows>
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
</template>
```
