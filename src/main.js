import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'config/axios'
import VueAxios from 'vue-axios'
import Es6Promise from 'es6-promise'
import KalixVueNavigate from 'kalix-vue-navigate'
import KalixVueLib from 'kalix-vue-lib'
import KalixVueBiz from 'kalix-vue-biz'

// import KalixVueAdmin from 'kalix-vue-admin'
import './element-ui'
import Tinymce from './components/Tinymce'
import Squire from './components/squire/Squire'
import SIdentify from './components/identify/identify'
import './views/main/index'
// Vue.use(ElementUI)

Es6Promise.polyfill()
Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(KalixVueLib)
Vue.use(KalixVueBiz)
Vue.use(KalixVueNavigate)

// const router = KalixRouter(Vue)

Vue.component(Squire.name, Squire)
Vue.component(Tinymce.name, Tinymce)
Vue.component(SIdentify.name, SIdentify)
// 全局加载方式

// 异步加载方式
// let moduleArr = []
// Vue.use(KalixVueAdmin)
// moduleArr.push(Vue.prototype.$module)
// Vue.use(KalixVueOA)
// moduleArr.push(Vue.prototype.$module)
// Vue.prototype.$modulePlugins = moduleArr

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
