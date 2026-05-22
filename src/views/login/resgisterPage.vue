<script setup>
import { ref } from 'vue'
const checkedAgree = ref(false)
</script>
<template>
  <div class="register-page">
    <div>
      <h1>加入萌宠家族</h1>
      <p>创建一个账户，为您的宠物寻找最好的寄养服务</p>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.email" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item label="设置密码">
          <el-input v-model="form.password" placeholder="至少八位，包含数字和字母"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirmPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checkedAgree" />
          <span>我已阅读并同意 </span
          ><el-link type="warning" underline="hover" @click="toRegister"
            >《萌宠寄养平台用户协议》</el-link
          >和
          <el-link type="warning" underline="hover" @click="toRegister">《隐私保护政策》</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped></style>
