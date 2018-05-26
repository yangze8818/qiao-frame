/**
 * Created by sunlf on 2017/7/21.
 * 登录api
 */
import Vue from 'vue'
import {loginUrl} from 'config/global.toml'

export default {
  /**
   * 登录函数
   * @param _data 传递的登录数据
   * @returns {Promise.<TResult>|*}
   */
  remoteLogin(_data) {
    console.log(`remote address is ${loginUrl}`)
    return Vue.axios.request({
      method: 'POST',
      url: loginUrl,
      transformRequest: [(data) => {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: _data
    }).then((res) => {
      console.log('[kalix]-[login.js] remoteLogin function return data is: ', res.data)
      return Promise.resolve(res.data)
    })
  }
}
