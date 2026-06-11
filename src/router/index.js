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

  // 白名单：无需登录就能访问
  const whiteList = ['/login', '/UserResgister', '/merchantResgister']

  // 1. 白名单页面
  if (whiteList.includes(to.path)) {
    // 已登录还进登录页，直接跳用户首页
    if (userStore.token && to.path === '/login') {
      ElMessage.warning('您已登录，无需重复登录')
      return next('/user/userWork')
    }
    // 登录/注册页直接放行
    return next()
  }

  // 2. 非白名单页面，校验token
  if (!userStore.token) {
    ElMessage.error('请先登录')
    return next('/login')
  }

  // 有token直接放行
  next()
})

export default router
