<script setup>
import likeCard from '@/components/likeCard.vue'
</script>
<template>
  <h2 class="favorite-title">我的收藏</h2>
  <div class="favorite-container">
    <likeCard></likeCard>
  </div>
</template>

<style lang="less" scoped>
.favorite-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}
.favorite-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;

  :deep(.el-card) {
    width: calc(33.333% - 20px);
    max-width: 400px;
  }
}
</style>
