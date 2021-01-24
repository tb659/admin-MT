<!--
 * @Author: tb659
 * @Date: 2021-01-23 17:55:50
 * @LastEditors: tb659
 * @LastEditTime: 2021-01-24 03:00:21
 * @Description: 创建任务
 * @FilePath: \datacollectandsubmit\src\views\teskManager\sponsorTesk\addTesk.vue
-->
<template>
  <!-- 添加或修改参数配置对话框 -->
  <div class="app-container addTesk">
    <el-form ref="form" :model="form" :rules="rules" label-width="110px">
      <el-row>
        <el-col :span="14">
          <el-form-item label="任务名称" prop="teskName">
            <el-input v-model="form.teskName" placeholder="请输入任务名称" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10" class="mr20">
          <el-form-item label="接送频率" prop="frequency">
            <el-select v-model="form.frequency" placeholder="请选择接送频率" clearable :style="{ width: '100%' }">
              <el-option v-for="(item, index) in frequencyData" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="填报起始时间" prop="startDate">
            <el-date-picker v-model="form.startDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="填报起始日期" clearable :style="{ width: '100%' }" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="填报截止时间" prop="endDate">
            <el-date-picker v-model="form.endDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="填报起始日期" clearable :style="{ width: '100%' }" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="选择指标">
            <div class="checkLevel1">
              <div
                v-for="(item, index) in form.checkList"
                :key="item.id + ''"
                :class="currentCheckLevel1Index === index && 'currentCheckBg'"
                @click="currentCheckLevel1Index = index"
              >
                <el-badge v-if="index === 0" value="23" class="item" type="primary">
                  <el-checkbox v-model="item.check">
                    {{ item.name }}
                  </el-checkbox>
                </el-badge>
                <div v-else>
                  <el-checkbox v-model="item.check">
                    {{ item.name }}
                  </el-checkbox>
                </div>
              </div>
            </div>

            <div class="total">已选择指标总数：23</div>
          </el-form-item>
        </el-col>
        <el-col :span="14" class="checkBoxRight">
          <div
            class="checkLevel2 clearfix"
            v-for="(item, index) in form.checkList[currentCheckLevel1Index].list"
            :key="item.id + ''"
            :class="currentCheckLevel2Index === index && 'currentCheckBg'"
            @click="currentCheckLevel2Index = index"
          >
            <el-col :span="18">
              <el-badge v-if="index === 4" value="23" class="item" type="primary">
                <el-checkbox class="currentCheck1" v-model="item.check"> {{ item.name }} </el-checkbox>
              </el-badge>
              <div v-else>
                <el-checkbox class="currentCheck1" v-model="item.check"> {{ item.name }} </el-checkbox>
              </div>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" plain size="mini" class="small-padding" @click="chooseTarget(item)">指标选择</el-button>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-button class="submitForm" type="primary" @click="submitForm">{{ $t('save') }}</el-button>

    <choose-target ref="chooseTarget"> </choose-target>
  </div>
</template>

<script>
const checkList = [
  {
    id: 1,
    check: true,
    name: '办公厅',
    list: [
      { id: 1, parentId: 1, check: false, name: '决策制度' },
      { id: 2, parentId: 1, check: false, name: '事项清单' },
      { id: 3, parentId: 1, check: false, name: '决策会议' },
      { id: 4, parentId: 1, check: false, name: '地方国资委系统、宣传思想工作人员通讯录' },
      { id: 5, parentId: 1, check: true, name: '国有企业组织机构单位信息表' },
      { id: 6, parentId: 1, check: false, name: '国有企业组织机构股权结构表' },
      { id: 7, parentId: 1, check: false, name: '国有企业组织机构参股信息表' },
      { id: 8, parentId: 1, check: false, name: '国有企业组织机构人员信息表' },
      { id: 9, parentId: 1, check: false, name: '国有企业组织机构附件信息表' },
      { id: 10, parentId: 1, check: false, name: '国有企业组织机构编码信息表' },
      { id: 11, parentId: 1, check: false, name: '国有企业组织机构异常信息表' }
    ]
  },
  {
    id: 2,
    check: false,
    name: '规划发展局',
    list: [
      { id: 1, parentId: 2, check: false, name: '决策制度' },
      { id: 2, parentId: 2, check: false, name: '事项清单' }
    ]
  },
  {
    id: 3,
    check: false,
    name: '财管运行局',
    list: [
      { id: 1, parentId: 3, check: false, name: '决策制度' },
      { id: 2, parentId: 3, check: false, name: '事项清单' }
    ]
  },
  {
    id: 4,
    check: false,
    name: '产权局',
    list: [
      { id: 1, parentId: 4, check: false, name: '决策制度' },
      { id: 2, parentId: 4, check: false, name: '事项清单' }
    ]
  },
  {
    id: 5,
    check: false,
    name: '政革局',
    list: [
      { id: 1, parentId: 5, check: false, name: '决策制度' },
      { id: 2, parentId: 5, check: false, name: '事项清单' }
    ]
  },
  {
    id: 6,
    check: false,
    name: '考核分配局',
    list: [
      { id: 1, parentId: 6, check: false, name: '决策制度' },
      { id: 2, parentId: 6, check: false, name: '事项清单' }
    ]
  },
  {
    id: 7,
    check: false,
    name: '资本局',
    list: [
      { id: 1, parentId: 2, check: false, name: '决策制度' },
      { id: 2, parentId: 2, check: false, name: '事项清单' }
    ]
  },
  {
    id: 8,
    check: false,
    name: '监督追责局',
    list: [
      { id: 1, parentId: 2, check: false, name: '决策制度' },
      { id: 2, parentId: 2, check: false, name: '事项清单' }
    ]
  },
  {
    id: 9,
    check: false,
    name: '企干一局',
    list: [
      { id: 1, parentId: 2, check: false, name: '决策制度' },
      { id: 2, parentId: 2, check: false, name: '事项清单' }
    ]
  },
  {
    id: 10,
    check: false,
    name: '改革办',
    list: [
      { id: 1, parentId: 2, check: false, name: '决策制度' },
      { id: 2, parentId: 2, check: false, name: '事项清单' }
    ]
  },
  {
    id: 11,
    check: false,
    name: '有关厅局',
    list: [
      { id: 1, parentId: 2, check: false, name: '决策制度' },
      { id: 2, parentId: 2, check: false, name: '事项清单' }
    ]
  }
]
import ChooseTarget from './chooseTarget'
export default {
  name: 'addTesk',
  components: {
    ChooseTarget
  },
  data() {
    return {
      form: {
        id: undefined,
        teskName: '',
        frequency: '',
        beginEnd: '',
        indicatorsTotel: 0,
        teskStatus: 4,
        issueDate: '',
        startDate: '',
        endDate: '',
        checkList: checkList
      },
      frequencyData: [
        { label: '实时', value: 1 },
        { label: '每天', value: 2 },
        { label: '每月', value: 3 },
        { label: '每季度', value: 4 },
        { label: '每年', value: 5 }
      ],

      // 表单校验
      rules: {
        teskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        frequency: [{ required: true, message: '请选择接送频率', trigger: 'change' }],
        startDate: [{ required: true, message: '填报起始时间', trigger: 'change' }]
      },
      // 当前选择复选框下标
      currentCheckLevel1Index: 0,
      // 当前选择复选框下标
      currentCheckLevel2Index: ''
    }
  },

  methods: {
    init(item) {
      this.open = true
      this.$nextTick(() => {
        if (this.form.id) {
          // this.getInfo()
          this.form = { ...this.form, ...item }
        }
      })
    },

    chooseTarget(item) {
      this.$refs.chooseTarget.init(item)
    },

    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            // updateUser(this.form).then(response => {
            this.msgSuccess(this.$t('prompt.success'), () => {
              this.open = false
              this.$emit('refreshDataList', 'save')
            })
            // })
          } else {
            // addUser(this.form).then(response => {
            this.msgSuccess(this.$t('prompt.success'), () => {
              this.open = false
              this.$emit('refreshDataList', 'save')
            })
            // })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.addTesk {
  padding: 40px;
  $bdColor: #ebeef5;

  .checkLevel1 {
    border: 1px solid $bdColor;

    .el-checkbox {
      width: 100%;
      display: block;
      padding: 10px;
      border-bottom: 1px solid $bdColor;

      ::v-deep .el-checkbox__label {
        padding-left: 40px;
      }
    }

    & > div.currentCheckBg {
      background-color: #f6f9fc;
    }

    & + .total {
      padding-top: 20px;
    }
  }

  .checkBoxRight {
    border: 1px solid $bdColor;

    .checkLevel2 {
      width: 100%;
      border-bottom: 1px solid $bdColor;

      .el-checkbox {
        width: 100%;
        padding: 10px;
      }

      .el-button {
        margin-top: 6px;
      }

      &.currentCheckBg {
        background-color: #f6f9fc;
      }
    }
  }

  .submitForm {
    @include positionLevelCenter;
  }

  ::v-deep.el-badge__content.is-fixed {
    top: 18px;
    right: -30px;
  }
}
</style>
