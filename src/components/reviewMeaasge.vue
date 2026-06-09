<script setup>
import { ref } from 'vue'

const commentList = ref([
  {
    id: 1,
    image: new URL('@/assets/jpg/dog.jpg', import.meta.url).href,
    userName: '张先生',
    userAvatar: '',
    score: 5,
    content:
      '非常满意！店家环境很好，工作人员也很专业，把我的狗狗照顾得很好。每天都会发照片和视频，让我很放心。下次还会选择这里！',
    date: '2024-01-15',
  },
])
</script>

<template>
  <el-card v-for="item in commentList" :key="item.id">
    <!-- 用户信息 -->
    <div class="review-card">
      <div class="comment-user">
        <el-avatar :src="item.image" size="large" />

        <div class="user-info">
          <div class="user-name">{{ item.userName }}</div>
          <div class="comment-date">{{ item.date }}</div>
        </div>
      </div>

      <!-- 评价内容 -->
      <div class="comment-info">
        <!-- 评分 -->
        <div class="comment-score">
          <el-rate :model-value="item.score" disabled />
        </div>

        <!-- 评价文字 -->
        <p class="comment-text">{{ item.content }}</p>
      </div>
    </div>
  </el-card>
</template>

<style lang="less" scoped>
.comment-user {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
.user-info {
  .user-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .comment-date {
    font-size: 12px;
    color: #999;
  }
}
.comment-info {
}
</style>
