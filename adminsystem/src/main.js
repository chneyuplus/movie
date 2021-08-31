import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element-ui
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Elementui);
//引入Mock 给vue使用
import mock from 'mockjs'
Vue.use(mock);
//加载mock文件
import './mock/mock'
//引入事件车通信
import emitter from './event/events'
Vue.prototype.$emitter=emitter;

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
