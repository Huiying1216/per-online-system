<script setup>
import cardMessageIcon from '@/components/slot/cardMessageIcon.vue'
import petImage from '@/assets/png/dog.png'
import petForm from '@/components/petForm.vue'
import { EditPen, Delete, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const openDialog = ref(false)
const dialogImageUrl = ref('')
const pcitureDialog = ref(false)
const fileList = ref([])
const petFormRef = ref(null)
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  pcitureDialog.value = true
}

const validateForm = async () => {
  await petFormRef.value.validateForm()
  //调用接口，更新数据库中的宠物信息
  ElMessage.success('添加成功！')
  openDialog.value = false
}
//健康档案操作
const currentPet = ref(null)
const lookHealth = ref(false)
const lookHealthRef = (item) => {
  currentPet.value = item
  lookHealth.value = true
}

// 更新宠物档案
const editDialogVisible = ref(false)
const editPetForm = ref({
  name: '',
  type: '',
  age: '',
  sex: '',
  weight: '',
  tag: [],
  image: '',
})
const editFormRef = ref(null)

const handleEdit = (item) => {
  editPetForm.value = {
    name: item.name,
    type: item.type,
    age: item.age,
    sex: item.sex,
    weight: item.weight,
    tag: [...item.tag],
    image: item.image,
  }
  currentPet.value = item
  editDialogVisible.value = true
}

const handleUpdatePet = async () => {
  if (!editFormRef.value) return
  await editFormRef.value.validate((valid) => {
    if (valid) {
      // 更新当前宠物数据
      if (currentPet.value) {
        currentPet.value.name = editPetForm.value.name
        currentPet.value.type = editPetForm.value.type
        currentPet.value.age = editPetForm.value.age
        currentPet.value.sex = editPetForm.value.sex
        currentPet.value.weight = editPetForm.value.weight
        currentPet.value.tag = [...editPetForm.value.tag]
        currentPet.value.image = editPetForm.value.image
      }
      ElMessage.success('更新成功！')
      editDialogVisible.value = false
    }
  })
}

const resetEditForm = () => {
  if (!editFormRef.value) return
  editFormRef.value.resetFields()
}

//模拟数据
const petHealthForm = ref([
  {
    id: 1,
    image: petImage,
    name: '布丁',
    type: '猫',
    age: '2岁',
    sex: '女',
    weight: '12.5kg',
    tag: ['活泼好动', '已免疫', '活泼好动'],
    state: '寄养中',
  },
  {
    id: 2,
    image: petImage,
    name: '草莓',
    type: '猫',
    age: '1岁',
    sex: '女',
    weight: '15.5kg',
    tag: ['已免疫', '已免疫', '活泼好动'],
    state: '寄养中',
  },
  {
    id: 3,
    image: petImage,
    name: '苹果',
    type: '狗',
    age: '1岁',
    sex: '男',
    weight: '15.5kg',
    tag: ['已免疫', '已免疫', '活泼好动'],
    state: '寄养中',
  },
  {
    id: 4,
    image: petImage,
    name: '橙子',
    type: '狗',
    age: '1岁',
    sex: '男',
    weight: '15.5kg',
    tag: ['已免疫', '已免疫', '活泼好动'],
    state: '寄养中',
  },
])
</script>

<template>
  <el-space direction="horizontal" size="25" wrap class="out">
    <cardMessageIcon v-for="item in petHealthForm" :key="item.id">
      <template #image>
        <el-image style="width: 370px; height: 270px" :src="item.image" fit="cover"></el-image>
      </template>
      <template #state>
        <el-tag type="warning" effect="dark">{{ item.state }}</el-tag>
      </template>
      <template #os>
        <div class="os">
          <div class="icon-background" @click="handleEdit(item)">
            <el-icon><EditPen /></el-icon>
          </div>
          <div class="icon-background">
            <el-icon><Delete /></el-icon>
          </div>
        </div>
      </template>
      <template #info>
        <div class="info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.type }} ・ {{ item.age }} ・ {{ item.sex }}</p>
        </div>
      </template>
      <template #weight>
        <p>体重</p>
        <h4>{{ item.weight }}</h4>
      </template>
      <template #tag>
        <el-tag type="primary" v-for="tag in item.tag" :key="tag">{{ tag }}</el-tag>
      </template>
      <template #foot>
        <div class="foot">
          <el-button link @click="lookHealthRef(item)">查看健康档案</el-button>
        </div>
      </template>
    </cardMessageIcon>
    <div class="add" @click="openDialog = true">
      <el-icon><Plus /></el-icon>
    </div>
    <el-dialog v-model="openDialog" title="添加宠物信息" width="500" draggable>
      <span>
        <el-upload
          ref="uploadRef"
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
          :auto-upload="false"
        >
          <div class="warn-content">
            <p color="#909399">请上传一张宠物图片</p>
          </div>
        </el-upload>

        <el-dialog v-model="pcitureDialog">
          <img w-full :src="dialogImageUrl" alt="宠物图片" />
        </el-dialog>

        <div class="form">
          <petForm ref="petFormRef"></petForm>
        </div>
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="openDialog = false">取消</el-button>
          <el-button type="primary" @click="validateForm"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 编辑宠物档案对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑宠物档案"
      width="600px"
      @close="resetEditForm"
    >
      <el-form ref="editFormRef" :model="editPetForm" label-width="80px">
        <el-form-item label="宠物图片">
          <el-upload
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="
              (file) => {
                const reader = new FileReader()
                reader.readAsDataURL(file.raw)
                reader.onload = () => {
                  editPetForm.image = reader.result
                }
              }
            "
          >
            <el-image
              v-if="editPetForm.image"
              :src="editPetForm.image"
              fit="cover"
              style="width: 100px; height: 100px"
            />
            <el-button v-else type="primary" size="small">选择图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="宠物名称" required>
          <el-input v-model="editPetForm.name" placeholder="请输入宠物名称" />
        </el-form-item>
        <el-form-item label="宠物类型" required>
          <el-select v-model="editPetForm.type" placeholder="请选择宠物类型">
            <el-option label="狗" value="狗" />
            <el-option label="猫" value="猫" />
            <el-option label="鸟" value="鸟" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" required>
          <el-input v-model="editPetForm.age" placeholder="例如：2 岁" />
        </el-form-item>
        <el-form-item label="性别" required>
          <el-select v-model="editPetForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="体重" required>
          <el-input v-model="editPetForm.weight" placeholder="例如：12.5kg" />
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="editPetForm.tag"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
          >
            <el-option label="活泼好动" value="活泼好动" />
            <el-option label="已免疫" value="已免疫" />
            <el-option label="已除虫" value="已除虫" />
            <el-option label="温顺可爱" value="温顺可爱" />
            <el-option label="需要特殊照顾" value="需要特殊照顾" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="warning" @click="handleUpdatePet">确定</el-button>
      </template>
    </el-dialog>
  </el-space>
  <el-dialog v-model="lookHealth" title="宠物档案" width="800">
    <el-descriptions border v-if="currentPet">
      <el-descriptions-item label="宠物名称">{{ currentPet.name }}</el-descriptions-item>
      <el-descriptions-item label="宠物类型">{{ currentPet.type }}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{ currentPet.age }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ currentPet.sex }}</el-descriptions-item>
      <el-descriptions-item label="标签">
        <el-tag size="small" v-for="item in currentPet.tag" :key="item">{{ item }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="体重">{{ currentPet.weight }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>
<style lang="less" scoped>
.os {
  position: absolute;
  top: 8px;
  left: 290px;
  display: flex;
  gap: 10px;
  .icon-background {
    width: 32px;
    height: 32px;
    background-color: #f9fafb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-icon {
      color: #646668;
      &:hover {
        color: #e96713;
      }
    }
  }
}

h4 {
  margin: 0;
  line-height: 1;
  font-size: 1rem;
}

h3 {
  margin: 0;
  line-height: 1;
}
p {
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 1;
  font-size: 0.75rem;
  color: #646668;
}

.foot {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  .el-button {
    &:hover {
      color: #e96713;
    }
  }
}
.el-tag {
  margin: 0 5px;
}

.add {
  height: 400px;
  align-self: stretch;
  width: 370px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  .el-icon {
    font-size: 30px;
    color: #909399;
  }
  &:hover {
    background-color: #fff7ed;
    box-shadow: 0 2px 16px rgba(64, 158, 255, 0.2);
    .el-icon {
      color: #e8630c;
    }
  }
}
.form {
  margin-top: 20px;
}
</style>
