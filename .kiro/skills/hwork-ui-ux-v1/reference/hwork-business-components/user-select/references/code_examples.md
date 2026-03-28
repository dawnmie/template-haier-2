# UserSelect 代码示例

## 基础使用

```vue
<template>
  <div class="user-card-container">
    <a-button type="primary" @click="showModal">选择用户</a-button>
    <br />
    <br />
    <div ref="modalRef"></div>
    <a-space>
      <a-button @click="handleUnmount">unmount</a-button>
      <a-button @click="handleMount">mount</a-button>
    </a-space>
  </div>
</template>

<script setup>
import hwComps from "@hwork/hwork-business-components";
import { Button, Space } from "@hwork/ant-design-vue";
import { ref, onMounted } from "vue";

const modalRef = ref(null);
const UserSelect = ref(null);
const selectedUsers = ref([]);
const selectedUserIds = ref([]);

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

## 初始化选中用户

```vue
<template>
  <div class="user-card-container">
    <a-button type="primary" @click="showModal">选择用户</a-button>
    <br />
    <br />
    <div ref="modalRef"></div>
    <a-space>
      <a-button @click="handleUnmount">unmount</a-button>
      <a-button @click="handleMount">mount</a-button>
      <a-button @click="updateDefaultUsers">更新选中用户</a-button>
    </a-space>
  </div>
</template>

<script setup>
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

## 与业务系统组件联动

```vue
<template>
  <div class="user-card-container">
    <a-select
      v-model:value="selectedUserIds"
      mode="multiple"
      style="width: 300px"
      placeholder="请选择用户"
    >
      <a-select-option
        v-for="user in selectedUsers"
        :key="user.userId"
        :value="user.userId"
      >
        {{ user.userName }}
      </a-select-option>
    </a-select>
    <a-button type="primary" style="margin-left: 12px" @click="showModal">
      选择用户
    </a-button>
    <div ref="modalRef"></div>
    <br />
    <a-space>
      <a-button @click="handleUnmount">unmount</a-button>
      <a-button @click="handleMount">mount</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Button, Space, Select, SelectOption } from "@hwork/ant-design-vue";
import hwComps from "@hwork/hwork-business-components";

// 组件引用
const modalRef = ref(null);
const UserSelect = ref(null);

// 用户数据
const selectedUsers = ref([]);
const selectedUserIds = ref([]);

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

## 自定义数据源模式

```vue
<template>
  <div class="custom-demo">
    <h3>自定义数据源选人</h3>

    <div class="controls">
      <a-space>
        <a-button type="primary" @click="showModal">选择用户</a-button>
        <a-button @click="updateUserList">更新用户列表</a-button>
        <a-button @click="clearSelection">清空选择</a-button>
      </a-space>
    </div>

    <div class="selected-users" v-if="selectedUsers.length">
      <h4>已选用户：</h4>
      <a-tag
        v-for="user in selectedUsers"
        :key="user.userId"
        closable
        @close="removeUser(user.userId)"
      >
        {{ user.userName }}
      </a-tag>
    </div>

    <div ref="modalRef"></div>
  </div>
</template>

<script setup>
import hwComps from "@hwork/hwork-business-components";
import { Button, Space, Tag } from "@hwork/ant-design-vue";
import { ref, onMounted } from "vue";

const modalRef = ref(null);
const UserSelect = ref(null);
const selectedUsers = ref([]);
const selectedUserIds = ref([]);

// 自定义用户列表
const customUserIds = ref([
  "22081309",
  "22072453",
  "21022951",
  "20024300",
  "21003575",
  "22081307",
]);

const showModal = () => {
  UserSelect.value?.updateDefaultSelectedUsers(selectedUserIds.value);
  UserSelect.value?.updateVisible(true);
};

const updateUserList = () => {
  // 模拟更新用户列表
  const newUserIds = ["23001001", "23001002", "23001003"];
  customUserIds.value = [...customUserIds.value, ...newUserIds];

  if (UserSelect.value) {
    UserSelect.value.updateUserIds(customUserIds.value);
  }
};

const clearSelection = () => {
  selectedUsers.value = [];
  selectedUserIds.value = [];

  if (UserSelect.value) {
    UserSelect.value.updateDefaultSelectedUsers([]);
  }
};

const removeUser = (userId) => {
  selectedUsers.value = selectedUsers.value.filter(
    (user) => user.userId !== userId
  );
  selectedUserIds.value = selectedUserIds.value.filter((id) => id !== userId);
};

// 处理搜索事件
const handleSearch = (searchText) => {
  console.log("搜索:", searchText);

  // 模拟搜索逻辑
  setTimeout(() => {
    let filteredIds = customUserIds.value;

    if (searchText) {
      // 这里可以根据搜索关键词过滤用户
      // 实际项目中可能需要调用后端接口
      filteredIds = customUserIds.value.slice(0, 3); // 模拟搜索结果
    }

    if (UserSelect.value) {
      UserSelect.value.updateUserIds(filteredIds);
    }
  }, 300);
};

const handleMount = () => {
  UserSelect.value = hwComps.hwUserSelect.init(modalRef.value, {
    title: "选择项目成员",
    selectMode: "custom",
    userIds: customUserIds.value,
    defaultSelectedUsers: selectedUserIds.value,
    onConfirm: (users) => {
      console.log("确认选择的用户:", users);
      selectedUsers.value = users;
      selectedUserIds.value = users.map((user) => user.userId);
    },
    onCancel: () => {
      console.log("取消选择");
    },
    onSearch: handleSearch,
    visible: false,
  });
};

onMounted(() => {
  handleMount();
});
</script>

<style scoped>
.custom-demo {
  padding: 24px;
}

.controls {
  margin-bottom: 24px;
}

.selected-users {
  margin-top: 16px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 6px;
}

.selected-users h4 {
  margin-bottom: 12px;
}

.selected-users .ant-tag {
  margin-bottom: 8px;
}
</style>
```

## 表单集成示例

```vue
<template>
  <div class="form-integration">
    <h3>任务分配表单</h3>

    <a-form :model="taskForm" layout="vertical" @finish="handleSubmit">
      <a-form-item
        label="任务名称"
        name="taskName"
        :rules="[{ required: true, message: '请输入任务名称' }]"
      >
        <a-input
          v-model:value="taskForm.taskName"
          placeholder="请输入任务名称"
        />
      </a-form-item>

      <a-form-item label="任务描述" name="description">
        <a-textarea
          v-model:value="taskForm.description"
          placeholder="请输入任务描述"
        />
      </a-form-item>

      <a-form-item label="负责人" name="assignees">
        <div class="assignee-section">
          <div class="selected-assignees" v-if="taskForm.assignees.length">
            <a-tag
              v-for="user in taskForm.assignees"
              :key="user.userId"
              closable
              @close="removeAssignee(user.userId)"
            >
              {{ user.userName }}
            </a-tag>
          </div>
          <a-button @click="showAssigneeModal" icon="plus">选择负责人</a-button>
        </div>
      </a-form-item>

      <a-form-item label="抄送人员" name="ccUsers">
        <div class="cc-section">
          <div class="selected-cc" v-if="taskForm.ccUsers.length">
            <a-tag
              v-for="user in taskForm.ccUsers"
              :key="user.userId"
              closable
              @close="removeCcUser(user.userId)"
            >
              {{ user.userName }}
            </a-tag>
          </div>
          <a-button @click="showCcModal" icon="plus">选择抄送人员</a-button>
        </div>
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">创建任务</a-button>
          <a-button @click="resetForm">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>

    <!-- 负责人选择器 -->
    <div ref="assigneeModalRef"></div>

    <!-- 抄送人员选择器 -->
    <div ref="ccModalRef"></div>
  </div>
</template>

<script setup>
import hwComps from "@hwork/hwork-business-components";
import {
  Form,
  FormItem,
  Input,
  Textarea,
  Button,
  Space,
  Tag,
} from "@hwork/ant-design-vue";
import { ref, reactive, onMounted } from "vue";

const assigneeModalRef = ref(null);
const ccModalRef = ref(null);
const AssigneeSelect = ref(null);
const CcSelect = ref(null);

const taskForm = reactive({
  taskName: "",
  description: "",
  assignees: [],
  ccUsers: [],
});

const showAssigneeModal = () => {
  const currentIds = taskForm.assignees.map((user) => user.userId);
  AssigneeSelect.value?.updateDefaultSelectedUsers(currentIds);
  AssigneeSelect.value?.updateVisible(true);
};

const showCcModal = () => {
  const currentIds = taskForm.ccUsers.map((user) => user.userId);
  CcSelect.value?.updateDefaultSelectedUsers(currentIds);
  CcSelect.value?.updateVisible(true);
};

const removeAssignee = (userId) => {
  taskForm.assignees = taskForm.assignees.filter(
    (user) => user.userId !== userId
  );
};

const removeCcUser = (userId) => {
  taskForm.ccUsers = taskForm.ccUsers.filter((user) => user.userId !== userId);
};

const handleSubmit = () => {
  console.log("提交任务:", taskForm);
  // 这里可以调用API提交任务
};

const resetForm = () => {
  taskForm.taskName = "";
  taskForm.description = "";
  taskForm.assignees = [];
  taskForm.ccUsers = [];
};

onMounted(() => {
  // 初始化负责人选择器
  AssigneeSelect.value = hwComps.hwUserSelect.init(assigneeModalRef.value, {
    title: "选择任务负责人",
    onConfirm: (users) => {
      taskForm.assignees = users;
    },
    onCancel: () => {
      console.log("取消选择负责人");
    },
    visible: false,
  });

  // 初始化抄送人员选择器
  CcSelect.value = hwComps.hwUserSelect.init(ccModalRef.value, {
    title: "选择抄送人员",
    onConfirm: (users) => {
      taskForm.ccUsers = users;
    },
    onCancel: () => {
      console.log("取消选择抄送人员");
    },
    visible: false,
  });
});
</script>

<style scoped>
.form-integration {
  padding: 24px;
  max-width: 600px;
}

.assignee-section,
.cc-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.selected-assignees,
.selected-cc {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.selected-assignees .ant-tag,
.selected-cc .ant-tag {
  margin: 0;
}
</style>
```

## 权限管理示例

```vue
<template>
  <div class="permission-demo">
    <h3>权限管理</h3>

    <a-card title="角色权限设置">
      <div class="role-section">
        <div class="role-item" v-for="role in roles" :key="role.id">
          <div class="role-header">
            <h4>{{ role.name }}</h4>
            <a-button size="small" @click="editRole(role)">编辑成员</a-button>
          </div>

          <div class="role-members">
            <a-tag v-for="user in role.members" :key="user.userId">
              {{ user.userName }}
            </a-tag>
            <span v-if="!role.members.length" class="empty-text">暂无成员</span>
          </div>
        </div>
      </div>
    </a-card>

    <div ref="roleModalRef"></div>
  </div>
</template>

<script setup>
import hwComps from "@hwork/hwork-business-components";
import { Card, Button, Tag } from "@hwork/ant-design-vue";
import { ref, reactive, onMounted } from "vue";

const roleModalRef = ref(null);
const RoleSelect = ref(null);
const currentRole = ref(null);

const roles = reactive([
  {
    id: 1,
    name: "管理员",
    members: [],
  },
  {
    id: 2,
    name: "编辑者",
    members: [],
  },
  {
    id: 3,
    name: "查看者",
    members: [],
  },
]);

const editRole = (role) => {
  currentRole.value = role;
  const currentIds = role.members.map((user) => user.userId);
  RoleSelect.value?.updateDefaultSelectedUsers(currentIds);
  RoleSelect.value?.updateVisible(true);
};

onMounted(() => {
  RoleSelect.value = hwComps.hwUserSelect.init(roleModalRef.value, {
    title: "编辑角色成员",
    onConfirm: (users) => {
      if (currentRole.value) {
        currentRole.value.members = users;
        console.log(`更新${currentRole.value.name}成员:`, users);
      }
    },
    onCancel: () => {
      console.log("取消编辑");
    },
    visible: false,
  });
});
</script>

<style scoped>
.permission-demo {
  padding: 24px;
}

.role-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.role-item {
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.role-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.role-header h4 {
  margin: 0;
}

.role-members {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.empty-text {
  color: #999;
  font-style: italic;
}
</style>
```
