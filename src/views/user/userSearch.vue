<script setup>
import searchMerchant from '@/components/searchMerchant.vue'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const serachInput = ref('')
</script>
<template>
  <h2 class="search-merchant">寻找理想的寄养店</h2>
  <div class="user-search">
    <el-input
      v-model="serachInput"
      class="searach-input"
      placeholder="搜索寄养店、宠物或攻略"
      :prefix-icon="Search"
    />
    <el-button type="warning">搜索</el-button>
  </div>
  <searchMerchant></searchMerchant>
</template>
<style lang="less" scoped>
.user-search {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.searach-input {
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
