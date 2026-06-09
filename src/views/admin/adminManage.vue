<script setup>
import { ref } from 'vue'

// 用户数据
const userData = ref([
  {
    id: 1,
    avatar: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    name: '张三',
    phone: '13433594654',
    email: 'zhangsan@example.com',
    registerTime: '2026-05-15',
    realName: true,
    boardingCount: 5,
    status: '1',
  },
  {
    id: 2,
    avatar: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    name: '李四',
    phone: '13812345678',
    email: 'lisi@example.com',
    registerTime: '2026-05-20',
    realName: false,
    boardingCount: 2,
    status: '1',
  },
  {
    id: 3,
    avatar: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    name: '王五',
    phone: '13987654321',
    email: 'wangwu@example.com',
    registerTime: '2026-06-01',
    realName: true,
    boardingCount: 8,
    status: '0',
  },
  {
    id: 4,
    avatar: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    name: '赵六',
    phone: '13611112222',
    email: 'zhaoliu@example.com',
    registerTime: '2026-06-05',
    realName: true,
    boardingCount: 0,
    status: '1',
  },
  {
    id: 5,
    avatar: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    name: '孙七',
    phone: '13522223333',
    email: 'sunqi@example.com',
    registerTime: '2026-06-08',
    realName: false,
    boardingCount: 1,
    status: '1',
  },
])

// 搜索条件
const searchForm = ref({
  keyword: '',
  status: '',
  realName: '',
})

// 查询
const handleSearch = () => {
  console.log('查询:', searchForm.value)
}

// 重置
const handleReset = () => {
  searchForm.value = {
    keyword: '',
    status: '',
    realName: '',
  }
}

// 查看详情
const handleViewDetail = (row) => {
  console.log('查看详情:', row)
}

// 删除用户
const handleDelete = (row) => {
  console.log('删除用户:', row)
}
</script>

<template>
  <div class="admin-manage">
    <h3 class="order-center">用户列表</h3>

    <!-- 搜索栏 -->
    <el-card class="search-card" shadow="hover">
      <el-form :model="searchForm" inline>
        <el-form-item label="关键词">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入用户名/手机号/邮箱"
            clearable
            class="search-input"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="实名认证">
          <el-select
            v-model="searchForm.realName"
            placeholder="请选择"
            clearable
            class="selct-input"
            style="width: 120px"
          >
            <el-option label="已实名" value="1" />
            <el-option label="未实名" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option label="正常" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 用户表格 -->
    <el-card class="table-card" shadow="hover">
      <el-table :data="userData" style="width: 100%" stripe>
        <el-table-column prop="id" label="用户 ID" width="80" />

        <el-table-column label="用户信息" width="220">
          <template #default="scope">
            <div class="user-info">
              <el-image :src="scope.row.avatar" fit="cover" class="avatar" />
              <div class="info">
                <p class="name">{{ scope.row.name }}</p>
                <p class="phone">{{ scope.row.phone }}</p>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="email" label="邮箱" min-width="180" show-overflow-tooltip />

        <el-table-column prop="registerTime" label="注册时间" width="120" />

        <el-table-column label="实名认证" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.realName ? 'success' : 'info'">
              {{ scope.row.realName ? '已实名' : '未实名' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="boardingCount" label="寄养次数" width="100" align="center" />

        <el-table-column label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '0' ? 'danger' : 'success'">
              {{ scope.row.status === '0' ? '禁用' : '正常' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <div class="action-buttons">
              <el-button type="warning" size="small" link @click="handleViewDetail(scope.row)">
                详情
              </el-button>

              <el-button type="danger" size="small" link @click="handleDelete(scope.row)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
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

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .info {
    .name {
      margin: 0;
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }

    .phone {
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

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.search-input {
  width: 400px;
  :deep(.el-input__wrapper) {
    border-radius: 20px;
    background-color: #f9fafb;
  }
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #e96713 inset;
  }
}
</style>
