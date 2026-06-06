<script setup>
import cardMessageIcon from '@/components/slot/cardMessageIcon.vue'
import { Star, Location } from '@element-plus/icons-vue'
import lookDetail from '@/components/lookDetail.vue'
import bookService from '@/components/bookService.vue'
const data = {
  merchant: [
    {
      id: 1,
      image: new URL('@/assets/png/petShop.png', import.meta.url).href,
      name: '萌宠之家旗舰店',
      address: '广东省广州市天河区112号',
      weight: '4.9',
      tag: ['超大空间', '洗浴服务'],
      price: '128',
      state: 1,
    },
    {
      id: 2,
      image: new URL('@/assets/png/petShop2.png', import.meta.url).href,
      name: '阳光托宠',
      address: '广东省惠州市惠东县13号',
      weight: '4.8',
      tag: ['24h服务', '洗浴服务'],
      price: '100',
      state: 1,
    },
    {
      id: 3,
      image: new URL('@/assets/png/cat.png', import.meta.url).href,
      name: '淋雨洲之家',
      address: '广东省广州市天河区广东金融学院',
      weight: '4.9',
      tag: ['超大空间', '洗浴服务'],
      price: '300',
      state: 0,
    },
    {
      id: 4,
      image: new URL('@/assets/png/cat.png', import.meta.url).href,
      name: '宠伴之家高端寄养',
      address: '广东省广州市天河区广东金融学院',
      weight: '4.9',
      tag: ['超大空间', '洗浴服务'],
      price: '300',
      state: 0,
    },
  ],
}
</script>
<template>
  <el-space direction="horizontal" size="25" wrap>
    <cardMessageIcon v-for="item in data.merchant" :key="item.id">
      <template #image>
        <el-image style="width: 370px; height: 270px" :src="item.image" fit="cover"></el-image>
      </template>
      <template #state>
        <el-tag :type="item.state === 1 ? 'success' : 'warning'" effect="dark">{{
          item.state === 1 ? '营业中' : '未营业'
        }}</el-tag>
      </template>
      <template #os>
        <div class="os">
          <div class="icon-background">
            <el-icon><Star /></el-icon>
          </div>
        </div>
      </template>
      <template #info>
        <div class="info">
          <h3>{{ item.name }}</h3>
          <div class="address">
            <el-icon><Location /></el-icon>
            <p>{{ item.address }}</p>
          </div>
        </div>
      </template>
      <template #weight>
        <div class="weight">
          <h4>{{ item.weight }}</h4>
        </div>
      </template>
      <template #tag>
        <div class="tag">
          <el-tag type="warning" v-for="tag in item.tag" :key="tag">{{ tag }}</el-tag>
        </div>
      </template>
      <template #foot>
        <div class="foot">
          <div class="content">
            <span class="price">￥{{ item.price }} <span class="unit">/天起</span></span>
          </div>
          <div class="btn">
            <lookDetail :item="item" />
            <bookService :item="item" />
          </div>
        </div>
      </template>
    </cardMessageIcon>
  </el-space>
</template>
<style lang="less" scoped>
.os {
  position: absolute;
  top: 8px;
  left: 330px;
  display: flex;
  gap: 10px;
  .icon-background {
    width: 32px;
    height: 32px;
    background-color: #f9fafb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-icon {
      color: #646668;
      &:hover {
        color: #e96713;
      }
    }
  }
}
h4 {
  margin: 0;
  line-height: 1;
  font-size: 1rem;
}
.info {
  h3 {
    margin: 0;
    line-height: 1;
  }
  p {
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1;
    font-size: 0.75rem;
    color: #646668;
  }
}
.el-tag {
  margin: 0 5px;
}
.address {
  display: flex;
  align-items: center;
  gap: 5px;
}
.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    .price {
      font-size: 1.5rem;
      color: #e96713;
      margin-top: 0.5rem;
      font-weight: bold;
    }
    .unit {
      font-size: 0.75rem;
      color: #646668;
      font-weight: normal;
    }
  }
  .btn {
    display: flex;
    gap: 5px;
  }
}
</style>
