<script setup>
import { ref } from 'vue'
import bookForm from './bookForm.vue'
import { Star, Location, Phone, Clock, Coffee } from '@element-plus/icons-vue'
import { defineProps } from 'vue'

const drawer = ref(false)
const innerDrawer = ref(false)

// 接收父组件传递的 item
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const merchantInfo = [
  {
    id: 1,
    name: '萌宠之家旗舰店',
    score: '4.9',
    reviewCount: '120+',
    address: '广东省广州市天河区 112 号',
    phone: '020-12345678',
    businessHours: '09:00 - 21:00',
    features: ['超大空间', '洗浴服务', '24h 监控', '专业护理', '每日遛狗'],
    description:
      '萌宠之家旗舰店是一家专业的宠物寄养服务机构，拥有超过 500 平方米的超大活动空间，配备专业的洗浴设备和护理团队。我们致力于为每一只宠物提供家一般的温暖照顾，让您的爱宠在您外出期间也能享受舒适快乐的生活。',
    price: '128',
  },
  {
    id: 2,
    name: '阳光托宠',
    score: '4.8',
    reviewCount: '98+',
    address: '广东省深圳市南山区科技园 88 号',
    phone: '0755-87654321',
    businessHours: '08:30 - 22:00',
    features: ['独立房间', '24h 看护', '营养配餐', '实时视频', '上门接送'],
    description:
      '爱心宠物庄园专注高端寄养，环境安静舒适，提供一对一贴心照顾，每日消毒，科学喂养，是宠物出行的安心之选。',
    price: '158',
  },
  {
    id: 3,
    name: '淋雨洲之家',
    score: '4.7',
    reviewCount: '156+',
    address: '广东省佛山市禅城区祖庙路 23 号',
    phone: '0757-11223344',
    businessHours: '10:00 - 20:00',
    features: ['室内恒温', '专业美容', '健康监测', '玩具齐全', '定时喂食'],
    description:
      '小宠乐园寄养中心主打温馨陪伴式寄养，团队均为资深宠物护理师，细心照料每一位毛孩子，让家长放心托管。',
    price: '98',
  },
  {
    id: 4,
    name: '宠伴之家高端寄养',
    score: '5.0',
    reviewCount: '230+',
    address: '广东省东莞市东城街道新世纪大厦 45 号',
    phone: '0769-55667788',
    businessHours: '09:30 - 21:30',
    features: ['24h 监控', '豪华单间', '每日遛宠', '健康体检', '专属客服'],
    description:
      '宠伴之家专注高端宠物寄养服务，提供一对一专属照顾，全程实时监控可看，每日健康反馈，让宠物享受星级待遇。',
    price: '188',
  },
]

const currentMerchant = ref(null)
const lookMerchantDetail = () => {
  // 根据传入的 item.id 查找对应的商家详情
  const merchant = merchantInfo.find((m) => m.id === props.item.id)
  currentMerchant.value = merchant || merchantInfo[0]
  drawer.value = true
}

// 评论相关数据
const commentList = ref([
  {
    id: 1,
    userName: '张先生',
    userAvatar: '',
    score: 5,
    content:
      '非常满意！店家环境很好，工作人员也很专业，把我的狗狗照顾得很好。每天都会发照片和视频，让我很放心。下次还会选择这里！',
    date: '2024-01-15',
  },
  {
    id: 2,
    userName: '李女士',
    userAvatar: '',
    score: 5,
    content:
      '第二次来寄养了，猫咪很喜欢这里的环境。寄养期间还能享受洗浴服务，性价比很高！推荐给大家～',

    date: '2024-01-10',
  },
  {
    id: 3,
    userName: '王先生',
    userAvatar: '',
    score: 4,
    content: '整体不错，空间挺大的，狗狗玩得很开心。就是价格稍微有点贵，希望能多一些优惠活动。',
    date: '2024-01-05',
  },
])
</script>

<template>
  <el-button type="warning" @click="lookMerchantDetail"> 查看详情 </el-button>
  <el-drawer v-model="drawer" direction="rtl" size="50%">
    <div v-if="currentMerchant">
      <div class="desc-introduction">
        <div class="merchant-header">
          <h2 class="merchant-name">{{ currentMerchant.name }}</h2>
          <div class="merchant-score">
            <el-icon class="star-icon"><Star /></el-icon>
            <span class="score">{{ currentMerchant.score }}</span>
            <span class="review-count">({{ currentMerchant.reviewCount }}评价)</span>
          </div>
        </div>

        <div class="info-list">
          <div class="info-item">
            <el-icon class="info-icon"><Location /></el-icon>
            <span class="info-label">地址：</span>
            <span class="info-content">{{ currentMerchant.address }}</span>
          </div>
          <div class="info-item">
            <el-icon class="info-icon"><Phone /></el-icon>
            <span class="info-label">电话：</span>
            <span class="info-content">{{ currentMerchant.phone }}</span>
          </div>
          <div class="info-item">
            <el-icon class="info-icon"><Clock /></el-icon>
            <span class="info-label">营业时间：</span>
            <span class="info-content">{{ currentMerchant.businessHours }}</span>
          </div>
        </div>

        <div class="merchant-features">
          <h3 class="feature-title">
            <el-icon><Coffee /></el-icon>
            特色服务
          </h3>
          <div class="feature-tags">
            <el-tag
              v-for="feature in currentMerchant.features"
              :key="feature"
              type="warning"
              effect="plain"
              class="feature-tag"
            >
              {{ feature }}
            </el-tag>
          </div>
        </div>

        <div class="merchant-description">
          <h3 class="desc-title">商家介绍</h3>
          <p class="desc-content">{{ currentMerchant.description }}</p>
        </div>

        <div class="price-info">
          <span class="price-label">寄养价格：</span>
          <span class="price-value">￥{{ currentMerchant.price }}</span>
          <span class="price-unit">/天起</span>
        </div>
      </div>
      <div class="click-book">
        <el-button type="warning" @click="innerDrawer = true">点击预定</el-button>
      </div>

      <!-- 评论区域 -->
      <div class="review-section">
        <div class="review-header">
          <h3 class="review-title">用户评价</h3>
          <span class="review-count">({{ commentList.length }}条评价)</span>
        </div>

        <!-- 评论列表 -->
        <div class="comment-list">
          <div v-for="comment in commentList" :key="comment.id" class="comment-item">
            <div class="comment-user">
              <el-avatar :size="40" class="user-avatar">
                {{ comment.userName.charAt(0) }}
              </el-avatar>
              <div class="user-info">
                <div class="user-name">{{ comment.userName }}</div>
                <div class="comment-date">{{ comment.date }}</div>
              </div>
            </div>

            <div class="comment-content">
              <div class="comment-score">
                <el-rate
                  :model-value="comment.score"
                  disabled
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                />
              </div>
              <p class="comment-text">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <el-drawer v-model="innerDrawer" title="支付界面" :append-to-body="true">
        <bookForm></bookForm>
      </el-drawer>
    </div>
  </el-drawer>
</template>

<style lang="less" scoped>
.desc-introduction {
  padding: 20px;

  .merchant-header {
    margin-bottom: 20px;

    .merchant-name {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 10px;
    }

    .merchant-score {
      display: flex;
      align-items: center;

      .star-icon {
        color: #e86510;
        font-size: 1.2rem;
        margin-right: 5px;
      }

      .score {
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
        margin-right: 8px;
      }

      .review-count {
        color: #999;
        font-size: 0.9rem;
      }
    }
  }

  .info-list {
    margin-bottom: 20px;

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .info-icon {
        color: #e96713;
        font-size: 1.1rem;
        margin-right: 8px;
      }

      .info-label {
        color: #666;
        font-weight: 500;
      }

      .info-content {
        color: #333;
        flex: 1;
      }
    }
  }

  .merchant-features {
    margin-bottom: 20px;

    .feature-title {
      display: flex;
      align-items: center;
      margin: 0 0 12px 0;
      font-size: 1.1rem;
      color: #333;

      .el-icon {
        margin-right: 8px;
        color: #e96713;
      }
    }

    .feature-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .feature-tag {
        margin: 0;
      }
    }
  }

  .merchant-description {
    margin-bottom: 20px;

    .desc-title {
      margin: 0 0 12px 0;
      font-size: 1.1rem;
      color: #333;
    }

    .desc-content {
      margin: 0;
      line-height: 1.8;
      color: #666;
      text-align: justify;
    }
  }

  .price-info {
    display: flex;
    align-items: baseline;
    padding: 15px 0;
    border-top: 1px solid #eee;

    .price-label {
      color: #666;
      font-size: 1rem;
    }

    .price-value {
      font-size: 1.8rem;
      color: #e96713;
      font-weight: bold;
    }

    .price-unit {
      color: #999;
      font-size: 0.9rem;
      margin-left: 5px;
    }
  }
}

// 评论区域样式
.review-section {
  padding: 20px;
  border-top: 1px solid #eee;

  .review-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .review-title {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
      font-weight: bold;
    }

    .review-count {
      margin-left: 10px;
      color: #999;
      font-size: 0.9rem;
    }
  }

  // 发表评论表单
  .comment-form {
    background-color: #f5f7fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;

    .form-title {
      font-size: 1rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
    }
  }

  // 评论列表
  .comment-list {
    .comment-item {
      padding: 20px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .comment-user {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        .user-avatar {
          background-color: #e8630c;
          margin-right: 12px;
        }

        .user-info {
          .user-name {
            font-size: 0.95rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 4px;
          }

          .comment-date {
            font-size: 0.8rem;
            color: #999;
          }
        }
      }

      .comment-content {
        .comment-score {
          margin-bottom: 10px;
        }

        .comment-text {
          margin: 0 0 12px 0;
          line-height: 1.6;
          color: #333;
          font-size: 0.95rem;
        }

        .comment-images {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;

          .comment-image {
            width: 100px;
            height: 100px;
            border-radius: 6px;
            cursor: pointer;
            transition: transform 0.3s;

            &:hover {
              transform: scale(1.05);
            }
          }
        }

        // 商家回复
        .merchant-reply {
          background-color: #f5f7fa;
          padding: 12px 15px;
          border-radius: 6px;
          margin-top: 12px;

          .reply-label {
            font-size: 0.85rem;
            color: #e8630c;
            font-weight: bold;
            margin-bottom: 6px;
          }

          .reply-content {
            font-size: 0.9rem;
            color: #666;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

.click-book {
  padding: 20px;
  border-top: 1px solid #eee;
  text-align: center;
}
</style>
