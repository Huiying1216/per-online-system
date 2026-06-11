import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetService } from '@/api/user'

/**
 * 用户模块
 */
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userId = ref('')
    const setToken = (newToken, newUserId) => {
      token.value = newToken
      userId.value = newUserId
    }
    const removeToken = () => {
      token.value = ''
      userId.value = ''
      user.value = {}
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userGetService(userId.value)
      user.value = res.data.data
    }

    // const liveCount = ref(0)
    // const getLiveCount = async () => {
    //   const liveCount = await userOrderLiveService()
    //   liveCount.value = liveCount.data.data
    // }
    return {
      token,
      userId,
      getUser,
      user,
      setToken,
      removeToken,
      // liveCount,
      // getLiveCount,
    }
  },
  {
    persist: true,
  },
)
