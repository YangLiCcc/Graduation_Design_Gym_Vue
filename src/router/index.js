import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserIndex from '@views/user/Index.vue'
import ManageIndex from '@views/manage/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'UserIndex',
    component: UserIndex
  },
  {
    path: '/manage',
    name: 'ManageIndex',
    meta: {
      title: '管理系统'
    },
    component: ManageIndex,
    children: [
      {
        path: 'personal',
        name: 'PersonalCenter',
        meta: {
          title: '个人中心'
        },
        component: () => import('@views/user/PersonalCenter.vue')
      },
      {
        path: 'user',
        name: 'User',
        meta: {
          title: '用户管理'
        },
        component: () => import('@views/manage/User.vue')
      },
      {
        path: 'instrument',
        name: 'InstrumentTest',
        meta: {
          title: '储物柜管理'
        },
        component: () => import('@views/manage/InstrumentTest.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
