<!--
 * @Author: tb659
 * @Date: 2021-01-24 12:05:44
 * @LastEditors: tb659
 * @LastEditTime: 2021-01-24 17:04:09
 * @Description: 数据填报
 * @FilePath: \datacollectandsubmit\src\components\FillTesk\index.vue
-->
<template>
  <div class="container">
    <!--内容主体-->
    <div class="app-container">
      <!-- 选择tab -->
      <div class="tabsCont">
        <i class="el-icon-arrow-left"></i>
        <div class="itemCont">
          <div class="tabItem pointer" :class="index === tabIndex && 'active'" v-for="(tab, index) in tabs">{{ tab }}</div>
        </div>
        <i class="el-icon-arrow-right"></i>
      </div>

      <!-- 表格 -->
      <el-row :gutter="24">
        <el-col :span="24" :xs="24">
          <el-table ref="tableData" :data="tableData" style="width: 100%" @expand-change="expandChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-row :gutter="20">
                    <el-col :lg="8" :md="12">
                      <el-form-item label="所监管企业资产总额-总计（亿元）">
                        <el-input  v-model="props.row.money1"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12">
                      <el-form-item label="所监管企业资产总额-工商类（亿元）">
                        <el-input  v-model="props.row.money2"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12">
                      <el-form-item label="所监管企业资产总额-金融类（亿元）">
                        <el-input  v-model="props.row.money3"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12">
                      <el-form-item label="所监管企业资产总额-文化类（亿元）">
                        <el-input  v-model="props.row.money4"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12">
                      <el-form-item label="省级各类国有企业资产总额（亿元）">
                        <el-input  v-model="props.row.money5"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12">
                      <el-form-item label="所监管企业资产总额占各类国有企业资产总额的比例（%）">
                        <el-input  v-model="props.row.percent1"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12">
                      <el-form-item label="省级工商类国有资产总额（亿元）">
                        <el-input  v-model="props.row.money6"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :lg="8" :md="12">
                      <el-form-item label="所监管工商类企业资产总额占各类国有企业资产总额的比例（%）">
                        <el-input  v-model="props.row.percent2"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-form-item label="附件（提供文本）" class="upload">
                      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                  </el-row>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="序号" prop="id" width="100px"> </el-table-column>
            <el-table-column label="系统/报告/专项名称" prop="name"> </el-table-column>
            <!-- <el-table-column :label="$t('handle')" width="80px">
              <template slot-scope="scope">
                  <i @click="handleExpendOpen(scope.$index)" class="el-icon-arrow-right"></i>
                  <i @click="handleExpendCose(scope.$index)" class="el-icon-arrow-down"></i>
              </template>
            </el-table-column> -->
          </el-table>

          <pagination v-show="total > 0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" />
        </el-col>
      </el-row>

      <slot></slot>
    </div>
  </div>
</template>
<script>
import mixins from '@/mixins/view-module'
// 头部组件
import ContainerHeader from '@/components/ContainerHeader'
export default {
  name: 'FillTesk',
  mixins: [mixins],
  components: {
    ContainerHeader
  },
  data() {
    return {
      tabs: ['办公厅', '法规局', '规划局', '财产运行局', '产权局', '改革局', '考核分配局', '资本局'],
      // tabs: ['办公厅', '法规局', '规划局', '财产运行局', '产权局', '改革局', '考核分配局', '资本局', '监督追责局', '企干一局', '改革办', '有关厅局'],
      tabIndex: 1,
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.dataListLoading = true
      // listUser({ pageNum, pageSize }).then(res => {
      console.log('---------------------------------查询任务列表')
      let res = {
        total: 4,
        rows: [
          {
            id: '12987122',
            name: '经营性国有资产集中统一监管情况统计表',
            money1: '',
            money2: '',
            money3: '',
            money4: '',
            money5: '',
            money6: '',
            percent1: '',
            percent2: ''
          },
          {
            id: '12987123',
            name: '地方国资监管机构设置情况统计表',
            money1: '',
            money2: '',
            money3: '',
            money4: '',
            money5: '',
            money6: '',
            percent1: '',
            percent2: ''
          },
          {
            id: '12987125',
            name: '省级国资委监管企业领导人员管理体制统计表',
            money1: '',
            money2: '',
            money3: '',
            money4: '',
            money5: '',
            money6: '',
            percent1: '',
            percent2: ''
          },
          {
            id: '12987126',
            name: '省级国资委主要负责同志情况简表',
            money1: '',
            money2: '',
            money3: '',
            money4: '',
            money5: '',
            money6: '',
            percent1: '',
            percent2: ''
          },
          {
            id: '12987127',
            name: '地方国资监管立法工作情况统计表-国资监管地方性法规',
            money1: '',
            money2: '',
            money3: '',
            money4: '',
            money5: '',
            money6: '',
            percent1: '',
            percent2: ''
          },
          {
            id: '12987128',
            name: '地方国资监管立法工作情况统计表-党委规范性文件',
            money1: '',
            money2: '',
            money3: '',
            money4: '',
            money5: '',
            money6: '',
            percent1: '',
            percent2: ''
          }
        ],
        code: 200,
        msg: '查询成功'
      }
      this.tableData = res.rows
      this.total = res.total
      this.dataListLoading = false
      // })
    },
    expandChange(row, expandedRows) {
      console.log(row, expandedRows)
    },
    handleExpendOpen(index) {
      console.log(index)
      let dom = this.$refs.tableData.$el.querySelectorAll('.el-table__expand-icon')[index]
      console.log(dom)
      dom.click()
    },
    handleExpendClose(index) {
      console.log(index)
      let dom = this.$refs.tableData.$el.querySelectorAll('.el-table__expand-icon')[index]
      console.log(dom)
      dom.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.tabsCont {
  $w: 1100px;
  $h: 78px;

  width: $w;
  height: $h;
  padding: 10px;
  box-sizing: border-box;
  @include flexbox;
  @include align-items;
  overflow: hidden;

  .itemCont {
    @include flexbox;
    @include align-items;
    overflow-x: auto;

    .tabItem {
      padding: 10px 24px;
      background: #efefef;
      border-radius: 3px;
      margin: 0 10px;
      white-space: nowrap;

      &.active {
        background-color: $lightBlue;
        color: #fff;
      }
    }
  }

  i {
    font-size: 24px;
    margin: 0 12px;
  }
}

::v-deep.demo-table-expand {
  font-size: 0;

  .el-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .el-form-item {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0;
    height: 80px;

    .el-form-item__label {
      width: 50% !important;
      text-align: right;
    }
    .el-form-item__content {
      width: 120px;
    }
  }

  .upload {
    width: 100%;
    height: 240px;
    padding-top: 20px;

    .el-form-item__label {
      width: 140px !important;
    }
    .el-form-item__content {
      width: auto;

      .upload-demo {
        width: 18vw;
        .el-upload-dragger {
          width: 18vw;
        }
      }
    }
  }
}

</style>
