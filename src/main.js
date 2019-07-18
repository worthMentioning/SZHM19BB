import Vue from 'vue';
import App from './App.vue';
// 引入路由模块
import VueRouter from 'vue-router';
// 引入index组件
import index from './components/index.vue';
import goodsInfo from './components/goodsInfo.vue';
import buyCar from './components/buyCar.vue';
import VueLazyload from 'vue-lazyload'
// 导入 axios模块 目的是让所有组件都可以使用
import axios from "axios";
import ElementUI from 'element-ui';
// 导入css
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
import ProductZoomer from 'vue-product-zoomer'

import iView from "iview";
import "iview/dist/styles/iview.css";
import Vuex from 'vuex';
// 正常的服务器
axios.defaults.baseURL = "http://47.106.148.205:8899";
// 设置带上cookie
axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'http://127.0.0.1:8848';
// 挂载到Vue的原型上->Vue实例化出来的对象 共用 vue-resource this.$http
Vue.prototype.axios = axios;
// 使用路由中间件
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(VueLazyload);
Vue.use(ProductZoomer);
Vue.use(Vuex);
// 使用懒加载中间件
Vue.use(VueLazyload, {
  // 图片当做资源来引入
  loading: require("./assets/statics/img/loading2.gif")
});
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
      path:'/goodsInfo/:id',
      component:goodsInfo
    },
    {
      path:'/buyCar',
      component:buyCar
    },
  ]
})

// 引入css
import './assets/statics/site/css/style.css';
let buyList = JSON.parse(window.localStorage.getItem('buyList')) || {};
const store = new Vuex.Store({
  state: {
    // count: 0
    buyList
  },
  getters: {
    totalCount(state) {
      let num = 0;
      // 遍历对象
      for (const key in state.buyList) {
        // 累加总数
        num += parseInt(state.buyList[key]);
      }
      return num;
    }
  },
  mutations: {
    // info->{goodId:xx,goodNum:xxx}
    buyGood(state, info) {
      if (state.buyList[info.goodId]) {
        // 解决字符串累加问题
        let oldNum = parseInt(state.buyList[info.goodId]);
        oldNum += parseInt(info.goodNum);
        // 重新赋值
        state.buyList[info.goodId] = oldNum;
      } else {
        // 需要使用 Vue.set(obj, 'newProp', 123) 替代
        Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
      }
    }
  }
})
//注册全局过滤器
Vue.filter (
  "cutTime",function(value){
    return moment(value).format("YYYY年MM月DD日")
  }
)
Vue.config.productionTip = false

new Vue({
  // 选择器
  el:"#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App),
  store
})
window.onbeforeunload = function (){
  window.localStorage.setItem('buyList',JSON.stringify(store.state.buyList));
}