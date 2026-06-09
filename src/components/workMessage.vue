<script setup>
import { ref } from 'vue'
import cardMessage from '@/components/slot/cardMessage.vue'
const data = ref({
  title: [
    {
      id: 1,
      title: '新增订单',
      count: 1,
      unit: '单',
    },
    {
      id: 2,
      title: '在养宠物',
      count: 50,
      unit: '只',
    },
    {
      id: 3,
      title: '本月预计收入',
      count: 18254,
      unit: '元',
    },
  ],
})
</script>

<template>
  <cardMessage v-for="item in data.title" :key="item.id">
    <template #title>
      <div class="title">{{ item.title }}</div>
    </template>
    <template #count>
      <div class="count">
        <h3 class="num">{{ item.count }}</h3>
        <p class="unit">{{ item.unit }}</p>
      </div>
    </template>
    <template #tag>
      <div class="tag">
        <el-link type="warning">查看详情</el-link>
      </div>
    </template>
  </cardMessage>
</template>

<style lang="less" scoped>
.title {
  font-size: 0.87rem;
  font-weight: bold;
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

.tag {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
