<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 审核状态筛选
const statusFilter = ref('')

// 搜索关键词
const searchKeyword = ref('')

// 商家审核数据
const merchantData = ref([
  {
    id: 1,
    shopName: '宠爱之家宠物店',
    shopImage: new URL('@/assets/png/petShop.png', import.meta.url).href,
    ownerName: '张三',
    phone: '13433594654',
    email: 'zhangsan@example.com',
    address: '北京市朝阳区建国路 88 号',
    businessLicense: '91110000123456789X',
    applyTime: '2026-06-08 10:30',
    status: 'pending', // pending, approved, rejected
    description: '提供豪华单间寄养服务，包含宠物寄养、宠物咨询、宠物训练等功能',
  },
  {
    id: 2,
    shopName: '萌宠乐园',
    shopImage: new URL('@/assets/png/petShop2.png', import.meta.url).href,
    ownerName: '李四',
    phone: '13812345678',
    email: 'lisi@example.com',
    address: '上海市浦东新区世纪大道 100 号',
    businessLicense: '91310000987654321Y',
    applyTime: '2026-06-07 14:20',
    status: 'pending',
    description: '专业宠物美容、洗澡、造型设计，拥有多年经验的宠物美容师团队',
  },
  {
    id: 3,
    shopName: '宠物生活馆',
    shopImage: new URL('@/assets/png/petShop.png', import.meta.url).href,
    ownerName: '王五',
    phone: '13987654321',
    email: 'wangwu@example.com',
    address: '广州市天河区天河路 200 号',
    businessLicense: '91440000555666777Z',
    applyTime: '2026-06-06 09:15',
    status: 'approved',
    description: '集宠物销售、寄养、美容、医疗于一体的综合性宠物服务机构',
  },
  {
    id: 4,
    shopName: '汪星人之家',
    shopImage: new URL('@/assets/png/petShop2.png', import.meta.url).href,
    ownerName: '赵六',
    phone: '13611112222',
    email: 'zhaoliu@example.com',
    address: '深圳市南山区科技园 300 号',
    businessLicense: '91440300111222333A',
    applyTime: '2026-06-05 16:45',
    status: 'rejected',
    description: '专注于狗狗寄养和训练，提供大型活动场地和专业训练课程',
    rejectReason: '营业执照不清晰，请重新提交',
  },
  {
    id: 5,
    shopName: '喵星人乐园',
    shopImage: new URL('@/assets/png/petShop.png', import.meta.url).href,
    ownerName: '孙七',
    phone: '13522223333',
    email: 'sunqi@example.com',
    address: '杭州市西湖区文一路 150 号',
    businessLicense: '91330000444555666B',
    applyTime: '2026-06-09 11:00',
    status: 'pending',
    description: '猫咪专属寄养中心，提供猫爬架、独立空间、专业护理服务',
  },
])

// 当前选中的商家
const selectedMerchant = ref(null)

// 审核对话框
const reviewDialogVisible = ref(false)

// 拒绝原因
const rejectReason = ref('')

// 审核对话框标题
const dialogTitle = ref('')

// 过滤后的商家列表
const filteredMerchants = ref([])

// 初始化过滤
const initFilteredData = () => {
  filteredMerchants.value = merchantData.value.filter((item) => {
    const matchStatus = !statusFilter.value || item.status === statusFilter.value
    const matchKeyword =
      !searchKeyword.value ||
      item.shopName.includes(searchKeyword.value) ||
      item.ownerName.includes(searchKeyword.value) ||
      item.phone.includes(searchKeyword.value)
    return matchStatus && matchKeyword
  })
}

// 查看详情
const handleViewDetail = (row) => {
  selectedMerchant.value = row
  dialogTitle.value = '商家详情'
  reviewDialogVisible.value = true
}

// 通过审核
const handleApprove = (row) => {
  ElMessageBox.confirm(`确定要通过商家 "${row.shopName}" 的审核申请吗？`, '审核确认', {
    confirmButtonText: '通过',
    cancelButtonText: '取消',
    type: 'success',
  })
    .then(() => {
      const merchant = merchantData.value.find((m) => m.id === row.id)
      if (merchant) {
        merchant.status = 'approved'
      }
      ElMessage.success('审核通过')
      if (selectedMerchant.value?.id === row.id) {
        selectedMerchant.value = { ...merchant }
      }
      initFilteredData()
    })
    .catch(() => {})
}

// 拒绝审核
const handleReject = (row) => {
  selectedMerchant.value = row
  rejectReason.value = ''
  dialogTitle.value = '拒绝审核'
  reviewDialogVisible.value = true
}

// 提交审核结果
const submitReview = () => {
  if (dialogTitle.value === '拒绝审核') {
    if (!rejectReason.value.trim()) {
      ElMessage.warning('请填写拒绝原因')
      return
    }
    const merchant = merchantData.value.find((m) => m.id === selectedMerchant.value.id)
    if (merchant) {
      merchant.status = 'rejected'
      merchant.rejectReason = rejectReason.value
    }
    ElMessage.success('已拒绝申请')
  }
  reviewDialogVisible.value = false
  selectedMerchant.value = null
  initFilteredData()
}

// 重置筛选
const handleReset = () => {
  statusFilter.value = ''
  searchKeyword.value = ''
  initFilteredData()
}

// 获取状态标签类型
const getStatusType = (status) => {
  switch (status) {
    case 'pending':
      return 'warning'
    case 'approved':
      return 'success'
    case 'rejected':
      return 'danger'
    default:
      return 'info'
  }
}

// 获取状态文本
const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return '待审核'
    case 'approved':
      return '已通过'
    case 'rejected':
      return '已拒绝'
    default:
      return '未知'
  }
}

// 初始化
initFilteredData()
</script>

<template>
  <div class="admin-review">
    <h3 class="order-center">商家审核</h3>

    <!-- 搜索筛选栏 -->
    <el-card class="search-card" shadow="hover">
      <el-form :inline="true">
        <el-form-item label="审核状态">
          <el-select
            v-model="statusFilter"
            placeholder="全部"
            clearable
            style="width: 120px"
            @change="initFilteredData"
          >
            <el-option label="待审核" value="pending" />
            <el-option label="已通过" value="approved" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model="searchKeyword"
            placeholder="商家名称/店主姓名/手机号"
            clearable
            style="width: 240px"
            @input="initFilteredData"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 商家列表表格 -->
    <el-card class="table-card" shadow="hover">
      <el-table :data="filteredMerchants" style="width: 100%" stripe>
        <el-table-column prop="id" label="ID" width="60" />

        <el-table-column label="商家信息" width="250">
          <template #default="scope">
            <div class="merchant-info">
              <el-image :src="scope.row.shopImage" fit="cover" class="shop-image" />
              <div class="info">
                <p class="shop-name">{{ scope.row.shopName }}</p>
                <p class="owner">店主：{{ scope.row.ownerName }}</p>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="联系电话" width="130" />

        <el-table-column prop="address" label="经营地址" min-width="200" show-overflow-tooltip />

        <el-table-column prop="applyTime" label="申请时间" width="160" />

        <el-table-column label="审核状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <div class="action-buttons">
              <el-button type="primary" size="small" link @click="handleViewDetail(scope.row)">
                详情
              </el-button>
              <template v-if="scope.row.status === 'pending'">
                <el-button type="success" size="small" link @click="handleApprove(scope.row)">
                  通过
                </el-button>
                <el-button type="danger" size="small" link @click="handleReject(scope.row)">
                  拒绝
                </el-button>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 详情/审核对话框 -->
    <el-dialog
      v-model="reviewDialogVisible"
      :title="dialogTitle"
      width="600px"
      :close-on-click-modal="false"
    >
      <div v-if="selectedMerchant" class="merchant-detail">
        <div class="detail-section">
          <h4>基本信息</h4>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="商家名称">{{
              selectedMerchant.shopName
            }}</el-descriptions-item>
            <el-descriptions-item label="店主姓名">{{
              selectedMerchant.ownerName
            }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{
              selectedMerchant.phone
            }}</el-descriptions-item>
            <el-descriptions-item label="电子邮箱">{{
              selectedMerchant.email
            }}</el-descriptions-item>
            <el-descriptions-item label="营业执照">{{
              selectedMerchant.businessLicense
            }}</el-descriptions-item>
            <el-descriptions-item label="经营地址">{{
              selectedMerchant.address
            }}</el-descriptions-item>
            <el-descriptions-item label="申请时间">{{
              selectedMerchant.applyTime
            }}</el-descriptions-item>
            <el-descriptions-item label="审核状态">
              <el-tag :type="getStatusType(selectedMerchant.status)">
                {{ getStatusText(selectedMerchant.status) }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <div class="detail-section">
          <h4>店铺介绍</h4>
          <p class="description">{{ selectedMerchant.description }}</p>
        </div>

        <div
          class="detail-section"
          v-if="selectedMerchant.status === 'rejected' && selectedMerchant.rejectReason"
        >
          <h4>拒绝原因</h4>
          <el-alert
            :title="selectedMerchant.rejectReason"
            type="error"
            :closable="false"
            show-icon
          />
        </div>

        <!-- 审核操作区域（仅待审核状态显示） -->
        <div v-if="dialogTitle === '拒绝审核'" class="review-section">
          <el-form :model="{ rejectReason }" label-position="top">
            <el-form-item label="拒绝原因" required>
              <el-input
                v-model="rejectReason"
                type="textarea"
                :rows="4"
                placeholder="请输入拒绝原因，以便商家了解并改进"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reviewDialogVisible = false">取消</el-button>
          <el-button v-if="dialogTitle === '拒绝审核'" type="danger" @click="submitReview">
            确认拒绝
          </el-button>
          <el-button
            v-else-if="selectedMerchant?.status === 'pending'"
            type="primary"
            @click="handleApprove(selectedMerchant)"
          >
            通过审核
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.admin-review {
  padding: 20px;

  .order-center {
    margin-bottom: 20px;
  }

  .search-card {
    margin-bottom: 20px;

    :deep(.el-card__body) {
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :deep(.el-form) {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }

  .table-card {
    :deep(.el-card__body) {
      padding: 15px;
    }
  }

  .merchant-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .shop-image {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .info {
      .shop-name {
        margin: 0;
        font-weight: 600;
        color: #333;
        font-size: 14px;
      }

      .owner {
        margin: 4px 0 0 0;
        color: #666;
        font-size: 12px;
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: 8px;
  }

  .merchant-detail {
    .detail-section {
      margin-bottom: 20px;

      h4 {
        margin: 0 0 12px 0;
        color: #333;
        font-size: 16px;
        border-left: 4px solid #e96713;
        padding-left: 10px;
      }

      .description {
        background: #f5f7fa;
        padding: 15px;
        border-radius: 4px;
        color: #666;
        line-height: 1.6;
        margin: 0;
      }
    }

    .review-section {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
}
</style>
