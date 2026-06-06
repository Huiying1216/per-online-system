<script setup>
import { ref } from 'vue'
import bookForm from '@/components/bookForm.vue'
const table = ref(false)
</script>

<template>
  <el-button type="warning" @click="table = true"> 立即预定 </el-button>

  <div class="content">
    <el-drawer v-model="table" title="预定宠物" direction="rtl" size="50%">
      <bookForm />
    </el-drawer>
  </div>
</template>

<style lang="less" scoped></style>
