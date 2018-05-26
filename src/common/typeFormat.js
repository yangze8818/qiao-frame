/**
 * 2017-9-12 桑杨
 * 格式化日期类型
 * @param date  datetime 对象
 * @param fmt   格式
 * @return {*}  格式化后的字符串
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

/**
 * 2017-9-12 桑杨
 * 时间左侧补零
 * @param str 时间
 * @return {string} 补零后字符串
 */
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// GMT转普通格式
export function GMTToStr(time) {
  let date = new Date(time)
  let Str = date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' +
    date.getDate() + ' ' +
    date.getHours() + ':' +
    date.getMinutes() + ':' +
    date.getSeconds()
  return Str
}
