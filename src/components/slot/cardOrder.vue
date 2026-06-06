<script setup></script>

<template>
  <el-card class="pet-card">
    <div class="content">
      <div class="desc">
        <slot name="image"></slot>
        <div class="pet-message">
          <slot name="message"></slot>
        </div>
      </div>
      <slot name="order-os"></slot>
    </div>
  </el-card>
</template>

<style lang="less" scoped>
.pet-card {
  border-radius: 16px;
  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .desc {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      h3 {
        font-size: 1.25rem;
      }
      .location {
        font-size: 0.75rem;
      }
      .detail {
        font-size: 10px;
        color: #a1a8b3;
        .gap {
          margin-left: 10px;
        }
      }
    }
    .el-button {
      margin: auto 0;
    }
  }
}
</style>
