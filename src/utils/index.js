// 日期格式化
import moment from './moment'
// 请求url
const baseURL = process.env.VUE_APP_BASE_API

// 通用下载方法
export function download(fileName) {
  window.location.href = baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  return !str || str === 'undefined' || str === 'null' ? '' : str
}

// 首字母大写
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 横线- 转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

// 数字字符串
export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

/**
 * @description: 日期格式化
 * @param {*} time 时间
 * @param {string} fmt 格式
 * @return {string}
 */
export function formatDate(time = new Date(), fmt = 'YYYY-MM-DD') {
  return moment(time).format(fmt)
}

/**
 * @description: 相对时间
 * @param {*} time 时间
 * @return {string}
 */
export function fromNow(time = new Date()) {
  let result = null
  let oldTime = new Date(time).getTime()
  let mistiming = Math.round(new Date()) - oldTime
  let arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
  let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (let i = 6; i >= 0; i--) {
    let inm = Math.floor(mistiming / 1000 / arrn[i])
    if (inm != 0) {
      result = inm + arrr[i] + '前'
    }
  }
  return result
}

/**
 * @description: 表单重置
 * @param {string} refName ref名称
 * @return {*}
 */
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

/**
 * @description: 添加日期范围
 * @param {object} params 传参对象
 * @param {array} dateRange 日期范围
 * @param {string} fmt 格式化方式
 * @param {array} propName  日期字段
 * @return {object}
 */
export function addDateRange(params, dateRange, fmt = 'YYYY-MM-DD', propName) {
  if (dateRange !== null && dateRange !== '' && Array.isArray(dateRange) && dateRange.length) {
    if (typeof propName === 'undefined') {
      params.startDate = moment(dateRange[0]).format(fmt)
      params.endDate = moment(dateRange[1]).format(fmt)
    } else {
      params[propName[0]] = moment(dateRange[0]).format(fmt)
      params[propName[1]] = moment(dateRange[1]).format(fmt)
    }
  }
  return params
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id = id, parentId = 'parentId', children = children, rootId) {
  rootId =
    rootId ||
    Math.min.apply(
      Math,
      data.map(item => {
        return item[parentId]
      })
    ) ||
    0
  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  //循环所有项
  const treeData = cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      //返回每一项的子级数组
      return father[id] === child[parentId]
    })
    branchArr.length > 0 && (father.children = branchArr)
    //返回第一层
    return father[parentId] === rootId
  })
  return treeData !== '' ? treeData : data
}

/**
 * @description: url参数对象化
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url === null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
// console.log(getQueryObject('http://localhost/system/menu?a=1&b=2'))

/**
 * @description: 检查元素是否有class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * @description: 元素添加class
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * @description: 元素删除class
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @description: 元素切换class
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}
