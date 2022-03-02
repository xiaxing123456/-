import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import MeInfo from '@/views/main/MeInfo.vue'
import UserManage from '@/views/main/UserManage.vue'
import ArticleManage from '@/views/main/ArticleManage.vue'
import Publish from '@/views/main/Publish.vue'
import ClassManange from '@/views/main/ClassManage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    redirect:'/meinfo',
    children:[
      {
        path:'/meinfo',
        component:MeInfo,
      },
      {
        path:'/userManage',
        component:UserManage
      },
      {
        path:'/articleManage',
        component:ArticleManage
      },
      {
        path:'/articlePublish',
        component:Publish
      },
      {
        path:'/classManage',
        component:ClassManange 
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next) =>{
  if(to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login');
  next();
})

export default router
