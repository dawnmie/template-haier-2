# 搜索人员

根据关键词分页搜索 Hwork 平台用户，支持按姓名、工号等条件模糊查询，可筛选在职状态、角色、账号类型等。

## 接口信息

| 项目         | 值                                                                                                       |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| 请求方式     | `POST`                                                                                                   |
| 接口地址     | `https://api-cn-sp000610-search.hwork.haier.net/hworkSearch/v1/console/queryUserPageBySearchConditionV2` |
| 认证方式     | `Bearer Token`                                                                                           |
| Content-Type | `application/json`                                                                                       |

## 请求参数

### Body 参数（JSON）

| 参数名          | 类型             | 必填 | 默认值                      | 说明                                                             |
| --------------- | ---------------- | ---- | --------------------------- | ---------------------------------------------------------------- |
| query           | string           | 是   | -                           | 搜索关键词（姓名、工号等）                                       |
| pageIndex       | number           | 是   | `1`                         | 当前页码，从 1 开始                                              |
| pageSize        | number           | 是   | `10`                        | 每页条数                                                         |
| cardKey         | string           | 是   | `"search_common_card"`      | 卡片类型标识，固定传 `"search_common_card"`                      |
| userStatus      | string           | 否   | `"1"`                       | 用户状态：`"1"` 在职                                             |
| term            | string           | 否   | `"contract"`                | 搜索范围/类型                                                    |
| ifExcludeSelf   | boolean          | 否   | `false`                     | 是否排除当前登录用户                                             |
| roleCodes       | string[] \| null | 否   | `null`                      | 按角色编码筛选，`null` 表示不限                                  |
| accountTypeList | string[]         | 否   | `[]`                        | 按账号类型筛选，空数组表示不限                                   |
| userStatusList  | string[]         | 否   | `["1"]`                     | 用户状态列表筛选，`["1"]` 表示仅在职                             |
| sorts           | object[]         | 否   | `[{"column":"","sort":""}]` | 排序规则，`column` 为排序字段，`sort` 为排序方向（`asc`/`desc`） |

### 请求体示例

```json
{
  "cardKey": "search_common_card",
  "pageIndex": 1,
  "pageSize": 10,
  "query": "崔久",
  "userStatus": "1",
  "sorts": [{ "column": "", "sort": "" }],
  "term": "contract",
  "ifExcludeSelf": false,
  "roleCodes": null,
  "accountTypeList": [],
  "userStatusList": ["1"]
}
```

## 请求示例

### 使用 service 实例（推荐）

```javascript
import service from '@/utils/request'

/**
 * 搜索人员
 * @param {string} query - 搜索关键词（姓名、工号等）
 * @param {object} [options] - 可选参数
 * @param {number} [options.pageIndex=1] - 页码
 * @param {number} [options.pageSize=10] - 每页条数
 * @param {boolean} [options.ifExcludeSelf=false] - 是否排除自己
 * @param {string[]} [options.userStatusList=['1']] - 用户状态列表
 * @returns {Promise<{ total: number, data: object[] }>}
 */
export async function searchUsers(query, options = {}) {
  const { pageIndex = 1, pageSize = 10, ifExcludeSelf = false, userStatusList = ['1'] } = options

  const res = await service.post(
    'https://api-cn-sp000610-search.hwork.haier.net/hworkSearch/v1/console/queryUserPageBySearchConditionV2',
    {
      cardKey: 'search_common_card',
      pageIndex,
      pageSize,
      query,
      userStatus: '1',
      sorts: [{ column: '', sort: '' }],
      term: 'contract',
      ifExcludeSelf,
      roleCodes: null,
      accountTypeList: [],
      userStatusList
    }
  )
  if (res.code !== 200) {
    throw new Error(res.message || '搜索人员失败')
  }
  return res.data
}
```

### 使用 curl

```bash
curl 'https://api-cn-sp000610-search.hwork.haier.net/hworkSearch/v1/console/queryUserPageBySearchConditionV2' \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -H 'Accept: */*' \
  --data-raw '{
    "cardKey": "search_common_card",
    "pageIndex": 1,
    "pageSize": 10,
    "query": "崔久",
    "userStatus": "1",
    "sorts": [{"column": "", "sort": ""}],
    "term": "contract",
    "ifExcludeSelf": false,
    "roleCodes": null,
    "accountTypeList": [],
    "userStatusList": ["1"]
  }'
```

## 响应格式

### 完整响应结构

```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "total": 7,
    "totalPage": 1,
    "page": 1,
    "pageSize": 10,
    "data": [
      {
        "summary": "软件开发（前端开发）-架构方案",
        "deptName": "架构方案",
        "englishName": "Jiudai Cui",
        "ifMessage": "true",
        "icon": "https://hwork-cdn.haier.net/hwork_permission_center_prod/2de097669cc6439f99fa0efcded7c7c4.png",
        "imUserId": "p01442042",
        "title": "崔久代 | 01442042",
        "userName": "崔久代",
        "userId": "01442042",
        "gwName": "软件开发（前端开发）"
      }
    ]
  },
  "requestId": "ddfcefa7d8fc7e262620c9bae4b70419"
}
```

> **注意**：此接口的响应消息字段名为 `message`（非 `msg`），与获取用户信息接口不同。

### data 字段说明

#### 分页信息

| 字段      | 类型   | 说明     | 示例值 |
| --------- | ------ | -------- | ------ |
| total     | number | 总记录数 | `7`    |
| totalPage | number | 总页数   | `1`    |
| page      | number | 当前页码 | `1`    |
| pageSize  | number | 每页条数 | `10`   |

#### data.data[] 用户列表项

| 字段        | 类型   | 说明                                         | 示例值                              |
| ----------- | ------ | -------------------------------------------- | ----------------------------------- |
| userId      | string | 用户工号（唯一标识）                         | `"01442042"`                        |
| userName    | string | 用户中文姓名                                 | `"崔久代"`                          |
| englishName | string | 用户英文姓名                                 | `"Jiudai Cui"`                      |
| title       | string | 显示标题，格式：`姓名 \| 工号`               | `"崔久代 \| 01442042"`              |
| summary     | string | 摘要信息，格式：`岗位名称-部门名称`          | `"软件开发（前端开发）-架构方案"`   |
| deptName    | string | 部门名称                                     | `"架构方案"`                        |
| gwName      | string | 岗位名称                                     | `"软件开发（前端开发）"`            |
| icon        | string | 用户头像 URL                                 | `"https://hwork-cdn.haier.net/..."` |
| imUserId    | string | IM 用户 ID，格式：`p{工号}`                  | `"p01442042"`                       |
| ifMessage   | string | 是否可发消息（`"true"` / `"false"`，字符串） | `"true"`                            |

## 使用场景

### 1. 搜索选人组件

```javascript
import { ref } from 'vue'
import service from '@/utils/request'

const searchLoading = ref(false)
const userOptions = ref([])

async function handleSearch(keyword) {
  if (!keyword || keyword.length < 2) {
    userOptions.value = []
    return
  }
  searchLoading.value = true
  try {
    const res = await service.post(
      'https://api-cn-sp000610-search.hwork.haier.net/hworkSearch/v1/console/queryUserPageBySearchConditionV2',
      {
        cardKey: 'search_common_card',
        pageIndex: 1,
        pageSize: 10,
        query: keyword,
        userStatus: '1',
        sorts: [{ column: '', sort: '' }],
        term: 'contract',
        ifExcludeSelf: false,
        roleCodes: null,
        accountTypeList: [],
        userStatusList: ['1']
      }
    )
    if (res.code === 200) {
      userOptions.value = res.data.data.map((item) => ({
        label: `${item.userName}（${item.userId}）`,
        value: item.userId,
        userName: item.userName,
        deptName: item.deptName,
        gwName: item.gwName,
        icon: item.icon
      }))
    }
  } catch (error) {
    console.error('搜索人员失败:', error)
  } finally {
    searchLoading.value = false
  }
}
```

```html
<a-select
  show-search
  :filter-option="false"
  :loading="searchLoading"
  :options="userOptions"
  placeholder="输入姓名或工号搜索"
  @search="handleSearch"
/>
```

### 2. 分页搜索列表

```javascript
import { ref, reactive } from 'vue'
import service from '@/utils/request'

const searchResult = reactive({
  list: [],
  total: 0,
  loading: false
})
const pagination = reactive({
  current: 1,
  pageSize: 10
})

async function fetchUsers(keyword) {
  searchResult.loading = true
  try {
    const res = await service.post(
      'https://api-cn-sp000610-search.hwork.haier.net/hworkSearch/v1/console/queryUserPageBySearchConditionV2',
      {
        cardKey: 'search_common_card',
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
        query: keyword,
        userStatus: '1',
        sorts: [{ column: '', sort: '' }],
        term: 'contract',
        ifExcludeSelf: false,
        roleCodes: null,
        accountTypeList: [],
        userStatusList: ['1']
      }
    )
    if (res.code === 200) {
      searchResult.list = res.data.data
      searchResult.total = res.data.total
    }
  } catch (error) {
    console.error('搜索人员失败:', error)
  } finally {
    searchResult.loading = false
  }
}
```

### 3. 排除自己的搜索

```javascript
// 搜索时排除当前登录用户
const res = await service.post(
  'https://api-cn-sp000610-search.hwork.haier.net/hworkSearch/v1/console/queryUserPageBySearchConditionV2',
  {
    cardKey: 'search_common_card',
    pageIndex: 1,
    pageSize: 10,
    query: '张三',
    userStatus: '1',
    sorts: [{ column: '', sort: '' }],
    term: 'contract',
    ifExcludeSelf: true, // 排除自己
    roleCodes: null,
    accountTypeList: [],
    userStatusList: ['1']
  }
)
```

## 错误处理

```javascript
try {
  const res = await service.post(
    'https://api-cn-sp000610-search.hwork.haier.net/hworkSearch/v1/console/queryUserPageBySearchConditionV2',
    {
      /* 参数 */
    }
  )
  if (res.code !== 200) {
    message.error(res.message || '搜索人员失败')
    return
  }
  const { total, data: users } = res.data
} catch (error) {
  console.error('请求失败:', error)
  message.error('网络异常，请稍后重试')
}
```

## 注意事项

1. **此接口响应的消息字段是 `message`**（非 `msg`），与获取用户信息接口不同，注意区分
2. **`ifMessage` 是字符串类型**（`"true"` / `"false"`），不是布尔值，判断时注意：`item.ifMessage === 'true'`
3. **`query` 支持模糊搜索**，可以输入姓名片段或工号片段
4. **建议搜索关键词至少 2 个字符**，避免返回过多结果
5. **`icon` 字段**是完整的 CDN URL，可直接用于 `<a-avatar :src="item.icon" />`
6. **`userId` 即工号**，与获取用户信息接口返回的 `userCode` 含义相同
7. **`imUserId`** 格式为 `p{工号}`，用于 IM 消息发送场景
8. **`title` 字段**已格式化为 `姓名 | 工号`，可直接用于下拉选项展示
