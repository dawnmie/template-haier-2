# UserSelect API 参考

## Props 参数

| 参数                 | 说明                                                         | 类型                       | 默认值                | 版本 |
| -------------------- | ------------------------------------------------------------ | -------------------------- | --------------------- | ---- |
| visible              | 选人 Modal 是否可见                                          | boolean                    | `false`               | -    |
| title                | 标题                                                         | string                     | `添加人员`            | -    |
| token                | token 值                                                     | string                     | -                     | -    |
| defaultSelectedUsers | 默认选中的用户 ID 列表                                       | string[]                   | `[]`                  | -    |
| getContainer         | 指定 Modal 挂载的 HTML 节点                                  | () => HTMLElement          | `() => document.body` | -    |
| selectMode           | 选择模式                                                     | 'default' \| 'custom'      | `'default'`           | -    |
| userIds              | 自定义用户 ID 列表                                           | string[]                   | `[]`                  | -    |
| defaultSearchType    | 默认数据类型                                                 | 'favorite' \| 'lastSearch' | `'favorite'`          | -    |
| businessId           | 项目 ID                                                      | string                     | -                     | -    |
| userStatusList       | 用户状态列表，`1-在岗` `2-不在岗` `3-退休` `4-离职` `9-死亡` | string[]                   | `["1"]`               | -    |

## Events 事件

| 事件名称       | 说明                                          | 回调参数                  | 版本 |
| -------------- | --------------------------------------------- | ------------------------- | ---- |
| confirm        | 点击确认按钮时触发                            | `(users: User[]) => void` | -    |
| cancel         | 点击取消按钮时触发                            | `() => void`              | -    |
| search         | 搜索时触发(selectMode 为 custom 时有效)       | `(query: string) => void` | -    |
| input          | 输入时触发(selectMode 为 custom 时有效)       | `(query: string) => void` | -    |
| scrollToBottom | 滚动到底部时触发(selectMode 为 custom 时有效) | `(query: string) => void` | -    |

## Method 方法

| 方法名称                   | 说明                                                | 回调参数                                                  | 版本 |
| -------------------------- | --------------------------------------------------- | --------------------------------------------------------- | ---- |
| init                       | 初始化                                              | `(node: Element, props, children?: any) => PersonnelList` | -    |
| mount                      | 装载组件                                            | `() => void`                                              | -    |
| unmount                    | 卸载组件                                            | `() => void`                                              | -    |
| updateVisible              | 更新选人 Modal 可见状态                             | `(visible: boolean) => void`                              | -    |
| updateDefaultSelectedUsers | 更新默认选中用户列表                                | `(defaultSelectedUsers: string[]) => void`                | -    |
| updateUserIds              | 更新自定义用户 ID 列表(selectMode 为 custom 时有效) | `(userIds: string[]) => void`                             | -    |

## User 类型定义

```typescript
interface User {
  userId: string;
  userName: string;
  icon: string;
  summary: string;
  title: string;
}
```

## selectMode 对比

| 模式      | 数据源           | 适用场景     | 特点                       |
| --------- | ---------------- | ------------ | -------------------------- |
| `default` | 系统默认用户接口 | 通用用户选择 | 自动分页、搜索，开箱即用   |
| `custom`  | 自定义用户列表   | 特定业务场景 | 完全自定义数据源和交互逻辑 |

## defaultSearchType 对比

| 模式         | 数据源                            | 备注            |
| ------------ | --------------------------------- | --------------- |
| `favorite`   | H-work 对应环境内七天内最近联系人 | 默认类型        |
| `lastSearch` | 对应业务系统内最近搜索记录        | businessId 必传 |

## 使用场景

### 适合场景

- 需要批量选择用户的场景
- 任务分配、权限设置、通知推送等
- 需要从大量用户中筛选的场景
- 需要自定义用户数据源的场景

### 用户状态说明

- `1`: 在岗
- `2`: 不在岗
- `3`: 退休
- `4`: 离职
- `9`: 死亡

### 性能优化

- 使用 `defaultSearchType` 可以优化初始数据加载
- 自定义模式下可以控制数据源大小
- 合理使用 `businessId` 可以获取更精准的搜索历史
