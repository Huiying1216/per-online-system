<script setup>
import { Clock } from '@element-plus/icons-vue'
import { ref } from 'vue'

const petCount = ref(2)
const newCount = ref(2)
</script>

<template>
  <el-card class="message-card" shadow="hover">
    <div class="top">
      <div class="icon-wrapper">
        <el-icon class="icon">
          <Clock />
        </el-icon>
      </div>
      <el-tag class="tag" type="success" effect="plain"> {{ newCount }} 本月 </el-tag>
    </div>
    <div class="text-content">
      <div class="title">待处理订单</div>
      <div class="count">
        <h3 class="num">{{ petCount }}</h3>
        <p class="unit">单</p>
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
      background-color: #fff7ed;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        color: #e8630c;
        font-size: 30px;
      }
    }
    .tag {
      background-color: #fff7ed;
      color: #f97316;
      border: none;
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
