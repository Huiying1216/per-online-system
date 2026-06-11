<script setup>
import {
  Notification,
  Medal,
  Search,
  ShoppingCart,
  Star,
  Bell,
  User,
  UserFilled,
  Avatar,
} from '@element-plus/icons-vue'
import image from '@/assets/png/tab.png'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})

const router = useRouter()

const newCount = ref(100)

const loginOut = () => {
  // 清除token
  userStore.removeToken()
  router.push('/login')
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="title">
        <div class="user-logo"></div>
        <h2>萌宠管家</h2>
      </div>
      <el-menu
        :default-active="$route.path"
        router
        active-text-color="#e96713"
        background-color="#fff"
        text-color="#8f959e"
        class="user-menu"
      >
        <el-menu-item index="/user/userWork">
          <el-icon><Notification /></el-icon>
          <span>主页</span>
        </el-menu-item>
        <el-menu-item index="/user/userPet">
          <el-icon><Medal /></el-icon>
          <span>我的宠物</span>
        </el-menu-item>
        <el-menu-item index="/user/userSearch">
          <el-icon><Search /></el-icon>
          <span>寄养搜索</span>
        </el-menu-item>
        <el-menu-item index="/user/userOrder">
          <el-icon><ShoppingCart /></el-icon>
          <span>我的订单</span>
        </el-menu-item>
        <el-menu-item index="/user/userFavorite">
          <el-icon><Star /></el-icon>
          <span>我的收藏</span>
        </el-menu-item>

        <el-menu-item index="/user/userMain">
          <el-icon><User /></el-icon>
          <span>个人中心</span>
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
          <div class="user-avatar">
            <div class="new">
              <el-icon class="bell-icon"><Bell /></el-icon>
              <span class="new-count" v-show="newCount > 0">{{
                newCount > 99 ? '99+' : newCount
              }}</span>
            </div>
            <div class="custom-message">
              <p class="username">
                <strong>{{ userStore.user.nickname || userStore.user.username }}</strong>
              </p>
              <span class="location">所在地：{{ userStore.user.province }}</span>
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
    .title {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-left: 10px;
      margin-bottom: 20px;
      .user-logo {
        width: 32px;
        height: 32px;
        background: url('@/assets/png/pet.png') no-repeat left / 32px auto;
      }
    }
    .el-menu {
      border-right: none;
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
</style>
