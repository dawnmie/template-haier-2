# PersonnelList API 参考

## 初始化参数

**仅初始化，不支持响应式修改，其余属性参考 ant4 版本 Select**

| 参数           | 说明                                                         | 类型                    | 默认值    | 版本 |
| -------------- | ------------------------------------------------------------ | ----------------------- | --------- | ---- |
| value          | 已选的值                                                     | string \| array         | `""`      | -    |
| mode           | 选择模式                                                     | `single` \| `multiple`  | `single`  | -    |
| token          | token 值                                                     | string                  | `null`    | -    |
| selectMode     | 选择模式                                                     | `default` \| `custom`   | `default` | -    |
| userStatusList | 用户状态列表，`1-在岗` `2-不在岗` `3-退休` `4-离职` `9-死亡` | string[]                | `["1"]`   | -    |
| userIds        | 自定义用户 ID 列表（仅 custom 模式）                         | string[]                | `[]`      | -    |
| onSearch       | 搜索回调（仅 custom 模式）                                   | (query: string) => void | -         | -    |
| style          | 样式设置                                                     | object                  | -         | -    |
| placeholder    | 占位符文本                                                   | string                  | `请选择`  | -    |
| labelInValue   | 是否返回 {label, value} 格式                                 | boolean                 | `false`   | -    |
| allowClear     | 是否允许清除                                                 | boolean                 | `false`   | -    |
| disabled       | 是否禁用                                                     | boolean                 | `false`   | -    |
| maxTagCount    | 多选时最多显示标签数量                                       | number                  | -         | -    |

## Method 方法

| 方法名称          | 说明                             | 回调参数                                                | 版本 |
| ----------------- | -------------------------------- | ------------------------------------------------------- | ---- |
| init              | 初始化                           | `(node: Element,props,children?: any) => PersonnelList` | -    |
| mount             | 装载组件                         | `() => void`                                            | -    |
| unmount           | 卸载组件                         | `() => void`                                            | -    |
| updateValue       | 更新选中值                       | `(newValue: any) => void`                               | -    |
| updateDisabled    | 更新禁用状态                     | `(newDisabled: boolean) => void`                        | -    |
| updateUserOptions | 更新用户列表(仅自定义模式下有效) | `(userIds: string[]) => void`                           | -    |

## 事件

| 事件名称 | 说明           | 回调参数                       | 版本 |
| -------- | -------------- | ------------------------------ | ---- |
| onChange | 选择变化时触发 | `(value, option) => void`      | -    |
| onSearch | 搜索时触发     | `(searchText: string) => void` | -    |

## selectMode 对比

| 模式      | 数据源           | 适用场景     | 特点                       |
| --------- | ---------------- | ------------ | -------------------------- |
| `default` | 系统默认用户接口 | 通用用户选择 | 自动分页、搜索，开箱即用   |
| `custom`  | 自定义用户列表   | 特定业务场景 | 完全自定义数据源和交互逻辑 |

## 使用场景

### 适合场景

- 需要通过下拉框形式选择用户
- 表单中的用户选择字段
- 任务分配、权限设置等场景
- 需要批量选择用户的场景

### 用户状态说明

- `1`: 在岗
- `2`: 不在岗
- `3`: 退休
- `4`: 离职
- `9`: 死亡

### 性能优化

- 使用 `labelInValue` 可以同时获取用户名和工号
- 多选模式下使用 `maxTagCount` 控制显示的标签数量
- 自定义模式下可以控制数据源大小，提升性能
