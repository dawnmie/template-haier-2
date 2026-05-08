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
