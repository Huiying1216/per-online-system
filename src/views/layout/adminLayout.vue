<script setup>
import { Notification, Present, OfficeBuilding, UserFilled, Avatar } from '@element-plus/icons-vue'
import image from '@/assets/png/tab.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('李慧滢')

const loginOut = () => {
  // 清除token

  router.push('/login')
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="title">
        <div class="user-logo"></div>
        <div class="title-content">
          <h2 class="title-text">后台管理中心</h2>
          <p class="title-desc">萌宠寄养管家 v1.0</p>
        </div>
      </div>
      <el-menu
        :default-active="$route.path"
        router
        active-text-color="#e96713"
        background-color="#fff"
        text-color="#8f959e"
      >
        <el-menu-item index="/admin/adminWork">
          <el-icon><Notification /></el-icon>
          <span>运营数据概览</span>
        </el-menu-item>
        <el-menu-item index="/admin/adminManage">
          <el-icon><Present /></el-icon>
          <span>用户管理</span>
        </el-menu-item>

        <el-menu-item index="/admin/adminReview">
          <el-icon><OfficeBuilding /></el-icon>
          <span>商家审核</span>
        </el-menu-item>
      </el-menu>
      <div class="out" @click="loginOut">
        <el-icon><Avatar /></el-icon>
        <span>退出登录</span>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header">
          <div class="newT">
            <el-image style="width: 200px; height: 60px" :src="image" fit="cover"></el-image>
          </div>

          <div class="custom-message">
            <p class="username">
              <strong>管理员账号：{{ username }}</strong>
            </p>
            <el-avatar :icon="UserFilled" />
          </div>
        </div>
      </el-header>
      <el-main> <router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    position: relative;
    background-color: #1e293b;
    .title {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-left: 10px;
      margin-bottom: 20px;
      margin-top: 20px;
      .user-logo {
        width: 32px;
        height: 32px;
        background: url('@/assets/png/outPlant.png') no-repeat left / 32px auto;
      }
      .title-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 5px;
        .title-text {
          font-size: 1rem;
          color: #fff;
        }
        .title-desc {
          font-size: 0.75rem;
          color: #72879c;
        }
      }
    }
    .el-menu {
      border-right: none;
      background-color: #1e293b;
    }

    .el-menu-item {
      &:hover {
        background-color: #fff5ee;
        color: #fec094;
      }
    }
    .out {
      display: flex;
      align-items: center;
      position: absolute;
      right: 80px;
      bottom: 50px;
      gap: 10px;
      color: #e94444;
      cursor: pointer;
    }
  }
  .el-header {
    display: flex;
    align-items: center;
    background-color: #fafbf6;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 10px;
      margin-left: 10px;

      .newT {
        text-align: left;
        margin: 0;
        padding: 0;
      }

      .custom-message {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        .username {
          margin: 0;
          font-size: 0.87rem;
        }
      }
    }
  }
}
.el-main {
  background-color: #fdfbf8;
}

p {
  margin: 0;
  padding: 0;
}
</style>
