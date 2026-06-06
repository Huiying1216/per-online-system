<script setup>
import cardMessageP from '@/components/cardMessageP.vue'
import cardMessageF from '@/components/cardMessageF.vue'
import cardMessageT from '@/components/cardMessageT.vue'
import cardMessageL from '@/components/cardMessageL.vue'
import petOrderShort from '@/components/petOrderShort.vue'
import mainMerchant from '@/components/mainMerchant.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const data = new Date()

const router = useRouter()
const hour = data.getHours()

const petName = ref('布丁')
const outTime = ref(2)

const message = () => {
  if (hour >= 12 && hour < 18) {
    return '下午好！'
  } else if (hour >= 18 && hour < 24) {
    return '晚上好！'
  } else {
    return '上午好！'
  }
}
//路由跳转
const immediateReserve = () => {
  router.push('/user/userSearch')
}
const managePet = () => {
  router.push('/user/userPet')
}

const gotoOrder = () => {
  router.push('/user/userOrder')
}

const gotoMerchant = () => {
  router.push('/user/userSearch')
}
</script>

<template>
  <div class="main-content">
    <div class="welcome-card">
      <div class="content">
        <h2>{{ message() }}{{ username }}</h2>
        <p>您的爱宠“{{ petName }}”已经在寄养中心度过了{{ outTime }}天，目前状态良好</p>
        <el-link type="warning">点击查看实时监控</el-link>
      </div>
      <div class="button">
        <el-button type="warning" round class="immediate-btn" @click="immediateReserve"
          >立即预约寄养</el-button
        >
        <el-button round class="manage-btn" @click="managePet">管理我的宠物</el-button>
      </div>
    </div>
    <div class="selection-work">
      <cardMessageP />
      <cardMessageF />
      <cardMessageT />
      <cardMessageL />
    </div>

    <el-row :gutter="20">
      <el-col :span="16">
        <div class="station-left">
          <div class="title">
            <h3 style="margin: 20px 0">近期寄养动态</h3>
            <el-link type="warning" @click="gotoOrder">查看全部</el-link>
          </div>

          <div class="pet-list">
            <petOrderShort />
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="merchant-rigth">
          <div class="title">
            <h3 style="margin: 20px 0">推荐商家</h3>
            <el-link type="warning" @click="gotoMerchant">查看全部</el-link>
          </div>
          <mainMerchant />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.main-content {
  width: 90%;
  margin: 0 auto;
  .welcome-card {
    background-image: linear-gradient(45deg, #f97516, #f69b0c);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    .content {
      color: #fff;
      text-align: center;
      p {
        font-size: 16px;
      }
      .el-link {
        color: #fff;
      }
    }
    .button {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
      .immediate-btn {
        color: #e86510;
        background-color: #fff;
        border: none;
        &:hover {
          box-shadow: 0 0 0 1px #e86510 inset;
        }
      }
      .manage-btn {
        color: #fff;
        background-color: #e86510;
        border: none;
        &:hover {
          box-shadow: 0 0 0 1px #aa4603 inset;
        }
      }
    }
  }
  .selection-work {
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    gap: 20px;
    margin-top: 30px;
    padding: 0;
    box-sizing: border-box;
  }
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
