import Vue from 'vue'

const _import = require('./_import_' + process.env.NODE_ENV)
/***
 * 注册全局组件
 * @param compList 组件列表
 */
const registerComponent = function (compList) {
  compList.forEach((item) => {
    console.log('[kalix]-[system] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, _import(item.path))
  })
}
export {registerComponent}
