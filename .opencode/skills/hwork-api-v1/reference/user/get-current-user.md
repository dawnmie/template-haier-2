# 获取当前用户信息

获取当前登录用户的详细信息，包括基本信息、组织信息、角色权限、域分类等。

## 接口信息

| 项目     | 值                                                                                       |
| -------- | ---------------------------------------------------------------------------------------- |
| 请求方式 | `GET`                                                                                    |
| 接口地址 | `https://api-cn-sp000922.hwork.haier.net/hwork/base/third-party/authCenterApi/api/v2/me` |
| 认证方式 | `Bearer Token`                                                                           |

## 请求参数

### Query 参数

| 参数名 | 类型    | 必填 | 默认值 | 说明                                        |
| ------ | ------- | ---- | ------ | ------------------------------------------- |
| domain | boolean | 否   | false  | 是否返回域（domain）相关信息，建议传 `true` |

## 请求示例

### 使用 service 实例（推荐）

```javascript
import service from '@/utils/request'

/**
 * 获取当前登录用户信息
 * @param {boolean} [withDomain=true] - 是否包含域信息
 * @returns {Promise<object>} 用户信息对象
 */
export async function getCurrentUser(withDomain = true) {
  const res = await service.get(
    'https://api-cn-sp000922.hwork.haier.net/hwork/base/third-party/authCenterApi/api/v2/me',
    { params: { domain: withDomain } }
  )
  if (res.code !== 200) {
    throw new Error(res.msg || '获取用户信息失败')
  }
  return res.data
}
```

### 使用 curl

```bash
curl 'https://api-cn-sp000922.hwork.haier.net/hwork/base/third-party/authCenterApi/api/v2/me?domain=true' \
  -H 'Authorization: Bearer {token}' \
  -H 'Accept: application/json' \
  -H 'X-Client-Language: zh-CN'
```

## 响应格式

### 完整响应结构

```json
{
  "code": 200,
  "msg": "处理成功!",
  "data": {
    "id": null,
    "userCode": "01442042",
    "userEmail": "cuijiudai@haier.com",
    "userPhone": "17505329953",
    "userSex": "1",
    "userParent": "19006974",
    "userPhoto": "https://hwork-cdn.haier.net/hwork_permission_center_prod/2de097669cc6439f99fa0efcded7c7c4.png",
    "employeestatus": "1",
    "userName": "崔久代",
    "createUser": null,
    "updateUser": "IDM用户推送",
    "gwname": "软件开发（前端开发）",
    "haierdeptcode": "10137606",
    "birthday": null,
    "createTime": "2025-10-14 23:44:13",
    "updateTime": "2025-10-14 23:44:13",
    "roleCode": "zxptry",
    "roleName": "通用角色",
    "orgCode": "10137606",
    "orgName": "架构方案",
    "gwId": null,
    "gwName": "软件开发（前端开发）",
    "classifies": [
      "caigou",
      "chain",
      "DCN000044",
      "finance",
      "gc",
      "hw",
      "hwork_market",
      "kefu",
      "produce",
      "ProducePark",
      "szyh",
      "szyhjsz",
      "yanfa",
      "YHTYY",
      "zjfw",
      "zjrl",
      "zjzl",
      "zs"
    ],
    "mainDomainCode": "szyhjsz",
    "mainDomainName": "IT中心",
    "orgRange": "zhijia",
    "showType": 1,
    "topNavigation": 1,
    "displayForm": 1,
    "country": "CN",
    "userFlag": 0,
    "firstLineCode": "19006974",
    "firstLineName": "马云龙",
    "dataSource": "IAM_CN",
    "englishName": "Jiudai Cui",
    "englishAliasName": ""
  },
  "responseTime": "2026-04-17 19:14:01",
  "requestId": "9763a279e5d3cebe986f26114f9b23d3"
}
```

### data 字段说明

#### 基本信息

| 字段             | 类型         | 说明                       | 示例值                              |
| ---------------- | ------------ | -------------------------- | ----------------------------------- |
| id               | string\|null | 用户 ID（可能为 null）     | `null`                              |
| userCode         | string       | 用户工号（唯一标识）       | `"01442042"`                        |
| userName         | string       | 用户中文姓名               | `"崔久代"`                          |
| englishName      | string       | 用户英文姓名               | `"Jiudai Cui"`                      |
| englishAliasName | string       | 英文别名                   | `""`                                |
| userEmail        | string       | 用户邮箱                   | `"cuijiudai@haier.com"`             |
| userPhone        | string       | 用户手机号                 | `"17505329953"`                     |
| userSex          | string       | 性别（`"1"` 男，`"2"` 女） | `"1"`                               |
| userPhoto        | string       | 用户头像 URL               | `"https://hwork-cdn.haier.net/..."` |
| birthday         | string\|null | 生日                       | `null`                              |
| employeestatus   | string       | 在职状态（`"1"` 在职）     | `"1"`                               |
| country          | string       | 国家代码                   | `"CN"`                              |
| userFlag         | number       | 用户标记                   | `0`                                 |
| dataSource       | string       | 数据来源                   | `"IAM_CN"`                          |

#### 组织信息

| 字段          | 类型   | 说明         | 示例值       |
| ------------- | ------ | ------------ | ------------ |
| orgCode       | string | 组织编码     | `"10137606"` |
| orgName       | string | 组织名称     | `"架构方案"` |
| haierdeptcode | string | 海尔部门编码 | `"10137606"` |
| orgRange      | string | 组织范围     | `"zhijia"`   |

#### 岗位信息

| 字段   | 类型         | 说明                  | 示例值                   |
| ------ | ------------ | --------------------- | ------------------------ |
| gwId   | string\|null | 岗位 ID               | `null`                   |
| gwName | string       | 岗位名称              | `"软件开发（前端开发）"` |
| gwname | string       | 岗位名称（同 gwName） | `"软件开发（前端开发）"` |

#### 角色信息

| 字段     | 类型   | 说明     | 示例值       |
| -------- | ------ | -------- | ------------ |
| roleCode | string | 角色编码 | `"zxptry"`   |
| roleName | string | 角色名称 | `"通用角色"` |

#### 上级信息

| 字段          | 类型   | 说明         | 示例值       |
| ------------- | ------ | ------------ | ------------ |
| userParent    | string | 直属上级工号 | `"19006974"` |
| firstLineCode | string | 一线主管工号 | `"19006974"` |
| firstLineName | string | 一线主管姓名 | `"马云龙"`   |

#### 域信息（domain=true 时返回）

| 字段           | 类型     | 说明               | 示例值                                |
| -------------- | -------- | ------------------ | ------------------------------------- |
| classifies     | string[] | 用户所属域分类列表 | `["caigou", "chain", "finance", ...]` |
| mainDomainCode | string   | 主域编码           | `"szyhjsz"`                           |
| mainDomainName | string   | 主域名称           | `"IT中心"`                            |

#### 显示配置

| 字段          | 类型   | 说明                           | 示例值 |
| ------------- | ------ | ------------------------------ | ------ |
| showType      | number | 显示类型                       | `1`    |
| topNavigation | number | 是否显示顶部导航（1 是，0 否） | `1`    |
| displayForm   | number | 显示形式                       | `1`    |

#### 审计信息

| 字段       | 类型         | 说明     | 示例值                  |
| ---------- | ------------ | -------- | ----------------------- |
| createUser | string\|null | 创建人   | `null`                  |
| updateUser | string       | 更新人   | `"IDM用户推送"`         |
| createTime | string       | 创建时间 | `"2025-10-14 23:44:13"` |
| updateTime | string       | 更新时间 | `"2025-10-14 23:44:13"` |

## 使用场景

### 1. 页面顶部显示用户信息

```javascript
import { ref, onMounted } from 'vue'
import service from '@/utils/request'

const userInfo = ref(null)

onMounted(async () => {
  try {
    const res = await service.get(
      'https://api-cn-sp000922.hwork.haier.net/hwork/base/third-party/authCenterApi/api/v2/me',
      { params: { domain: true } }
    )
    if (res.code === 200) {
      userInfo.value = res.data
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
})
```

```html
<template>
  <div v-if="userInfo" class="user-info">
    <a-avatar :src="userInfo.userPhoto" />
    <span>{{ userInfo.userName }}</span>
    <span class="org">{{ userInfo.orgName }}</span>
  </div>
</template>
```

### 2. 获取用户工号用于业务查询

```javascript
const res = await service.get(
  'https://api-cn-sp000922.hwork.haier.net/hwork/base/third-party/authCenterApi/api/v2/me',
  { params: { domain: true } }
)
const userCode = res.data.userCode // "01442042"
```

### 3. 判断用户所属域

```javascript
const res = await service.get(
  'https://api-cn-sp000922.hwork.haier.net/hwork/base/third-party/authCenterApi/api/v2/me',
  { params: { domain: true } }
)
const classifies = res.data.classifies
const isFinance = classifies.includes('finance') // 是否属于财务域
const mainDomain = res.data.mainDomainName // "IT中心"
```

## 错误处理

```javascript
try {
  const res = await service.get(
    'https://api-cn-sp000922.hwork.haier.net/hwork/base/third-party/authCenterApi/api/v2/me',
    { params: { domain: true } }
  )
  if (res.code !== 200) {
    // 接口返回非 200，业务错误
    message.error(res.msg || '获取用户信息失败')
    return
  }
  // 成功处理
  const user = res.data
} catch (error) {
  // 网络错误或其他异常
  console.error('请求失败:', error)
  message.error('网络异常，请稍后重试')
}
```

## 注意事项

1. **`id` 字段可能为 `null`**，业务中应使用 `userCode` 作为用户唯一标识
2. **`gwName` 和 `gwname`** 是同一个字段的两种命名，值相同，建议统一使用 `gwName`
3. **`userSex` 是字符串类型**，`"1"` 表示男，`"2"` 表示女，注意不是数字
4. **`classifies` 数组**仅在 `domain=true` 时返回完整列表
5. **`userPhoto`** 是完整的 CDN URL，可直接用于 `<img>` 或 `<a-avatar>` 的 `src`
6. **`employeestatus`** 是字符串 `"1"` 表示在职，注意类型判断
