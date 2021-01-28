<!--
 * @Author: tb659
 * @Date: 2021-01-28 16:14:51
 * @LastEditors: tb659
 * @LastEditTime: 2021-01-28 22:47:32
 * @Description: 测试页面
 * @FilePath: \admin-MT\src\views\test.vue
-->
<template>
  <div class="app-container">
    <h2>测试页面</h2>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {}
  },

  created() {
    console.log(this.$styles)
    console.log(this.$utils)
    let downLoadUrl = process.env.VUE_APP_BASE_API_DOWNLOAD
    console.log(downLoadUrl)
    // console.log($utils.$utils.parseTime(new Date(), 'y-m-d'))
    console.log(this.$utils.addDateRange({id: 2,name: 'mt'},['2020-12-12', '2020-11-11']))
  },

  methods: {}
}
</script>

<style lang="scss" scoped></style>
