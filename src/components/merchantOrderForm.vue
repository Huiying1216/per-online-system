<script setup>
import { computed } from 'vue'
const tableData = [
  {
    id: 1,
    orderNo: 'PB20265150010',
    userName: '张三',
    phone: 13433594654,
    petImage: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    petName: '小白',
    petType: '狗',
    service: '套餐1',
    date: 5,
    price: 1582,
    status: '2',
    createTime: '2026-6-09',
    satrtData: '2026-6-09',
    finishData: '2026-5-08',
  },
  {
    id: 2,
    orderNo: 'PB20265150010',
    userName: '张三',
    phone: 13433594654,
    petImage: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    petName: '小白',
    petType: '狗',
    service: '套餐1',
    date: 5,
    price: 1582,
    status: '1',
    createTime: '2026-6-09',
    satrtData: '2026-6-09',
    finishData: '2026-5-08',
  },
  {
    id: 3,
    orderNo: 'PB20265150010',
    userName: '张三',
    phone: 13433594654,
    petImage: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    petName: '小白拉布拉多',
    petType: '狗',
    service: '套餐1',
    date: 5,
    price: 1582,
    status: '0',
    createTime: '2026-6-09',
    satrtData: '2026-6-09',
    finishData: '2026-5-08',
  },
  {
    id: 4,
    orderNo: 'PB20265150010',
    userName: '张三',
    phone: 13433594654,
    petImage: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    petName: '小白',
    petType: '狗',
    service: '套餐1',
    date: 5,
    price: 1582,
    status: '2',
    createTime: '2026-6-09',
    satrtData: '2026-6-09',
    finishData: '2026-5-08',
  },
]
const props = defineProps({
  status: {
    type: String,
    default: 'all',
  },
})

const filteredData = computed(() => {
  if (props.status === 'all') {
    return tableData
  }
  return tableData.filter((item) => item.status === props.status)
})
</script>
<template>
  <el-table :data="filteredData" style="width: 100%">
    <el-table-column fixed label="订单号/时间" width="180">
      <template #default="scope">
        <p class="orderNo">{{ scope.row.orderNo }}</p>
        <p class="createTime">{{ scope.row.createTime }}</p>
      </template>
    </el-table-column>
    <el-table-column label="客户信息" width="120">
      <template #default="scope">
        <p class="userName">{{ scope.row.userName }}</p>
        <p class="phone">{{ scope.row.phone }}</p>
      </template>
    </el-table-column>
    <el-table-column label="寄养宠物" width="220">
      <template #default="scope">
        <div class="petInfo">
          <el-image :src="scope.row.petImage" fit="cover" />
          <p class="petName">{{ scope.row.petName }}</p>
          <p class="petType">({{ scope.row.petType }})</p>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="服务周期" width="200">
      <template #default="scope">
        <p class="duringDate">{{ scope.row.satrtData }} - {{ scope.row.finishData }}</p>
        <p class="date">{{ scope.row.date }}天</p>
      </template>
    </el-table-column>
    <el-table-column prop="service" label="服务类型" width="120" />
    <el-table-column prop="price" label="金额" width="120" />
    <el-table-column label="状态" width="120">
      <template #default="scope">
        <el-tag
          effect="dark"
          :type="
            scope.row.status === '0' ? 'danger' : scope.row.status === '1' ? 'success' : 'info'
          "
          >{{
            scope.row.status === '0' ? '待确认' : scope.row.status === '1' ? '寄养中' : '已完成'
          }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="scope">
        <div class="liveIn" v-if="scope.row.status === '0'">
          <el-button class="btnIn" link type="warning" size="small" @click="handleClick">
            管理监控
          </el-button>
          <el-button link type="info" size="small">详情</el-button>
        </div>
        <div class="complication" v-else-if="scope.row.status === '2'">
          <el-link type="info" class="lookDetail">查看详情</el-link>
        </div>
        <div class="complication" v-else>
          <el-button type="warning" size="small">确认订单</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="filteredData.length === 0" class="empty-data">
    <el-empty description="暂无订单" />
  </div>
</template>
<style lang="less" scoped>
.empty-data {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
p {
  margin: 0;
}
.orderNo,
.userName {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  color: #334155;
}
.createTime,
.phone,
.date {
  font-size: 10px;
  color: #94a3b8;
}
.petInfo {
  display: flex;
  align-items: center;
  gap: 5px;

  .el-image {
    width: 50px;
    height: 50px;
    border-radius: 4px;
  }

  p {
    margin: 0;
    white-space: nowrap;
  }
}
.petName,
.petType {
  color: #475569;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.duringDate {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #475569;
}
.btnIn {
  padding-right: 10px;
  border-right: 1px solid #e2e8f0;
}
.lookDetail {
  font-size: 12px;
}
</style>
