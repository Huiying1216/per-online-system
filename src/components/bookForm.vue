<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import cat from '@/assets/jpg/cat.jpg'
import dog from '@/assets/jpg/dog.jpg'
import bird from '@/assets/jpg/bird.jpg'
import other from '@/assets/jpg/other.jpg'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
const bookForm = ref({
  petType: '',
})
const router = useRouter()
const value = ref('')
const radio = ref('1')
const textarea = ref('')
const centerDialogVisible = ref(false)
const position = ref('top')
const addService = ref([false, false, false])
const DialogVisible = () => {
  centerDialogVisible.value = false
  ElNotification({
    title: '温馨提示',
    message: ' 提交预约后需等待商家确认。确认后请在24小时内完成支付以锁定位置。',
    type: 'warning',
  })
}
const data = {
  content: [
    {
      id: 1,
      name: '豪华单间寄养',
      service: '独立大空间，24小时监控，每日外出三次',
      price: '￥128/天',
    },
    {
      id: 2,
      name: '标准单间寄养',
      service: '独立空间，24小时监控，每日外出两次',
      price: '￥98/天',
    },
    {
      id: 3,
      name: '大厅寄养',
      service: '一起玩闹，24小时监控，每日外出一次',
      price: '￥60/天',
    },
  ],
}

const addBookApplication = () => {
  router.push('/user/userOrder')
  ElMessage({
    message: '成功提交预约',
    type: 'success',
  })
}
</script>
<template>
  <div class="book">
    <el-form :model="bookForm" :rules="rules" ref="bookFormRef">
      <el-form-item label="请选择您的宠物类型" :label-position="position">
        <el-radio-group v-model="bookForm.petType" class="pet-type" fill="#f9cfad">
          <el-radio-button value="猫">
            <el-image :src="cat" fit="cover"></el-image>
            <span>小猫</span>
          </el-radio-button>
          <el-radio-button value="狗">
            <el-image :src="dog" fit="cover"></el-image>
            <span>小狗</span>
          </el-radio-button>
          <el-radio-button value="鸟">
            <el-image :src="bird" fit="cover"></el-image>
            <span>小鸟</span>
          </el-radio-button>
          <el-radio-button value="其他">
            <el-image :src="other" fit="cover"></el-image>
            <span>其他</span>
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="寄养时间" :label-position="position">
        <div class="block">
          <span class="demonstration">共计5晚</span>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="To"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="default"
          />
        </div>
      </el-form-item>
      <el-form-item label="选择寄养套餐">
        <div class="custom-radio-group">
          <label
            v-for="item in data.content"
            :key="item.id"
            class="custom-radio"
            :class="{ active: radio === item.id }"
          >
            <input type="radio" :value="item.id" v-model="radio" class="radio-input" />
            <div class="radio-content">
              <div class="des">
                <p class="title">{{ item.name }}</p>
                <p class="service">{{ item.service }}</p>
              </div>
              <div class="price">{{ item.price }}</div>
            </div>
          </label>
        </div>
      </el-form-item>
      <el-form-item label="增值服务（可选）">
        <el-checkbox v-model="addService[0]" size="large" class="add-service">
          精细洗浴 <span class="add-money">+￥50</span>
        </el-checkbox>
        <el-checkbox v-model="addService[1]" size="large" class="add-service">
          爪部护理 <span class="add-money">+￥20</span>
        </el-checkbox>
        <el-checkbox v-model="addService[2]" size="large" class="add-service">
          自带口粮 <span class="sub-money">-￥10/天</span>
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-input
          class="warning"
          v-model="textarea"
          style="width: 350px"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请填写宠物的特殊喜好以及过敏史等"
        />
      </el-form-item>
    </el-form>
    <div class="total">
      <div class="total-pay">
        <p class="total-money">合计：250元</p>
        <el-link type="warning" class="total-detail" @click.stop="centerDialogVisible = true"
          >查看明细</el-link
        >
        <el-dialog v-model="centerDialogVisible" title="费用明细" width="500">
          <div class="detail-content">
            <div class="detail-item">
              <span>豪华单间寄养 x 5 天</span>
              <span>￥640</span>
            </div>
            <div class="detail-item">
              <span>精细洗浴</span>
              <span>￥50</span>
            </div>
            <div class="detail-item">
              <span>平台服务费</span>
              <span>￥5</span>
            </div>
            <div class="detail-item total">
              <span>总计</span>
              <span>￥690</span>
            </div>
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="DialogVisible" class="!ml-0" plain>
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
      <el-button type="warning" @click="addBookApplication">提交预约申请</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.book {
  color: #f9fafb;
}
.pet-type {
  span {
    color: #99908a;
  }
}
.el-radio-button {
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #fff7ed;
  }

  .el-image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
}
.el-form {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 20px;
  .el-form-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
}
.demonstration {
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 1rem;
}
.block {
  text-align: center;
  flex: 1;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.custom-radio {
  position: relative;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #e8630c;
    box-shadow: 0 2px 12px rgba(232, 99, 12, 0.1);
  }

  &.active {
    border-color: #e8630c;
    background-color: #fff7ed;
    box-shadow: 0 2px 12px rgba(232, 99, 12, 0.2);
  }

  .radio-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .radio-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 24px;

    .des {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      p {
        margin: 0;
        padding: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .title {
        font-size: 1rem;
        font-weight: bolder;
        color: #333;
      }
      .service {
        color: #99908a;
        font-size: 0.75rem;
      }
    }
    .price {
      font-size: 1rem;
      font-weight: bolder;
      color: #e8630c;
      flex-shrink: 0;
      white-space: nowrap;
    }
  }
}

.custom-radio::before {
  content: '';
  position: absolute;
  left: 10px;
  width: 16px;
  height: 16px;
  border: 2px solid #dcdfe6;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.3s;
}

.custom-radio::after {
  content: '';
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #e8630c;
  transition: all 0.3s;
}

.custom-radio.active::before {
  border-color: #e8630c;
}

.custom-radio.active::after {
  transform: translate(-50%, -50%) scale(1);
}
.add-service {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-money {
  color: #99908a;
}
.sub-money {
  color: #22c55e;
}
.total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .total-pay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      margin: 0;
    }
    .total-money {
      color: #e8630c;
      font-weight: bolder;
      border-color: #dcdfe6;
    }
    .total-detail {
      color: #99908a;
      font-size: 0.75rem;
      cursor: pointer;
      &:hover {
        color: #e8630c;
      }
    }
  }
}

.detail-content {
  h4 {
    margin: 0 0 15px 0;
    font-size: 1.1rem;
    color: #333;
  }
  .detail-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
      border-bottom: none;
    }
    &.total {
      font-weight: bold;
      font-size: 1.1rem;
      color: #e8630c;
      margin-top: 10px;
      padding-top: 15px;
      border-top: 2px solid #e8630c;
      border-bottom: none;
    }
  }
}
</style>
