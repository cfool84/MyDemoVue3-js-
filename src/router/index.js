import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/login/LoginView.vue'
import HomeView from '../views/home/HomeView.vue'

// 引入useStore全局状态
import { useStore } from '@/stores/useStore'

// 遍历导入"modules"目录下的路由文件
const modules = import.meta.glob('@/router/modules/**/*.js', { import: 'default', eager: true })
const routerFileList = [];
for (const path1 in modules) {
  if (Array.isArray(modules[path1])) {
    for (const path2 in modules[path1]) {
      routerFileList.push(modules[path1][path2]);
    }
  } 
}

// 创建路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect:'login', // 默认重定向到login
      meta: {
        title:'主页',
        needLogin: false // 表示进入这个路由是否需要登录
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title:'登录',
        needLogin: false // 表示进入这个路由是否需要登录
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        order: 1, // 排序用（一级路由）
        title:'首页',
        needLogin: true // 表示进入这个路由是否需要登录
      },
      children: routerFileList
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to: Route即将要进入的目标路由对象
  // from： Rout当前导航正要离开的路由
  // next: Function 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
  if (to.meta.needLogin) {
    // 可以在组件中的任意位置访问 `store` 变量
    const isLogin = useStore().getSessionToken()
    if (isLogin) { // 判断该路由是否需要登录权限
      next(); // 继续执行
    } else {
      // 转到登录页
      next({
        path: '/login',
      })
    }
  } else {
    next(); // 继续执行
  }
})

export default router