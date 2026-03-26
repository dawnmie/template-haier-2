# sub-application-template

基于 Qiankun + Vue3 + Vite + Pinia 的微前端子应用模板

## 📚 文档链接

- [HworkJSApi 接入文档](https://hwork-internal.haier.net/openPlatform/docs/info?code=WDZX0001A&type=subProduct&docId=416) - Hwork 平台 JS API 使用指南

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 本地开发
```bash
# 测试环境
npm run test

# 预发环境
npm run pre

# 生产环境
npm run prod
```

## 📦 打包构建

### 测试环境
- 打包命令：`npm run build:test`
- 更新方式：[X平台](https://x.haier.net/)

### 预发环境
- 打包命令：`npm run build:pre`
- 更新方式：[X平台](https://x.haier.net/)

### 生产环境
- 打包命令：`npm run build:prod`
- 更新方式：[X平台](https://x.haier.net/)

## 🛠️ 技术栈

- **框架**: Vue 3.x
- **构建工具**: Vite 4.x
- **状态管理**: Pinia 2.x
- **UI 组件**: ant-design-vue（公共 npm，见 `.npmrc`）
- **微前端**: vite-plugin-qiankun
- **路由**: Vue Router 4.x
- **HTTP 请求**: Axios
- **代码规范**: ESLint

## 📁 项目结构

```
sub-application-template/
├── public/              # 静态资源
├── src/
│   ├── api/            # API 接口
│   ├── assets/         # 资源文件
│   ├── pinia/          # 状态管理
│   ├── router/         # 路由配置
│   ├── styles/         # 样式文件
│   ├── tool/           # 工具函数
│   ├── utils/          # 工具类
│   ├── views/          # 页面组件
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── .env.test           # 测试环境变量
├── .env.pre            # 预发环境变量
├── .env.prod           # 生产环境变量
├── vite.config.js      # Vite 配置
└── package.json        # 项目配置
```

## ⚙️ 应用配置规范

### 应用编码命名规范

为确保微前端应用正常运行，以下配置项必须保持一致：

#### 1. 核心配置统一
- **开发者平台** - 应用编码
- **开放平台** - 微前端配置中的网关前缀
- **开放平台** - 微前端配置中的子应用项目名称
- **package.json** - `name` 字段

**建议：** 以上所有配置使用相同的命名，例如：`sub-application-template`

#### 2. 项目中的关键配置

##### 2.1 main.js - 路由配置
```javascript
// src/main.js
const router = createRouter({
  history: createWebHistory(
    window.__POWERED_BY_QIANKUN__
      ? `${props?.mainName}/${name}`  // name 必须与开放平台的网关前缀一致
      : name
  ),
  routes
})
```

##### 2.2 vite.config.js - 基础路径配置
```javascript
// vite.config.js
const baseMap = {
  'development': `/${name}/`,
  'test': `https://t-hw.haier.net/${name}/`,      // name 必须与开发者平台的应用编码一致
  'pre': `https://p-hw.haier.net/${name}/`,
  'prod': `https://hw.haier.net/${name}/`
}
```

##### 2.3 vite.config.js - Qiankun 配置
```javascript
// vite.config.js
qiankun(name, {  // name 必须与开放平台的子应用项目名称一致
  useDevMode: true
})
```

#### 3. 配置检查清单

创建新应用时，请按以下步骤检查配置：

- [ ] 在开发者平台创建应用，记录应用编码
- [ ] 在开放平台创建微前端配置，网关前缀和子应用项目名称与应用编码保持一致
- [ ] 修改 `package.json` 中的 `name` 字段为应用编码
- [ ] 确认 `main.js` 中路由配置使用了正确的 `name`
- [ ] 确认 `vite.config.js` 中 `baseMap` 和 `qiankun` 配置使用了正确的 `name`

#### 4. 常见问题

**Q: 为什么要保持这些配置一致？**  
A: 微前端架构依赖统一的应用标识来进行路由匹配、资源加载和应用通信。配置不一致会导致应用无法正常加载或路由错误。

**Q: 如果配置不一致会出现什么问题？**  
A: 可能出现以下问题：
- 应用无法在主应用中正常加载
- 路由跳转失败或 404 错误
- 静态资源加载失败
- 应用间通信异常

**Q: 修改应用编码后需要做什么？**  
A: 需要同步修改：
1. package.json 的 name 字段
2. 开放平台的微前端配置
3. 重新构建和部署应用

## 🔧 工具函数

### messageTip - 消息提示

封装的 ElMessage，自动适配微前端环境，用法与 ElMessage 一致：

```javascript
import { messageTip } from '@/tool/tool.js'

// 基础用法
messageTip('这是一条消息')
messageTip({ message: '这是一条消息', type: 'success' })

// 快捷方法
messageTip.success('成功消息')
messageTip.warning('警告消息')
messageTip.info('提示消息')
messageTip.error('错误消息')

// 关闭所有消息
messageTip.closeAll()
```

## 🌐 HworkJSApi 使用

项目已集成 HworkJSApi，可在组件中直接使用：

```javascript
import { hworkJSApi, EventEmitter } from '@/main'

// 获取 Token
const token = hworkJSApi.getToken()

// 获取用户信息
const userInfo = hworkJSApi.getUserInfo()

// 监听事件
EventEmitter.on('main.changeZone', (data) => {
  console.log('空间信息变化', data)
})
```

详细 API 文档请查看：[HworkJSApi 接入文档](https://hwork-internal.haier.net/openPlatform/docs/info?code=WDZX0001A&type=subProduct&docId=416)

## 📝 代码规范

### ESLint 检查
```bash
npm run fix
```

## 🔗 相关链接

- [X平台](https://x.haier.net/) - 构建部署平台
- [Hwork 开放平台](https://hwork-internal.haier.net/openPlatform/) - 开放平台文档
