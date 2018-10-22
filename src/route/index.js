/**
 * 终止对外暴露的文件
 */
import Vue from 'vue'
import Router from 'vue-router'
import RouterList from './router'

Vue.use(Router)
const router = new Router({
  routes: RouterList
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
