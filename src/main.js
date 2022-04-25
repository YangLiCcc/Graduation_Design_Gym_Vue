import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// axios
import axios from 'axios'
// axios配置文件
import '@utils/request.js'
// 全局样式文件
import '@/assets/style/global.scss'
// iconfont样式文件
import '@/assets/style/icons/icon.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
