<script setup>
import { ref } from 'vue'
import cardMessageIcon from '@/components/slot/cardMessageIcon.vue'

const serviceList = ref([
  {
    id: 1,
    image: new URL('@/assets/png/petShop.png', import.meta.url).href,
    service: '豪华单间寄养',
    price: '100',
    desc: '提供豪华单间寄养服务，包含宠物寄养、宠物咨询、宠物训练等功能',
    status: 1,
  },
  {
    id: 2,
    image: new URL('@/assets/png/petShop2.png', import.meta.url).href,
    service: '标准单间寄养',
    price: '100',
    desc: '提供独立2x2米大空间，配备恒温空调、24小时高清监控、每日3次户外运动及精细化喂养。',
    status: 0,
  },
  {
    id: 3,
    image: new URL('@/assets/png/petShop.png', import.meta.url).href,
    service: '标准单间寄养',
    price: '300',
    desc: '提供独立2x2米大空间，配备恒温空调、24小时高清监控、每日3次户外运动及精细化喂养。',
    status: 0,
  },
  {
    id: 4,
    image: new URL('@/assets/png/petShop.png', import.meta.url).href,
    service: '标准单间寄养',
    price: '300',
    desc: '提供独立2x2米大空间，配备恒温空调、24小时高清监控、每日3次户外运动及精细化喂养。',
    status: 0,
  },
])
</script>

<template>
  <div class="merchant-show">
    <cardMessageIcon v-for="item in serviceList" :key="item.id">
      <template #image>
        <div class="image-container">
          <el-image :src="item.image" fit="fill" />
          <el-tag :type="item.status === 1 ? 'success' : 'danger'" effect="dark" class="status-tag">
            {{ item.status === 1 ? '展示中' : '已下架' }}
          </el-tag>
        </div>
      </template>
      <template #info>
        <div class="info">
          <h3 class="service-name">{{ item.service }}</h3>
          <p class="service-desc">{{ item.desc }}</p>
        </div>
      </template>
      <template #foot>
        <div class="button">
          <el-button class="edit-btn" type="warning" text bg>编辑</el-button>
          <el-button class="down-btn" type="info" text bg>下架</el-button>
        </div>
      </template>
    </cardMessageIcon>
  </div>
</template>

<style lang="less" scoped>
.merchant-show {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  justify-content: flex-start;

  .image-container {
    position: relative;
    width: 100%;
    height: 100%;

    .el-image {
      width: 100%;
      height: 100%;
      display: block;
    }

    .status-tag {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
    }
  }
}
p {
  margin: 0;
}
.service-name {
  font-weight: 700;
  margin-bottom: 10px;
}
.service-desc {
  font-size: 0.75rem;
  color: #64748b;
}
.button {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.edit-btn,
.down-btn {
  width: 100%;
}
</style>
