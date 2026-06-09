<script setup>
// 页面逻辑
import merchantPetDes from '@/components/merchantPetDes.vue'
import { ref } from 'vue'
import reviewMeaasge from '@/components/reviewMeaasge.vue'
const data = ref([
  {
    id: 1,
    image: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    name: '布丁',
    type: '狗',
    date: '2026.05.01-2026.09.03',
    service: '套餐1',
    status: '已结束',
  },
  {
    id: 2,
    image: new URL('@/assets/jpg/cat.jpg', import.meta.url).href,
    name: '草莓',
    type: '猫',
    date: '2026.05.01-2026.09.03',
    service: '套餐1',
    status: '已结束',
  },
])
const petCount = ref(2)
</script>

<template>
  <div class="pet-status">
    <div class="item"></div>
    <span class="status-text">当前寄养中({{ petCount }}只)</span>
  </div>
  <div class="pet-des">
    <merchantPetDes></merchantPetDes>
  </div>

  <el-row :gutter="20">
    <el-col :span="15">
      <div class="pet-history">
        <div class="item2"></div>
        <span class="status-text">历史寄养记录</span>
      </div>
      <div class="history-table">
        <el-table :data="data" style="width: 100%">
          <el-table-column label="图片" width="120">
            <template #default="scope">
              <el-image :src="scope.row.image" fit="cover" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="宠物" width="100" />
          <el-table-column prop="type" label="宠物类型" width="100" />
          <el-table-column prop="date" label="寄养时间" width="180" />
          <el-table-column prop="service" label="套餐服务" width="100" />
          <el-table-column prop="status" label="状态" width="80" />
          <el-table-column fixed="right" label="操作" min-width="80">
            <template #default>
              <el-link type="info" @click="handleClick">查看档案</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="recent-review">近期客户评价</div>
      <reviewMeaasge></reviewMeaasge>
    </el-col>
  </el-row>
</template>

<style scoped>
.pet-des {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
.pet-status {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  .item {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #22c55e;
  }
}
.pet-history {
  margin: 50px auto 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
.item2 {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #cbd5e1;
}
.status-text {
  font-size: 20px;
  font-weight: bold;
}
.history-table {
  display: flex;
  justify-content: center;
  align-items: center;
}
.recent-review {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
