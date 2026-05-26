<script setup>
import { Shop, EditPen } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const checkEnterAgree = ref(false)

const merchantResgist = ref({
  merchantShop: '',
  merchantName: '',
  merchantPhone: '',
  merchantLicense: '',
  merchantAddress: '',
  merchantPassword: '',
  confirmPassword: '',
})
const rules = {
  merchantShop: [
    { required: true, message: '请输入商家名称', trigger: 'blur' },
    { min: 4, max: 15, message: '商家名称长度必须在4到15个字符之间', trigger: 'blur' },
  ],
  merchantName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
  merchantPhone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  merchantLicense: [
    { required: true, message: '请输入上传营业执照注册号', trigger: 'blur' },
    { min: 15, max: 18, message: '营业执照注册号长度必须在15到18个字符之间', trigger: 'blur' },
  ],
  merchantAddress: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
  merchantPassword: [
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
        if (value !== merchantResgist.value.merchantPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}
const form = ref(null)
const checkedAgree = ref(true)
const cancle = () => {
  router.push('/login')
}
const toRegister = async () => {
  await form.value.validate()
  //调用接口
  if (!checkedAgree.value) {
    ElMessage.error('请先同意用户协议和隐私政策')
    return
  } else {
    ElMessage.success('注册成功')
  }

  router.push('/login')
}
</script>
<template>
  <div class="register-page">
    <div class="content">
      <div class="register-left">
        <div class="left-content">
          <el-icon color="#e8630c" size="48"><Shop /></el-icon>
          <h2>开启您的寄养事业</h2>
          <div class="icon-side">
            <div class="register-item">
              <el-icon color="#25c661"><EditPen /></el-icon>
              <span>专业订单管理系统</span>
            </div>
            <div class="register-item">
              <el-icon color="#25c661"><EditPen /></el-icon>
              <span>触达精准宠物主</span>
            </div>
            <div class="register-item">
              <el-icon color="#25c661"><EditPen /></el-icon>
              <span>资金结算安全快捷</span>
            </div>
          </div>
        </div>
      </div>
      <div class="register-right">
        <div class="right-content">
          <h1>商家入驻申请</h1>
          <p>请填写以下信息，我们将在2个工作日内完成审核。</p>
          <el-form :model="merchantResgist" :rules="rules" ref="form">
            <el-form-item label="商家名称" prop="merchantShop" label-position="top">
              <el-input v-model="merchantResgist.merchantShop" placeholder="如：阳光宠物寄养中心">
              </el-input>
            </el-form-item>
            <el-row>
              <el-col :span="10">
                <el-form-item label="联系人姓名" prop="merchantName" label-position="top">
                  <el-input v-model="merchantResgist.merchantName" placeholder="请输入姓名">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="联系电话" prop="merchantPhone" label-position="top">
                  <el-input v-model="merchantResgist.merchantPhone" placeholder="请输入电话号码">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="营业执照注册号" prop="merchantLicense" label-position="top">
              <el-input
                v-model="merchantResgist.merchantLicense"
                placeholder="15位或18位统一社会信用代码"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="merchantAddress" label-position="top">
              <el-input v-model="merchantResgist.merchantAddress" placeholder="请输入详细地址">
              </el-input>
            </el-form-item>
            <el-row>
              <el-col :span="11">
                <el-form-item label="密码" prop="merchantPassword" label-position="top">
                  <el-input v-model="merchantResgist.merchantPassword" placeholder="请输入密码">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="确认密码" prop="confirmPassword" label-position="top">
                  <el-input v-model="merchantResgist.confirmPassword" placeholder="请确认密码">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="mer-choice">
              <el-checkbox v-model="checkedAgree" />
              &nbsp;我已阅读并同意
              <el-link type="warning" underline="hover" @click="checkEnterAgree = true"
                >《商家入驻服务协议》</el-link
              >，我保证所提供的信息真实有效。
            </el-form-item>
            <el-dialog
              v-model="checkEnterAgree"
              title="商家入驻服务协议"
              width="500"
              center
              class="agree-dialog"
            >
              <span>
                <div style="padding: 16px; font-size: 14px">
                  <p style="text-align: left">生效日期：2026年05月26日</p>

                  <p>
                    凡提交入驻申请、完成平台审核并开通服务的寄养师/商家，均视为自愿阅读、理解并同意本入驻协议全部内容，自愿遵守平台各项运营规则与管理制度。
                  </p>

                  <p><strong>一、入驻资质要求</strong></p>
                  <p>
                    1. 入驻商家必须年满18周岁，具备完全民事行为能力。<br />
                    2. 提交的身份证、居住环境、场地照片等资料必须真实有效。<br />
                    3. 寄养场地需干净、安全、通风、无重大安全隐患，适合宠物寄养。<br />
                    4. 严禁伪造资料、虚假入驻，一经发现直接驳回入驻并永久封禁。
                  </p>

                  <p><strong>二、入驻服务规范</strong></p>
                  <p>
                    1. 入驻商家需严格按照订单承诺提供喂养、换水、清洁、陪伴、日常观察等寄养服务。<br />
                    2. 严禁虐待、体罚、恐吓、遗弃、私自转送、转卖寄养宠物。<br />
                    3. 宠物出现生病、受伤、应激等异常情况，需第一时间联系宠主并及时处理。<br />
                    4. 严禁临时加价、强制消费、恶意拒单、消极服务。<br />
                    5. 严禁引导用户线下私下交易。
                  </p>

                  <p><strong>三、平台权责</strong></p>
                  <p>
                    平台为入驻商家提供展示、订单分发、用户匹配、交易托管、售后调解服务。平台拥有资料审核、服务监管、纠纷判定、违规处罚的管理权利。
                  </p>

                  <p><strong>四、佣金与结算规则</strong></p>
                  <p>
                    平台按照统一规则收取平台服务佣金，资金由平台托管。订单完成且无售后纠纷后，商家可正常提现收益。若存在赔付、扣款、违规罚款，平台可优先从收益中抵扣。
                  </p>

                  <p><strong>五、责任赔付规则</strong></p>
                  <p>
                    因商家看护不当、环境不达标、人为过失导致宠物受伤、感染、丢失、死亡的，由商家承担全部赔偿责任。因宠物自身疾病、应激、自残、打架等自身原因造成意外的，商家无需承担责任。
                  </p>

                  <p><strong>六、违规处罚机制</strong></p>
                  <p>
                    商家存在资料造假、虐待宠物、恶意接单、私下交易、刷单套券、多次投诉、爽约拒单等违规行为，平台有权进行警告、限制接单、扣除保证金、下架店铺、永久清退等处罚。
                  </p>

                  <p><strong>七、解约与退出规则</strong></p>
                  <p>
                    商家可正常申请关店、退出入驻，结清所有订单和售后纠纷即可。严重违规商家，平台有权单方面终止入驻资格。
                  </p>

                  <p><strong>八、协议生效与更新</strong></p>
                  <p>
                    本协议自商家入驻审核通过之日起生效，平台可根据运营需要更新协议，公示后生效。
                  </p>

                  <p style="text-align: center; margin-top: 30px; color: #999">
                    萌宠寄养平台 最终解释权所有
                  </p>
                </div>
              </span>
            </el-dialog>
            <el-form-item class="btn-row">
              <el-button class="close" @click="cancle">取消</el-button>
              <el-button class="submit" @click="toRegister">提交入驻申请</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.register-page {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #fffbf8;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans SC', sans-serif;
  .content {
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    display: flex;
    width: 800px;
    justify-content: center;
    align-items: stretch;
  }
  .register-left {
    background-color: #fff7ed;
    flex: 3;
    margin: 0 auto;
    display: flex;
    .left-content {
      padding: 40px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h2 {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .icon-side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .register-item {
          display: block;
          justify-content: center;
          margin-bottom: 20px;
          color: #4b5563;
        }
      }
    }
  }
  .register-right {
    background-color: white;
    flex: 7;
    display: flex;
    .right-content {
      padding: 40px;
      width: 100%;
      height: 100%;
      h1 {
        font-size: 1.5rem;
      }
      p {
        color: #4b5563;
      }
      .mer-choice {
        font-size: 1rem;
        color: #4b5563;
      }
    }
  }
}
.btn-row {
  display: flex;
  .close {
    width: 100%;
    flex: 3;
    &:hover {
      color: #e8630c;
      background-color: #f1ddaa;
    }
  }
  .submit {
    width: 100%;
    flex: 7;
    background-color: #e8630c;
    color: #fff;
    &:hover {
      background-color: #f53206;
    }
  }
}
</style>
