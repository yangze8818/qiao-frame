/**
 * Created by sunlf on 2017/7/21.
 * 封装本地缓存
 */
export default {
  save(key, data) {
    sessionStorage.setItem(key, data)
  },
  get(key) {
    return sessionStorage.getItem(key)
  },
  clear() {
    sessionStorage.clear()
  },
  _saveLocal(key, data) {
    localStorage.setItem(key, data)
  },
  _getLocal(key) {
    return localStorage.getItem(key)
  },
  _removeLocal(key) {
    localStorage.removeItem(key)
  },
  _clearLocal() {
    localStorage.clear()
  }
}
