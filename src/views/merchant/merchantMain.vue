<script setup>
import petImage from '@/assets/png/petShop.png'
import { ArrowRight, Setting, ChatRound } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const isRealName = ref(false)

// 对话框控制
const editDialogVisible = ref(false)
const passwordDialogVisible = ref(false)
const realNameDialogVisible = ref(false)

// 头像上传相关
const uploadDialogVisible = ref(false)
const tempAvatar = ref(null)
const uploadInput = ref(null)

// 订单通知提醒
const orderMessage = ref(true)
const commentMessage = ref(true)

// 编辑资料表单
const editForm = ref({
  shopName: '淋雨走之家',
  address: '北京市海淀区',
  phone: '182222222',
  status: '营业中',
  tag: '宠物寄养',
  image: petImage,
})

// 修改密码表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 实名认证表单
const realNameForm = ref({
  realName: '',
  idCard: '',
})

// 表单验证规则
const editFormRules = ref({
  shopName: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  status: [{ required: true, message: '请选择营业状态', trigger: 'change' }],
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
  if (!editFormRef.value) return
  await editFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('更新资料成功')
      console.log('提交更新资料:', editForm.value)
      editDialogVisible.value = false
    }
  })
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
      console.log('提交实名认证:', realNameForm.value)
      isRealName.value = true
      realNameDialogVisible.value = false
      realNameForm.value.realName = ''
      realNameForm.value.idCard = ''
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

// 头像上传相关函数
const uploadAvatar = () => {
  if (uploadInput.value) {
    uploadInput.value.click()
  }
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型和大小
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    alert('只能上传 JPG/PNG 格式的图片!')
    return
  }
  if (!isLt2M) {
    alert('图片大小不能超过 2MB!')
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    tempAvatar.value = reader.result
    uploadDialogVisible.value = true
  }
  // 清空 input 以便下次可以选择同一文件
  event.target.value = ''
}

const confirmAvatar = () => {
  editForm.value.image = tempAvatar.value
  uploadDialogVisible.value = false
  tempAvatar.value = null
}

const cancelAvatar = () => {
  uploadDialogVisible.value = false
  tempAvatar.value = null
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
            <h3 class="nickname">{{ editForm.shopName }}</h3>
            <p class="message">地址：{{ editForm.address }}</p>
            <p class="message">联系电话：{{ editForm.phone }}</p>
            <p class="message">营业状态：{{ editForm.status }}</p>
            <p class="message">服务类型：{{ editForm.tag }}</p>
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
              <span class="top-title">新订单通知提醒</span>
              <span class="button-suggestion">让你及时了解新订单信息</span>
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
              <span class="top-title">客户评价提醒</span>
              <span class="button-suggestion">让你及时了解客户评价信息</span>
            </div>
            <div class="notification-right">
              <el-switch
                v-model="commentMessage"
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
  <el-dialog v-model="editDialogVisible" title="编辑店铺资料" width="500px" @close="resetEditForm">
    <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="80px">
      <el-form-item label="店铺图片">
        <el-image :src="editForm.image" fit="fill" class="user-info-image" />
        <el-button type="warning" @click="uploadAvatar">更换店铺图片</el-button>
        <!-- 隐藏的文件输入框 -->
        <input
          ref="uploadInput"
          type="file"
          accept="image/*"
          style="display: none"
          @change="handleFileChange"
        />
      </el-form-item>
      <el-form-item label="店铺名称" prop="shopName">
        <el-input v-model="editForm.shopName" placeholder="请输入店铺名称" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="editForm.address" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="editForm.phone" placeholder="请输入联系电话" maxlength="11" />
      </el-form-item>
      <el-form-item label="营业状态" prop="status">
        <el-select v-model="editForm.status" placeholder="请选择营业状态">
          <el-option label="营业" value="营业" />
          <el-option label="休息" value="休息" />
        </el-select>
      </el-form-item>
      <el-form-item label="服务类型" prop="tag">
        <el-select v-model="editForm.tag" multiple placeholder="请选择服务类型">
          <el-option label="24h看护" value="24h看护" />
          <el-option label="上门接送" value="上门接送" />
          <el-option label="专业洗护" value="专业洗护" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="warning" @click="handleEditSubmit">确定</el-button>
    </template>
  </el-dialog>

  <!-- 头像预览确认对话框 -->
  <el-dialog v-model="uploadDialogVisible" title="确认店铺图片" width="400px">
    <div class="avatar-preview">
      <el-avatar :size="150" :src="tempAvatar" />
    </div>
    <template #footer>
      <el-button @click="cancelAvatar">取消</el-button>
      <el-button type="warning" @click="confirmAvatar">确定</el-button>
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
    <el-form
      ref="realNameFormRef"
      :model="realNameForm"
      :rules="realNameFormRules"
      label-width="100px"
    >
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="realNameForm.realName" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="realNameForm.idCard" placeholder="请输入身份证号" maxlength="18" />
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

// 头像预览样式
.avatar-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.top-title {
  font-size: 1rem;
  font-weight: bold;
}
.button-suggestion {
  font-size: 0.75rem;
  color: #666;
}
</style>
