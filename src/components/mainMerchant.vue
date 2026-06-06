<script setup>
import cardMerchant from '@/components/slot/cardMerchant.vue'
import { Star } from '@element-plus/icons-vue'
import petImage from '@/assets/png/petShop.png'
</script>
<template>
  <cardMerchant>
    <template #header>
      <el-image class="header-image" :src="petImage" fit="cover"></el-image>
    </template>
    <template #title>
      <div class="title">
        <h4>汪汪乐园精品寄养</h4>
        <el-icon><Star /></el-icon><span>4.5(120+评价)</span>
        <div class="main">
          <span class="price">￥88<span>/天起</span></span>
          <span>广东</span>
        </div>
      </div>
    </template>
  </cardMerchant>
</template>

<style lang="less" scoped>
.header-image {
  width: 100%;
  height: 100%;
  display: block;
}
.title {
  font-family: '微软雅黑', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  h4 {
    margin: 0;
    margin-bottom: 0.5rem;
  }
  .el-icon {
    color: #e86510;
    margin-right: 5px;
  }
  span {
    color: #a3a9b4;
    margin-right: 5px;
  }
  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
    .price {
      color: #e86510;
    }
  }
}
</style>
