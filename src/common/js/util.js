/**
 * 解析url参数
 * @example "?id=12345&a=b"
 * @return Object {id: "12345", a: "b"}
 */
export function urlParse () {
  // 获取到url中的?id=12345&a=b
  let url = window.location.search
  let obj = {}
  // '?id=123456', '&a=b'
  let reg = /[?&][^?&]+=[^?&]+/g
  // ['?id=12345', '&a=b']
  let arr = url.match(reg)

  if (arr) {
    arr.forEach((item) => {
      // ['id',12345'] ['a',b']
      let tempArr = item.substring(1).split('=')
      // id   a
      let key = decodeURIComponent(tempArr[0])
      // 12345  b
      let val = decodeURIComponent(tempArr[1])
      // {id:"12345", a:"b"}
      obj[key] = val
    })
  }
  return obj
}
