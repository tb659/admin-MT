<!--
 * @Author: tb659
 * @Date: 2021-01-24 01:58:05
 * @LastEditors: tb659
 * @LastEditTime: 2021-01-24 02:45:22
 * @Description: 选择指标
 * @FilePath: \datacollectandsubmit\src\views\teskManager\sponsorTesk\chooseTarget.vue
-->
<template>
  <el-dialog title="选择指标" :visible.sync="open" width="50%" append-to-body>
    <el-row :gutter="24">
      <el-col :span="24" :xs="24">
        <div class="radioBox mb20">
          <el-radio v-model="type" label="1">频率匹配</el-radio>
          <el-radio v-model="type" label="2">显示全部</el-radio>
        </div>

        <el-table v-loading="dataListLoading" :data="targetList" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column label="序号" key="id" prop="id" width="50" />
          <el-table-column label="指标名称" key="targetName" prop="targetName" :show-overflow-tooltip="true" />
          <el-table-column label="频率" key="frequency" prop="frequency" :show-overflow-tooltip="true" width="80" />
          <el-table-column label="密级" key="secretLevel" prop="secretLevel" :show-overflow-tooltip="true" width="80" />
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button  class="confirmBtn small-padding" type="primary" @click="submitForm">{{ $t('confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import mixins from '@/mixins/view-module'
export default {
  name: 'ChooseTarget',
  mixins: [mixins],
  data() {
    return {
      targetList: [],
      type: '1',
      open: false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined
      }
    }
  },

  created() {},

  methods: {
    init(item) {
      this.open = true
      this.getList()
    },

    getList() {
      this.dataListLoading = true
      // listUser(this.addDateRange(this.queryParams, this.dateRange)).then(res => {
      console.log('---------------------------------查询指标列表')
      let res = {
        total: 4,
        rows: [
          { id: '01', targetName: '监管一级企业总户数（不含参股）-实时数户数', frequency: '每天', secretLevel: '无' },
          { id: '02', targetName: '监管一级企业国有独资公司户数-实时数户数', frequency: '实时', secretLevel: '无' },
          { id: '03', targetName: '监管一级企业国有全资公司户数-实时数户数', frequency: '每天', secretLevel: '无' },
          { id: '04', targetName: '董事会召开次数 -实时数', frequency: '每年', secretLevel: '无' }
        ],
        code: 200,
        msg: '查询成功'
      }
      this.targetList = res.rows
      this.total = res.total
      this.dataListLoading = false
      // })
    },

    submitForm() {
      this.open = false
    }
  }
}
</script>

<style lang="scss" scoped>
.confirmBtn {
  // @include positionLevelCenter;
}
.dialog-footer {
  text-align: center;
  height: 50px;
}
</style>
