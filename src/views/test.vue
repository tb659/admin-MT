<!--
 * @Author: tb659
 * @Date: 2021-01-28 16:14:51
 * @LastEditors: tb659
 * @LastEditTime: 2021-01-29 17:12:54
 * @Description: 测试页面
 * @FilePath: \admin-MT\src\views\test.vue
-->
<template>
  <div class="app-container">
    <h2>测试页面</h2>
    <el-form :model="testForm" ref="testForm">
      <el-form-item prop="inputVal">
        <el-input v-model="testForm.inputVal"></el-input>
      </el-form-item>
      <el-form-item prop="inputVal">
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="reseForm">重置表单</el-button>
        <el-button @click="searchForm">{{ $t('query') }}</el-button>
      </el-form-item>
    </el-form>

    <div ref="testClassName" @click="testClassName">测试class类名</div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      testForm: {
        inputVal: '测试重置表单'
      },
      dateRange: []
    }
  },

  created() {
    // console.log(this.$styles)
    let downLoadUrl = process.env.VUE_APP_BASE_API_DOWNLOAD
    // console.log(downLoadUrl)
    // console.log(this.$formatDate(new Date(),'YYYY-MM-DD HH:mm:ss'))
    // console.log(this.$utils.fromNow('2021-01-01'))
    // console.log(this.$utils.praseStrEmpty('  111  '))
  },

  methods: {
    reseForm() {
      // this.$refs.testForm.resetFields()
      this.$resetForm('testForm')
    },
    searchForm() {
      console.log(this.$utils.addDateRange(this.testForm, this.dateRange))
    },
    testClassName() {
      this.$utils.toggleClass(this.$refs.testClassName, 'testClassName')
    }
  }
}
</script>

<style lang="scss" scoped>
.testClassName {
  color: $lightBlue;
}
</style>
