import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Init',
      component: () => import('@/views/Init')
    },
    {
      path: '/rong_cloud',
      name: 'RongCloud',
      component: () => import('@/views/RongCloud')
    }
  ]
})
