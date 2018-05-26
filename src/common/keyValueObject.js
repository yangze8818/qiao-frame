import Cache from 'common/cache'
import {isEmptyObject} from 'common/util'

/***
 * 描述：获取 对应 _DictKey 的键值对对象
 * 开发人：桑杨
 * 开发日期：2017年8月25日
 * @param _DictKey  缓存 Cache Key
 * @param _value  对象"键"对应的列名
 * @param _label  对象"值"对应的列名
 * @returns {*}
 */
export function CacheKeyObject(_DictKey, _value, _label) {
  let dataDictKey = JSON.parse(Cache.get(_DictKey))
  return this.KeyValueObject(dataDictKey, _value, _label)
}

/***
 * 描述：获取 对应 _DictKey 的键值对对象
 * 开发人：sunlf
 * 开发日期：2017年8月25日
 * @param _objects  对象数组
 * @param _value  对象"键"对应的列名
 * @param _label  对象"值"对应的列名
 * @returns {*}
 */
export function KeyValueObject(_objects, _value, _label) {
  let _keyObj = {}
  _objects.forEach(function (e) {
    _keyObj[e[_value]] = e[_label]
  })
  return !isEmptyObject(_keyObj) ? _keyObj : null
}
/***
 * 描述：获取 对应 _DictKey 的键值对对象
 * 开发人：sunlf
 * 开发日期：2017年8月25日
 * @param _DictKey  数据字典key
 * @param _DictType  数据字典类型
 * @returns {*}
 */
export function DictKeyValueObject(_DictKey, _DictType) {
  let dataDictKey = JSON.parse(Cache.get(_DictKey))
  let filteredData = dataDictKey.filter((item) => {
    return item.type === _DictType
  })
  return KeyValueObject(filteredData, 'value', 'label')
}
