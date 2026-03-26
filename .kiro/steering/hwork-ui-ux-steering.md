# UI 开发规范（与 AGENTS.md 一致）

沙箱模板使用公共 npm 的 **ant-design-vue 4**，避免 `@hwork/*` 内网依赖超时。配色与间距仍可对齐 Hwork 规范。

## 组件库

- 使用 **`ant-design-vue`**
- 列表页用 **`a-card` + `a-form` + `a-table`** 等标准组件（参考 `src/views/route-config.vue`）

## 导入规范

```javascript
import { message, Modal } from 'ant-design-vue'
```

## 设计规范

### 品牌色
- 主色: `#165DFF`
- 悬停: `#4080FF`
- 点击: `#0E42D2`

### 功能色
- 成功: `#00B42A`
- 警告: `#FF7D00`
- 错误: `#F53F3F`

### 文字色
- 主要: `#1D2129`
- 常规: `#4E5969`
- 次要: `#86909C`

### 间距系统
- 4px / 8px / 12px / 16px / 20px / 24px

### 按钮尺寸
- Mini: 24px
- Small: 28px
- Default: 32px
- Large: 36px

## 页面开发

生成列表页时，使用 Card + Form 查询区 + Table；需要时再引入 `@ant-design/icons-vue`。

## 规范搜索

查询设计规范：
```bash
python3 ../.kiro/skills/hwork-ui-ux-v1/scripts/search.py "<关键词>" --category <类别>
```
