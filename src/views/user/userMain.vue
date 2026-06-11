<script setup>
import petImage from '@/assets/jpg/bird.jpg'
import { ArrowRight, Setting, ChatRound } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { userUpdateService } from '@/api/user'
const userStore = useUserStore()
const isRealName = ref(false)
const orderMessage = ref(true)
const promotionMessage = ref(false)
const petHealthMessage = ref(true)
const {
  user: { nickname, phone, email, signature, province, realName, idCard },
} = useUserStore()
onMounted(() => {
  userStore.getUser()
})

// 对话框控制
const editDialogVisible = ref(false)
const passwordDialogVisible = ref(false)
const realNameDialogVisible = ref(false)

// 编辑资料表单
const editForm = ref({
  nickname,
  phone,
  email,
  signature,
  province,
  realName,
  idCard,
})

// 修改密码表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 表单验证规则
const editFormRules = ref({
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
})

const passwordFormRules = ref({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})

const realNameFormRules = ref({
  realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  idCard: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    {
      pattern:
        /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      message: '请输入正确的身份证号',
      trigger: 'blur',
    },
  ],
})

// 表单引用
const editFormRef = ref(null)
const passwordFormRef = ref(null)
const realNameFormRef = ref(null)

// 处理函数
const handleEditSubmit = async () => {
  await editFormRef.value.validate()
  await userUpdateService(editForm.value)
  userStore.getUser()
  ElMessage.success('修改资料成功')
}

const handlePasswordSubmit = async () => {
  if (!passwordFormRef.value) return
  await passwordFormRef.value.validate((valid) => {
    if (valid) {
      console.log('提交修改密码:', passwordForm)
      passwordDialogVisible.value = false
      passwordForm.value.oldPassword = ''
      passwordForm.value.newPassword = ''
      passwordForm.value.confirmPassword = ''
      ElMessage.success('修改密码成功')
    }
  })
}

const handleRealNameSubmit = async () => {
  if (!realNameFormRef.value) return
  await realNameFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('成功通过实名认证')

      isRealName.value = true
      realNameDialogVisible.value = false
      editForm.value.realName = ''
      editForm.value.idCard = ''
    }
  })
}

const resetEditForm = () => {
  if (!editFormRef.value) return
  editFormRef.value.resetFields()
}

const resetPasswordForm = () => {
  if (!passwordFormRef.value) return
  passwordFormRef.value.resetFields()
}

const resetRealNameForm = () => {
  if (!realNameFormRef.value) return
  realNameFormRef.value.resetFields()
}
</script>

<template>
  <h2>账号设置</h2>
  <div class="user-main">
    <el-card style="width: 100%">
      <div class="user-info">
        <div class="user-left">
          <el-image :src="petImage" fit="fill" class="user-info-image" />
          <div class="user-info-content">
            <h3 class="nickname">{{ userStore.user.nickname }}</h3>
            <p class="message">
              性别：{{
                userStore.user.gender === 1 ? '男' : userStore.user.gender === 2 ? '女' : '未知'
              }}
            </p>
            <p class="message">地址：{{ userStore.user.province }}</p>
            <p class="message">电话号码：{{ userStore.user.phone }}</p>
            <p class="message">邮箱：{{ userStore.user.email }}</p>
            <p class="message">个性签名：{{ userStore.user.signature }}</p>
          </div>
        </div>
        <div class="user-right">
          <el-button type="warning" @click="editDialogVisible = true">
            编辑资料
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
  <div class="user-setting">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div class="title">
            <el-icon class="safe-setting"><Setting /></el-icon>
            <span class="setting-title">账号设置</span>
          </div>
          <div class="update-password">
            <div class="password-left">
              <span class="top-title">修改密码</span>
              <span class="button-suggestion">建议定期更换密码以保障账户安全</span>
            </div>
            <div class="password-right">
              <el-button type="warning" @click="passwordDialogVisible = true">修改密码</el-button>
            </div>
          </div>
          <div class="real-name">
            <div class="name-left">
              <span class="top-title">实名认证</span>
              <span class="button-suggestion">完成实名认证以使用更多服务功能</span>
            </div>
            <div class="name-right" v-if="isRealName">
              <el-tag type="success" size="large" effect="plain" style="margin-right: 5px"
                >已认证</el-tag
              >
              <el-button type="warning">查看认证信息</el-button>
            </div>
            <div v-else class="name-right">
              <el-tag type="danger" size="large" effect="plain" style="margin-right: 5px"
                >未认证</el-tag
              >
              <el-button type="warning" @click="realNameDialogVisible = true">去认证</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="title">
            <el-icon class="safe-setting"><ChatRound /></el-icon>
            <span class="setting-title">消息通知</span>
          </div>
          <div class="message-notification">
            <div class="notification-left">
              <span class="top-title">订单状态更新通知</span>
              <span class="button-suggestion">帮助你更好的管理订单状态</span>
            </div>
            <div class="notification-right">
              <el-switch
                v-model="orderMessage"
                class="ml-2"
                style="--el-switch-on-color: #e8630c; --el-switch-off-color: #e5e7eb"
              />
            </div>
          </div>
          <div class="message-notification">
            <div class="notification-left">
              <span class="top-title">促销活动与优惠券通知</span>
              <span class="button-suggestion">第一时间获取最新优惠信息和优惠券发放提醒</span>
            </div>
            <div class="notification-right">
              <el-switch
                v-model="promotionMessage"
                class="ml-2"
                style="--el-switch-on-color: #e8630c; --el-switch-off-color: #e5e7eb"
              />
            </div>
          </div>
          <div class="message-notification">
            <div class="notification-left">
              <span class="top-title">宠物健康提醒</span>
              <span class="button-suggestion">接收宠物疫苗接种、体检等健康相关提醒</span>
            </div>
            <div class="notification-right">
              <el-switch
                v-model="petHealthMessage"
                class="ml-2"
                style="--el-switch-on-color: #e8630c; --el-switch-off-color: #e5e7eb"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <!-- 编辑资料对话框 -->
  <el-dialog v-model="editDialogVisible" title="修改个人信息" width="500px" @close="resetEditForm">
    <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="80px">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="editForm.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="editForm.gender" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="所在地" prop="province">
        <el-input v-model="editForm.province" placeholder="请输入所在地" maxlength="11" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="editForm.phone" placeholder="请输入手机号" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="个性签名" prop="signature">
        <el-input
          v-model="editForm.signature"
          type="textarea"
          :rows="3"
          placeholder="请输入个性签名"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="warning" @click="handleEditSubmit">确定</el-button>
    </template>
  </el-dialog>

  <!-- 修改密码对话框 -->
  <el-dialog
    v-model="passwordDialogVisible"
    title="修改密码"
    width="500px"
    @close="resetPasswordForm"
  >
    <el-form
      ref="passwordFormRef"
      :model="passwordForm"
      :rules="passwordFormRules"
      label-width="100px"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="passwordForm.oldPassword"
          type="password"
          placeholder="请输入旧密码"
          show-password
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="passwordForm.newPassword"
          type="password"
          placeholder="请输入新密码"
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="passwordForm.confirmPassword"
          type="password"
          placeholder="请再次输入新密码"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="passwordDialogVisible = false">取消</el-button>
      <el-button type="warning" @click="handlePasswordSubmit">确定</el-button>
    </template>
  </el-dialog>

  <!-- 实名认证对话框 -->
  <el-dialog
    v-model="realNameDialogVisible"
    title="实名认证"
    width="500px"
    @close="resetRealNameForm"
  >
    <el-form ref="realNameFormRef" :model="editForm" :rules="realNameFormRules" label-width="100px">
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="editForm.realName" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="editForm.idCard" placeholder="请输入身份证号" maxlength="18" />
      </el-form-item>
      <el-alert title="实名认证说明" type="info" :closable="false" style="margin-top: 10px">
        <p>1. 实名认证后不可修改，请确保信息准确</p>
        <p>2. 身份证号将用于验证您的真实身份</p>
        <p>3. 我们会严格保护您的个人信息安全</p>
      </el-alert>
    </el-form>
    <template #footer>
      <el-button @click="realNameDialogVisible = false">取消</el-button>
      <el-button type="warning" @click="handleRealNameSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.user-main {
  padding: 2rem;
  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    .user-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;
      .user-info-content {
        .nickname {
          font-size: 1.25rem;
        }
        .message {
          font-size: 1rem;
          color: #666;
        }
      }
    }
  }
}
.user-info-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 20px;
}
.user-setting {
  padding: 2rem;
}
.title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  margin-bottom: 10px;
  .safe-setting {
    font-size: 1.25rem;
    color: #e96629;
  }
  .setting-title {
    font-size: 1.25rem;
    font-weight: bold;
  }
}

.update-password,
.real-name,
.message-notification {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  .password-left,
  .name-left,
  .notification-left {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 5px;
  }
  .password-right,
  .name-right,
  .notification-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.top-title {
  font-size: 1rem;
  font-weight: bold;
}
.button-suggestion {
  font-size: 0.75rem;
  color: #666;
}

// 头像预览样式
.avatar-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
