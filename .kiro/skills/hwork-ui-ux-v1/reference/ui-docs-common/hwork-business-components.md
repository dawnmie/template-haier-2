# H-work 业务组件

## 目录

- [UserCard 用户卡片](#usercard-用户卡片)
- [PersonnelList 人员列表](#personnellist-人员列表)
- [UserSelect 选人组件](#userselect-选人组件)

---

# UserCard 用户卡片

## 概述

展示用户信息

开发维护：@王子萁

## 何时使用

需要在鼠标悬停时展示用户详细信息卡片的场景。

## 基础使用（Vue）

鼠标悬浮至名字上方查看卡片：

```vue
<template>
  <div class="user-card-container">
    <span>鼠标悬浮至名字上方查看卡片：</span>
    <span ref="popoverRef">王子萁</span>
    <br />
  </div>
</template>

<script setup lang="ts">
import hwComps from "@hwork/hwork-business-components";
import { ref, onMounted } from "vue";

const popoverRef = ref(null);
const UserCard = ref(null);

onMounted(async () => {
  UserCard.value = hwComps.hwUserCard.init(popoverRef.value, {
    userCode: "21022951",
    cache: false,
    placement: "right",
  });
});
</script>
```

## 更新工号（Vue）

```vue
<template>
  <div class="user-card-container">
    <span ref="popover2Ref">{{ userCode }}</span>
    <br />
    <br />
    <Space>
      <Button @click="handleUnmount">卸载</Button>
      <Button @click="handleMount">加载</Button>
      <Button @click="handleUserCodeChange">更新工号</Button>
    </Space>
    <!-- 添加用户工号输入对话框 -->
    <Modal
      v-model:visible="isModalVisible"
      title="更新工号"
      @ok="confirmUserCodeChange"
      @cancel="cancelUserCodeChange"
    >
      <Input v-model:value="newUserCode" placeholder="请输入新的工号" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Button, Space, Modal, Input } from "@hwork/ant-design-vue";
import hwComps from "@hwork/hwork-business-components";
import { ref, onMounted } from "vue";

const popover2Ref = ref(null);
const UserCard = ref(null);
const userCode = ref("21022951");

// 添加对话框相关状态
const isModalVisible = ref(false);
const newUserCode = ref("");

const handleUserCodeChange = () => {
  // 显示对话框并设置当前工号为默认值
  newUserCode.value = userCode.value;
  isModalVisible.value = true;
};

// 确认更新工号
const confirmUserCodeChange = () => {
  if (newUserCode.value.trim()) {
    userCode.value = newUserCode.value;
    UserCard.value.setUserCode(userCode.value);
  }
  isModalVisible.value = false;
};

// 取消更新工号
const cancelUserCodeChange = () => {
  isModalVisible.value = false;
};

const handleUnmount = () => {
  UserCard.value.unmount();
};

const handleMount = () => {
  UserCard.value = hwComps.hwUserCard.init(popover2Ref.value, {
    userCode: userCode.value,
  });
};

onMounted(async () => {
  handleMount();
});
</script>
```

## 初始化

```javascript
import hwComps from "@hwork/hwork-business-components";

hwComps.hwUserCard.init(Element, {
  userCode: userCode.value,
  mouseEnterDelay: "300",
  mouseLeaveDelay: "300",
  token: "xxx",
});
```

`init` 方法的第一个参数是需要悬浮展示用户卡片的 Dom 元素，如果 ref.value 是 vue 对象的话，可以传递 `xxxRef.value.$el`。第二个参数是初始化数据，赋值后不支持响应式修改，如需修改请使用 Method 中提供的方法。

## 初始化参数-UserCardProps

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

# PersonnelList 人员列表

## 概述

下拉框选择用户

开发维护：@刘亚群

## 何时使用

需要通过下拉框形式选择用户的场景。

## 基础使用（Vue）

```vue
<template>
  <div class="user-card-container">
    <div ref="popoverRef"></div>
  </div>
</template>

<script setup lang="ts">
import hwComps from "@hwork/hwork-business-components";
import { ref, onMounted } from "vue";

const popoverRef = ref(null);
const PersonnelListSelect = ref(null);

// 需要回显时的传法
const selectVal = ref({
  label: "刘亚群",
  value: "22081309",
});

onMounted(async () => {
  PersonnelListSelect.value = hwComps.hwPersonnelListSelect.init(
    popoverRef.value,
    {
      // 需要回显时的传法
      // value: selectVal.value,
      value: undefined,
      style: { width: "280px" },
      placeholder: "请选择",
      labelInValue: true,
      allowClear: true,
      onChange: (val) => {
        selectVal.value = val;
      },
    },
  );
});
</script>
```

## Method 示例（Vue）

```vue
<template>
  <div class="user-card-container">
    <div ref="popoverRef"></div>
    <br />
    <Space>
      <Button @click="updateDisabled">更新disabled状态</Button>
      <Button @click="updateSelectVal">更新选中用户</Button>
    </Space>
  </div>
</template>

<script setup lang="ts">
import hwComps from "@hwork/hwork-business-components";
import { Button, Space } from "@hwork/ant-design-vue";
import { ref, onMounted } from "vue";

const popoverRef = ref(null);
const PersonnelListSelect = ref(null);

// 需要回显时的传法
const selectVal = ref([
  {
    label: "刘亚群",
    value: "22081309",
  },
]);

const isDisabled = ref(false);

const updateDisabled = () => {
  isDisabled.value = !isDisabled.value;
  PersonnelListSelect.value.updateDisabled(isDisabled.value);
};

const updateSelectVal = () => {
  selectVal.value = [
    {
      label: "王丹",
      value: "22072453",
    },
  ];
  PersonnelListSelect.value.updateValue(selectVal.value);
};

onMounted(async () => {
  PersonnelListSelect.value = hwComps.hwPersonnelListSelect.init(
    popoverRef.value,
    {
      value: selectVal.value,
      mode: "multiple",
      disabled: isDisabled.value,
      style: { width: "280px" },
      placeholder: "请选择",
      labelInValue: true,
      allowClear: true,
      maxTagCount: 1,
      onChange: (val) => {
        selectVal.value = val;
      },
    },
  );
});
</script>
```

## 自定义模式（Vue）

```vue
<template>
  <div class="user-card-container">
    <div ref="popoverRef"></div>
    <br />
    <Space>
      <Button @click="updateUserIds">更新工号列表</Button>
      <Button @click="updateSelectVal">更新选中用户</Button>
    </Space>
  </div>
</template>

<script setup lang="ts">
import hwComps from "@hwork/hwork-business-components";
import { ref, onMounted } from "vue";
import { Button, Space } from "@hwork/ant-design-vue";

const popoverRef = ref<HTMLElement | null>(null);
const personnelListSelect = ref<any>(null);

const selectVal = ref<any>({
  label: "刘亚群",
  value: "22081309",
});

const searchKeyword = ref("");

// 工号数组 - 业务系统可以初始化传入，也可以后续更新
const userIds = ref(["22081309", "22072453", "21022951"]);

const handleMount = () => {
  personnelListSelect.value = hwComps.hwPersonnelListSelect.init(
    popoverRef.value,
    {
      value: selectVal.value,
      onChange: (val) => (selectVal.value = val),
      style: {
        width: "300px",
      },
      placeholder: "请搜索选择人员",
      labelInValue: true,
      allowClear: true,

      // 使用自定义模式
      selectMode: "custom",
      // 传入初始工号数组（仅用于初始化）
      userIds: userIds.value,
      // 搜索回调
      onSearch: handleSearch,
    },
  );
};

// 处理搜索事件 - 业务系统的搜索逻辑
const handleSearch = (searchText: string) => {
  console.log("业务系统收到搜索请求:", searchText);
  searchKeyword.value = searchText;

  // 模拟业务系统的搜索逻辑
  setTimeout(() => {
    if (searchText) {
      // 根据搜索关键词返回新的工号数组
      if (searchText.includes("王")) {
        userIds.value = ["22072453", "21022951"];
      } else if (searchText.includes("刘")) {
        userIds.value = ["22081309"];
      } else {
        // 其他搜索条件返回不同的工号组合
        userIds.value = ["22081309", "22072453", "21022951"];
      }
    } else {
      // 搜索为空时恢复初始数据
      userIds.value = ["22081309", "22072453", "21022951"];
    }

    // ✅ 主动调用组件的更新方法
    if (personnelListSelect.value) {
      personnelListSelect.value.updateUserOptions(userIds.value);
    }
    console.log("✅ 业务系统更新userIds:", userIds.value);
  }, 300);
};

const updateUserIds = () => {
  // ✅ 直接更新数组并主动调用组件更新方法
  userIds.value = ["20024300"];
  if (personnelListSelect.value) {
    personnelListSelect.value.updateUserOptions(userIds.value);
  }
  console.log("✅ 主动更新userIds:", userIds.value);
};

const updateSelectVal = () => {
  if (personnelListSelect.value) {
    personnelListSelect.value.updateValue({
      label: "王丹",
      value: "22072453",
    });
  }
};

onMounted(async () => {
  handleMount();
});
</script>
```

## 初始化

```javascript
import hwComps from "@hwork/hwork-business-components";

hwComps.hwPersonnelListSelect.init(popoverRef.value, {
  value: selectVal.value,
  token: localStorage.getItem("token"),
  style: { width: "280px" },
  labelInValue: true,
  onChange: (val, opt) => {
    selectVal.value = val;
  },
});
```

`init` 方法的第一个参数是需要悬浮展示用户卡片的 Dom 元素，如果 ref.value 是 vue 对象的话，可以传递 `xxxRef.value.$el`。第二个参数是初始化数据，赋值后不支持响应式修改，如需修改请使用 Method 中提供的方法。

## 初始化参数

**仅初始化，不支持响应式修改，其余属性参考 ant4 版本 Select**

| 参数           | 说明                                                         | 类型                  | 默认值      | 版本 |
| -------------- | ------------------------------------------------------------ | --------------------- | ----------- | ---- |
| value          | 已选的值                                                     | string                | `""`        | -    |
| token          | token 值                                                     | string                | `null`      | -    |
| selectMode     | 选择模式                                                     | 'default' \| 'custom' | `'default'` | -    |
| userStatusList | 用户状态列表，`1-在岗` `2-不在岗` `3-退休` `4-离职` `9-死亡` | string[]              | `["1"]`     | -    |

## Method 方法

| 方法名称          | 说明                             | 回调参数                                                | 版本 |
| ----------------- | -------------------------------- | ------------------------------------------------------- | ---- |
| init              | 初始化                           | `(node: Element,props,children?: any) => PersonnelList` | -    |
| mount             | 装载组件                         | `() => void`                                            | -    |
| unmount           | 卸载组件                         | `() => void`                                            | -    |
| updateValue       | 更新选中值                       | `(newValue: any) => void`                               | -    |
| updateDisabled    | 更新禁用状态                     | `(newDisabled: boolean) => void`                        | -    |
| updateUserOptions | 更新用户列表(仅自定义模式下有效) | `(userIds: string[]) => void`                           | -    |

# UserSelect 选人组件

## 概述

穿梭框形式批量选择用户

开发维护：@刘亚群

## 何时使用

需要通过穿梭框形式批量选择用户的场景。

## 基础使用（Vue）

```vue
<template>
  <div class="user-card-container">
    <Button type="primary" @click="showModal">选择用户</Button>
    <br />
    <br />
    <div ref="modalRef"></div>
    <Space>
      <Button @click="handleUnmount">unmount</Button>
      <Button @click="handleMount">mount</Button>
    </Space>
  </div>
</template>

<script setup lang="tsx">
import hwComps from "@hwork/hwork-business-components";
import { Button, Space } from "@hwork/ant-design-vue";
import { ref, onMounted } from "vue";
import type { User } from "@hwork/hwork-business-components";

const modalRef = ref(null);
const UserSelect = ref(null);
const selectedUsers = ref<User[]>([]);
const selectedUserIds = ref<string[]>([]);

const showModal = () => {
  UserSelect.value?.updateDefaultSelectedUsers(selectedUserIds.value);
  UserSelect.value.updateVisible(true);
};

const handleUnmount = () => {
  UserSelect.value.unmount();
};

const handleMount = () => {
  UserSelect.value = hwComps.hwUserSelect.init(modalRef.value, {
    getContainer: () => document.body,
    defaultSelectedUsers: selectedUserIds.value,
    onConfirm: (users) => {
      console.log("选择的用户", users);
      selectedUsers.value = [...selectedUsers.value, ...users];
      selectedUserIds.value = [
        ...selectedUserIds.value,
        ...users.map((user) => user.userId),
      ];
    },
    onCancel: () => {
      console.log("取消");
    },
    visible: false,
    title: "推送",
  });
};

onMounted(async () => {
  handleMount();
});
</script>
```

## 初始化选中用户（Vue）

```vue
<template>
  <div class="user-card-container">
    <Button type="primary" @click="showModal">选择用户</Button>
    <br />
    <br />
    <div ref="modalRef"></div>
    <Space>
      <Button @click="handleUnmount">unmount</Button>
      <Button @click="handleMount">mount</Button>
      <Button @click="updateDefaultUsers">更新选中用户</Button>
    </Space>
  </div>
</template>

<script setup lang="tsx">
import hwComps from "@hwork/hwork-business-components";
import { Button, Space } from "@hwork/ant-design-vue";
import { ref, onMounted } from "vue";

const modalRef = ref(null);
const UserSelect = ref(null);
const defaultUsers = ["22081307", "22081308", "22081309"];

const showModal = () => {
  UserSelect.value.updateVisible(true);
};

const handleUnmount = () => {
  UserSelect.value.unmount();
};

const handleMount = () => {
  UserSelect.value = hwComps.hwUserSelect.init(modalRef.value, {
    defaultSelectedUsers: defaultUsers,
    getContainer: () => document.body,
    onConfirm: (users) => {
      console.log("选择的用户", users);
    },
    onCancel: () => {
      console.log("取消");
    },
    visible: false,
    title: "推送",
  });
};

const updateDefaultUsers = () => {
  UserSelect.value.updateDefaultSelectedUsers(["21003575", "22081309"]);
};

onMounted(async () => {
  handleMount();
});
</script>
```

## 与业务系统组件联动（Vue）

```vue
<template>
  <div class="user-card-container">
    <Select
      v-model:value="selectedUserIds"
      mode="multiple"
      style="width: 300px"
      placeholder="请选择用户"
    >
      <SelectOption
        v-for="user in selectedUsers"
        :key="user.userId"
        :value="user.userId"
      >
        {{ user.userName }}
      </SelectOption>
    </Select>
    <Button type="primary" style="margin-left: 12px" @click="showModal"
      >选择用户</Button
    >
    <div ref="modalRef"></div>
    <br />
    <Space>
      <Button @click="handleUnmount">unmount</Button>
      <Button @click="handleMount">mount</Button>
    </Space>
  </div>
</template>

<script setup lang="tsx">
import { ref, onMounted } from "vue";
import { Button, Space, Select, SelectOption } from "@hwork/ant-design-vue";
import type { User } from "@hwork/hwork-business-components";
import hwComps from "@hwork/hwork-business-components";

// 组件引用
const modalRef = ref<HTMLElement | null>(null);
const UserSelect = ref<{
  updateVisible: (visible: boolean) => void;
  unmount: () => void;
  updateDefaultSelectedUsers: (defaultSelectedUsers: string[]) => void;
} | null>(null);

// 用户数据
const selectedUsers = ref<User[]>([]);
const selectedUserIds = ref<string[]>([]);

const showModal = () => {
  UserSelect.value?.updateDefaultSelectedUsers(selectedUserIds.value);
  UserSelect.value?.updateVisible(true);
};

const handleUnmount = () => {
  UserSelect.value?.unmount();
};

// 挂载组件
const handleMount = () => {
  UserSelect.value = hwComps.hwUserSelect.init(modalRef.value, {
    defaultSelectedUsers: selectedUserIds.value,
    onConfirm: (users) => {
      console.log("选择的用户", users);
      selectedUsers.value = [...selectedUsers.value, ...users];
      selectedUserIds.value = [
        ...selectedUserIds.value,
        ...users.map((user) => user.userId),
      ];
    },
    onCancel: () => {
      console.log("取消");
    },
    visible: false,
  });
};

// 组件挂载时初始化
onMounted(() => {
  handleMount();
});
</script>
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

## 初始化

```javascript
import hwComps from "@hwork/hwork-business-components";

hwComps.hwUserSelect.init(modalRef.value, {
  onConfirm: (users) => {
    console.log("选择的用户", users);
  },
  onCancel: () => {
    console.log("取消");
  },
  visible: false,
  token: "xxx",
});
```

`init` 方法的第一个参数是需要悬浮展示用户卡片的 Dom 元素，如果 ref.value 是 vue 对象的话，可以传递 `xxxRef.value.$el`。第二个参数是初始化数据，赋值后不支持响应式修改，如需修改请使用 Method 中提供的方法。

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

---

**文档来源**: https://hwork.haier.net/openPlatform/home/designModule?dm=businessComponent
