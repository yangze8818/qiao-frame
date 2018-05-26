/**
 * Created by Administrator on 2017/7/18.
 */
// 字符串转 Unicode
export function strToUnicode(str) {
  let temp
  let r = ''
  for (let i = 0; i < str.length; i++) {
    temp = str.charCodeAt(i).toString(16)
    while (temp.length < 4) {
      temp = '0' + temp
    }
    r += `\\u${temp}`
  }
  return r
}

// Unicode 转 字符串
export function unicodeToStr(str, f = '\\') {
  if (str === '') return ''
  let strs = str.split(f + 'u')
  let r = ''
  for (let i = 0; i < strs.length; i++) {
    r += String.fromCharCode(parseInt(strs[i], 16).toString(10))
  }
  return r
}
