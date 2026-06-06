<script setup>
import { ref } from 'vue'
import petOrder from '@/components/petOrder.vue'

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<template>
  <h2 class="order-center">订单中心</h2>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="全部订单" name="first">
      <div class="order-content">
        <petOrder status="all"></petOrder>
      </div>
    </el-tab-pane>
    <el-tab-pane label="待确认" name="second">
      <div class="order-content">
        <petOrder status="待确认"></petOrder>
      </div>
    </el-tab-pane>
    <el-tab-pane label="寄养中" name="third">
      <div class="order-content">
        <petOrder status="寄养中"></petOrder>
      </div>
    </el-tab-pane>
    <el-tab-pane label="已完成" name="fourth">
      <div class="order-content">
        <petOrder status="已完成"></petOrder>
      </div>
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
</style>
