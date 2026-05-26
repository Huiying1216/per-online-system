<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Back } from '@element-plus/icons-vue'
const router = useRouter()
//默认协议勾选状态
const checkedAgree = ref(false)
//验证码
const codeText = ref('获取验证码')
const realCode = ref('')
const count = ref(10)
//协议弹窗
const checkPetAgree = ref(false)
const checkPrivateAgree = ref(false)
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
const goBack = () => {
  router.push('/login')
}
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
    router.push('/login')
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
            <el-link type="warning" underline="hover" @click="checkPetAgree = true"
              >《萌宠寄养平台用户协议》</el-link
            >和
            <el-link type="warning" underline="hover" @click="checkPrivateAgree = true"
              >《隐私保护政策》</el-link
            >
          </el-form-item>
          <el-dialog
            v-model="checkPetAgree"
            title="萌宠寄养平台用户协议"
            width="500"
            center
            class="agree-dialog"
          >
            <span>
              <div style="padding: 16px; font-size: 14px">
                <p style="text-align: left">生效日期：2026年05月26日</p>
                <p>您注册、登录、使用本平台服务，即表示已阅读、理解并同意本协议全部条款。</p>
                <p>
                  <strong>1. 平台服务说明</strong><br />
                  本平台为宠物寄养信息撮合服务平台，仅提供需求匹配、订单管理、交易支付、纠纷协调服务，不直接提供寄养、护理、医疗服务。
                </p>
                <p>
                  <strong>2. 用户账号</strong><br />
                  用户需年满18周岁，注册信息必须真实有效。账号仅限本人使用，因保管不当造成损失由用户自行承担。
                </p>
                <p>
                  <strong>3. 用户义务</strong><br />
                  宠主须如实告知宠物健康、疫苗、性格、病史等信息，不得隐瞒传染病、攻击性等情况。寄养师须保证环境安全卫生，不得虐待、遗弃、转卖宠物。
                </p>
                <p>
                  <strong>4. 订单与退款</strong><br />
                  服务开始前24小时取消：全额退款；12–24小时取消：退款80%；12小时内取消：退款50%；服务已开始不予退款。寄养师违约可全额退款。
                </p>
                <p>
                  <strong>5. 责任说明</strong><br />
                  宠物因自身疾病、应激、体质问题导致异常，平台与寄养师不承担责任。因寄养师过失导致宠物受伤、丢失、死亡，由寄养师负责赔偿。
                </p>
                <p>
                  <strong>6. 违规处理</strong><br />
                  禁止虚假信息、恶意评价、骚扰他人、私下交易，违规平台可封禁账号并终止服务。
                </p>
                <p style="text-align: center; margin-top: 30px; color: #999">
                  萌宠寄养平台 最终解释权所有
                </p>
              </div>
            </span>
          </el-dialog>
          <el-dialog
            v-model="checkPrivateAgree"
            title="隐私保护政策"
            width="500"
            center
            class="agree-dialog"
          >
            <span>
              <div style="padding: 16px; font-size: 14px">
                <p style="text-align: left">生效日期：2026年05月26日</p>

                <p>
                  <strong>1. 信息收集</strong><br />
                  平台会收集必要信息：手机号、昵称、身份信息、宠物信息、订单记录、交易记录、设备日志等。
                </p>

                <p>
                  <strong>2. 信息使用</strong><br />
                  收集的信息仅用于服务提供、订单管理、身份核验、售后维权、平台安全保障。
                </p>

                <p>
                  <strong>3. 信息安全</strong><br />
                  平台采用加密技术保护用户信息，不会出售、出租用户隐私。仅在法律要求或用户授权时合规共享。
                </p>

                <p>
                  <strong>4. 用户权利</strong><br />
                  用户可查看、修改个人信息，可申请注销账号。对隐私政策有疑问可联系客服。
                </p>

                <p>
                  <strong>5. 政策更新</strong><br />
                  平台可依法更新政策，更新后公示生效，继续使用即视为同意。
                </p>
                <p style="text-align: center; margin-top: 30px; color: #999">
                  萌宠寄养平台 最终解释权所有
                </p>
              </div>
            </span>
          </el-dialog>
          <el-form-item>
            <el-button class="register-button" @click="toRegister">立即注册</el-button>
          </el-form-item>
          <el-form-item>
            <div class="backLogin" @click="goBack">
              <el-icon><Back /></el-icon>
              <span>返回登录</span>
            </div>
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
.backLogin {
  cursor: pointer;
  color: #e8630c;
  font-size: 15px;
  display: flex;
  align-items: center;
}
.agree-dialog {
  background-color: #ea16ae;
}
</style>
