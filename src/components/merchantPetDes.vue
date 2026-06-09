<script setup>
// 页面逻辑
import { ref } from 'vue'
import cardPetDes from '@/components/slot/cardPetDes.vue'

const data = ref([
  {
    id: 1,
    image: new URL('@/assets/png/cat.png', import.meta.url).href,
    name: '布丁',
    type: '猫',
    master: '客户1',
    phone: '13800000000',
    date: '4',
    sex: '公',
    service: '套餐1',
    desc: '不吃胡萝卜',
    weight: '10kg',
  },
  {
    id: 2,
    image: new URL('@/assets/jpg/cat.jpg', import.meta.url).href,
    name: '草莓',
    type: '猫',
    phone: '13800000001',
    master: '客户2',
    date: '4',
    sex: '母',
    service: '套餐2',
    desc: '不吃胡萝卜',
    weight: '10kg',
  },
])
</script>

<template>
  <cardPetDes v-for="item in data" :key="item.id">
    <template #image>
      <el-image :src="item.image" style="width: 100px; height: 100px" alt="" fit="contain" />
    </template>
    <template #main-info>
      <h3>{{ item.name }}</h3>
      <p class="main-info-pet">{{ item.type }} · {{ item.weight }} · {{ item.sex }}</p>
      <p class="main-info-master">主人：{{ item.master }}（{{ item.phone }}）</p>
    </template>
    <template #body>
      <div class="form-item">
        <span class="item-left">预定套餐</span>
        <span class="item-right">{{ item.service }}</span>
      </div>
      <div class="form-item">
        <span class="item-left">剩余天数</span>
        <span class="item-right">{{ item.date }}天</span>
      </div>
      <div class="form-item">
        <span class="item-left">标签</span>
        <span class="item-right">{{ item.desc }}</span>
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <el-button type="warning" size="default">上传今日视频</el-button>
        <el-button type="info" size="default">联系主人</el-button>
      </div>
    </template>
  </cardPetDes>
</template>

<style scoped>
p {
  margin: 0;
}
.main-info-pet {
  font-size: 0.75rem;
  color: #838c95;
}
.main-info-master {
  font-size: 0.75rem;
  color: #a2b4cd;
}

.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  .item-left {
    font-size: 0.8rem;
    color: #a2a3c8;
  }
  .item-right {
    font-size: 0.8rem;
    color: #334155;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
