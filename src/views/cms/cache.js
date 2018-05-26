/**
 * Created by sunlf on 2017/7/21.
 * 封装本地缓存
 */
export default {
  save: function (key, data) {
    sessionStorage.setItem(key, data)
  },
  get: function (key) {
    return sessionStorage.getItem(key)
  },
  clear: function () {
    sessionStorage.clear()
  },
  _saveLocal: function (key, data) {
    localStorage.setItem(key, data)
  },
  _getLocal: function (key) {
    return localStorage.getItem(key)
  },
  _removeLocal: function (key) {
    localStorage.removeItem(key)
  },
  _clearLocal: function () {
    localStorage.clear()
  }
}
