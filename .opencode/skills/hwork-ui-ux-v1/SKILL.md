---
name: hwork-ui-ux-v1
description: '基于 H-work UI 标准生成 Vue 应用，H-work UI组件规范和设计规范，适用后台、中台、列表页、详情页、表单页、数据看板的设计。包含完整设计规范（按钮、表单、表格、导航、数据展示等）、16 种色彩体系（品牌色、功能色、图表色）、字体排版系统、布局规范、间距系统、圆角阴影规范。操作：设计、构建、创建、实现、审查、修复、改进、优化、增强、重构、检查 UI 组件。组件：按钮、输入框、选择器、表格、表单、菜单、标签页、分页、模态框、下拉菜单、日期选择器、上传、步骤条、面包屑、锚点、返回顶部等。规范：尺寸、颜色、字体、间距、圆角、阴影、布局、容器、边距。适用于企业级中后台产品设计与开发。'
---

# 原型生成助手

使用模板和标准组件来生成企业级中台原型。包含组件的详细设计规范、16 种色彩体系、完整的字体排版系统，以及布局、间距、圆角、阴影等基础规范。

## 路径说明

> **`<skill-dir>`** 代表此技能的根目录：`.opencode/skills/hwork-ui-ux-v1`
>
> 文档中所有路径均使用此占位符，实际使用时替换为完整路径。

## 何时应用

在以下情况下参考这些规范：

- 设计或开发企业级中后台产品
- 实现符合 H-work 设计规范的 UI 组件
- 选择组件的颜色、尺寸、间距等样式
- 构建表单、表格、数据展示等业务场景
- 优先使用 `@hwork/ant-design-vue`,`@hwork/hwork-business-components`,`@hwork/icon` 组件库生成页面
- 读取组件库使用文档，`<skill-dir>/reference/` 目录下是所有组件的使用文档
- 严格遵循 H-work UI 设计规范（品牌色、尺寸、间距等）

## 如何使用

组件库基于 **vue@3.5.26** 进行开发，使用 `@hwork/ant-design-vue`(**基于ant-design-vue@4.1.2二次开发**) 组件库进行开发，请注意版本，使用api 请参考 `<skill-dir>/reference/hwork-ant-design-vue/a-[组件名称].md`;图标必须使用 `@hwork/icon`; 人员选择相关组件优先使用 `@hwork/hwork-business-components`。

## 规范优先级

| 优先级 | 类别           | 影响 | 说明                         |
| ------ | -------------- | ---- | ---------------------------- |
| 1      | 品牌色与功能色 | 关键 | 主色调、状态色必须严格遵守   |
| 2      | 组件尺寸与间距 | 关键 | 保证视觉一致性和可用性       |
| 3      | 字体排版       | 高   | 影响信息层级和可读性         |
| 4      | 交互状态       | 高   | hover、active、disabled 状态 |
| 5      | 布局与容器     | 中   | 页面结构和响应式             |
| 6      | 圆角与阴影     | 中   | 视觉风格统一性               |

## 快速参考

### 1. 品牌色（关键）

- **H-work Blue 主色** - `#165DFF` - 品牌主色，用于主要按钮、链接、选中状态
- **H-work Blue Hover** - `#4080FF` - 悬停状态
- **H-work Blue Active** - `#0E42D2` - 点击状态
- **H-work Blue Light** - `#E8F3FF` - 浅色背景
- **H-work Blue Border** - `#BEDAFF` - 边框色

### 2. 功能色（关键）

- **Success 成功** - `#00B42A` - 成功状态、确认操作
- **Warning 警告** - `#FF7D00` - 警告提示、需注意
- **Error 错误** - `#F53F3F` - 错误状态、危险操作
- **Info 信息** - `#165DFF` - 信息提示

### 3. 文字色（关键）

- **Primary 主要** - `#1D2129` - 标题、重要文字
- **Regular 常规** - `#4E5969` - 正文内容
- **Secondary 次要** - `#86909C` - 辅助说明
- **Placeholder 占位** - `#C9CDD4` - 输入提示
- **Disabled 禁用** - `#C9CDD4` - 禁用状态

### 4. 按钮规范（高）

- **高度** - Mini: 24px, Small: 28px, Default: 32px, Large: 36px
- **内边距** - Mini: 0 8px, Small: 0 12px, Default: 0 16px, Large: 0 20px
- **字号** - 统一 14px
- **圆角** - 2px
- **主按钮** - 背景 #165DFF，文字 #FFFFFF
- **次按钮** - 背景 #F2F3F5，文字 #4E5969

### 5. 字体排版（高）

- **字体家族** - 中文: PingFang SC, 英文: Roboto, 数字: DIN Alternate
- **H1 标题** - 20px / 600 / 28px 行高
- **H2 标题** - 18px / 600 / 26px 行高
- **H3 标题** - 16px / 500 / 24px 行高
- **正文** - 14px / 400 / 22px 行高
- **辅助文字** - 12px / 400 / 20px 行高

### 6. 间距系统（中）

- **超小间距** - 4px - 紧密元素
- **小间距** - 8px - 相关元素
- **默认间距** - 12px - 常规间距
- **中等间距** - 16px - 组件间距
- **大间距** - 20px - 区块间距
- **超大间距** - 24px - 页面区域

### 7. 布局容器（中）

- **页面内边距** - 20px
- **卡片内边距** - 16px
- **表格单元格** - 12px 16px
- **最大宽度** - 1200px（内容区）

### 8. 圆角与阴影（中）

- **小圆角** - 2px - 按钮、输入框
- **默认圆角** - 4px - 卡片、下拉菜单
- **大圆角** - 8px - 模态框
- **卡片阴影** - `0 2px 8px rgba(0, 0, 0, 0.08)`
- **下拉阴影** - `0 4px 10px rgba(0, 0, 0, 0.1)`

---

## 如何使用此技能

当用户请求 H-work UI 相关工作（设计、构建、创建、实现、审查、修复、改进）时，遵循此工作流程：

### 步骤 1：分析用户需求

从用户请求中提取关键信息：

- **场景**：中后台、管理系统、数据看板等
- **页面类型**：列表页、详情页、表单页、数据看板等
- **需求**：新建、修改、审查、优化等
- **页面元素**：分析页面结构、侧边栏，顶部导航，筛选项，输入框、表格、表单
- **组件**：按钮、表单、表格、导航、数据展示等

### 步骤 2：读取组件文档

**⚠️ 警告：此步骤为强制步骤，必须在生成代码之前执行！**

根据第一步的分析，选择合适的 `@hwork/ant-design-vue`、 `@hwork/hwork-business-components`
组件及从 `@hwork/icon` 选择图标 进行页面开发。

#### @hwork/ant-design-vue

| 组件名称         | 分类     | 功能描述      | 基础用法示例                                                                                                         |
| :--------------- | :------- | :------------ | :------------------------------------------------------------------------------------------------------------------- |
| **通用组件**     |          |               |                                                                                                                      |
| Button           | 通用     | 按钮组件      | `<a-button type="primary">主要按钮</a-button>`                                                                       |
| Typography       | 通用     | 排版组件      | `<a-typography>文本内容</a-typography>`                                                                              |
| **布局组件**     |          |               |                                                                                                                      |
| Divider          | 布局     | 分割线        | `<a-divider />`                                                                                                      |
| Flex             | 布局     | Flex 布局     | `<a-flex><div>内容</div></a-flex>`                                                                                   |
| Grid             | 布局     | 栅格系统      | `<a-row><a-col :span="12">左侧</a-col></a-row>`                                                                      |
| Layout           | 布局     | 布局容器      | `<a-layout><a-layout-header>Header</a-layout-header></a-layout>`                                                     |
| Space            | 布局     | 间距组件      | `<a-space><a-button>按钮1</a-button></a-space>`                                                                      |
| **导航组件**     |          |               |                                                                                                                      |
| Affix            | 导航     | 固钉组件      | `<a-affix :offset-top="120"><a-button>回到顶部</a-button></a-affix>`                                                 |
| Anchor           | 导航     | 锚点组件      | `<a-anchor><a-anchor-link href="#section" title="Section" /></a-anchor>`                                             |
| Breadcrumb       | 导航     | 面包屑导航    | `<a-breadcrumb><a-breadcrumb-item>首页</a-breadcrumb-item></a-breadcrumb>`                                           |
| Dropdown         | 导航     | 下拉菜单      | `<a-dropdown><a-button>菜单</a-button></a-dropdown>`                                                                 |
| Menu             | 导航     | 导航菜单      | `<a-menu :items="menuItems" v-model:selectedKeys="selectedKeys" />`                                                  |
| PageHeader       | 导航     | 页头组件      | `<a-page-header title="页面标题" />`                                                                                 |
| Pagination       | 导航     | 分页组件      | `<a-pagination :total="50" />`                                                                                       |
| Steps            | 导航     | 步骤条        | `<a-steps :current="1"><a-step title="步骤1" /></a-steps>`                                                           |
| **数据录入组件** |          |               |                                                                                                                      |
| AutoComplete     | 数据录入 | 自动完成      | `<a-auto-complete :options="options" />`                                                                             |
| Cascader         | 数据录入 | 级联选择器    | `<a-cascader :options="options" />`                                                                                  |
| Checkbox         | 数据录入 | 多选框        | `<a-checkbox-group :options="options" />`                                                                            |
| DatePicker       | 数据录入 | 日期选择器    | `<a-date-picker />`                                                                                                  |
| Form             | 数据录入 | 表单组件      | `<a-form><a-form-item label="用户名"><a-input /></a-form-item></a-form>`                                             |
| Input            | 数据录入 | 输入框        | `<a-input placeholder="请输入" />`                                                                                   |
| InputNumber      | 数据录入 | 数字输入框    | `<a-input-number :min="1" :max="10" />`                                                                              |
| Mentions         | 数据录入 | 提及组件      | `<a-mentions :options="options" />`                                                                                  |
| Numeric          | 数据录入 | 数字格式化    | `<a-numeric :value="1234.56" />`                                                                                     |
| Radio            | 数据录入 | 单选框        | `<a-radio-group :options="options" />`                                                                               |
| Rate             | 数据录入 | 评分组件      | `<a-rate />`                                                                                                         |
| Select           | 数据录入 | 选择器        | `<a-select><a-select-option value="1">选项1</a-select-option></a-select>`                                            |
| Slider           | 数据录入 | 滑动输入条    | `<a-slider />`                                                                                                       |
| Switch           | 数据录入 | 开关组件      | `<a-switch />`                                                                                                       |
| TimePicker       | 数据录入 | 时间选择器    | `<a-time-picker />`                                                                                                  |
| Transfer         | 数据录入 | 穿梭框        | `<a-transfer :data-source="data" />`                                                                                 |
| TreeSelect       | 数据录入 | 树选择器      | `<a-tree-select :tree-data="treeData" />`                                                                            |
| Upload           | 数据录入 | 文件上传      | `<a-upload><a-button>上传文件</a-button></a-upload>`                                                                 |
| **数据展示组件** |          |               |                                                                                                                      |
| Avatar           | 数据展示 | 头像组件      | `<a-avatar src="avatar.png" />`                                                                                      |
| Badge            | 数据展示 | 徽标数        | `<a-badge :count="5"><a-avatar /></a-badge>`                                                                         |
| Card             | 数据展示 | 卡片组件      | `<a-card title="卡片标题">卡片内容</a-card>`                                                                         |
| Carousel         | 数据展示 | 走马灯/轮播图 | `<a-carousel><div><h3>内容1</h3></div></a-carousel>`                                                                 |
| Collapse         | 数据展示 | 折叠面板      | `<a-collapse><a-collapse-panel key="1" header="标题">内容</a-collapse-panel></a-collapse>`                           |
| Comment          | 数据展示 | 评论组件      | `<a-comment author="作者" content="评论内容" />`                                                                     |
| Descriptions     | 数据展示 | 描述列表      | `<a-descriptions title="详情"><a-descriptions-item label="姓名">张三</a-descriptions-item></a-descriptions>`         |
| Ellipsis         | 数据展示 | 文本省略      | `<a-ellipsis :width="200">长文本内容</a-ellipsis>`                                                                   |
| Empty            | 数据展示 | 空状态        | `<a-empty />`                                                                                                        |
| Image            | 数据展示 | 图片组件      | `<a-image src="image.png" />`                                                                                        |
| List             | 数据展示 | 列表组件      | `<a-list :data-source="data"><a-list-item slot="renderItem" slot-scope="item">{{item.title}}</a-list-item></a-list>` |
| ListLayout       | 数据展示 | 列表布局      | `<a-list-layout><template #header>标题</template>内容</a-list-layout>`                                               |
| Popover          | 数据展示 | 气泡卡片      | `<a-popover content="气泡内容"><a-button>悬浮</a-button></a-popover>`                                                |
| QRCode           | 数据展示 | 二维码        | `<a-qrcode value="https://antdv.com" />`                                                                             |
| Scrollbar        | 数据展示 | 滚动条        | `<a-scrollbar><div style="height: 200px">长内容</div></a-scrollbar>`                                                 |
| Search           | 数据展示 | 搜索组件      | `<a-search placeholder="搜索" />`                                                                                    |
| Segmented        | 数据展示 | 分段控制器    | `<a-segmented :options="options" />`                                                                                 |
| Statistic        | 数据展示 | 统计数值      | `<a-statistic title="统计" :value="1234" />`                                                                         |
| Table            | 数据展示 | 表格组件      | `<a-table :columns="columns" :data-source="data" />`                                                                 |
| TableSettings    | 数据展示 | 表格设置      | `<a-table-settings />`                                                                                               |
| Tabs             | 数据展示 | 标签页        | `<a-tabs><a-tab-pane key="1" tab="标签1">内容1</a-tab-pane></a-tabs>`                                                |
| Tag              | 数据展示 | 标签组件      | `<a-tag color="blue">标签</a-tag>`                                                                                   |
| Timeline         | 数据展示 | 时间轴        | `<a-timeline><a-timeline-item>事件1</a-timeline-item></a-timeline>`                                                  |
| Tooltip          | 数据展示 | 文字提示      | `<a-tooltip title="提示文字"><a-button>按钮</a-button></a-tooltip>`                                                  |
| Tour             | 数据展示 | 引导组件      | `<a-tour :steps="steps" />`                                                                                          |
| Tree             | 数据展示 | 树形控件      | `<a-tree :tree-data="treeData" />`                                                                                   |
| **反馈组件**     |          |               |                                                                                                                      |
| Alert            | 反馈     | 警告提示      | `<a-alert message="提示信息" type="info" />`                                                                         |
| Drawer           | 反馈     | 抽屉组件      | `<a-drawer v-model:visible="visible" title="抽屉">内容</a-drawer>`                                                   |
| Message          | 反馈     | 全局提示      | `message.success('操作成功')`                                                                                        |
| Modal            | 反馈     | 模态框/对话框 | `<a-modal v-model:visible="visible" title="标题"><p>内容</p></a-modal>`                                              |
| Notification     | 反馈     | 通知提醒框    | `notification.open({ message: '通知标题', description: '内容' })`                                                    |
| Popconfirm       | 反馈     | 气泡确认框    | `<a-popconfirm title="确定要删除吗?" @confirm="confirm"><a-button>删除</a-button></a-popconfirm>`                    |
| Progress         | 反馈     | 进度条        | `<a-progress :percent="30" />`                                                                                       |
| Result           | 反馈     | 结果页        | `<a-result title="操作成功" />`                                                                                      |
| Skeleton         | 反馈     | 骨架屏        | `<a-skeleton />`                                                                                                     |
| Spin             | 反馈     | 加载中动画    | `<a-spin :spinning="spinning"><div>内容区域</div></a-spin>`                                                          |
| **其他组件**     |          |               |                                                                                                                      |
| App              | 其他     | 应用容器      | `<a-app><router-view /></a-app>`                                                                                     |
| BackTop          | 其他     | 回到顶部      | `<a-back-top />`                                                                                                     |
| ConfigProvider   | 其他     | 全局配置      | `<a-config-provider :locale="zhCN"><App /></a-config-provider>`                                                      |
| FloatButton      | 其他     | 悬浮按钮      | `<a-float-button />`                                                                                                 |
| PageLayout       | 其他     | 页面布局      | `<a-page-layout><template #header>标题</template>内容</a-page-layout>`                                               |
| Watermark        | 其他     | 水印组件      | `<a-watermark content="水印内容"><div>内容</div></a-watermark>`                                                      |

每个组件的详情可以从 `<skill-dir>/reference/hwork-ant-design-vue/` 目录读取相关组件文档，文件路径格式：

```
<skill-dir>/reference/hwork-ant-design-vue/a-{{组件的串行命名}}.md
```

比如 ListLayout，使用 Read 工具读取：`<skill-dir>/reference/hwork-ant-design-vue/a-list-layout.md`

#### @hwork/hwork-business-components

人员选择请使用此组件库的组件，组件可跨技术栈使用，每个组件实际是独立vue应用，使用时候需要进行初始化组件，实际是挂载独立的 vue 实例，其组件及用法：

| 组件名称      | 说明                                             | 初始化方式                                            |
| ------------- | ------------------------------------------------ | ----------------------------------------------------- |
| UserCard      | 用户信息浮层展示组件，鼠标悬停展示用户详细信息   | hwComps.hwUserCard.init(element, options);            |
| PersonnelList | 用户选择列表组件，适合表单内下拉框形式选择用户   | hwComps.hwPersonnelListSelect.init(element, options); |
| UserSelect    | 用户选择组件，适合弹窗内以穿梭框形式批量选择用户 | hwComps.hwUserSelect.init(element, options);          |

**如果在组件的挂载点在模板的 `slot` 里 请在 `nextTick` 里 `init` 组件**

每个组件的详细文档及 options 详细参数可以查看：

```
<skill-dir>/reference/hwork-business-components/{{组件的串行命名}}/index.md
```

比如查看 **PersonnelList 组件** 的用法，对此组件请一直使用 ` style: { width: "100%" }` ，来实现宽度自适应。

```javascript
import hwComps from '@hwork/hwork-business-components'

hwComps.hwPersonnelListSelect.init(personnelSelectRef.value, {
  value: undefined,
  placeholder: '请选择人',
  allowClear: true,
  style: { width: '100%' }, // 此组件请一直使用此属性
  onChange: (value) => {
    if (value && value.label) {
      searchParams.orderPerson = value.label
    } else {
      searchParams.orderPerson = ''
    }
  }
})
```

比如查看 **PersonnelList 组件** 的详细文档，使用 Read 工具读取：

- 业务组件文档：`<skill-dir>/reference/hwork-business-components/personnel-list/index.md`
- 组件参数详细文档：`<skill-dir>/reference/hwork-business-components/personnel-list/references/api_reference.md`
- 组件使用示例：`<skill-dir>/reference/hwork-business-components/personnel-list/references/code_examples.md`

#### 🚨 图表组件（强制读取）

**当页面需求中包含任何图表、数据可视化、趋势图、占比图、统计图等内容时，必须在生成代码前读取：**

```
<skill-dir>/reference/vue-echarts.md
```

**此文档包含 echarts 和 vue-echarts 的 CDN 地址、注册方式、配置示例，缺少任何一项都会导致图表白屏。**

#### @hwork/icon

提供 H-work 标准图标， 字体图标必须使用 `@hwork/icon` 提供的图标

##### 图标使用

按需引入图标,比如居中对齐的图标 `h-icon-align-center`可以直接这么使用:

```ts
import '@hwork/icon/align-center'
```

```html
<h-icon-align-center spin="true" rotate="60" />
```

##### 属性属性

| 属性   | 说明           | 类型    | 默认值  |
| ------ | -------------- | ------- | ------- |
| spin   | 是否有旋转动画 | boolean | `false` |
| rotate | 图标旋转角度   | number  | `0`     |

##### 所有图标

所有图标请读取 `<skill-dir>/reference/hwork-icon/references/icon_list.md`

**🚨🚨🚨 严格限制：只能使用搜索到的图标，禁止猜测或编造图标名！🚨🚨🚨**

**⛔ 禁止行为：**

- ❌ 禁止猜测图标名（如猜 `h-icon-setting`，正确是 `h-icon-settings`）
- ❌ 禁止编造图标名（如 `h-icon-save`、`h-icon-add`、`h-icon-remove` 都不存在）
- ❌ 禁止使用其他图标库（如 Ant Design Icons、Font Awesome 等）

**✅ 正确做法：使用搜索命令查找图标**

```bash
# 按用途搜索图标（推荐）
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "删除" --category icon
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "设置" --category icon
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "用户" --category icon
```

搜索结果中的 `Value` 字段即为可用的图标组件名。找不到合适的图标时，使用 `h-icon-settings` 作为默认图标，绝对不要编造图标名称。

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

**你必须使用 4.x 语法，以下 2.x/3.x 旧语法全部禁止：**

| ❌ 旧语法（2.x/3.x）                      | ✅ 正确语法（4.x）                                    |
| ----------------------------------------- | ----------------------------------------------------- |
| `slots: { customRender: 'action' }`       | `#bodyCell="{ column, record }"` slot                 |
| `customRender: 'slotName'`（字符串）      | `customRender: ({ text, record }) => ...`（函数）     |
| `customRender: (record) => ...`（未解构） | `customRender: ({ text, record }) => ...`（必须解构） |
| `scopedSlots: { ... }`                    | `v-slot` / `#slotName`                                |
| `<a-menu-item>` / `<a-sub-menu>` 模板标签 | `<a-menu :items="menuItems" />`（数据驱动）           |
| `new Vue()`                               | `createApp()`                                         |
| `data() { return {} }`                    | `setup() + ref() / reactive()`                        |
| `this.$message.success()`                 | `message.success()`                                   |
| `this.$modal.confirm()`                   | `Modal.confirm()`                                     |

**如果你不确定某个 API 是否属于旧版本，请先查阅 `<skill-dir>/reference/hwork-ant-design-vue/` 下的组件文档。**

---

- **使用 `@hwork/ant-design-vue` 导入标准组件**
- **严格遵循组件 API 和设计规范**
- **vue 必须调用 `createApp` 创建 vue 实例**
- **Table 的 columns 定义里不要使用`customRender`函数，使用 `#bodyCell` slot 来完成自定义列配置**
- **🚫 禁止使用 `slots: { customRender: 'xxx' }` 旧语法！这是 Ant Design Vue 2.x 语法，在 4.x 中已废弃，会导致运行时错误**
- **🚫 `customRender` 必须是函数，禁止使用字符串！`customRender: 'actionSlot'` 是 2.x 旧语法，4.x 已废弃。正确写法：`customRender: ({ text, record }) => h('span', text)`**
- **🚨 `customRender` 回调参数必须使用解构语法 `({ text, record, index, column })`，禁止直接写 `(record)`！直接写 `(record)` 拿到的是整个参数对象而非行数据，访问 `record.xxx` 会报 `Cannot read properties of undefined`。正确写法：`customRender: ({ record }) => \`$\${record.prices["20GP"]}\``**
- **用于搜索区域选择用户/人员的组件要用带搜索功能的下拉选择器 `a-select`实现**
- **`a-search-item` 内的表单控件（如 `a-select`、`a-input` 等）不要设置固定宽度（如 `style="width: 180px"`），组件会自动处理响应式布局**
- **占位图需要使用域名 `api-cn-sp000849-i.hwork.haier.net` ，使用`bg` 参数设置 `background-color`,使用`fg` 设置文字颜色 ,`text` 设置文字,比如宽 300px、 高 400px 的占位图地址`https://api-cn-sp000849-i.hwork.haier.net/placeholder/300x400?bg=FF2025&fg=ffffff&text=Hello&size=50`**
- **`a-table`内使用 `a-button`需要使用 type="inline"，并且不需要重置 margin 值**
- **🚨🚨🚨 `a-menu` 的 `v-model:selectedKeys` 绑定值必须是`数组`（如 `ref(['key1'])`），绝对禁止使用字符串（如 `ref('key1')`）。比较 selectedKeys 时也必须用数组元素比较（如 `selectedKeys.value[0] === 'key1'`），禁止拿数组和字符串直接比较。这是高频错误，违反视为 BUG 🚨🚨🚨**
- **🚫 `a-menu` 禁止在模板中使用 `<a-menu-item>`、`<a-sub-menu>` 子组件标签！必须使用 `:items` 属性以数据驱动方式配置菜单项。正确写法：`<a-menu :items="menuItems" />`，其中 `menuItems` 是 `ItemType[]` 数组**
- **`a-card` 的 `extra`、`title` 如果需要放按钮、链接等 HTML 内容，必须使用 `#extra`、`#title` slot，禁止通过 `:extra` 属性传入 HTML 字符串**

- **🚨🚨🚨 图表实现强制规则（违反视为任务失败）🚨🚨🚨**
  - **禁止**：用占位图、空 div、注释、`<!-- 图表区域 -->`、示例伪代码代替图表
  - **禁止**：只写容器不写 ECharts option 配置
  - **禁止**：使用 canvas 手绘或 CSS 模拟图表
  - **必须**：读取 `<skill-dir>/reference/vue-echarts.md`
  - **必须**：为每个图表定义完整的 `ref({...})` 配置项（含 title、tooltip、xAxis/yAxis、series 等）
  - **必须**：使用 `<v-chart :option="xxxOption" style="height: 300px;" autoresize />` 渲染
  - **必须**：图表数据使用合理的模拟数据（不能是空数组）
  - **检测方法**：如果生成的 HTML 中包含"图表"、"chart"、"统计"、"趋势"、"占比"等关键词但没有 `v-chart` 标签，则视为未实现

**⚠️ 重要：导入与注册规范**

**必须使用 `@hwork/ant-design-vue` 而不是 `ant-design-vue` 进行导入！**

### 核心规则：使用的组件必须导入，导入即需要use

1. **只导入实际使用的组件**（不要全量导入）
2. **导入的组件必须全部 use 注册**（导入了不 use 会导致问题）
3. **子组件必须同时导入并注册其父组件**
4. **🚫 禁止重复导入同一组件**

### 父子组件依赖关系（使用子组件必须同时导入并注册父组件）

| 子组件                                                 | 必须同时注册的父组件                              |
| ------------------------------------------------------ | ------------------------------------------------- |
| RangePicker, MonthPicker, WeekPicker                   | DatePicker                                        |
| TimeRangePicker                                        | TimePicker                                        |
| CheckboxGroup                                          | Checkbox                                          |
| RadioGroup                                             | Radio                                             |
| InputPassword, InputSearch, InputTextArea              | Input                                             |
| SelectOption                                           | Select                                            |
| TreeSelectNode                                         | TreeSelect                                        |
| MenuItem, SubMenu                                      | Menu（⚠️ 推荐使用 :items 数据驱动，无需单独注册） |
| TabPane                                                | Tabs                                              |
| CollapsePanel                                          | Collapse                                          |
| Step                                                   | Steps                                             |
| FormItem                                               | Form                                              |
| LayoutHeader, LayoutSider, LayoutContent, LayoutFooter | Layout                                            |

读取以上规范后，根据组件文档和设计规范生成代码。

---

## 搜索参考

### 可用类别

| 类别         | 说明       | 示例关键词                   |
| ------------ | ---------- | ---------------------------- |
| `button`     | 按钮规范   | 尺寸、颜色、状态、类型、形状 |
| `input`      | 输入框规范 | 高度、边框、占位符、禁用     |
| `select`     | 选择器规范 | 下拉、多选、搜索             |
| `table`      | 表格规范   | 行高、边框、斑马纹、排序     |
| `form`       | 表单规范   | 标签、布局、验证、间距       |
| `menu`       | 菜单规范   | 导航、侧边栏、下拉           |
| `tab`        | 标签页规范 | 样式、间距、激活状态         |
| `pagination` | 分页规范   | 尺寸、间距、跳转             |
| `modal`      | 模态框规范 | 尺寸、遮罩、动画             |
| `color`      | 颜色规范   | 品牌色、功能色、文字色       |
| `font`       | 字体规范   | 字体家族、字号、行高         |
| `layout`     | 布局规范   | 容器、栅格、响应式           |
| `margin`     | 间距规范   | 内边距、外边距、间隔         |
| `radius`     | 圆角规范   | 小圆角、默认、大圆角         |
| `shadow`     | 阴影规范   | 卡片、下拉、浮层             |

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
4. **组合搜索** - 组件 + 颜色 + 字体 = 完整设计
5. **关注优先级** - 优先应用 High 和 Critical 级别的规范
6. **保持一致性** - 同一项目使用相同的规范标准

---

## 设计规范检查清单

在交付 UI 代码之前，必须验证这些项目：

### 颜色规范 ⭐

- [ ] 使用 H-work Blue (#165DFF) 作为品牌主色
- [ ] 功能色正确（成功绿 #00B42A、警告橙 #FF7D00、错误红 #F53F3F）
- [ ] 文字色符合层级（主要 #1D2129、常规 #4E5969、次要 #86909C）
- [ ] 背景色和边框色符合规范

### 组件规范 ⭐

- [ ] 按钮尺寸、内边距、圆角符合规范（高度：24/28/32/36px，圆角：2px）
- [ ] 输入框高度、边框、占位符符合规范
- [ ] 表格行高、边框、斑马纹符合规范
- [ ] 所有组件的交互状态完整（hover、active、disabled）

### 字体排版 ⭐

- [ ] 使用正确的字体家族（PingFang SC / Roboto / DIN Alternate）
- [ ] 标题字号和字重符合规范（H1: 20px/600, H2: 18px/600, H3: 16px/500）
- [ ] 正文字号 14px，行高 22px
- [ ] 辅助文字 12px，行高 20px

### 布局与间距 ⭐

- [ ] 页面内边距 20px
- [ ] 卡片内边距 16px
- [ ] 组件间距使用规范的间距系统（4/8/12/16/20/24px）
- [ ] 表单标签和输入框间距合理

### 视觉细节

- [ ] 圆角使用规范值（2px/4px/8px）
- [ ] 阴影效果符合规范
- [ ] 边框颜色和宽度正确
- [ ] 图标大小和间距符合规范

### 检查方法

使用搜索脚本进行自动化检查：

```bash
# 颜色检查
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "brand color" --category color

# 组件检查
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "button size" --category button

# 字体检查
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "font size" --category font

# 间距检查
python3 .opencode/skills/hwork-ui-ux-v1/scripts/search.py "padding" --category margin
```

## 注意事项

1. **严格遵守品牌色** - H-work Blue (#165DFF) 是品牌识别的核心
2. **保持视觉一致性** - 所有组件使用统一的尺寸、间距、圆角系统
3. **关注交互状态** - 确保所有交互元素都有完整的状态反馈
4. **优先级指导** - 优先应用 High 和 Critical 级别的规范
5. **响应式设计** - 考虑不同屏幕尺寸下的布局适配
6. **无障碍性** - 确保颜色对比度、焦点状态、键盘导航符合无障碍标准
