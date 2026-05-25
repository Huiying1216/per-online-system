<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
//默认协议勾选状态
const checkedAgree = ref(false)
//验证码
const codeText = ref('获取验证码')
const realCode = ref('')
const count = ref(10)
//计时器
let timer = null
const alterShow = ref(false)
//表单提交
const form = ref(null)
///数据绑定
const registerForm = ref({
  username: '',
  phone: '',
  checkCode: '',
  password: '',
  confirmPassword: '',
})
//校验规则
/**
 * 非空校验
 * required：必填项
 * message：消息提示
 * trigger：触发验时机
 */
/**
 * 长度校验
 * min：最小长度
 * max：最大长度
 */
/**
 * 正则校验
 * pattern：正则表达式
 * message：消息提示
 * trigger：触发验时机
 */
/**
 * 自定义校验
 * validator：校验函数
 * 参数：rule、value、callback
 *  - value:：校验值
 *  - callback：校验成功回调函数
 *  - callback(new Error('校验失败消息')) ：校验失败回调函数，参数为校验失败消息
 *  - message：消息提示
 * trigger：触发验时机
 */
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度必须在3到10个字符之间', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  checkCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== realCode.value) {
          callback(new Error('验证码错误，请重新输入'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]{6,12}$/,
      message: '密码必须包含6到12个字母、数字或下划线',
      trigger: 'blur',
    },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const getCode = () => {
  codeText.value = '获取中...'
  realCode.value = getFourRandNum().toString()
  timer = setInterval(() => {
    count.value--
    codeText.value = `${count.value}秒后重新获取`
    if (count.value <= 0) {
      clearInterval(timer)
      codeText.value = realCode.value
      return
    }
  }, 1000)
}

const getFourRandNum = () => {
  return Math.floor(Math.random() * 9000) + 1000
}
//注册
const toRegister = async () => {
  await form.value.validate()
  //调用接口
  clearTimeout(timer)
  if (!checkedAgree.value) {
    alterShow.value = true
  } else {
    ElMessage.success('注册成功')
    registerForm.value = {
      username: '',
      phone: '',
      checkCode: '',
      password: '',
      confirmPassword: '',
    }
  }
  timer = setTimeout(() => {
    alterShow.value = false
  }, 2000)
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
        <el-form :rules="rules" :model="registerForm" ref="form">
          <el-form-item label="用户名" label-width="90px" prop="username">
            <el-input v-model.trim="registerForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" label-width="90px" prop="phone">
            <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码" label-width="90px" prop="checkCode">
            <el-input
              class="input-code"
              v-model="registerForm.checkCode"
              style="max-width: 600px"
              placeholder="请输入验证码"
            >
              <template #append
                ><span @click="getCode">{{ codeText }}</span></template
              >
            </el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="90px" prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              show-password
              placeholder="至少六位，包含数字和字母和下划线"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="90px" prop="confirmPassword">
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
