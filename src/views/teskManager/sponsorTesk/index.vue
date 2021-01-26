<!--
 * @Author: tb659
 * @Date: 2021-01-23 14:07:12
 * @LastEditors: tb659
 * @LastEditTime: 2021-01-24 11:03:20
 * @Description: 发起任务
 * @FilePath: \datacollectandsubmit\src\views\teskManager\sponsorTesk\index.vue
-->
<template>
  <div class="container">
    <container-header v-if="!addTeskVisible">
      <el-form slot="left" :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="任务名称" prop="userName">
          <el-input v-model="queryParams.userName" placeholder="请输入任务名称" clearable  class="w240 mr20" @keyup.enter.native="handleQuery" />
          <el-button type="primary" icon="el-icon-search"  @click="handleQuery">{{ $t('query') }}</el-button>
        </el-form-item>
      </el-form>
      <div slot="right">
        <el-button type="success" plain icon="el-icon-plus"  @click="handleAdd" v-hasPermi="['system:user:add']">创建任务</el-button>
        <el-button type="danger" plain icon="el-icon-delete"  :disabled="multiple" @click="handleDelete" v-hasPermi="['system:user:remove']">删除任务</el-button>
      </div>
    </container-header>

    <container-header v-else>
      <h3 slot="left">创建任务</h3>
      <i slot="right" class="el-icon-close pointer" @click="addTeskVisible = false"></i>
    </container-header>
    <!--任务列表-->
    <div v-show="!addTeskVisible" class="app-container">
      <el-row :gutter="24">
        <el-col :span="24" :xs="24">
          <el-table v-loading="dataListLoading" :data="teskList" @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="50" />
            <el-table-column label="序号" key="id" prop="id" width="50" />
            <el-table-column label="任务名称" key="teskName" prop="teskName" :show-overflow-tooltip="true" />
            <el-table-column label="报送频率" key="frequency" prop="frequency" :show-overflow-tooltip="true" width="100" />
            <el-table-column label="起止时间" key="beginEnd" prop="beginEnd" :show-overflow-tooltip="true" />
            <el-table-column label="指标总数" key="indicatorsTotel" prop="indicatorsTotel" width="80" />
            <el-table-column label="任务状态" key="teskStatus" width="80">
              <template slot-scope="scope">
                {{ scope.row.teskStatus === 1 ? '启用' : '暂停' }}
              </template>
            </el-table-column>
            <el-table-column label="发布时间" prop="issueDate" width="160">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.issueDate) }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('handle')" width="100">
              <template slot-scope="scope">
                <el-button  type="text" @click="handleStatusChange(scope.row)" v-hasPermi="['system:user:edit']">启用</el-button>
                <el-button  type="text" @click="handleStatusChange(scope.row)" v-hasPermi="['system:user:resetPwd']">暂停</el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination v-show="total > 0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" />
        </el-col>
      </el-row>
    </div>
    <add-or-update v-show="addTeskVisible" ref="addTesk" @refreshDataList="refreshDataList"></add-or-update>
  </div>
</template>

<script>
import mixins from '@/mixins/view-module'
// 头部组件
import ContainerHeader from '@/components/ContainerHeader'
import AddOrUpdate from './addTesk'
export default {
  name: 'SponsorTesk',
  mixins: [mixins],
  components: {
    ContainerHeader,
    AddOrUpdate
  },
  data() {
    return {
      // 是否显示弹出层
      addTeskVisible: false,
      // 是否显示搜索
      showSearch: true,
      // 选中数组
      ids: [],
      // 总条数
      total: 0,
      // 任务表格数据
      teskList: null,
      // 查询参数
      queryParams: {
        userName: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询任务列表 */
    getList() {
      this.dataListLoading = true
      // listUser({ pageNum, pageSize }).then(res => {
      console.log('---------------------------------查询任务列表')
      let res = {
        total: 4,
        rows: [
          { id: '01', teskName: '关于决策和运行监管系统的任务', frequency: '实时', beginEnd: '2021-01-20', indicatorsTotel: 50, teskStatus: 1, issueDate: '2021-01-20' },
          { id: '02', teskName: '关于决策和运行监管系统的任务', frequency: '每天', beginEnd: '2021-01-20', indicatorsTotel: 50, teskStatus: 1, issueDate: '2021-01-20' },
          {
            id: '03',
            teskName: '关于决策和运行监管系统的任务',
            frequency: '每月',
            beginEnd: '2021-01-20 至 2021-02-20',
            indicatorsTotel: 50,
            teskStatus: 1,
            issueDate: '2021-01-20'
          },
          {
            id: '04',
            teskName: '关于决策和运行监管系统的任务',
            frequency: '每季度',
            beginEnd: '2021-01-20 至 2021-04-20',
            indicatorsTotel: 50,
            teskStatus: 0,
            issueDate: '2021-01-20'
          }
        ],
        code: 200,
        msg: '查询成功'
      }
      this.teskList = res.rows
      this.total = res.total
      this.dataListLoading = false
      // })
    },
    // 任务状态修改
    handleStatusChange(row) {
      let text = row.teskStatus === 1 ? '启用' : '暂停'
      this.$confirm('确认要' + text + ' “ ' + row.teskName + ' ” 的任务吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return changeUserStatus(row.id, row.teskStatus) // 发请求
        })
        .then(() => {
          this.msgSuccess(text + '成功')
        })
        .catch(function() {
          row.teskStatus = row.teskStatus === 1 ? 0 : 1
        })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1
      this.getList()
    },
    /** 新增按钮操作 */
    handleAdd(id, item) {
      // getUser().then(res => {
      this.addTeskVisible = true
      this.$refs.addTesk.form.id = id
      this.$refs.addTesk.init(item)
      // })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm(this.$t('prompt.info', { handle: this.$t('delete') }), this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(function() {
          return delUser(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess(this.$t('prompt.success'))
        })
    },
    // 保存/取消
    refreshDataList(type) {
      if (type === 'save') {
        this.getList()
      }
      this.addTeskVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  min-width: 450px;
  margin-bottom: 10px;
}
.el-icon-close {
  font-size: 24px;
}
</style>
