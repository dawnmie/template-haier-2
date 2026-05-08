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
