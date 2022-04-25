<template>
  <div class="login-card-container">
    <div class="login-card-title">
      <h2>登录</h2>
      <h6>Sign in with your Account.</h6>
    </div>
    <div class="login-card-form">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            show-password
            prefix-icon="el-icon-key"
            placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="role">
          <el-select v-model="loginForm.roleId" placeholder="请选择您的职别">
            <el-option v-for="item in roles" :key="item.id" :label="item.description" :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item prop="captchaCode">
          <el-input
            type="text"
            v-model="loginForm.captchaCode"
            placeholder="请输入验证码"
            class="login-card-captchaCode-input"
          ></el-input>
          <el-image :src="src" class="login-card-captchaCode-image" @click="handleResetCaptchaCode"></el-image>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-card-btn">
      <el-button type="primary" @click="handleLogin('loginForm')">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginCard',
  data () {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateCaptchaCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    // var validateRole = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请选择职别'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: '',
        password: '',
        // roleId: '',
        captchaCode: ''
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        // roleId: [
        //   { required: true, validator: validateRole, trigger: 'change' }
        // ],
        captchaCode: [
          { required: true, validator: validateCaptchaCode, trigger: 'blur' }
        ]
      },
      roles: [],
      src: 'http://localhost:8090/captcha?time=' + new Date()
    }
  },
  created () {
    // this.initRoles()
  },
  methods: {
    // initRoles () {
    //   this.$axios.get('/role').then(res => {
    //     console.log(res)
    //     if (res.code === 200) {
    //       // console.log(res.data)
    //       // this.roles = res.data
    //     }
    //   })
    // },
    handleLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单验证通过 则进行登录操作
          // console.log(this.loginForm)
          // this.$axios.post('/user/login', this.loginForm).then(res => {
            // console.log(res)
            // if (res.code === 200) {
            //   sessionStorage.setItem('userInfo', JSON.stringify(res.data))
            //   sessionStorage.setItem('isLogin', true)
            //   this.initUserInfo()
            //   this.$message.success('登录成功')
            //   this.$router.push('/manage')
            // } else {
            //   this.$message.error(res.message)
            // }
          // })
          this.$store.dispatch('user/login', this.loginForm)
        } else {
          this.$notify.error({
            title: '登录失败',
            message: '请检查用户名或者密码输入是否正确'
          })
        }
      })
    },
    handleResetCaptchaCode () {
      this.src = 'http://localhost:8090/captcha?time=' + new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-card-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  transition: all 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  padding: 0 5%;
}
.login-card-title {
  font-weight: bold;
  color: #395284;
  h2 {
    margin: 0 auto;
    letter-spacing: 1em;
    font-size: 5vw;
  }
  h6 {
    font-size: 2vw;
    margin: 1em auto;
    font-family: "PT Serif", serif;
  }
}
.login-card-form {
  padding: 0 20px 0 20px;
  margin-bottom: 25px;
}
.el-input, .el-select {
  width: 90%;
}
.login-card-btn {
  display: flex;
  justify-content: center;
  .el-button {
    width: 60%;
    font-size: 1.5vw;
    letter-spacing: 2em;
    margin-bottom: 20px;
  }
}
.el-form-item {
  position: relative;
}
.login-card-captchaCode-input {
  width: 30%;
  margin-right: 20px;
}
.login-card-captchaCode-image {
  width: 150px;
  height: 50px;
  position: absolute;
  bottom: 0;
}
</style>
