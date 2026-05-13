---
name: hwork-ui-ux-v1
description: 'Hwork UI 设计规范助手。企业级中后台 Vue 组件库规范，含 57 份设计规范、20 类色彩体系、完整组件文档。适用于页面设计、组件开发、UI 审查。'
---

# 原型生成助手

企业级中后台产品的完整 UI 设计规范。包含 57 份设计规范（50 个组件 + 7 项基础规范），20 类色彩体系、字体排版系统、布局间距圆角阴影规范。

## 路径说明

> **`<skill-dir>`** 代表此技能的根目录：`.opencode/skills/hwork-ui-ux-v1`
>
> 文档中所有路径均使用此占位符，实际使用时替换为完整路径。

## 何时应用

在以下情况下参考这些规范：

- 设计或开发企业级中后台产品
- 实现、审查、优化符合 Hwork 设计规范的 UI 组件
- 构建列表页、详情页、表单页、数据看板等业务场景
- 严格遵循 H-work UI 设计规范

## 如何使用

组件库基于 **vue@3.5.26** 进行开发，使用 `@hwork/ant-design-vue`(**基于ant-design-vue@4.1.2二次开发**) 组件库进行开发，请注意版本，使用api 请参考 `<skill-dir>/reference/hwork-ant-design-vue/a-[组件名称].md`;图标必须使用 `@hwork/icon`; 人员选择相关组件优先使用 `@hwork/hwork-business-components`。

## 快速参考

### 1. 品牌色（关键）

- **Hwork Blue 主色** - `#165DFF` - 主要按钮、链接、选中状态
- **Hwork Blue 常规** - `#4080FF` - Level 5
- **Hwork Blue Hover** - `#6AA1FF` - 悬停状态 Level 4
- **Hwork Blue Active** - `#0E42D2` - 点击状态 Level 7
- **Hwork Blue Light** - `#E8F3FF` - 浅色背景 Level 1
- **Hwork Blue Border** - `#BEDAFF` - 边框色 Level 2

### 2. 功能色（关键）

- **Success** - `#00B42A` | **Warning** - `#FF7D00` | **Error** - `#F53F3F` | **Info** - `#165DFF`

### 3. 文字色（关键）

- **Primary** `#1D2129` | **Regular** `#4E5969` | **Secondary** `#86909C` | **Placeholder/Disabled** `#C9CDD4`

### 4. 按钮规范（高）

- **高度** - Mini: 24px, Small: 28px, Default: 32px, Large: 36px
- **内边距** - Mini: 0 8px, Small: 0 12px, Default: 0 16px, Large: 0 20px
- **字号** - Mini: 12px, 其余: 14px | **圆角** - Small: 2px, Default/Large: 4px
- **主按钮** - 背景 #165DFF 文字 #FFFFFF | **次按钮** - 背景 #F2F3F5 文字 #4E5969

### 5. 字体排版（高）

- **字体家族** - 中文: PingFang SC, 英文: Roboto, 数字: DIN Alternate
- **H1** 20px/600/28px | **H2** 18px/600/26px | **H3** 16px/500/24px
- **正文** 14px/400/22px | **辅助文字** 12px/400/20px

### 6. 间距系统（中）

- 4px（紧凑）| 8px（相关元素）| 12px（组件内部）| 16px（区块）| 24px（模块）| 32px（页面区域）

### 7. 布局容器（中）

- **页面内边距** 24px | **卡片内边距** 16px（大卡片 24px）| **表格单元格** 12px 16px | **最大宽度** 1200px

### 8. 圆角与阴影（中）

- **圆角** - 2px（复选框/标签/小按钮）| 4px（按钮/输入框）| 6px（大输入框）| 8px（卡片/模态框）
- **阴影** - 卡片 `0 1px 2px rgba(0,0,0,0.05)` | 下拉 `0 4px 10px rgba(0,0,0,0.1)` | 弹窗 `0 8px 24px rgba(0,0,0,0.12)`

---

## 规范搜索

常见表单、排版、表格等组件都可搜索

### 搜索示例

```bash
# 搜索表格规范
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "table header" --category table

# 搜索按钮规范
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "primary button" --category button
```

---

## 获得更好结果的技巧

1. **关键词要具体** - "primary button size" > "button"
2. **指定类别** - 使用 `--category` 参数精确搜索
3. **多次搜索** - 不同关键词揭示不同规范细节
4. **保持一致性** - 同一项目使用相同的规范标准

---

## 如何使用此技能

网站创建、编辑等遵循此工作流程：

### 步骤 1：分析用户需求

从用户请求中提取关键信息：

- **场景**：中后台、管理系统、数据看板等
- **页面类型**：列表页、详情页、表单页、数据看板等
- **需求**：新建、修改、审查、优化等
- **页面元素**：分析页面结构、侧边栏，顶部导航，筛选项，输入框、表格、表单
- **组件**：按钮、表单、表格、导航、数据展示等

### 步骤 2：读取组件文档

**⚠️ 警告：此步骤为强制步骤，必须在生成代码之前执行！**

根据第一步的分析，选择合适的 `@hwork/ant-design-vue`、 `@hwork/hwork-business-components` 组件及从 `@hwork/icon` 选择图标进行页面开发。

#### @hwork/ant-design-vue

所有组件索引：读取 `<skill-dir>/reference/hwork-ant-desgin-vue-index.md`
每个组件的详情可以从 `<skill-dir>/reference/hwork-ant-design-vue/` 目录读取相关组件文档，文件路径格式：

```
<skill-dir>/reference/hwork-ant-design-vue/a-{{组件的串行命名}}.md
```

比如 ListLayout，使用 Read 工具读取：`<skill-dir>/reference/hwork-ant-design-vue/a-list-layout.md`

#### @hwork/hwork-business-components

人员选择的公共要使用此此组件库，组件及使用 `<skill-dir>/reference/hwork-business-components.md`

#### 🚨 图表组件（强制读取）

**当页面需求中包含任何图表、数据可视化、趋势图、占比图、统计图等内容时，必须在生成代码前读取：**

```
<skill-dir>/reference/vue-echarts.md
```

**此文档包含 echarts 和 vue-echarts 的 CDN 地址、注册方式、配置示例，缺少任何一项都会导致图表白屏。**

#### 图标库

@hwork/icon 包提供 H-work 标准图标，为 Web Components 标准的自定义 HTML 元素，图标必须使用 `@hwork/icon` 提供的图标。

- 使用方法及搜索方法：`<skill-dir>/reference/hwork-icon/icon-use.md`
- 所有图标：`<skill-dir>/reference/hwork-icon/icon-list.md`

### 步骤 3：搜索设计规范（必须 - 不可跳过）

**⚠️ 警告：此步骤为强制步骤，必须在生成代码之前执行！**

**🚫 禁止行为：直接跳到步骤 4 生成代码**

对于不能使用组件的UI元素，需要遵循设计规范来实现;
使用 `<skill-dir>/scripts/search.py` 搜索相关设计规范，确保符合 H-work 设计标准。

#### 必须执行的搜索命令

**在生成任何页面代码之前，必须至少执行以下 3 个搜索命令：**

```bash
# 1. 颜色规范（必须）
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "brand color" --category color

# 2. 文字色规范（必须）
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "text color" --category color

# 3. 间距规范（必须）
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "spacing" --category margin
```

#### 完成标志

**只有当你执行了上述搜索命令并看到搜索结果后，才能进入步骤 4 生成代码。**

### 步骤 4：生成代码

**⚠️ 前置检查：确认已完成步骤 2 组件选择 、步骤 3 的设计规范搜索！**

---

#### 🚨🚨🚨 版本声明（必读） 🚨🚨🚨

**`@hwork/ant-design-vue` 基于 `ant-design-vue@4.1.2` 二次开发，对应 Ant Design Vue 4.x 版本。**
为了避免错误，请阅读开发规范：`<skill-dir>/reference/coding-principle.md`

**⚠️ 重要：导入与注册规范**

**必须使用 `@hwork/ant-design-vue` 而不是 `ant-design-vue` 进行导入！**

### 核心规则：使用的组件必须导入，导入即需要use

1. **只导入实际使用的组件**（不要全量导入）
2. **导入的组件必须全部 use 注册**（导入了不 use 会导致问题）
3. **子组件必须同时导入并注册其父组件**
4. **🚫 禁止重复导入同一组件**

### 父子组件依赖关系（使用子组件必须同时导入并注册父组件）

有父子依赖的关系的组件读取：`<skill-dir>/reference/hwork-ant-design-vue-import.md`

读取以上规范后，根据组件文档和设计规范生成代码。

---
