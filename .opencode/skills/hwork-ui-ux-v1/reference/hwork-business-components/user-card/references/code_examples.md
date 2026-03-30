# UserCard 代码示例

## 基础使用

```vue
<template>
  <div class="user-card-container">
    <span>鼠标悬浮至名字上方查看卡片：</span>
    <span ref="popoverRef">王子萁</span>
  </div>
</template>

<script setup>
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

## 更新工号

```vue
<template>
  <div class="user-card-container">
    <span ref="popover2Ref">{{ userCode }}</span>
    <br />
    <br />
    <a-space>
      <a-button @click="handleUnmount">卸载</a-button>
      <a-button @click="handleMount">加载</a-button>
      <a-button @click="handleUserCodeChange">更新工号</a-button>
    </a-space>

    <!-- 添加用户工号输入对话框 -->
    <a-modal
      v-model:visible="isModalVisible"
      title="更新工号"
      @ok="confirmUserCodeChange"
      @cancel="cancelUserCodeChange"
    >
      <a-input v-model:value="newUserCode" placeholder="请输入新的工号" />
    </a-modal>
  </div>
</template>

<script setup>
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

## 自定义位置和延迟

```vue
<template>
  <div class="demo-container">
    <h3>不同位置的用户卡片</h3>
    <div class="position-demo">
      <span ref="topRef" class="user-name">顶部显示</span>
      <span ref="rightRef" class="user-name">右侧显示</span>
      <span ref="bottomRef" class="user-name">底部显示</span>
      <span ref="leftRef" class="user-name">左侧显示</span>
    </div>

    <h3>自定义延迟时间</h3>
    <div class="delay-demo">
      <span ref="fastRef" class="user-name">快速响应(100ms)</span>
      <span ref="normalRef" class="user-name">正常响应(300ms)</span>
      <span ref="slowRef" class="user-name">慢速响应(800ms)</span>
    </div>
  </div>
</template>

<script setup>
import hwComps from "@hwork/hwork-business-components";
import { ref, onMounted } from "vue";

const topRef = ref(null);
const rightRef = ref(null);
const bottomRef = ref(null);
const leftRef = ref(null);
const fastRef = ref(null);
const normalRef = ref(null);
const slowRef = ref(null);

onMounted(() => {
  // 不同位置
  hwComps.hwUserCard.init(topRef.value, {
    userCode: "21022951",
    placement: "top",
  });

  hwComps.hwUserCard.init(rightRef.value, {
    userCode: "22081309",
    placement: "right",
  });

  hwComps.hwUserCard.init(bottomRef.value, {
    userCode: "22072453",
    placement: "bottom",
  });

  hwComps.hwUserCard.init(leftRef.value, {
    userCode: "21022951",
    placement: "left",
  });

  // 不同延迟时间
  hwComps.hwUserCard.init(fastRef.value, {
    userCode: "21022951",
    mouseEnterDelay: 100,
    mouseLeaveDelay: 100,
  });

  hwComps.hwUserCard.init(normalRef.value, {
    userCode: "22081309",
    mouseEnterDelay: 300,
    mouseLeaveDelay: 300,
  });

  hwComps.hwUserCard.init(slowRef.value, {
    userCode: "22072453",
    mouseEnterDelay: 800,
    mouseLeaveDelay: 800,
  });
});
</script>

<style scoped>
.demo-container {
  padding: 24px;
}

.position-demo,
.delay-demo {
  display: flex;
  gap: 24px;
  margin: 16px 0;
}

.user-name {
  padding: 8px 16px;
  background: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-name:hover {
  background: #e6f7ff;
}
</style>
```

## 开启缓存优化

```vue
<template>
  <div class="cache-demo">
    <h3>用户列表（开启缓存）</h3>
    <div class="user-list">
      <div
        v-for="user in userList"
        :key="user.id"
        :ref="(el) => setUserRef(el, user.userCode)"
        class="user-item"
      >
        <span class="user-name">{{ user.name }}</span>
        <span class="user-code">{{ user.userCode }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import hwComps from "@hwork/hwork-business-components";
import { ref, onMounted } from "vue";

const userList = ref([
  { id: 1, name: "张三", userCode: "21022951" },
  { id: 2, name: "李四", userCode: "22081309" },
  { id: 3, name: "王五", userCode: "22072453" },
  { id: 4, name: "赵六", userCode: "21022951" }, // 重复用户，会使用缓存
  { id: 5, name: "钱七", userCode: "22081309" }, // 重复用户，会使用缓存
]);

const userRefs = new Map();

const setUserRef = (el, userCode) => {
  if (el) {
    userRefs.set(userCode, el);
  }
};

onMounted(() => {
  // 为每个用户初始化卡片，开启缓存
  userList.value.forEach((user) => {
    const element = userRefs.get(user.userCode);
    if (element) {
      hwComps.hwUserCard.init(element, {
        userCode: user.userCode,
        cache: true, // 开启缓存，重复用户信息会被缓存
        placement: "right",
        mouseEnterDelay: 200,
        mouseLeaveDelay: 200,
      });
    }
  });
});
</script>

<style scoped>
.cache-demo {
  padding: 24px;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-item:hover {
  background: #e6f7ff;
}

.user-name {
  font-weight: 500;
  margin-right: 12px;
}

.user-code {
  color: #666;
  font-size: 12px;
}
</style>
```

## 错误处理

```vue
<template>
  <div class="error-demo">
    <h3>错误处理示例</h3>
    <span ref="errorRef" class="user-name">无效用户工号</span>
    <div class="error-log" v-if="errorMessage">
      <strong>错误信息：</strong>{{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import hwComps from "@hwork/hwork-business-components";
import { ref, onMounted } from "vue";

const errorRef = ref(null);
const errorMessage = ref("");

onMounted(() => {
  hwComps.hwUserCard.init(errorRef.value, {
    userCode: "invalid_user_code", // 无效的用户工号
    placement: "top",
    errorHandler: (error) => {
      console.error("UserCard 错误:", error);
      errorMessage.value = error.message || "加载用户信息失败";
    },
  });
});
</script>

<style scoped>
.error-demo {
  padding: 24px;
}

.user-name {
  padding: 8px 16px;
  background: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
}

.error-log {
  margin-top: 16px;
  padding: 12px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  color: #a8071a;
}
</style>
```
