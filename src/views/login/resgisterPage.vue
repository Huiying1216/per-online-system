<script setup>
import { ref } from 'vue'
const checkedAgree = ref(false)
const registerForm = ref({
  username: '',
  phone: '',
  checkCode: '',
  password: '',
  confirmPassword: '',
})
const code = ref(null)
let timer = null
const count = ref(10)
const alterShow = ref(false)
const getCode = () => {
  timer = setInterval(() => {
    count.value--
    code.value.innerHTML = count.value + '秒后重新获取'
    if (count.value <= 0) {
      clearInterval(timer)
      code.value.innerHTML = getFourRandNum()
    }
  }, 1000)
}
const toRegister = () => {
  clearTimeout(timer)
  if (!checkedAgree.value) {
    alterShow.value = true
  }
  timer = setTimeout(() => {
    alterShow.value = false
  }, 2000)
}
const getFourRandNum = () => {
  return Math.floor(Math.random() * 9000) + 1000
}
</script>
<template>
  <div class="register-page">
    <div class="register-main">
      <el-alert
        title="请先同意用户协议和隐私政策"
        type="error"
        center
        show-icon
        :class="alterShow ? '' : 'alter-message'"
      />
      <div class="register-content">
        <h1>加入萌宠家族</h1>
        <p>创建一个账户，为您的宠物寻找最好的寄养服务</p>
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input
              class="input-code"
              v-model="registerForm.checkCode"
              style="max-width: 600px"
              placeholder="请输入验证码"
            >
              <template #append><span @click="getCode" ref="code">获取验证码</span></template>
            </el-input>
          </el-form-item>
          <el-form-item label="设置密码">
            <el-input
              v-model="registerForm.password"
              type="password"
              show-password
              placeholder="至少八位，包含数字和字母"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              show-password
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checkedAgree" />
            &nbsp;我已阅读并同意
            <el-link type="warning" underline="hover" @click="toRegister"
              >《萌宠寄养平台用户协议》</el-link
            >和
            <el-link type="warning" underline="hover" @click="toRegister">《隐私保护政策》</el-link>
          </el-form-item>
          <el-form-item>
            <el-button class="register-button" @click="toRegister">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.register-page {
  height: 100vh;
  background-color: #fffbf8;
  font-family: 'Noto Sans SC', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  .register-main {
    background-color: #ffffff;
    margin: 0 auto;
    max-width: 500px;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    .register-content {
      text-align: center;
      p {
        font-size: 16px;
        color: #666666;
        margin-bottom: 40px;
      }
      .check-code {
        display: flex;
      }

      .register-button {
        color: #fff;
        width: 100%;
        background-color: #e0600c;
        border-radius: 12px;
        height: 40px;
        font-size: 18px;
      }
    }
  }
}
.input-code :deep(.el-input-group__append) {
  color: #e8630c;
  background-color: #fff7ed;
  cursor: pointer;
}
.alter-message {
  display: none;
}
</style>
