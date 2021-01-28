import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import i18n from '@/i18n'

import '@/assets/styles/common.scss' // common css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import './assets/icons' // icon
import './permission' // permission control

import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from '@/utils/util'

import Pagination from '@/components/Pagination'
// 自定义表格工具扩展
import RightToolbar from '@/components/RightToolbar'

// 全局方法挂载
Vue.prototype.parseTime = parseTime // 格式化时间
Vue.prototype.resetForm = resetForm // 表单重置
Vue.prototype.addDateRange = addDateRange // 添加日期范围
Vue.prototype.selectDictLabel = selectDictLabel // 
Vue.prototype.selectDictLabels = selectDictLabels // 回显数据字典
Vue.prototype.download = download // 通用下载方法
Vue.prototype.handleTree = handleTree // 构造树型结构数据

Vue.prototype.msgSuccess = function(msg, cb) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'success',
    duration: 1000,
    onClose: cb
  })
}

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg)
}

// 全局组件挂载
Vue.component('Pagination', Pagination) // 分页
Vue.component('RightToolbar', RightToolbar) // 表格工具栏

Vue.use(permission)

Vue.use(Element, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  i18n,
  el: '#app',
  router,
  store,
  render: h => h(App)
})
