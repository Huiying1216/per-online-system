<script setup>
import { ref } from 'vue'

const petForm = ref({
  name: '',
  type: '',
  age: '',
  sex: '',
  tag: [],
  weight: '',
  state: '',
})

const formRef = ref(null)

const rules = {
  name: [
    { required: true, message: '请输入宠物名称', trigger: 'blur' },
    { min: 1, max: 5, message: '宠物名称长度必须在1到5个字符之间', trigger: 'blur' },
  ],
  type: [{ required: true, message: '请选择宠物类型', trigger: 'change' }],
  state: [{ required: true, message: '请选择状态', trigger: 'change' }],
}

const validateForm = async () => {
  await formRef.value.validate()
}

defineExpose({
  validateForm,
  petForm,
})
</script>
<template>
  <el-form
    :model="petForm"
    label-width="auto"
    style="max-width: 600px"
    :rules="rules"
    ref="formRef"
  >
    <el-form-item label="宠物名称" prop="name">
      <el-input v-model="petForm.name" />
    </el-form-item>
    <el-form-item label="宠物类型" prop="type">
      <el-radio-group v-model="petForm.type">
        <el-radio value="小狗">小狗</el-radio>
        <el-radio value="小猫">小猫</el-radio>
        <el-radio value="小鸟">小鸟</el-radio>
        <el-radio value="其他">其他</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="petForm.age" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="petForm.sex">
        <el-radio value="男">男</el-radio>
        <el-radio value="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签">
      <el-tag v-for="tag in petForm.tag" :key="tag">{{ tag }}</el-tag>
    </el-form-item>
    <el-form-item label="体重">
      <el-input v-model="petForm.weight" />
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-radio-group v-model="petForm.state">
        <el-radio value="寄养中">寄养中</el-radio>
        <el-radio value="在家">在家</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
