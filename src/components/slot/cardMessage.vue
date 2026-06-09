<script setup></script>

<template>
  <el-card class="message-card" shadow="hover">
    <div class="top">
      <div class="text-content">
        <slot name="title"></slot>
        <slot name="count"></slot>
      </div>
      <slot name="tag"></slot>
    </div>
  </el-card>
</template>

<style lang="less" scoped>
.message-card {
  border-radius: 16px;
  width: 400px;
  padding: 10px;
  background-color: #fff;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text-content {
    display: flex;
    flex-direction: column;
  }
}
</style>
