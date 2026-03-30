---
description: Hwork UI/UX 开发规范
globs: []
alwaysApply: true
---

# Hwork UI/UX 开发规范

本项目使用 Hwork UI 设计规范，所有 UI 开发必须遵循以下规则。

## ⚠️ 强制要求

**当用户请求涉及 UI 开发、页面生成、组件使用时，必须先激活 `hwork-ui-ux-v1` 技能！**

在生成任何 Vue 页面代码之前，必须执行：

1. 调用 `discloseContext` 激活 `hwork-ui-ux-v1` 技能
2. 读取相关组件文档（如 `a-list-layout.md`）
3. 执行设计规范搜索命令

**禁止跳过技能激活直接生成代码！**

## 组件库

- 使用 `@hwork/ant-design-vue` 组件库（基于 Ant Design Vue 4） **禁止使用 `ant-design-vue`**
- 业务组件使用 `@hwork/hwork-business-components`
- icon 图标使用 `@hwork/icon` **禁止使用 `@ant-design/icons-vue`**
- 列表页用 **`a-card` + `a-form` + `a-table`** 等标准组件；表单提交示例见 **`src/examples/antd-form-submit.vue`**

## 导入规范

```javascript
// ✅ 正确
import { Button, Table, Form } from '@hwork/ant-design-vue'
import { message, Modal } from '@hwork/ant-design-vue'

// ❌ 错误
import { Button } from 'ant-design-vue'
```

## 设计规范

### 品牌色

- 主色: `#165DFF`
- 悬停: `#4080FF`
- 点击: `#0E42D2`

### 功能色

- 成功: `#00B42A`
- 警告: `#FF7D00`
- 错误: `#F53F3F`

### 文字色

- 主要: `#1D2129`
- 常规: `#4E5969`
- 次要: `#86909C`

### 间距系统

- 4px / 8px / 12px / 16px / 20px / 24px

### 按钮尺寸

- Mini: 24px
- Small: 28px
- Default: 32px
- Large: 36px

## 页面开发

生成列表页时，优先使用 `a-list-layout` 组件。

### `a-form` 与 `@finish`（避免踩坑）

- **`@finish`** 仅在**校验通过**后触发；无 **`rules`**、**`a-form-item` 无 `name`** 时不要依赖 `@finish` 做提交。
- 简单场景：提交按钮 **`html-type="button"`** + **`@click`**；**`a-form` 上 `@submit.prevent`** 防止回车原生提交。
- 需要内置校验：再配 **`rules` + `name`**，再用 **`@finish`** 或 **`html-type="submit"`**。

## 规范搜索

查询设计规范：

```bash
python3 ../.opencode/skills/hwork-ui-ux-v1/scripts/search.py "<关键词>" --category <类别>
```
