<script setup>
import { Goods } from '@element-plus/icons-vue'
import { ref } from 'vue'

const userCount = ref(85620)
const newCount = ref(82)
</script>

<template>
  <el-card class="message-card" shadow="hover">
    <div class="top">
      <div class="icon-wrapper">
        <el-icon class="icon">
          <Goods />
        </el-icon>
      </div>
      <div class="change" v-if="newCount > 0">
        <el-tag class="tag" type="success" effect="plain"> + {{ newCount }} 今日 </el-tag>
      </div>
      <div class="change" v-else>
        <div class="tag-no"></div>
      </div>
    </div>
    <div class="text-content">
      <div class="title">累计订单数</div>
      <div class="count">
        <h3 class="num">{{ userCount }}</h3>
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
    justify-content: space-between;
    gap: 100px;
    .icon-wrapper {
      width: 50px;
      height: 50px;
      background-color: #f0fdf4; /* 浅蓝色背景 */
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        color: #16a34a;
        font-size: 30px;
      }
    }
    .tag {
      width: 100%;
    }
    .tag-no {
      width: 66px;
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
    }
  }
}
</style>
