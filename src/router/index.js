import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/login/loginPage.vue'),
    },
    {
      path: '/UserResgister',
      component: () => import('@/views/login/UserResgister.vue'),
    },
    {
      path: '/merchantResgister',
      component: () => import('@/views/login/merchantResgister.vue'),
    },
    {
      path: '/user',
      component: () => import('@/views/layout/userLayout.vue'),
      redirect: '/user/userWork',
      children: [
        { path: 'userWork', component: () => import('@/views/user/userWork.vue') },
        { path: 'userPet', component: () => import('@/views/user/userPet.vue') },
        { path: 'userFavorite', component: () => import('@/views/user/userFavorite.vue') },
        { path: 'userMain', component: () => import('@/views/user/userMain.vue') },
        { path: 'userOrder', component: () => import('@/views/user/userOrder.vue') },
        { path: 'userOrderDetail', component: () => import('@/views/user/userOrderDetail.vue') },
        { path: 'userSearch', component: () => import('@/views/user/userSearch.vue') },
      ],
    },
    {
      path: '/merchant',
      component: () => import('@/views/layout/merchantLayout.vue'),
      redirect: '/merchant/merchantWork',
      children: [
        {
          path: 'merchantWork',
          component: () => import('@/views/merchant/merchantWork.vue'),
        },
        {
          path: 'merchantRecord',
          component: () => import('@/views/merchant/merchanRecord.vue'),
        },
        {
          path: 'merchantService',
          component: () => import('@/views/merchant/merchantService.vue'),
        },
        {
          path: 'merchantOrder',
          component: () => import('@/views/merchant/merchantOrder.vue'),
        },
        {
          path: 'merchantMain',
          component: () => import('@/views/merchant/merchantMain.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/views/layout/adminLayout.vue'),
      redirect: '/admin/adminWork',
      children: [
        { path: 'adminWork', component: () => import('@/views/admin/adminWork.vue') },
        { path: 'adminManage', component: () => import('@/views/admin/adminManage.vue') },
        { path: 'adminReview', component: () => import('@/views/admin/adminReview.vue') },
      ],
    },
  ],
})

// 路由访问拦截
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 定义不需要登录的白名单路径
  const whiteList = ['/login', '/UserResgister', '/merchantResgister']

  // 判断是否在白名单中
  if (whiteList.includes(to.path)) {
    // 如果已登录，访问登录页则重定向到首页
    if (userStore.token && to.path === '/login') {
      ElMessage.warning('您已登录，无需重复登录')
      // 根据用户角色重定向到对应首页
      const roleMap = {
        user: '/user/userWork',
        merchant: '/merchant/merchantWork',
        admin: '/admin/adminWork',
      }
      return next(roleMap[userStore.role] || '/user/userWork')
    }
    return next()
  }

  // 不在白名单中，需要验证登录状态
  if (!userStore.token) {
    ElMessage.error('请先登录')
    return next('/login')
  }

  // 已登录，可以访问
  return next()
})

export default router
