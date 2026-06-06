<script setup></script>
<template>
  <el-card>
    <template #header>
      <slot name="header"></slot>
    </template>
    <slot name="title"></slot>
    <slot name="enter"> </slot>
  </el-card>
</template>

<style lang="less" scoped>
.el-card {
  :deep(.el-card__header) {
    padding: 0;
    height: 200px;
  }
}
.title {
  font-family: '微软雅黑', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  h4 {
    margin: 0;
    margin-bottom: 0.5rem;
  }
  .el-icon {
    color: #e86510;
    margin-right: 5px;
  }
  span {
    color: #a3a9b4;
    margin-right: 5px;
  }
  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
    .price {
      color: #e86510;
    }
  }
}
</style>
