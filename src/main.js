import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad  from 'vue-lazyload';
import totast from 'components/common/totast';


import fastclick from 'fastclick';

 fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(totast);    //使用自己封装的totast插件
Vue.use(VueLazyLoad);    //使用VueLazyLoad懒加载插件

Vue.prototype.$bus = new Vue();   //将vue的事件总线挂载一个vue实例的初始值

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
