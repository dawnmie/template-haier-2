---
name: UserSelect
description: 穿梭框形式批量选择用户，支持搜索、分页和自定义数据源
---

# UserSelect 选人组件

## 组件概述

UserSelect 选人组件提供穿梭框形式的批量用户选择功能。支持搜索、分页、默认数据源和自定义数据源两种模式，适用于需要批量选择用户的场景。

## Design-to-Implementation Workflow

### Step 1: 确定选择需求

- 分析批量选择用户的场景
- 确定数据源类型（默认/自定义）
- 设计选择器的交互和样式

### Step 2: 配置 UserSelect 属性

- 设置 `selectMode` 选择工作模式
- 配置 `defaultSelectedUsers` 设置默认选中用户
- 根据需要设置搜索和事件回调

### Step 3: 实现选择功能

- 初始化用户选择组件
- 处理用户选择和搜索逻辑
- 添加确认、取消等交互处理

## Quick API Reference

### 核心属性

- `visible`: 选人 Modal 是否可见 (boolean)
- `defaultSelectedUsers`: 默认选中的用户 ID 列表 (string[])
- `selectMode`: 选择模式 (`default` | `custom`)
- `title`: 标题 (string)
- `userIds`: 自定义用户 ID 列表 (string[])

### 常用组合

```javascript
// 基本用法
hwComps.hwUserSelect.init(modalRef.value, {
  visible: false,
  onConfirm: users => console.log(users),
  onCancel: () => console.log('取消')
})

// 自定义模式
hwComps.hwUserSelect.init(modalRef.value, {
  selectMode: 'custom',
  userIds: ['22081309', '22072453'],
  onSearch: query => handleSearch(query)
})
```

## 详细文档

- [完整 API 参考](./references/api_reference.md)
- [代码示例](./references/code_examples.md)
