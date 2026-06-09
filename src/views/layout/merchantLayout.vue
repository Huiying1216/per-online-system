<script setup>
import {
  Notification,
  Medal,
  ShoppingCart,
  Service,
  Bell,
  User,
  UserFilled,
  Avatar,
} from '@element-plus/icons-vue'
import image from '@/assets/png/tab.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('李慧滢')
const location = ref('北京')
const newCount = ref(100)

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
          <h2 class="title-text">萌宠之家旗舰店</h2>
          <p class="title-desc">商家管理后台</p>
        </div>
      </div>
      <el-menu
        :default-active="$route.path"
        router
        active-text-color="#e96713"
        background-color="#fff"
        text-color="#8f959e"
        class="user-menu"
      >
        <el-menu-item index="/merchant/merchantWork">
          <el-icon><Notification /></el-icon>
          <span>工作台总览</span>
        </el-menu-item>
        <el-menu-item index="/merchant/merchantRecord">
          <el-icon><Medal /></el-icon>
          <span>寄养记录</span>
        </el-menu-item>

        <el-menu-item index="/merchant/merchantOrder">
          <el-icon><ShoppingCart /></el-icon>
          <span>订单管理</span>
        </el-menu-item>
        <el-menu-item index="/merchant/merchantService">
          <el-icon><Service /></el-icon>
          <span>服务管理</span>
        </el-menu-item>
        <el-menu-item index="/merchant/merchantMain">
          <el-icon><User /></el-icon>
          <span>商家资料</span>
        </el-menu-item>
        <!-- <el-sub-menu index="/user/userMain">
          <template #title>
            <el-icon><User /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu> -->
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
          <div class="user-avatar">
            <div class="new">
              <el-tag type="success" round>营业中</el-tag>
              <el-icon class="bell-icon"><Bell /></el-icon>
              <span class="new-count" v-show="newCount > 0">{{
                newCount > 99 ? '99+' : newCount
              }}</span>
            </div>
            <div class="custom-message">
              <p class="username">
                <strong>{{ username }}</strong>
              </p>
              <span class="location">所在地：{{ location }}</span>
            </div>
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
        background: url('@/assets/jpg/logo.jpg') no-repeat left / 40px auto;
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
      .user-avatar {
        display: flex;
        align-items: center;
        justify-self: flex-end;
        .new {
          position: relative;
          display: flex;
          align-items: center;
          margin-right: 15px;
          cursor: pointer;
          gap: 10px;
          .bell-icon {
            font-size: 24px;
            color: #90959f;
          }
          .new-count {
            position: absolute;
            top: -5px;
            right: -8px;
            background-color: #f53f3f;
            color: #fff;
            font-size: 10px;
            padding: 0 5px;
            min-width: 12px;
            height: 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .custom-message {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 10px;
          padding: 0 10px;
          border-left: 1px solid #f3f4f6;
          gap: 3px;
          .username {
            margin: 0;
            font-size: 0.87rem;
          }

          .location {
            color: #e96713;
            font-size: 10px;
          }
        }
      }
    }
  }
  .el-main {
    background-color: #fdfbf8;
  }
}
p {
  margin: 0;
  padding: 0;
}
</style>
