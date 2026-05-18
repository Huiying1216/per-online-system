<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="bg-circle circle1"></div>
    <div class="bg-circle circle2"></div>

    <div class="login-container">
      <div class="login-card">
        <!-- Logo & 标题 -->
        <div class="login-header">
          <div class="logo-box">
            <iconify-icon class="logo-icon" icon="lucide:dog"></iconify-icon>
          </div>
          <h1>萌宠寄养管家</h1>
          <p>给毛孩子一个温馨的临时避风港</p>
        </div>

        <!-- 角色切换 -->
        <div class="role-tabs">
          <button
            :class="['tab-btn', currentRole === 'user' && 'active']"
            @click="switchRole('user')"
          >
            个人用户
          </button>
          <button
            :class="['tab-btn', currentRole === 'merchant' && 'active']"
            @click="switchRole('merchant')"
          >
            商家端
          </button>
          <button
            :class="['tab-btn', currentRole === 'admin' && 'active']"
            @click="switchRole('admin')"
          >
            管理端
          </button>
        </div>

        <!-- 登录表单 -->
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-item">
            <label>账号</label>
            <div class="input-wrapper">
              <iconify-icon icon="lucide:user" class="input-icon"></iconify-icon>
              <input v-model="loginForm.username" placeholder="手机号 / 用户名" type="text" />
            </div>
          </div>

          <div class="form-item">
            <label>密码</label>
            <div class="input-wrapper">
              <iconify-icon icon="lucide:lock" class="input-icon"></iconify-icon>
              <input
                v-model="loginForm.password"
                placeholder="请输入密码"
                :type="showPassword ? 'text' : 'password'"
              />
              <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                <iconify-icon :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'"></iconify-icon>
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="remember">
              <input v-model="loginForm.remember" type="checkbox" />
              <span>记住我</span>
            </label>
            <a class="forget-link" href="#">忘记密码？</a>
          </div>

          <button type="submit" class="submit-btn">立即登录</button>
        </form>

        <!-- 底部注册链接 -->
        <div class="login-footer">
          <p v-show="currentRole === 'user'">
            还没有账号？ <a href="user-register.html">免费注册</a>
          </p>
          <p v-show="currentRole === 'merchant'">
            想开店寄养？ <a href="merchant-register.html">商家入驻</a>
          </p>
          <p v-show="currentRole === 'admin'" class="admin-tip">
            * 管理员账号请联系系统中心分配，不提供公开注册入口
          </p>
        </div>
      </div>

      <div class="copyright">© 2026 萌宠寄养管家 版权所有 | 沪ICP备12345678号</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 角色
const currentRole = ref('user')

// 表单
const loginForm = ref({
  username: '',
  password: '',
  remember: false,
})

// 显示密码
const showPassword = ref(false)

// 切换角色
function switchRole(role) {
  currentRole.value = role
}

// 登录提交
function handleLogin() {
  console.log('登录信息：', loginForm.value)
}
</script>

<style scoped>
/* 页面整体 */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 背景装饰圆 */
.bg-circle {
  position: absolute;
  border-radius: 9999px;
  filter: blur(3rem);
  opacity: 0.5;
}

.circle1 {
  top: -10%;
  left: -5%;
  width: 16rem;
  height: 16rem;
  background-color: #ffedd5;
}

.circle2 {
  bottom: -10%;
  right: -5%;
  width: 24rem;
  height: 24rem;
  background-color: #fef3c7;
}

/* 容器 */
.login-container {
  width: 100%;
  max-width: 450px;
  position: relative;
  z-index: 10;
  padding: 1rem;
}

/* 卡片 */
.login-card {
  background: white;
  border-radius: 1rem;
  border: 1px solid #ffedd5;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

/* 头部 */
.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color: #ffedd5;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 2rem;
  color: #e8630c;
}

.login-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.login-header p {
  color: #6b7280;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

/* 角色切换 */
.role-tabs {
  display: flex;
  background-color: #f3f4f6;
  padding: 0.25rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.tab-btn {
  flex: 1;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6b7280;
}

.tab-btn:hover {
  color: #374151;
}

.tab-btn.active {
  background: white;
  color: #e8630c;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* 表单 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-item label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

/* 输入框包裹 */
.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.input-wrapper input {
  display: block;
  width: 100%;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;
}

.input-wrapper input:focus {
  ring: 2px solid #f97316;
  border-color: #f97316;
}

/* 眼睛按钮 */
.eye-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
}

.eye-btn:hover {
  color: #374151;
}

/* 选项栏 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.remember input {
  width: 1rem;
  height: 1rem;
  color: #e8630c;
  border-radius: 0.25rem;
}

.forget-link {
  font-size: 0.75rem;
  color: #e8630c;
  text-decoration: none;
}

.forget-link:hover {
  text-decoration: underline;
}

/* 提交按钮 */
.submit-btn {
  width: 100%;
  background-color: #e8630c;
  color: white;
  padding: 0.75rem 0;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.2);
}

.submit-btn:hover {
  background-color: #c25100;
}

/* 底部注册 */
.login-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
  text-align: center;
}

.login-footer p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0;
}

.login-footer a {
  color: #e8630c;
  font-weight: 500;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}

.admin-tip {
  font-size: 0.75rem;
  color: #9ca3af;
  font-style: italic;
}

/* 版权 */
.copyright {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.75rem;
  color: #9ca3af;
}
</style>
