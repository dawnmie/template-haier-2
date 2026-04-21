---
name: hwork-api
description: '列举了开放给应用的可调用接口; 包括调用方式，返回数据结构，接口包括获取当前用户信息接口、根据姓名和工号搜索用户接口'
---

# Hwork 平台 API 接口文档

本技能提供 Hwork 平台所有可用 API 接口的调用规范，包括请求方式、参数说明、响应格式和代码示例。

## 路径说明

> **`<skill-dir>`** 代表此技能的根目录：`.opencode/skills/hwork-api`
>
> 文档中所有路径均使用此占位符，实际使用时替换为完整路径。

## 何时应用

在以下情况下参考此文档：

- 需要调用 Hwork 平台 API 获取用户信息、组织信息等
- 对接 Hwork 平台的认证、权限等接口
- 前端页面需要展示当前登录用户的信息
- 需要查询组织架构、部门、人员等数据

## 通用规范

### 请求基础地址

```
https://api-cn-sp000922.hwork.haier.net
```

### 认证方式

所有接口均需要在请求头中携带 `Authorization` 字段，值为 `Bearer {token}`。

Token 获取方式：

- **预览环境**：由预览 URL 自动注入
- **发布环境**：由微前端框架注入
- **代码中获取**：通过 `window.hwork?.getToken()` 或 `HworkJSApi.getToken()` 获取

### 请求方式

使用项目中的 `service` 实例（`src/utils/request.js`）发起请求：

```javascript
import service from '@/utils/request'
```

### 通用请求头

| Header            | 值                 | 说明       |
| ----------------- | ------------------ | ---------- |
| Authorization     | `Bearer {token}`   | 认证令牌   |
| Accept            | `application/json` | 响应格式   |
| X-Client-Language | `zh-CN`            | 客户端语言 |

### 通用响应格式

所有接口返回统一的 JSON 结构：

```json
{
  "code": 200,
  "msg": "处理成功!",
  "data": { ... },
  "responseTime": "2026-04-17 19:14:01",
  "requestId": "9763a279e5d3cebe986f26114f9b23d3"
}
```

| 字段         | 类型   | 说明                                        |
| ------------ | ------ | ------------------------------------------- |
| code         | number | 状态码，200 表示成功                        |
| msg          | string | 响应消息                                    |
| data         | object | 业务数据                                    |
| responseTime | string | 服务端响应时间（格式：YYYY-MM-DD HH:mm:ss） |
| requestId    | string | 请求唯一标识，用于问题排查                  |

---

## 接口列表

详细接口文档请查看 `<skill-dir>/reference/` 目录下的对应文件：

| 接口名称         | 文档路径                                         | 说明                                |
| ---------------- | ------------------------------------------------ | ----------------------------------- |
| 获取当前用户信息 | `<skill-dir>/reference/user/get-current-user.md` | 获取当前登录用户的详细信息          |
| 搜索人员         | `<skill-dir>/reference/user/search-users.md`     | 根据姓名/工号模糊搜索用户，支持分页 |

---

## 快速参考

### 获取当前用户信息

```javascript
import service from '@/utils/request'

const res = await service.get(
  'https://api-cn-sp000922.hwork.haier.net/hwork/base/third-party/authCenterApi/api/v2/me',
  { params: { domain: true } }
)
const user = res.data // 用户信息对象
```

返回的用户信息包含：用户编码、姓名、邮箱、手机号、部门、岗位、角色、头像等。

详细字段说明请查看：`<skill-dir>/reference/user/get-current-user.md`

### 搜索人员

```javascript
import service from '@/utils/request'

const res = await service.post(
  'https://api-cn-sp000610-search.hwork.haier.net/hworkSearch/v1/console/queryUserPageBySearchConditionV2',
  {
    cardKey: 'search_common_card',
    pageIndex: 1,
    pageSize: 10,
    query: '崔久',
    userStatus: '1',
    sorts: [{ column: '', sort: '' }],
    term: 'contract',
    ifExcludeSelf: false,
    roleCodes: null,
    accountTypeList: [],
    userStatusList: ['1']
  }
)
const { total, data: users } = res.data // users 为用户数组
```

返回的用户列表项包含：工号（userId）、姓名（userName）、部门（deptName）、岗位（gwName）、头像（icon）等。

> **注意**：此接口响应的消息字段是 `message`（非 `msg`），与获取用户信息接口不同。

详细字段说明请查看：`<skill-dir>/reference/user/search-users.md`

---

## 注意事项

1. **必须使用 `service` 实例**发起请求，不要直接使用 `axios` 或 `fetch`
2. **Token 由框架自动注入**，无需手动管理（`service` 拦截器会自动添加 Authorization 头）
3. **接口地址必须使用完整 URL**（含协议和域名），因为 `service` 的 `baseURL` 为空
4. **错误处理**：检查 `res.code === 200`，非 200 时使用 `res.msg` 提示用户
5. **数据类型注意**：部分字段可能为 `null`，使用前需做空值判断
