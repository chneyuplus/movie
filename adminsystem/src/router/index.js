import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//引入路由配置
import routes from './routes'
//引入cookiesjs
import Cookies from '../cookies/cookies'

//创建路由
const router = new VueRouter({
  mode: "history",
  routes
})
//接入路由的安全守卫
/*
在进入每个路由之前检测用户的登录状态
如果登录状态正常 继续访问
如果登录状态失效返回登录界面再次登录=>Login
*/
router.beforeEach((to, from, next) => {
  //检测登录状态 _login
  const cookie = Cookies.getCookies();
  if (!cookie['_login']&&to.name!="Login") {
    next('Login');
  }
  else {
    next();
  }
});

export default router
