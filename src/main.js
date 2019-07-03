import Vue from 'vue';
import App from './App.vue';
// 引入路由模块
import VueRouter from 'vue-router';
// 引入index组件
import index from './components/index.vue';
import goodsInfo from './components/goodsInfo.vue';
// 导入 axios模块 目的是让所有组件都可以使用
import axios from "axios";
import ElementUI from 'element-ui';
// 导入css
// import "element-ui/lib/theme-chalk/index.css";

// 导入iview 框架
// 导入iViewUI框架
// import iView from "iview";
// import "iview/dist/styles/iview.css";
// 正常的服务器
axios.defaults.baseURL = "http://47.106.148.205:8899";
// 设置带上cookie
axios.defaults.withCredentials = true
// 崩溃后的备用服务器
// axios.defaults.baseURL = 'http://127.0.0.1:8848';
// 挂载到Vue的原型上->Vue实例化出来的对象 共用 vue-resource this.$http
Vue.prototype.axios = axios;
// 使用路由中间件
Vue.use(VueRouter);
Vue.use(ElementUI);
// Vue.use(iView);
// 注册路由规则
const router = new VueRouter({
  routes:[
    {
      path:'/',
      component:index
    },
    {
      path:'/index',
      component:index
    },
    {
      path:'/goodsInfo',
      component:goodsInfo
    },
  ]
})

// 引入css
import './assets/statics/site/css/style.css';

Vue.config.productionTip = false

new Vue({
  // 选择器
  el:"#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App)
})
