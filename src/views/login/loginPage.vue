<script setup>
import { useRouter } from 'vue-router'
import { User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { userLoginService } from '@/api/user'
import { useUserStore } from '@/stores'
const router = useRouter()
const userStore = useUserStore()
const label = ref('user')
const checked1 = ref(false)
const form = ref(null)
const loginForm = ref({
  username: '',
  password: '',
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度必须在3到10个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]{6,12}$/,
      message: '密码必须包含6到12个字母、数字或下划线',
      trigger: 'blur',
    },
  ],
}
const toLogin = async () => {
  await form.value.validate()
  //调用接口
  if (label.value === 'user') {
    //调用用户登录接口
    const res = await userLoginService(loginForm.value)
    // 存储登录状态
    userStore.setToken(res.data.data.token, res.data.data.userId)
    // 跳转到用户首页
    ElMessage.success('登录成功')
    console.log(res)
    router.push('/user')
  } else if (label.value === 'merchant') {
    //调用商家登录接口
    const res = await userLoginService(loginForm.value)
    userStore.setToken(res.data.token, res.data.userId)
    ElMessage.success('登录成功')
    router.push('/merchant')
  } else if (label.value === 'admin') {
    //调用管理员登录接口
    const res = await userLoginService(loginForm.value)
    userStore.setToken(res.data.token, res.data.userId)
    ElMessage.success('登录成功')
    router.push('/admin')
  } else {
    ElMessage.error('登录密码错误')
    label.value.password = ''
  }
}

const toRegister = () => {
  if (label.value === 'user') {
    router.push('/UserResgister')
  } else {
    router.push('/merchantResgister')
  }
}

const toForgetPassword = () => {
  console.log(loginForm.value)
}

//监测数据变化
watch(label, () => {
  loginForm.value = {
    username: '',
    password: '',
  }
})
</script>

<template>
  <el-row class="login-page">
    <!-- 左边布局 -->
    <el-col :span="12" class="bg">
      <h1>宠托托</h1>
      <h2>萌宠寄养平台</h2>
      <p>专业・安心・贴心</p>
    </el-col>
    <el-col :span="6" :offset="3" class="form">
      <div class="login-content">
        <el-form :model="loginForm" :rules="rules" ref="form">
          <div class="logo-box">
            <el-form-item>
              <iconify-icon class="logo-icon" icon="mdi:paw"></iconify-icon>
            </el-form-item>
          </div>
          <el-form-item>
            <h1 class="login-title">萌宠寄养管家</h1>
            <p class="login-desc">给毛孩子一个温馨的临时避风港</p>
          </el-form-item>
          <el-form-item>
            <div class="login-choice">
              <el-radio-group v-model="label" size="large" fill="#e8630c">
                <el-radio-button label="个人用户" value="user" />
                <el-radio-button label="商家入口" value="merchant" />
                <el-radio-button label="管理人员" value="admin" />
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginForm.username" class="login-input" placeholder="请输入用户名">
              <template #suffix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <div class="do-password">
              <el-checkbox v-model="checked1" label="记住密码" size="large" />
              <el-link type="warning" @click="toForgetPassword">忘记密码？</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="login-button" @click="toLogin">立即登录</el-button>
          </el-form-item>
        </el-form>
        <el-form-item>
          <div :class="label === 'user' ? 'newRegister' : 'active'">
            <p>还没有账号？</p>
            <el-link type="warning" underline="hover" @click="toRegister">注册账号</el-link>
          </div>
          <div :class="label === 'merchant' ? 'newRegister' : 'active'">
            <p>想要自己养？</p>
            <el-link type="warning" underline="hover" @click="toRegister">商家入驻</el-link>
          </div>
          <div :class="label === 'admin' ? 'adminder' : 'active'">
            <p>* 管理员账号请联系系统中心分配，不提供公开注册入口</p>
          </div>
        </el-form-item>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.login-page {
  height: 100vh;
  background-color: #fceadb;
  display: flex;
  font-family: 'Noto Sans SC-Regular';

  .bg {
    background: url('@/assets/login_bg.webp') no-repeat center / cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-right: 40px;
    h1 {
      font-size: 42px;
      color: #bc6819;
    }
    h2 {
      font-size: 24px;
      color: #692313;
    }
    p {
      font-size: 18px;
      color: black;
    }
  }

  .form {
    display: flex;
    align-items: center;
    .login-content {
      background-color: white;
      width: 100%;
      max-width: 600px;
      border-radius: 24px;
      box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.09411764705882353);
      border: 1px solid rgb(255, 224, 204);
      padding: 35px;
      position: relative;
      align-items: center; /* 垂直居中 */
      justify-content: center;
      .logo-box {
        width: 64px;
        height: 64px;
        background-color: #fde68a;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        margin: 0 auto 20px;
        .logo-icon {
          color: #e8630c;
          font-size: 3em;
        }
      }
      .login-title {
        font-size: 24px;
        font-weight: bold;
        margin: 0 auto;

        color: #222;
        margin-bottom: 6px;
      }
      .login-desc {
        font-size: 13px;
        font-weight: bold;
        color: #888;
        margin: 0 auto;
        margin-bottom: 24px;
      }

      .login-choice {
        display: flex;
        justify-content: center;
        white-space: nowrap;
        flex-wrap: wrap;
        width: 100%;
      }

      .do-password {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
      .login-button {
        color: #fff;
        width: 100%;
        background-color: #e0600c;
        border-radius: 12px;
        height: 40px;
        font-size: 18px;
      }
      .newRegister {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    }
  }
}
.active {
  display: none;
}
.adminder {
  font-size: 0.75rem;
  color: #888;
}
.login-choice {
  :deep(.el-radio-button) {
    &:hover {
      .el-radio-button__inner {
        color: #e8630c;
      }
    }
    &.is-active {
      .el-radio-button__inner {
        background-color: #e8630c;
        border-color: #e8630c;
        color: #fff;
      }
    }
  }
}
</style>
