<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import cardAddUser from '@/components/message/cardAddUser.vue'
import cardAddMerchant from '@/components/message/cardAddMerchant.vue'
import cardAddOrder from '@/components/message/cardAddOrder.vue'

const chartRef = ref(null)
const pieChartRef = ref(null)

// 待审核商家数据
const merchantData = ref([
  {
    id: 1,
    shopName: '宠爱之家宠物店',
    shopImage: new URL('@/assets/png/petShop.png', import.meta.url).href,
    ownerName: '张三',
    phone: '13433594654',
    address: '北京市朝阳区建国路 88 号',
    applyTime: '2026-06-08',
  },
  {
    id: 2,
    shopName: '萌宠乐园',
    shopImage: new URL('@/assets/png/petShop2.png', import.meta.url).href,
    ownerName: '李四',
    phone: '13812345678',
    address: '上海市浦东新区世纪大道 100 号',
    applyTime: '2026-06-07',
  },
])
const userData = ref([
  {
    id: 1,
    username: '张三',
    phone: 13433594654,
    subTime: '2026-05-15',
    statue: '0',
  },
  {
    id: 2,
    username: '李四',
    phone: 13433594654,
    subTime: '2026-05-15',
    statue: '0',
  },
  {
    id: 3,
    username: '王五',
    phone: 13433594654,
    subTime: '2026-05-15',
    statue: '1',
  },
])

const initChart = () => {
  const chart = echarts.init(chartRef.value)

  const option = {
    title: {
      text: '用户增长趋势（近七日）',
      left: 'left',
      top: 10,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 100,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['6-03', '6-04', '6-05', '6-06', '6-07', '6-08', '6-09'],
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#e0e0e0',
        },
      },
      axisLabel: {
        color: '#666',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#e0e0e0',
          type: 'dashed',
        },
      },
      axisLabel: {
        color: '#666',
      },
    },
    series: [
      {
        name: '新增用户',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#e96713',
        },
        lineStyle: {
          width: 3,
          color: '#e96713',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(233, 103, 19, 0.5)',
              },
              {
                offset: 1,
                color: 'rgba(233, 103, 19, 0.05)',
              },
            ],
          },
        },
        data: [1, 5, 7, 9, 10, 12, 16],
      },
    ],
  }

  chart.setOption(option)

  // 响应式调整
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

const initPieChart = () => {
  const pieChart = echarts.init(pieChartRef.value)

  const option = {
    title: {
      text: '订单分布（按分类）',
      left: 'left',
      top: 10,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },

    series: [
      {
        name: '订单分类',
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%',
          color: '#666',
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 8,
          lineStyle: {
            color: '#999',
          },
        },
        data: [
          {
            value: 1048,
            name: '宠物寄养',
            itemStyle: { color: '#e96713' },
          },
          {
            value: 735,
            name: '宠物医疗',
            itemStyle: { color: '#409EFF' },
          },
          {
            value: 580,
            name: '宠物美容',
            itemStyle: { color: '#67C23A' },
          },
          {
            value: 484,
            name: '宠物食品',
            itemStyle: { color: '#E6A23C' },
          },
          {
            value: 300,
            name: '宠物用品',
            itemStyle: { color: '#909399' },
          },
        ],
      },
    ],
  }

  pieChart.setOption(option)

  // 响应式调整
  window.addEventListener('resize', () => {
    pieChart.resize()
  })
}

onMounted(() => {
  initChart()
  initPieChart()
})

// 审核通过
const handleApprove = (id) => {
  console.log('审核通过:', id)
  // 这里可以添加审核通过的逻辑
}

// 拒绝审核
const handleReject = (id) => {
  console.log('拒绝审核:', id)
  // 这里可以添加拒绝的逻辑
}
</script>

<template>
  <div class="admin-work">
    <h3 class="order-center">运营数据概览</h3>
  </div>
  <el-row :gutter="20">
    <el-col :span="8">
      <cardAddUser />
    </el-col>
    <el-col :span="8">
      <cardAddMerchant />
    </el-col>
    <el-col :span="8">
      <cardAddOrder />
    </el-col>
  </el-row>
  <div class="chart-container">
    <el-row gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <div ref="chartRef" class="user-growth-chart"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div ref="pieChartRef" class="pie-chart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <div class="detail-des">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card shadow="hover">
          <div class="title">
            <h3>最新注册用户</h3>
            <el-link type="warning">查看全部</el-link>
          </div>
          <el-table :data="userData" style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180" />
            <el-table-column prop="phone" label="手机号" width="180" />
            <el-table-column prop="subTime" label="注册时间" width="200" />
            <el-table-column label="状态" width="60">
              <template #default="scoped">
                <el-tag :type="scoped.row.statue === '0' ? 'success' : 'danger'">
                  {{ scoped.row.statue === '0' ? '正常' : '异常' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover">
          <div class="title">
            <h3>待审核商家</h3>
            <el-link type="warning">查看全部</el-link>
          </div>
          <div class="merchant-list">
            <div v-for="item in merchantData" :key="item.id" class="merchant-item">
              <div class="merchant-info">
                <el-image :src="item.shopImage" fit="cover" class="shop-image" />
                <div class="info">
                  <h4 class="shop-name">{{ item.shopName }}</h4>
                  <p class="owner">店主：{{ item.ownerName }}</p>
                  <p class="phone">电话：{{ item.phone }}</p>
                  <p class="time">申请时间：{{ item.applyTime }}</p>
                </div>
              </div>
              <div class="action-buttons">
                <el-button type="success" size="small" @click="handleApprove(item.id)">
                  查看详情
                </el-button>
                <el-button type="danger" size="small" @click="handleReject(item.id)">
                  拒绝
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.admin-work {
  margin-bottom: 20px;
}
.work-content {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
}

.user-growth-chart {
  width: 100%;
  height: 400px;
}
.pie-chart {
  width: 100%;
  height: 400px;
}
.chart-container {
  margin-top: 50px;
}
.detail-des {
  margin-top: 50px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}
.merchant-list {
  max-height: 500px;
  overflow-y: auto;

  .merchant-item {
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    .merchant-info {
      display: flex;
      gap: 15px;
      margin-bottom: 12px;

      .shop-image {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        flex-shrink: 0;
      }

      .info {
        flex: 1;
        min-width: 0;

        .shop-name {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        p {
          margin: 4px 0;
          font-size: 13px;
          color: #666;
        }

        .time {
          color: #999;
          font-size: 12px;
        }
      }
    }

    .action-buttons {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }
}
</style>
