<script setup>
import { Star } from '@element-plus/icons-vue'
import { ref } from 'vue'

const petCount = ref(2)
</script>

<template>
  <el-card class="message-card" shadow="hover">
    <div class="top">
      <div class="icon-wrapper">
        <el-icon class="icon">
          <Star />
        </el-icon>
      </div>
      <div class="tag"></div>
    </div>
    <div class="text-content">
      <div class="title">收藏店铺</div>
      <div class="count">
        <h3 class="num">{{ petCount }}</h3>
        <p class="unit">家</p>
      </div>
    </div>
  </el-card>
</template>

<style lang="less" scoped>
.message-card {
  height: 100%;
  border-radius: 16px;
  padding: 10px;
  background-color: #fff;
  .top {
    display: flex;
    flex-direction: row;
    gap: 100px;
    .icon-wrapper {
      width: 50px;
      height: 50px;
      background-color: #fef2f2; /* 浅蓝色背景 */
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        color: #ef4444;
        font-size: 30px;
      }
    }
    .tag {
      width: 55px;
    }
  }
  .text-content {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    .title {
      font-size: 0.87rem;
      color: #606266;
    }
    .count {
      display: flex;
      align-items: baseline;
      .num {
        font-size: 1.5rem;
        color: #303133;
        margin: 0;
        margin-top: 5px;
      }
      .unit {
        color: #606266;
        margin: 0 5px;
      }
    }
  }
}
</style>
