<script setup></script>

<template>
  <el-card>
    <div class="top">
      <slot name="image"></slot>
      <div class="main-info">
        <slot name="main-info"></slot>
      </div>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<style scoped>
.top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  p {
    margin: 0;
  }
  .main-info-pet {
    font-size: 0.75rem;
    color: #838c95;
  }
  .main-info-master {
    font-size: 0.75rem;
    color: #a2b4cd;
  }
}
</style>
