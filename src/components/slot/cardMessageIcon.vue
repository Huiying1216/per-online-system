<script setup></script>

<template>
  <el-card class="main" style="width: 420px; height: 460px">
    <template #header>
      <div class="pet-show">
        <slot name="image"></slot>
        <div class="state">
          <!--<el-tag type="warning" effect="dark">寄养中</el-tag> -->
          <slot name="state"></slot>
        </div>
      </div>
    </template>

    <div class="content">
      <slot name="info"></slot>
      <div class="weight">
        <slot name="weight"></slot>
      </div>
    </div>
    <div class="tag">
      <slot name="tag"></slot>
    </div>

    <slot name="foot"></slot>
  </el-card>
</template>
<style lang="less" scoped>
.main {
  margin-top: 20px;

  :deep(.el-card__header) {
    padding: 0;
    height: 270px;
  }
}
.pet-show {
  position: relative;
  width: 100%;
  height: 100%;

  :deep(.el-image) {
    width: 100%;
    height: 100%;
    display: block;
  }

  .state {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.weight {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
