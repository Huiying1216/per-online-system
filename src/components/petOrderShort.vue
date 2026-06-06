<script setup>
import cardOrder from '@/components/slot/cardOrder.vue'
import petImage from '@/assets/png/dog.png'
import { Calendar, VideoCamera } from '@element-plus/icons-vue'
</script>

<template>
  <cardOrder>
    <template #image>
      <el-image style="width: 100px; height: 100px" :src="petImage" fit="contain" />
    </template>
    <template #message>
      <h3>补丁（柯基）</h3>
      <p class="location">寄养地点：林宇洲之家（天河区）</p>
      <p class="detail">
        <el-icon><Calendar /></el-icon>2023-08-01 至 2023-08-07
        <el-icon class="gap"> <VideoCamera /></el-icon><span>监控在线</span>
      </p>
    </template>
    <template #order-os>
      <el-button type="warning">查看监控</el-button>
    </template>
  </cardOrder>
</template>

<style lang="less" scoped>
h3 {
  font-size: 1.25rem;
}
.location {
  font-size: 0.75rem;
}
.detail {
  font-size: 10px;
  color: #a1a8b3;
  .gap {
    margin-left: 10px;
  }
}
.el-button {
  margin: auto 0;
}
</style>
