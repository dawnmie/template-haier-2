# PersonnelList 代码示例

## 基础使用

```vue
<template>
  <div class="user-card-container">
    <div ref="popoverRef"></div>
  </div>
</template>

<script setup>
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
    }
  );
});
</script>
```

## 多选模式

```vue
<template>
  <div class="user-card-container">
    <div ref="popoverRef"></div>
    <br />
    <a-space>
      <a-button @click="updateDisabled">更新disabled状态</a-button>
      <a-button @click="updateSelectVal">更新选中用户</a-button>
    </a-space>
  </div>
</template>

<script setup>
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
    }
  );
});
</script>
```

## 自定义模式

```vue
<template>
  <div class="user-card-container">
    <div ref="popoverRef"></div>
    <br />
    <a-space>
      <a-button @click="updateUserIds">更新工号列表</a-button>
      <a-button @click="updateSelectVal">更新选中用户</a-button>
    </a-space>
  </div>
</template>

<script setup>
import hwComps from "@hwork/hwork-business-components";
import { ref, onMounted } from "vue";
import { Button, Space } from "@hwork/ant-design-vue";

const popoverRef = ref(null);
const personnelListSelect = ref(null);

const selectVal = ref({
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
    }
  );
};

// 处理搜索事件 - 业务系统的搜索逻辑
const handleSearch = (searchText) => {
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

## 表单集成示例

```vue
<template>
  <div class="form-demo">
    <h3>用户信息表单</h3>
    <a-form :model="formData" layout="vertical">
      <a-form-item label="负责人" name="manager">
        <div ref="managerRef"></div>
      </a-form-item>

      <a-form-item label="参与人员" name="participants">
        <div ref="participantsRef"></div>
      </a-form-item>

      <a-form-item label="抄送人员" name="ccUsers">
        <div ref="ccUsersRef"></div>
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button type="primary" @click="handleSubmit">提交</a-button>
          <a-button @click="handleReset">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>

    <div class="form-data" v-if="Object.keys(formData).length">
      <h4>表单数据：</h4>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import hwComps from "@hwork/hwork-business-components";
import { Form, FormItem, Button, Space } from "@hwork/ant-design-vue";
import { ref, reactive, onMounted } from "vue";

const managerRef = ref(null);
const participantsRef = ref(null);
const ccUsersRef = ref(null);

const formData = reactive({
  manager: null,
  participants: [],
  ccUsers: [],
});

const managerSelect = ref(null);
const participantsSelect = ref(null);
const ccUsersSelect = ref(null);

const handleSubmit = () => {
  console.log("提交表单数据:", formData);
};

const handleReset = () => {
  formData.manager = null;
  formData.participants = [];
  formData.ccUsers = [];

  // 重置组件值
  managerSelect.value?.updateValue(null);
  participantsSelect.value?.updateValue([]);
  ccUsersSelect.value?.updateValue([]);
};

onMounted(() => {
  // 负责人选择器（单选）
  managerSelect.value = hwComps.hwPersonnelListSelect.init(managerRef.value, {
    style: { width: "100%" },
    placeholder: "请选择负责人",
    labelInValue: true,
    allowClear: true,
    onChange: (val) => {
      formData.manager = val;
    },
  });

  // 参与人员选择器（多选）
  participantsSelect.value = hwComps.hwPersonnelListSelect.init(
    participantsRef.value,
    {
      mode: "multiple",
      style: { width: "100%" },
      placeholder: "请选择参与人员",
      labelInValue: true,
      allowClear: true,
      maxTagCount: 2,
      onChange: (val) => {
        formData.participants = val || [];
      },
    }
  );

  // 抄送人员选择器（多选）
  ccUsersSelect.value = hwComps.hwPersonnelListSelect.init(ccUsersRef.value, {
    mode: "multiple",
    style: { width: "100%" },
    placeholder: "请选择抄送人员",
    labelInValue: true,
    allowClear: true,
    maxTagCount: 3,
    onChange: (val) => {
      formData.ccUsers = val || [];
    },
  });
});
</script>

<style scoped>
.form-demo {
  padding: 24px;
  max-width: 600px;
}

.form-data {
  margin-top: 24px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 6px;
}

.form-data pre {
  margin: 0;
  font-size: 12px;
}
</style>
```

## 状态过滤示例

```vue
<template>
  <div class="status-demo">
    <h3>用户状态过滤</h3>

    <div class="filter-controls">
      <a-space>
        <span>用户状态：</span>
        <a-checkbox-group
          v-model:value="selectedStatus"
          @change="updateUserStatus"
        >
          <a-checkbox value="1">在岗</a-checkbox>
          <a-checkbox value="2">不在岗</a-checkbox>
          <a-checkbox value="3">退休</a-checkbox>
          <a-checkbox value="4">离职</a-checkbox>
        </a-checkbox-group>
      </a-space>
    </div>

    <div class="select-container">
      <div ref="statusSelectRef"></div>
    </div>
  </div>
</template>

<script setup>
import hwComps from "@hwork/hwork-business-components";
import { CheckboxGroup, Checkbox, Space } from "@hwork/ant-design-vue";
import { ref, onMounted } from "vue";

const statusSelectRef = ref(null);
const statusSelect = ref(null);
const selectedStatus = ref(["1"]); // 默认只显示在岗用户

const updateUserStatus = () => {
  // 重新初始化组件以应用新的状态过滤
  if (statusSelect.value) {
    statusSelect.value.unmount();
  }

  statusSelect.value = hwComps.hwPersonnelListSelect.init(
    statusSelectRef.value,
    {
      style: { width: "300px" },
      placeholder: "请选择用户",
      labelInValue: true,
      allowClear: true,
      userStatusList: selectedStatus.value,
      onChange: (val) => {
        console.log("选择的用户:", val);
      },
    }
  );
};

onMounted(() => {
  updateUserStatus();
});
</script>

<style scoped>
.status-demo {
  padding: 24px;
}

.filter-controls {
  margin-bottom: 16px;
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
}

.select-container {
  margin-top: 16px;
}
</style>
```
