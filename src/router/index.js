import { createRouter, createWebHistory } from 'vue-router'
//import { useUserStore } from '@/stores'

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
      children: [{ path: 'adminWork', component: () => import('@/views/admin/adminWork.vue') }],
    },
  ],
})

//登录访问拦截
/**router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
})*/

export default router
