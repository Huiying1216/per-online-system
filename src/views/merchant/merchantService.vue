<script setup>
import merchantShow from '@/components/merchantShow.vue'
</script>

<template>
  <div class="merchant-service-title">
    <h1>服务管理</h1>
  </div>
  <div class="merchant-service-content">
    <el-space direction="horizontal" size="25" wrap>
      <merchantShow />
    </el-space>
  </div>
</template>

<style lang="less" scoped>
.merchant-service-title {
  margin-bottom: 20px;
}
</style>
