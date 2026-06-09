<script setup>
import { ref } from 'vue'
const activeName = ref('first')
import merchantOrderForm from '@/components/merchantOrderForm.vue'

const handleClick = () => {
  console.log('click')
}
</script>

<template>
  <div class="order">
    <h2 class="order-center">订单列表</h2>
    <div class="order-os">
      <el-input
        v-model="serachInput"
        class="searach-input"
        placeholder="搜索订单号/客户名/宠物名"
        :prefix-icon="Search"
      />
      <el-button type="info">导出报表</el-button>
    </div>
  </div>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="全部订单" name="first">
      <merchantOrderForm status="all" />
    </el-tab-pane>
    <el-tab-pane label="待确认" name="second"> <merchantOrderForm status="0" /> </el-tab-pane>
    <el-tab-pane label="寄养中" name="third">
      <merchantOrderForm status="1" />
    </el-tab-pane>
    <el-tab-pane label="已完成" name="fourth">
      <merchantOrderForm status="2" />
    </el-tab-pane>
    <el-tab-pane label="已拒绝" name="fifth">
      <merchantOrderForm status="3" />
    </el-tab-pane>
    <el-tab-pane label="已取消" name="sixth">
      <merchantOrderForm status="4" />
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped>
.demo-tabs {
  :deep(.el-tabs__item) {
    color: #666;

    &:hover {
      color: #e96713;
    }

    &.is-active {
      color: #e96713;
      font-weight: 600;
    }
  }

  :deep(.el-tabs__active-bar) {
    background-color: #e96713;
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.order-center {
  margin-bottom: 32px;
}
.searach-input {
  width: 400px;
  margin-right: 10px;
  :deep(.el-input__wrapper) {
    border-radius: 20px;
    background-color: #f9fafb;
  }
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #e96713 inset;
  }
}
.order {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
