<script setup>
import { Edit, Loading, Pointer, Back, Check } from '@element-plus/icons-vue'
import petImage from '@/assets/png/petShop.png'
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

const gotoOrder = () => {
  router.push('/user/userOrder')
}

// 评价对话框相关
const reviewDialogVisible = ref(false)
const reviewForm = ref({
  score: 0,
  content: '',
  tags: [],
})
const reviewFormRef = ref(null)

// 评价标签选项
const reviewTags = ref(['环境整洁', '服务周到', '专业负责', '性价比高', '宠物喜欢', '会再来'])

// 切换标签选中状态
const toggleTag = (tag) => {
  const index = reviewForm.value.tags.indexOf(tag)
  if (index > -1) {
    reviewForm.value.tags.splice(index, 1)
  } else {
    reviewForm.value.tags.push(tag)
  }
}

// 提交评价
const submitReview = () => {
  if (!reviewForm.value.content.trim()) {
    ElMessage.warning('请输入评价内容')
    return
  }

  console.log('提交评价:', reviewForm.value)
  ElMessage.success('评价提交成功！')
  reviewDialogVisible.value = false

  // 重置表单
  reviewForm.value = {
    score: 0,
    content: '',
    tags: [],
  }
}

// 关闭对话框时重置表单
const closeReviewDialog = () => {
  reviewForm.value = {
    score: 0,
    content: '',
    tags: [],
  }
}

// 订单状态与步骤条 active 的映射关系
const statusMap = {
  待确认: 1, // 提交预约
  已确认: 2, // 商家确认
  寄养中: 3, // 寄养中
  已完成: 4, // 已完成
}

// 从路由参数中获取订单状态
const orderStatus = computed(() => {
  return route.query.status || '待确认'
})

// 根据订单状态计算步骤条 active 值
const activeStep = computed(() => {
  return statusMap[orderStatus.value] || 1
})
</script>

<template>
  <div class="order-title">
    <span class="title-left">
      <el-icon class="icon" @click="gotoOrder"><Back /></el-icon>订单详情
    </span>
    <span class="title-right">订单号：11111111111</span>
  </div>
  <div class="order-detail-status">
    <el-steps style="width: 80%" :active="activeStep">
      <el-step title="提交预约" :icon="Edit" />
      <el-step title="商家确认" :icon="Pointer" />
      <el-step title="寄养中" :icon="Loading" />
      <el-step title="已完成" :icon="Check" />
    </el-steps>
    <el-alert
      class="alert"
      title="您的爱宠正在萌宠之家旗舰店享受豪华寄养服务，预计 05 月 20 日 12:00 结束。"
      type="warning"
    />
  </div>
  <div class="order-detail-content">
    <el-row>
      <el-col :span="12">
        <div class="order-merchent">
          <el-card style="max-width: 500px">
            <span class="header-title">商家信息</span>
            <template #footer>
              <div class="card-main-content">
                <el-image
                  style="width: 100px; height: 100px"
                  class="header-image"
                  :src="petImage"
                  fit="cover"
                ></el-image>
                <div class="card-desc">
                  <h3 class="shop-name">萌宠之家旗舰店</h3>
                  <p class="order-short-des">地址：北京市海淀区</p>
                  <p class="order-short-des">联系电话：13800000000</p>
                </div>
              </div>
            </template>
          </el-card>
        </div>
        <div class="order-pet">
          <el-card style="max-width: 500px">
            <span class="header-title">宠物信息</span>
            <template #footer>
              <div class="card-main-content">
                <el-image
                  style="width: 100px; height: 100px"
                  class="header-image"
                  :src="petImage"
                  fit="cover"
                ></el-image>
                <div class="card-desc">
                  <h3 class="pet-name">布丁（柯基）</h3>
                  <p class="order-short-des">标签：小狗・公・15.8kg</p>
                  <p class="order-short-des">状态：寄养中</p>
                </div>
              </div>
            </template>
          </el-card>
        </div>
        <el-button class="review" type="warning" @click="reviewDialogVisible = true"
          >去评价</el-button
        >
      </el-col>
      <el-col :span="12">
        <div class="price-detail">
          <el-card>
            <span class="header-title">费用明细</span>
            <template #footer>
              <div class="price-list">
                <div class="price-item">
                  <span class="price-label">豪华单间寄养</span>
                  <span class="price-value">¥ 200.00</span>
                </div>
                <div class="price-item">
                  <span class="price-label">精细洗浴</span>
                  <span class="price-value">¥ 150.00</span>
                </div>
                <div class="price-item">
                  <span class="price-label">平台服务费</span>
                  <span class="price-value">¥ 5.00</span>
                </div>
                <div class="price-total">
                  <span class="total-label">实付金额</span>
                  <span class="total-value">¥ 370.00</span>
                </div>
              </div>
            </template>
          </el-card>
        </div>
        <div class="pay-detail">
          <el-card>
            <span class="header-title">支付明细</span>
            <template #footer>
              <div class="pay-list">
                <div class="pay-item">
                  <span class="pay-label">支付状态</span>
                  <span class="pay-value success">已支付</span>
                </div>
                <div class="pay-item">
                  <span class="pay-label">支付方式</span>
                  <span class="pay-value">微信支付</span>
                </div>
                <div class="pay-item">
                  <span class="pay-label">支付时间</span>
                  <span class="pay-value">2024-05-18 14:30:25</span>
                </div>
                <div class="pay-item">
                  <span class="pay-label">订单编号</span>
                  <span class="pay-value">11111111111</span>
                </div>
                <div class="pay-item">
                  <span class="pay-label">交易流水</span>
                  <span class="pay-value">P202405180001</span>
                </div>
              </div>
            </template>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>

  <!-- 评价对话框 -->
  <el-dialog
    v-model="reviewDialogVisible"
    title="发表评价"
    width="600px"
    :before-close="closeReviewDialog"
  >
    <el-form :model="reviewForm" ref="reviewFormRef" label-width="80px">
      <!-- 评分 -->
      <el-form-item label="总体评分">
        <el-rate v-model="reviewForm.score" />
      </el-form-item>

      <!-- 评价标签 -->
      <el-form-item label="评价标签">
        <el-space wrap>
          <el-tag
            v-for="tag in reviewTags"
            :key="tag"
            :type="reviewForm.tags.includes(tag) ? 'warning' : 'info'"
            effect="plain"
            style="cursor: pointer"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </el-tag>
        </el-space>
      </el-form-item>

      <!-- 评价内容 -->
      <el-form-item label="评价内容">
        <el-input
          v-model="reviewForm.content"
          type="textarea"
          :rows="4"
          placeholder="请输入您的评价内容，分享您的真实体验..."
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div style="text-align: center">
        <el-button @click="reviewDialogVisible = false">取消</el-button>
        <el-button type="warning" @click="submitReview">提交评价</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="less" scoped>
.order-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title-left {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 2rem;
    .icon {
      margin-right: 0.5rem;
    }
  }
  .title-right {
    font-size: 0.8rem;
    color: #909399;
  }
}
.order-detail-status {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0;
  border-top: 1px solid #e4e7ed;
}
.alert {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 10px;
}
.header-title {
  font-size: 1rem;
  font-weight: bold;
  color: #646567;
}
.card-main-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  .shop-name {
    font-size: 1.25rem;
    font-weight: bold;
  }
  .order-short-des {
    font-size: 0.75rem;
    color: #646567;
  }
}
.price-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  .price-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    .price-label {
      color: #606266;
    }
    .price-value {
      color: #303133;
      font-weight: 500;
      &.discount {
        color: #f56c6c;
      }
    }
  }
  .price-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #e4e7ed;
    font-size: 1rem;
    font-weight: bold;
    .total-label {
      color: #303133;
    }
    .total-value {
      color: #f56c6c;
      font-size: 1.25rem;
    }
  }
}
.pay-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  .pay-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    .pay-label {
      color: #606266;
    }
    .pay-value {
      color: #303133;
      &.success {
        color: #67c23a;
      }
    }
  }
}
.order-merchent,
.order-pet,
.price-detail,
.pay-detail {
  margin-bottom: 10px;
}

.review {
  width: 50%;
  margin: 10px 50px;
}
</style>
