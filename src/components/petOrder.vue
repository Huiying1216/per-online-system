<script setup>
import cardOrder from '@/components/slot/cardOrder.vue'
import petImage from '@/assets/png/dog.png'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  status: {
    type: String,
    default: 'all',
  },
})

const allData = [
  {
    id: 1,
    petName: '布丁（柯基）',
    liveName: '淋雨走之家',
    liveTime: '05.01-05.03',
    liveTimeDesc: '两天',
    service: '温馨标准寄养',
    price: '¥100.00',
    status: '已完成',
  },
  {
    id: 2,
    petName: '草莓（布偶猫）',
    liveName: '阳光之家寄养',
    liveTime: '05.02-05.04',
    liveTimeDesc: '两天',
    service: '温馨标准寄养',
    price: '¥200.00',
    status: '待确认',
  },
  {
    id: 3,
    petName: '酸奶（田园犬）',
    liveName: '向日葵宠物寄养店',
    liveTime: '05.02-05.04',
    liveTimeDesc: '两天',
    service: '温馨标准寄养',
    price: '¥150.00',
    status: '寄养中',
  },
  {
    id: 4,
    petName: '芒果（波斯猫）',
    liveName: '阳光之家寄养',
    liveTime: '05.02-05.04',
    liveTimeDesc: '两天',
    service: '温馨标准寄养',
    price: '¥200.00',
    status: '已完成',
  },
]

// 点击查看详情
const handleClick = (item) => {
  router.push({
    path: '/user/userOrderDetail',
    query: {
      id: item.id,
      status: item.status, // 传递订单状态
    },
  })
}

// 根据 status 过滤订单
const filteredData = computed(() => {
  if (props.status === 'all') {
    return allData
  }
  return allData.filter((item) => item.status === props.status)
})
</script>
<template>
  <div class="order-content" v-for="item in filteredData" :key="item.id">
    <cardOrder>
      <template #image>
        <el-image :src="petImage" style="width: 120px; height: 120px" fit="contain" />
      </template>
      <template #message>
        <h3>{{ item.liveName }}</h3>
        <p class="order-short-des">宠物：{{ item.petName }}</p>
        <p class="order-short-des">寄养时间：{{ item.liveTime }}（{{ item.liveTimeDesc }}）</p>
        <p class="order-short-des">服务：{{ item.service }}</p>
      </template>
      <template #order-os>
        <div class="order-right">
          <div class="order-price">
            <p class="order-short-des">订单总额</p>
            <p class="real-price">{{ item.price }}</p>
          </div>
          <div class="order-btn">
            <el-button :type="item.status === '已完成' ? 'success' : 'warning'">{{
              item.status
            }}</el-button>
            <el-button type="info" @click="handleClick(item)">查看详情</el-button>
          </div>
        </div>
      </template>
    </cardOrder>
  </div>
  <div v-if="filteredData.length === 0" class="empty-data">
    <el-empty description="暂无订单" />
  </div>
</template>
<style lang="less" scoped>
.order-short-des {
  font-size: 0.75rem;
  font-size: 10px;
  color: #797a7d;
}
p {
  margin: 0;
}
.order-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  .order-price {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .real-price {
      font-size: 1rem;
      font-weight: bolder;
      color: #1c1b1b;
    }
  }
  .order-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}
.empty-data {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
</style>
