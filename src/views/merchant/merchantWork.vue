<script setup>
// 页面逻辑
import workMessage from '@/components/workMessage.vue'
import { ref } from 'vue'
import mainMerchant from '@/components/mainMerchant.vue'

const data = ref({
  userData: [
    {
      id: 1,
      image: new URL('@/assets/jpg/bird.jpg', import.meta.url).href,
      name: '客户1/布丁',
      date: '2023-08-01',
      service: '套餐1',
      phone: '13800000000',
    },
    {
      id: 2,
      image: new URL('@/assets/jpg/cat.jpg', import.meta.url).href,
      name: '客户2/草莓',
      date: '2023-08-02',
      service: '套餐2',
      phone: '13800000001',
    },
    {
      id: 3,
      image: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
      name: '客户3/笨鸟',
      date: '2023-08-03',
      service: '套餐3',
      phone: '13800000002',
    },
    {
      id: 4,
      image: new URL('@/assets/jpg/other.jpg', import.meta.url).href,
      name: '客户4/其他',
      date: '2023-08-04',
      service: '套餐4',
      phone: '13800000003',
    },
  ],
})
</script>

<template>
  <div class="location">
    <p>当前位置：工作台总览</p>
  </div>
  <div class="work-total-instruction">
    <workMessage></workMessage>
  </div>

  <el-row :gutter="20">
    <el-col :span="16">
      <div class="station-left">
        <div class="title">
          <h3 style="margin: 20px 0">待处理预约</h3>
          <el-link type="warning" @click="gotoOrder">查看全部</el-link>
        </div>

        <div class="user-list">
          <el-table :data="data.userData" style="width: 100%">
            <el-table-column label="图片" width="150">
              <template #default="scope">
                <el-image :src="scope.row.image" fit="cover" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="客户/宠物" width="150" />
            <el-table-column prop="date" label="寄养周期" width="120" />
            <el-table-column prop="service" label="套餐服务" width="120" />
            <el-table-column prop="phone" label="联系电话" width="120" />
            <el-table-column fixed="right" label="操作" min-width="100">
              <template #default>
                <el-button link type="warning" size="small" @click="handleClick"> 驳回 </el-button>
                <el-button link type="warning" size="small">确认</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="merchant-rigth">
        <div class="title">
          <h3 style="margin: 20px 0">店铺信息预览</h3>
          <el-link type="warning" @click="gotoMerchant">去修改</el-link>
        </div>
        <mainMerchant />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.work-total-instruction {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.location {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
}
</style>
