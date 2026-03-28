---
name: PersonnelList
description: 下拉框选择用户，支持单选和多选模式，提供搜索和自定义功能
---

# PersonnelList 人员列表组件

## 组件概述

PersonnelList 人员列表组件提供下拉框形式的用户选择功能。支持单选、多选模式，内置搜索功能，支持自定义用户列表和默认模式两种工作方式。

## Design-to-Implementation Workflow

### Step 1: 确定选择需求

- 分析用户选择的场景和需求
- 确定选择模式（单选/多选）
- 设计选择器的样式和交互

### Step 2: 配置 PersonnelList 属性

- 设置 `selectMode` 选择工作模式
- 配置 `value` 属性设置默认选中值
- 根据需要设置搜索和过滤条件

### Step 3: 实现选择功能

- 初始化人员列表组件
- 处理用户选择和搜索逻辑
- 添加数据更新和状态管理

## Quick API Reference

### 核心属性

- `value`: 已选的值 (string | array)
- `mode`: 选择模式 (`single` | `multiple`)
- `selectMode`: 工作模式 (`default` | `custom`)
- `labelInValue`: 是否返回 label 和 value (boolean)
- `allowClear`: 是否允许清除 (boolean)

### 常用组合

```javascript
// 单选模式
hwComps.hwPersonnelListSelect.init(element, {
  value: undefined,
  labelInValue: true,
  allowClear: true,
  onChange: val => console.log(val)
})

// 多选模式
hwComps.hwPersonnelListSelect.init(element, {
  mode: 'multiple',
  value: [],
  maxTagCount: 1,
  onChange: val => console.log(val)
})
```

## 详细文档

- [完整 API 参考](./references/api_reference.md)
- [代码示例](./references/code_examples.md)
