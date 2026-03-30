# UserCard API 参考

## 初始化参数 - UserCardProps

**仅初始化，不支持响应式修改，修改对应参数需使用对应的 set 方法**

| 参数              | 说明                                                                                                                                         | 类型                                      | 默认值                                               | 版本          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------- | ------------- |
| userCode          | 员工工号                                                                                                                                     | string                                    | `""`                                                 | -             |
| token             | token 值`Bearer xxx`用于本地开发时无法自动获取到 token 的情况                                                                                | string                                    | `null`                                               | -             |
| mouseEnterDelay   | 鼠标移入后延时多少才显示 UserCard，单位：毫秒                                                                                                | number                                    | `300`                                                | -             |
| mouseLeaveDelay   | 鼠标移出后延时多少才隐藏 UserCard，单位：毫秒                                                                                                | number                                    | `300`                                                | -             |
| cache             | 是否开启用户信息缓存,适用页面内存在大量重复用户卡片的情况                                                                                    | boolean                                   | `false`                                              | -             |
| zIndex            | 卡片层级设置                                                                                                                                 | number                                    | `1030`                                               | -             |
| getPopupContainer | 浮层渲染父节点，默认渲染到 body 上                                                                                                           | (triggerNode: HTMLElement) => HTMLElement | `(triggerNode) => triggerNode.parentNode.parentNode` | -             |
| placement         | 卡片位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string                                    | `top`                                                | -             |
| errorHandler      | 捕获异常                                                                                                                                     | (error: unknow) => void                   | `-`                                                  | 1.0.7-alpha.1 |

## Method 方法

| 方法名称    | 说明         | 回调参数                                                              | 版本 |
| ----------- | ------------ | --------------------------------------------------------------------- | ---- |
| init        | 初始化       | `(node: HTMLElement,props: UserCardProps,children?: any) => UserCard` | -    |
| setUserCode | 更新员工工号 | `(userCode:string) => void`                                           | -    |
| unmount     | 卸载组件     | `() => void`                                                          | -    |

## 使用场景

### 适合场景

- 需要在鼠标悬停时展示用户详细信息
- 用户列表、评论区、聊天界面等场景
- 需要快速查看用户基本信息的场景

### 位置选项说明

- `top`: 上方居中
- `bottom`: 下方居中
- `left`: 左侧居中
- `right`: 右侧居中
- `topLeft`: 上方左对齐
- `topRight`: 上方右对齐
- `bottomLeft`: 下方左对齐
- `bottomRight`: 下方右对齐
- `leftTop`: 左侧上对齐
- `leftBottom`: 左侧下对齐
- `rightTop`: 右侧上对齐
- `rightBottom`: 右侧下对齐

### 性能优化

- 开启 `cache` 可以缓存用户信息，适用于页面内存在大量重复用户卡片的情况
- 合理设置 `mouseEnterDelay` 和 `mouseLeaveDelay` 可以避免频繁的显示/隐藏
