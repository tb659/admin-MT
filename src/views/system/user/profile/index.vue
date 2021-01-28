<template>
  <div class="app-container p20">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户名称
                <div class="pull-right">{{ user.userName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" />手机号码
                <div class="pull-right">{{ user.phonenumber }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />用户邮箱
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" />所属部门
                <div class="pull-right" v-if="user.dept">{{ user.dept.deptName }} / {{ postGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" />所属角色
                <div class="pull-right">{{ roleGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />创建日期
                <div class="pull-right">{{ user.createTime }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from './userAvatar'
import userInfo from './userInfo'
import resetPwd from './resetPwd'
import { getUserProfile } from '@/api/system/user'

export default {
  name: 'Profile',
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: 'userinfo'
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      // getUserProfile().then(response => {
      console.log('------------------------------------------------查询用户个人信息')
      let response = {
        msg: '操作成功',
        postGroup: '董事长',
        code: 200,
        data: {
          searchValue: null,
          createBy: 'admin',
          createTime: '2021-01-21 23:10:54',
          updateBy: null,
          updateTime: null,
          remark: '管理员',
          params: {},
          userId: 1,
          deptId: 103,
          userName: 'admin',
          nickName: '若依',
          email: 'ry@163.com',
          phonenumber: '15888888888',
          sex: '1',
          avatar: '',
          salt: null,
          status: '0',
          delFlag: '0',
          loginIp: '127.0.0.1',
          loginDate: '2021-01-21T23:10:54.000+0800',
          dept: {
            searchValue: null,
            createBy: null,
            createTime: null,
            updateBy: null,
            updateTime: null,
            remark: null,
            params: {},
            deptId: 103,
            parentId: 101,
            ancestors: null,
            deptName: '研发部门',
            orderNum: '1',
            leader: '若依',
            phone: null,
            email: null,
            status: '0',
            delFlag: null,
            parentName: null,
            children: []
          },
          roles: [
            {
              searchValue: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              params: {},
              roleId: 1,
              roleName: '超级管理员',
              roleKey: 'admin',
              roleSort: '1',
              dataScope: '1',
              menuCheckStrictly: false,
              deptCheckStrictly: false,
              status: '0',
              delFlag: null,
              flag: false,
              menuIds: null,
              deptIds: null,
              admin: true
            }
          ],
          roleIds: null,
          postIds: null,
          admin: true
        },
        roleGroup: '超级管理员'
      }
      this.user = response.data
      this.roleGroup = response.roleGroup
      this.postGroup = response.postGroup
      // });
    }
  }
}
</script>
