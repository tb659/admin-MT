<!--
 * @Author: tb659
 * @Date: 2021-01-23 14:07:12
 * @LastEditors: tb659
 * @LastEditTime: 2021-01-24 17:35:43
 * @Description: 汇总审核
 * @FilePath: \datacollectandsubmit\src\views\teskManager\collectAudit\index.vue
-->
<template>
  <div class="container">
    <container-header v-if="!fillTeskVisible" :left="24" :right="0">
      <el-form slot="left" :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="任务名称" prop="userName">
          <el-input v-model="queryParams.userName" placeholder="请输入任务名称" clearable size="small" class="w240 mr20" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="任务状态" prop="teskStatus">
          <el-select v-model="queryParams.teskStatus" placeholder="请选择任务状态" clearable size="small" :style="{ width: '100%' }">
            <el-option v-for="(item, index) in statusData" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">{{ $t('query') }}</el-button>
        </el-form-item>
      </el-form>
    </container-header>

    <container-header v-else>
      <h3 slot="left">审核/查看/上报</h3>
      <i slot="right" class="el-icon-close pointer" @click="fillTeskVisible = false"></i>
    </container-header>

    <!--任务列表-->
    <div v-show="!fillTeskVisible" class="app-container">
      <el-row :gutter="24">
        <el-col :span="24" :xs="24">
          <el-table v-loading="dataListLoading" :data="teskList" @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="50" />
            <el-table-column label="序号" key="id" prop="id" width="50" />
            <el-table-column label="任务名称" key="teskName" prop="teskName" :show-overflow-tooltip="true" />
            <el-table-column label="报送频率" key="frequency" prop="frequency" :show-overflow-tooltip="true" width="140" />
            <el-table-column label="指标总数" key="indicatorsTotel" prop="indicatorsTotel" width="140" />
            <el-table-column label="提交指标总数" key="submitTotal" prop="submitTotal" width="140" />
            <el-table-column label="下发人" prop="issuedName" width="160" />
            <el-table-column label="任务状态" key="teskStatus" width="140">
              <template slot-scope="scope">
                <el-button size="mini" type="text">
                  <span v-if="scope.row.teskStatus === 1">待上报</span>
                  <span v-if="scope.row.teskStatus === 2">已上报</span>
                  <span v-if="scope.row.teskStatus === 3">已保存</span>
                  <span v-if="scope.row.teskStatus === 5">已审核</span>
                  <span v-if="scope.row.teskStatus === 8">确认上报</span>
                  <span v-if="scope.row.teskStatus === 9">待审核</span>
                  <span v-if="scope.row.teskStatus === 6" class="red-btn">已退回</span>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column :label="$t('handle')" width="160">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.teskStatus !== 6 && scope.row.teskStatus !== 1"
                  plain
                  size="mini"
                  :type="'primary'"
                  @click="handleTesk(scope.row)"
                  v-hasPermi="['system:user:edit']"
                  >查看</el-button
                >
                <el-button plain size="mini" :type="scope.row.teskStatus === 6 ? 'danger' : 'primary'" @click="handleTesk(scope.row)" v-hasPermi="['system:user:edit']">
                  <span v-if="scope.row.teskStatus === 1">审核</span>
                  <span v-if="scope.row.teskStatus === 5">上报</span>
                  <span v-if="scope.row.teskStatus === 6">处理</span>
                  <span v-if="scope.row.teskStatus === 8">撤回</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination v-show="total > 0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" />
        </el-col>
      </el-row>
    </div>

    <!-- 填报 -->
    <fill-tesk v-show="fillTeskVisible">
      <div class="footer">
        <el-form slot="left" :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
          <el-form-item label="问题指标" prop="info">
            <el-badge value="x" class="item">
              <el-button size="mini" plain>所监管企业资产总额-工商类（亿元）</el-button>
            </el-badge>
            <el-badge value="x" class="item">
              <el-button size="mini" plain>所监管企业资产总额-文化类（亿元）</el-button>
            </el-badge>
            <el-badge value="x" class="item">
              <el-button size="mini" plain>省级各类国有企业资产总额（亿元） </el-button>
            </el-badge>
            <el-input rows="4" type="textarea" style="width: 100%" v-model="queryParams.info" placeholder="反馈描述" clearable />
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
        <div class="footerBtn">
          <el-button type="primary" size="small"> 审核通过 </el-button>
          <el-button type="primary" size="small"> 返回 </el-button>
          <el-button type="primary" size="small"> 确认上报 </el-button>
        </div>
      </div>
    </fill-tesk>
  </div>
</template>

<script>
import mixins from '@/mixins/view-module'
// 头部组件
import ContainerHeader from '@/components/ContainerHeader'
// 填报
import FillTesk from '@/components/FillTesk'
export default {
  name: 'CollectAudit',
  mixins: [mixins],
  components: {
    ContainerHeader,
    FillTesk
  },
  data() {
    return {
      // 是否显示弹出层
      fillTeskVisible: false,
      // 选中数组
      ids: [],
      // 总条数
      total: 0,
      // 任务表格数据
      teskList: null,
      // 查询参数
      queryParams: {
        userName: undefined,
        teskStatus: 1
      },

      statusData: [
        { label: '待上报', value: 1 },
        { label: '已上报', value: 2 },
        { label: '已保存', value: 3 },
        { label: '已提交', value: 4 },
        { label: '待审核', value: 9 },
        { label: '已审核', value: 5 },
        { label: '已退回', value: 6 },
        { label: '已完成', value: 7 },
        { label: '确认上报', value: 8 }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询任务列表 */
    getList() {
      this.dataListLoading = true
      // listUser(this.addDateRange(this.queryParams, this.dateRange)).then(res => {
      console.log('---------------------------------查询任务列表')
      let res = {
        total: 4,
        rows: [
          {
            id: '01',
            teskName: '关于决策和运行监管系统的任务',
            frequency: '实时',
            indicatorsTotel: 50,
            submitTotal: 50,
            teskStatus: 1,
            issuedName: '省国资源',
            issuedDate: '2021-01-22'
          },
          {
            id: '02',
            teskName: '关于决策和运行监管系统的任务',
            frequency: '每天',
            indicatorsTotel: 50,
            submitTotal: 50,
            teskStatus: 5,
            issuedName: '管理员',
            issuedDate: '2021-01-22'
          },
          {
            id: '03',
            teskName: '关于决策和运行监管系统的任务',
            frequency: '每月',
            indicatorsTotel: 50,
            submitTotal: 50,
            teskStatus: 6,
            issuedName: '管理员',
            issuedDate: '2021-01-22'
          },
          {
            id: '04',
            teskName: '关于决策和运行监管系统的任务',
            frequency: '每季度',
            indicatorsTotel: 50,
            submitTotal: 50,
            teskStatus: 8,
            issuedName: '管理员',
            issuedDate: '2021-01-22'
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
    handleStatusChange(row) {},
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1
      this.getList()
    },
    // 操作按钮
    handleTesk(row) {
      console.log(row)
      this.fillTeskVisible = true
      //  this.$router.push('/')
    },
    // 保存/取消
    refreshDataList(type) {
      if (type === 'save') {
        this.getList()
      }
      this.fillTeskVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}
.el-icon-close {
  font-size: 24px;
}
.footer {
  padding: 30px;

  .el-badge {
    margin-right: 20px;

    ::v-deep.el-badge__content {
      $size: 20px;

      width: $size;
      height: $size;
      cursor: pointer;
    }
  }
  .el-textarea {
    margin-top: 20px;
  }

  .footerBtn {
    text-align: center;
    .el-button {
      margin: 30px;
    }
  }
}
</style>
