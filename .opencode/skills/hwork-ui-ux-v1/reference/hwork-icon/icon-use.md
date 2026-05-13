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
```

搜索结果中的 `Value` 字段即为可用的图标组件名。找不到合适的图标时，使用 `h-icon-settings` 作为默认图标，绝对不要编造图标名称。
