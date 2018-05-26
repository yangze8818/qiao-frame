/**
 * 2017-8-16 桑杨
 * 检测 obj 是否是空对象
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
  for (var key in obj) {
    return false
  }
  return true
}

/**
 * 2017-9-6 桑杨
 * 合并对象数组
 * @param newArr 追加数组
 * @param oldArr 原始数组
 * @returns {Array} 合并后的数组
 */
export function concatArrayObject(newArr, oldArr) {
  let retArr = []
  let arr1 = oldArr
  let arr2 = newArr
  if (!arr1 || !arr1.length) {
    arr1 = []
  }
  if (!arr2 || !arr2.length) {
    arr2 = []
  }
  arr1 = getNewObject(arr1)
  arr2 = getNewObject(arr2)
  arr1.forEach((e, i) => {
    let j = -1
    let item = arr2.find((e2, i2) => {
      j = i2
      return e.id === e2.id
    })
    if (item) {
      arr2[j] = Object.assign(e, item)
    } else {
      retArr.push(e)
    }
  })
  arr2.forEach(e => {
    retArr.push(e)
  })
  return retArr
}

/**
 * 2017-9-6 桑杨
 * 合并对象
 * @param newObj 新对象
 * @param oldObj 原对象
 * @returns {*} 合并后的对象
 */
export function concatObject(newObj, oldObj) {
  if (!isEmptyObject(newObj)) {
    oldObj = Object.assign(newObj, oldObj)
  }
  return oldObj
}

/**
 * 2017-9-7 桑杨
 * 获取一个全新的对象
 * @param obj
 * @returns {*} 全新的对象
 */
export function getNewObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}
