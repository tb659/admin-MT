<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">{{title}}</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="code">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item> -->
      <!-- <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2021 </span>
    </div>
  </div>
</template>

<script>
import settings from '@/settings'
import { getCodeImg } from '@/api/login'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: 'Login',
  data() {
    return {
      codeUrl: '',
      cookiePassword: '',
      loginForm: {
        username: 'admin',
        password: 'admin123',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCode()
    this.getCookie()
  },
  methods: {
    getCode() {
      // getCodeImg().then(res => {
        console.log('---------------------------------------获取验证码')
        let res = {
          msg: '操作成功',
          img:
            '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',
          code: 200,
          uuid: 'bd86a47bac1f46fd82754d304c053ad2'
        }
        this.codeUrl = 'data:image/gif;base64,' + res.img
        this.loginForm.uuid = res.uuid
      // })
    },
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.loginForm.rememberMe) {
            Cookies.set('username', this.loginForm.username, { expires: 30 })
            Cookies.set('password', encrypt(this.loginForm.password), {
              expires: 30
            })
            Cookies.set('rememberMe', this.loginForm.rememberMe, {
              expires: 30
            })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' }).catch(() => {})
            })
            .catch(() => {
              this.loading = false
              this.getCode()
            })
        }
      })
    }
  },
  computed: {
    title() {
      return settings.title || ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login-background.jpg');
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
