---
name: UserCard
description: 展示用户信息，鼠标悬停时展示用户详细信息卡片
---

# UserCard 用户卡片组件

## 组件概述

UserCard 用户卡片组件用于展示用户信息。当需要在鼠标悬停时展示用户详细信息卡片的场景时使用。支持缓存、自定义位置、延迟显示等功能。

## Design-to-Implementation Workflow

### Step 1: 确定用户信息展示需求

- 分析需要展示用户信息的场景
- 确定触发方式（悬停、点击等）
- 设计卡片的位置和样式

### Step 2: 配置 UserCard 属性

- 设置 `userCode` 属性指定用户工号
- 配置 `placement` 属性设置卡片位置
- 根据需要设置延迟时间和缓存

### Step 3: 实现用户卡片功能

- 初始化用户卡片组件
- 处理用户信息的加载和显示
- 添加交互逻辑和错误处理

## Quick API Reference

### 核心属性

- `userCode`: 员工工号 (string)
- `placement`: 卡片位置 (`top` | `left` | `right` | `bottom` 等)
- `mouseEnterDelay`: 鼠标移入延时 (number, 默认 300ms)
- `mouseLeaveDelay`: 鼠标移出延时 (number, 默认 300ms)
- `cache`: 是否开启缓存 (boolean)

### 常用组合

```javascript
// 基本用法
hwComps.hwUserCard.init(popoverRef.value, {
  userCode: '21022951',
  placement: 'right'
})

// 带缓存的用法
hwComps.hwUserCard.init(popoverRef.value, {
  userCode: '21022951',
  cache: true,
  mouseEnterDelay: 300
})
```

## 详细文档

- [完整 API 参考](./references/api_reference.md)
- [代码示例](./references/code_examples.md)
