<!--
 * @Author: tb659
 * @Date: 2021-01-28 16:14:51
 * @LastEditors: tb659
 * @LastEditTime: 2021-01-28 17:32:13
 * @Description: 测试页面
 * @FilePath: \admin-MT\src\views\system\test\index.vue
-->
<template>
  <div class="app-container">
    <h2>测试页面</h2>
  </div>
</template>

<script>
import styles from '@/assets/styles/index.scss'
import * as utils from '@/utils'
export default {
  name: 'Test',
  data() {
    return {}
  },

  created() {
    console.log(styles)
    console.log(utils)
  },

  methods: {}
}
</script>

<style lang="scss" scoped></style>
