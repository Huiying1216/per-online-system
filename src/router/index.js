import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/userLayout',
      component: () => import('@/views/layout/userLayout.vue'),
      redirect: '/user/userWork',
      children: [
        { path: 'userWork', component: () => import('@/views/user/userWork.vue') },
        { path: 'userPet', component: () => import('@/views/user/userPet.vue') },
        { path: 'userFavorite', component: () => import('@/views/user/userFavorite.vue') },
        { path: 'userMain', component: () => import('@/views/user/userMain.vue') },
        { path: 'userOrder', component: () => import('@/views/user/userOrder.vue') },
        { path: 'userSearch', component: () => import('@/views/user/userSearch.vue') },
      ],
    },
    {
      path: '/merchantLayout',
      component: () => import('@/views/layout/merchantLayout.vue'),
      redirect: '/merchant/merchantWork',
      children: [
        {
          path: '/merchant/merchantWork',
          component: () => import('@/views/merchant/merchantWork.vue'),
        },
        {
          path: '/merchant/merchanRecord',
          component: () => import('@/views/merchant/merchanRecord.vue'),
        },
        {
          path: '/merchant/merchantFinance',
          component: () => import('@/views/merchant/merchantFinance.vue'),
        },
        {
          path: '/merchant/merchantService',
          component: () => import('@/views/merchant/merchantService.vue'),
        },
        {
          path: '/merchant/merchantOrder',
          component: () => import('@/views/merchant/merchantOrder.vue'),
        },
      ],
    },
    {
      path: '/adminLayout',
      component: () => import('@/views/layout/adminLayout.vue'),
      redirect: '/admin/adminWork',
      children: [
        { path: '/admin/adminWork', component: () => import('@/views/admin/adminWork.vue') },
      ],
    },
  ],
})

export default router
