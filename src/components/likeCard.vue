<script setup>
import cardMerchant from '@/components/slot/cardMerchant.vue'
import lookDetail from '@/components/lookDetail.vue'
import { Star, Delete } from '@element-plus/icons-vue'
import petImage from '@/assets/png/petShop.png'

const data = [
  {
    id: 1,
    image: petImage,
    name: '淋雨走之家',
    price: 88,
    score: 4.9,
    location: '广东',
    status: '待确认',
  },
  {
    id: 2,
    image: petImage,
    name: '汪汪乐园精品寄养',
    price: 128,
    score: 4.4,
    location: '广东',
    status: '寄养中',
  },
  {
    id: 3,
    image: petImage,
    name: '萌宠之家',
    price: 158,
    score: 4.5,
    location: '广东',
    status: '已完成',
  },
]
</script>
<template>
  <cardMerchant v-for="item in data" :key="item.id">
    <template #header>
      <el-image class="header-image" :src="item.image" fit="cover"></el-image>
    </template>
    <template #title>
      <div class="title">
        <h4>{{ item.name }}</h4>
        <el-icon><Star /></el-icon><span>{{ item.score }}</span>
        <div class="main">
          <span class="price">￥{{ item.price }}<span>/天起</span></span>
          <span>{{ item.location }}</span>
        </div>
      </div>
    </template>
    <template #enter>
      <div class="enter">
        <lookDetail :item="item" />
        <div class="delete-icon">
          <el-icon><Delete /></el-icon>
        </div>
      </div>
    </template>
  </cardMerchant>
</template>

<style lang="less" scoped>
.header-image {
  width: 100%;
  height: 100%;
  display: block;
}
.enter {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 1rem;
}
.delete-icon {
  border-color: #a3a9b4;
  flex: 1;
  display: flex;

  justify-content: flex-end;
  .el-icon {
    color: #bdc2ca;
  }
  &:hover {
    background-color: #ffedd5;
  }
  &:hover .el-icon {
    color: #e86510;
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
