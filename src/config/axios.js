/**
 * axios 配置文件
 * Created by sunlf on 2017/7/21.
 */
import axios from 'axios'
import Message from 'kalix-vue-lib/src/common/message'
import {baseURL} from 'config/global.toml'
import {LoadingTimeOut} from 'config/info.toml'
import Cache from 'kalix-vue-lib/src/common/cache'
import Router from 'router'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = baseURL

// http请求拦截器
// var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  // loadinginstace = ElementUI.Loading.service({fullscreen: true})

  const accessToken = Cache.get('access_token')
  const userToken = Cache.get('user_token')
  if (accessToken && userToken) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.AccessToken = accessToken
    config.headers.JSESSIONID = userToken
  }
  console.log(`[kalix]-[axios.js] axios interceptor request config is `, config)
  return config
}, error => {
  // loadinginstace.close()
  Message.error({
    message: LoadingTimeOut
  })
  return Promise.reject(error)
})

// 如果不是 火狐浏览器 增加 http响应拦截器
if (navigator.userAgent.indexOf('Firefox') === -1) {
  // http响应拦截器
  axios.interceptors.response.use(res => {
    // 响应成功关闭loading
    // loadinginstace.close()
    console.log(`[kalix]-[axios.js] axios interceptor response data is `, res)
    if (res.data.code === 401) {
      Cache.clear()
      Router.push({path: '/login'})
      return
    }
    return res
  }, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误(400)'
          break
        case 401:
          err.message = '未授权，请重新登录(401)'
          break
        case 403:
          err.message = '拒绝访问(403)'
          break
        case 404:
          err.message = '请求出错(404)'
          break
        case 408:
          err.message = '请求超时(408)'
          break
        case 500:
          err.message = '服务器错误(500)'
          break
        case 501:
          err.message = '服务未实现(501)'
          break
        case 502:
          err.message = '网络错误(502)'
          break
        case 503:
          err.message = '服务不可用(503)'
          break
        case 504:
          err.message = '网络超时(504)'
          break
        case 505:
          err.message = 'HTTP版本不受支持(505)'
          break
        default:
          err.message = `连接出错(${err.response.status})!`
      }
    } else {
      err.message = '连接服务器失败!'
    }
    Message.error(err.message)
    // loadinginstace.close()
    // Message.error({
    //   message: LoadingFailure
    // })
    return Promise.reject(err)
  })
}
export default axios
