<template>
  <div class="welcome-wrap">
    <p class="welcome-text">
      欢迎使用本应用（根路径 <code>/</code>）。请在此页面扩展你的界面与业务逻辑。
    </p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.welcome-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: #fafafa;
}

.welcome-text {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
  margin: 0;
}
</style>
