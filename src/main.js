import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();   //将vue的事件总线挂载一个vue实例的初始值

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
