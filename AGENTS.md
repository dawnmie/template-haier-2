---
description: Vue UI（Ant Design Vue）+ OBaaS SeekDB（Qiankun 子应用模版 template-haier-2）
globs: []
alwaysApply: true
---

# UI 开发规范（沙箱可安装）

模板使用 **公共 npm** 的 **`ant-design-vue` 4.x**（`.npmrc` 指向 `registry.npmmirror.com`），避免海尔内网 `@hwork/*` 源超时。若接入 Hwork 主应用，可按需改回内网包与业务组件。

> **📂 工作目录（OpenCode / 文件类工具）**: 沙箱内**工程根目录**为 **`/home/user/project`**。列举、读取、编辑文件时请使用该路径下的绝对路径（例如 `/home/user/project/apps/web/src/...`）。**不要**单独使用 **`/src`**——在 Linux 上那是**系统根目录**下的 `/src`，不是本仓库路径，易触发权限错误（如 `PermissionRejectedError`）。

## 组件库

- 使用 **`ant-design-vue`**（Ant Design Vue 4）
- 按需自动引入：`unplugin-vue-components` + `AntDesignVueResolver`（见 `vite.config.js`）
- 图标可用 **`@ant-design/icons-vue`**（已在 `package.json` 依赖中，与 Ant Design Vue 4 配套）或项目内 `iconfont`

## 导入规范

```javascript
// ✅ 正确（显式导入或依赖 unplugin 自动引入 + 下方工具函数）
import { message, Modal } from 'ant-design-vue'
import { ConfigProvider } from 'ant-design-vue'
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

---

# SeekDB BaaS（OBaaS 开发沙箱）数据访问与 SQL

> **🖥️ 运行环境**: 你运行在平台提供的**安全开发沙箱**中。沙箱侧已默认启动 **Vite 开发服务器（通常监听 `5173` 端口）**；用户通过网页控制台与你对话，预览区通过 iframe 加载该地址，可**实时看到保存代码后的热更新（HMR）**。因此你**无需也请不要自行执行 `pnpm dev`**——开发时的界面反馈由环境接管。你应关注：**`pnpm install`** 确保依赖就绪。
>
> **✅ 构建自检（必须）**: **每次**完成一批代码写入或修改（尤其是 `src/`、`package.json`、静态资源等与构建相关的变更）后，**必须**在项目根目录执行 **`pnpm build`**，确认当前代码在生产构建下无报错；若有错误，须根据输出逐项修复并**再次** `pnpm build` 直至通过。**不要**仅凭 HMR 或预览正常就推断构建一定成功——类型检查、Tree-shaking、生产打包等问题往往只在 `pnpm build` 阶段暴露。

> **⚠️ 重要提示**: 基于 OceanBase SeekDB 的 BaaS。**登录与 `template-haier` 对齐**：`main` 挂载时注入 `HworkJSApi` / `window.hwork`（`src/services/hwork-context.js`），`supabase` 自定义 `fetch` 在缺少 `Authorization` 时自动带上 **Hwork token** 或 **`hwork_iamAccessToken`**（见 `src/services/supabase.js`）。`App.vue` 经 **`useAppAuth`**：`getUser` 无效则整页跳转 GoTrue **`provider=hwork`** OAuth；回调 hash/query 带 token 时 `setSession`。表数据仍须通过 **`supabase.rpc()`**。

> **🚨 关键要求**: **Agent 必须自己完成数据库表的创建和存储过程的创建，绝对不要让用户手动创建！** 当需要创建新的数据表或存储过程时，Agent 应该自动执行相应的 SQL 语句来完成这些操作，而不是要求用户手动执行。

> **⛔ 禁止修改**: **不要修改 `vite.config.js`、`index.html`、`tsconfig.json` 等构建配置文件。** 这些文件已经配置好了，修改可能导致构建失败。请在 `src/`、`package.json`、`sqls/`、`public/` 目录下编写业务代码。

> **📁 目录规范**: **表 DDL** → `sqls/tables/` 或 `powerbase/migrations/`；**存储过程/函数 DDL** → `sqls/routines/`。版本切换、回滚时会按 `sqls/routines/` 恢复，请严格遵守。

> **📌 开发方式**: **默认只在根路径 `/` 上开发**：在 `src/views/welcome.vue`（或把根路由组件换成你的单页入口）中实现界面与业务逻辑。**非必要不要新增路由**；若产品确实需要多页面，再在 `src/router/index.js` 中补充路由，并新增对应视图文件。

> **🔑 环境变量**: 对接实例时配置 **`VITE_SUPABASE_ANON_KEY`**（匿名密钥）。**生产构建**须在对应 `.env.*` 中配置 **`VITE_OBAAS_INSTANCE_ID`**，用于拼接 `origin + /rd/obaas/instances/{id}`；**Vite 开发模式**下 Supabase URL 仅为 `origin`（不加该前缀）。见 `src/services/supabase.js`。

## 🏗️ 项目架构（数据层）

- **后端数据库**: OceanBase SeekDB
- **数据访问**: 通过 Supabase RPC 调用存储过程（兼容 PostgREST）
- **文件存储**: 通过 **`supabase.storage`** 访问与 Supabase Storage REST 兼容的 **`/storage/v1`**
- **API 服务**: 使用 Supabase SDK 的 **`supabase.rpc()`**（表数据）与 **`supabase.storage`**（文件）
- **客户端**: `src/services/supabase.js`；可复用封装：`src/examples/supabase-rpc.js`、`src/examples/supabase-storage.js`

## 技术栈（节选）

- Vue 3 + Vite + Pinia + vue-router
- `ant-design-vue`、Qiankun / wujie（见 `package.json`）
- `@supabase/supabase-js`（`pnpm install` 使用 `.npmrc` 中的公共 registry）

---

## 🚨 CRITICAL: 使用 Supabase RPC 调用存储过程

**所有数据库的增删改查操作都必须通过 `supabase.rpc()` 调用存储过程来完成！**

### 直接使用 Supabase SDK

```javascript
import { supabase } from '@/services/supabase';

// 调用存储过程（命名参数）
const { data, error } = await supabase.rpc('sp_procedure_name', { p_param1: value1, p_param2: value2 });
if (error) throw new Error(error.message);
const result = data;
```

### 或使用封装

```javascript
import { rpc, firstRow } from '@/examples/supabase-rpc';

const rows = await rpc('sp_list_my_tasks', { p_status: '', p_limit: 20, p_offset: 0 });
const one = firstRow(await rpc('sp_get_task', { p_id: 'xxx' }));
```

### rpc 方法说明

```javascript
// Supabase SDK 方法
const { data, error } = await supabase.rpc(name, params);
// - name: 存储过程名称
// - params: 命名参数对象，key 与存储过程 IN 参数名一致（如 p_id, p_title）
// - 失败时检查 error，成功时使用 data
```

### 响应格式

Supabase RPC 返回存储过程**第一个 SELECT 的结果集**，直接为数组或单条对象：

```javascript
// 返回多行
const { data: rows, error } = await supabase.rpc('sp_list_my_tasks', { p_status: '', p_limit: 20, p_offset: 0 });
if (error) throw new Error(error.message);

// 返回单行
const { data: row } = await supabase.rpc('sp_get_task', { p_id: 'xxx' });
const first = Array.isArray(row) ? row[0] : row;
```

---

## 📁 文件存储（Supabase Storage · `supabase-js`）

### 可复用模块（Agent 优先）

**不要从零手写** Storage 样板。请直接 **`import`**：

- 文件：`src/examples/supabase-storage.js`
- 用法：`import { supabase } from '@/services/supabase'`，再 `import { storageEnsureBucket, storageUpload, … } from '@/examples/supabase-storage'`，将 `supabase` 传入各函数。

实例侧提供 **Supabase Storage 兼容 API**。`createClient` 使用的 URL 见 **`src/services/supabase.js`**：开发时为 `origin`；生产构建为 `origin + /rd/obaas/instances/{id}`（`id` 来自构建期 `VITE_OBAAS_INSTANCE_ID` 或 hostname 兜底）。SDK 会自动请求 **`/storage/v1`**。

### 与 `supabase.rpc` 的分工

- **表数据**：必须用 **`supabase.rpc()`** 调存储过程（见上文 CRITICAL）。
- **文件二进制**：用 **`supabase.storage`**，**不要**把大文件写入 RPC / SQL。
- Storage 的 **bucket** 由平台在 OSS 侧维护；**不是** SeekDB 表，**无需**用 `sqls/` 建 bucket。

### 必须先创建 bucket（首次上传前）

```javascript
import { supabase } from '@/services/supabase';

const { error } = await supabase.storage.createBucket('app-uploads', {
  public: false,
});
if (error && !/already exists|Duplicate/i.test(String(error.message))) {
  throw new Error(error.message);
}
```

### 常用 API（与官方 `supabase-js` 一致）

```javascript
import { supabase } from '@/services/supabase';

const bucket = 'app-uploads';

const { data: buckets, error: e1 } = await supabase.storage.listBuckets();

const file = document.querySelector('input[type=file]')?.files?.[0];
const { data: up, error: e2 } = await supabase.storage.from(bucket).upload('docs/readme.txt', file, {
  upsert: true,
  contentType: file?.type || 'text/plain',
});
if (e2) throw new Error(e2.message);

const { data: blob, error: e3 } = await supabase.storage.from(bucket).download('docs/readme.txt');
if (e3) throw new Error(e3.message);

const { data: entries, error: e4 } = await supabase.storage.from(bucket).list('docs', {
  limit: 100,
  offset: 0,
  sortBy: { column: 'name', order: 'asc' },
});

const { error: e5 } = await supabase.storage.from(bucket).remove(['docs/readme.txt']);
```

统一约定：始终检查 **`{ data, error }`**；失败时处理 **`error.message`**。

### 能力边界（避免误用）

- **不支持**官方 **图片 transform**（`download` / `getPublicUrl` 的 `transform`、`render/image`）。
- 业务表引用文件时，自行存 **path** 或 **publicUrl**，用 RPC 维护业务字段。

---

## 📝 完整示例：用户任务管理系统

### 场景描述

假设我们要实现一个任务管理功能，包括：

- 创建任务（只有当前用户能看到自己的任务）
- 查询当前用户的任务列表
- 更新任务状态
- 删除任务

### Step 1: 创建数据表和存储过程

**⚠️ Agent 必须自己完成此步骤，不要要求用户手动执行！**

**⚠️ 重要**: 所有 SQL 语句必须先保存到 `sqls/` 目录下，使用时间戳前缀（格式：`YYYYMMDDHHMMSS`）进行版本管理，然后再执行。

**📁 目录规范**:

- **表 DDL**（CREATE TABLE、ALTER TABLE）→ `sqls/tables/{timestamp}_{description}.sql`
- **存储过程/函数 DDL**（CREATE PROCEDURE、CREATE FUNCTION）→ `sqls/routines/{timestamp}_{description}.sql`
- **平台 auth 表**（users、refresh_tokens 等）由 GoTrue 容器启动时 `gotrue migrate` 自动创建，无需手动维护

工作流程：

1. 生成时间戳：`date +%Y%m%d%H%M%S`
2. 创建 SQL 文件：表结构放 `sqls/tables/`，存储过程放 `sqls/routines/`
3. 写入 SQL 语句
4. 执行：`mysql < sqls/tables/xxx.sql` 或 `mysql < sqls/routines/xxx.sql`

示例 SQL（注意使用 `@\`auth.uid\`` 实现行级权限，与 edge-runtime 注入的会话变量一致）：

```sql
-- 创建表
CREATE TABLE IF NOT EXISTS tasks (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id)
);

-- 创建存储过程（@auth.uid 由 edge-runtime 根据 JWT 自动注入）
DELIMITER //
CREATE PROCEDURE sp_create_task(IN p_id VARCHAR(36), IN p_title VARCHAR(255), IN p_description TEXT)
BEGIN
  INSERT INTO tasks (id, user_id, title, description) VALUES (p_id, @`auth.uid`, p_title, p_description);
  SELECT * FROM tasks WHERE id = p_id;
END //

CREATE PROCEDURE sp_list_my_tasks(IN p_status VARCHAR(20), IN p_limit INT, IN p_offset INT)
BEGIN
  IF p_status IS NULL OR p_status = '' THEN
    SELECT *, COUNT(*) OVER () AS total FROM tasks WHERE user_id = @`auth.uid` ORDER BY created_at DESC LIMIT p_limit OFFSET p_offset;
  ELSE
    SELECT *, COUNT(*) OVER () AS total FROM tasks WHERE user_id = @`auth.uid` AND status = p_status ORDER BY created_at DESC LIMIT p_limit OFFSET p_offset;
  END IF;
END //

CREATE PROCEDURE sp_update_task(IN p_id VARCHAR(36), IN p_title VARCHAR(255), IN p_description TEXT, IN p_status VARCHAR(20))
BEGIN
  UPDATE tasks SET title = COALESCE(p_title, title), description = COALESCE(p_description, description), status = COALESCE(p_status, status)
  WHERE id = p_id AND user_id = @`auth.uid`;
  SELECT * FROM tasks WHERE id = p_id AND user_id = @`auth.uid`;
END //

CREATE PROCEDURE sp_delete_task(IN p_id VARCHAR(36))
BEGIN
  DELETE FROM tasks WHERE id = p_id AND user_id = @`auth.uid`;
  SELECT ROW_COUNT() AS affected_rows;
END //
DELIMITER ;
```

### Step 2: 前端调用存储过程（Vue 示例）

```javascript
import { supabase } from '@/services/supabase';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export async function createTask(title, description) {
  const { data: rows, error } = await supabase.rpc('sp_create_task', {
    p_id: generateUUID(),
    p_title: title,
    p_description: description,
  });
  if (error) throw new Error(error.message);
  return Array.isArray(rows) ? rows[0] : rows;
}

export async function listMyTasks(status = '', limit = 20, offset = 0) {
  const { data: rows, error } = await supabase.rpc('sp_list_my_tasks', {
    p_status: status,
    p_limit: limit,
    p_offset: offset,
  });
  if (error) throw new Error(error.message);
  const arr = Array.isArray(rows) ? rows : [rows];
  return { tasks: arr, total: parseInt(String(arr[0]?.total ?? 0), 10) };
}

export async function updateTask(id, title, description, status) {
  const { data: rows, error } = await supabase.rpc('sp_update_task', {
    p_id: id,
    p_title: title ?? null,
    p_description: description ?? null,
    p_status: status ?? null,
  });
  if (error) throw new Error(error.message);
  return Array.isArray(rows) ? rows[0] : rows;
}

export async function deleteTask(id) {
  const { data: rows, error } = await supabase.rpc('sp_delete_task', { p_id: id });
  if (error) throw new Error(error.message);
  const row = Array.isArray(rows) ? rows[0] : rows;
  return parseInt(String(row?.affected_rows ?? 0), 10) > 0;
}
```

### Step 3: 响应解析

```javascript
const count = parseInt(String(row.count), 10);
const isActive = row.is_active === '1' || row.is_active === 1;
const createdAt = new Date(row.created_at);
```

---

## 🔐 权限安全（Row & Column Level Security）

### 使用 @`auth.uid` 和 @`auth.role`

**⚠️ 关键安全要求**: 存储过程**必须**使用会话变量获取用户身份，不要通过参数传递用户 ID。

- **`@\`auth.uid\``**: 当前登录用户的 ID（edge-runtime 根据 JWT 自动注入）
- **`@\`auth.role\``**: 当前用户角色（可能为 `NULL`），管理员为 `'admin'`
- **`@\`auth.email\``**: 当前用户邮箱

**行级权限示例** ✅：

```sql
SELECT * FROM orders WHERE user_id = @`auth.uid`;
UPDATE orders SET status = p_status WHERE id = p_id AND user_id = @`auth.uid`;
```

---

## 📦 SQL 文件版本管理

**⚠️ 重要**: 所有数据库操作的 SQL 语句必须保存在 `sqls/` 目录下，**表 DDL 放 `tables/`，存储过程/函数 DDL 放 `routines/`**，使用时间戳前缀进行版本管理。

- **文件命名**: `{timestamp}_{description}.sql`（时间戳格式：`YYYYMMDDHHMMSS`）
- **生成时间戳**: `date +%Y%m%d%H%M%S`
- **文件规范**: 包含完整 SQL、添加注释、使用 IF EXISTS/IF NOT EXISTS 确保可重复执行

示例：

```
sqls/
├── tables/
│   ├── 20240115143000_create_tasks_table.sql
│   └── 20240115150000_add_priority_to_tasks.sql
└── routines/
    └── 20240115143030_create_task_procedures.sql
```

---

## 🛠️ 数据库连接与管理

> **💡 MySQL 命令说明**: `mysql` 命令执行的所有 SQL 会自动在 `test` 库中运行，这是符合预期的。

```bash
mysql
mysql < sqls/tables/xxx.sql
mysql < sqls/routines/xxx.sql
```

```sql
SHOW TABLES;
DESCRIBE table_name;
SHOW PROCEDURE STATUS;
DROP PROCEDURE IF EXISTS procedure_name;
```

---

## ⚠️ 重要提醒

### 1. 表结构变更时必须同步更新存储过程

### 2. 存储过程命名规范

- `sp_get_` - 查询单条记录
- `sp_list_` - 查询列表
- `sp_create_` - 创建记录
- `sp_update_` - 更新记录
- `sp_delete_` - 删除记录

### 3. 错误处理和参数传递

- **错误处理**: `supabase.rpc` 返回 `{ data, error }`，失败时检查 `error` 并抛出
- **参数传递**: 使用**命名参数对象**，key 与存储过程 IN 参数名一致

---

## 📚 API 快速参考

| 操作 | 方法 | 说明 |
|------|------|------|
| 调用存储过程 | `supabase.rpc(name, params)` | params 为命名对象 |
| 封装 RPC | `rpc()` / `firstRow()` | `src/examples/supabase-rpc.js` |
| 文件上传/下载/列表 | `supabase.storage` 或 `src/examples/supabase-storage.js` | 先 `createBucket`；见上文「文件存储」 |

（若后续接入 GoTrue，再使用 `supabase.auth.getSession()` 等与登录相关的 API。）

---

## 🎯 开发流程总结

1. **需求分析** → 确定需要哪些数据操作
2. **设计表结构** → Agent 自动创建表（不要要求用户手动创建）
3. **创建存储过程** → Agent 自动创建存储过程，使用 `@auth.uid` 实现行级权限
4. **编写前端代码** → 表数据用 **`supabase.rpc()`**；文件用 **`supabase.storage`**（见「文件存储」）
5. **测试验证** → 确保权限控制和数据操作正确

**重要**: Agent 必须自动完成步骤 2 和 3，所有 SQL 必须先保存到 `sqls/` 目录下进行版本管理。
