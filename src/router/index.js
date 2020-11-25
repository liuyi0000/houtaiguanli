import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/home/home.vue'
import ComponyInfoManage from '../views/componyinfomanage/index.vue'
const PostInfoManage = () => import('@/views/postinfomange/index.vue')
const OrderInfoManage = () => import('@/views/orderinfomange/index.vue')
const PostType = () => import('@/views/datamangeinfo/index.vue')
const Test = () => import('@/views/test/index')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        { path: '/', redirect: '/componyinfomanage' },
        {
          path: '/componyinfomanage',
          name: '企业信息',
          component: ComponyInfoManage,
        },
        {
          path: '/postinfomange',
          name: '岗位信息',
          component: PostInfoManage,
        },
        {
          path: '/orderinfomange',
          name: '订单信息',
          component: OrderInfoManage,
        },
        {
          path: '/datamangeinfo',
          name: '订单信息',
          component: PostType,
        },
        {
          path: '/test',
          name: '测试',
          component: Test,
        },
      ]
    }
  ]
})
