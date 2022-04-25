<template>
  <div class="register-card-container">
    <div class="register-card-title">
      <h2>注册</h2>
      <h6>Register an Account for You.</h6>
    </div>
    <div class="register-card-form">
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" :label-position="labelPosition">
        <el-form-item label="职别" prop="roleId">
          <el-select v-model="registerForm.roleId" placeholder="请选择您的职别">
            <el-option v-for="item in roles" :key="item.id" :label="item.description" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input
            type="text"
            v-model="registerForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称">
          <el-input
            type="text"
            v-model="registerForm.nickname"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model="registerForm.password"
            show-password
            prefix-icon="el-icon-key"
            placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="passwordCheck" label="确认密码">
          <el-input
            type="password"
            v-model="registerForm.passwordCheck"
            show-password
            prefix-icon="el-icon-key"
            placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio v-model="registerForm.sex" label="1" border>男</el-radio>
          <el-radio v-model="registerForm.sex" label="0" border>女</el-radio>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
          <el-input
            type="text"
            v-model="registerForm.age"
            prefix-icon="el-icon-view"
            placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input
            type="text"
            v-model="registerForm.phone"
            prefix-icon="el-icon-phone-outline"
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input
            type="text"
            v-model="registerForm.email"
            prefix-icon="el-icon-message"
            placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="verifyCode" label="员工码" v-if="showCode(this.registerForm.roleId)">
          <el-input
            type="text"
            v-model="registerForm.code"
            prefix-icon="el-icon-star-off"
            placeholder="请输入内部员工码"></el-input>
        </el-form-item>
        <el-form-item prop="captchaCode" label="验证码">
          <el-input
            type="text"
            v-model="registerForm.captchaCode"
            placeholder="请输入验证码"
            class="register-card-captchaCode-input"
          ></el-input>
          <el-image :src="src" class="register-card-captchaCode-image" @click="handleResetCaptchaCode"></el-image>
        </el-form-item>
      </el-form>
    </div>
    <div class="register-card-btn">
      <el-button type="primary" @click="handleRegister('registerForm')">点击注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterCard',
  data () {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validateNickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.passwordCheck !== '') {
          this.$refs.registerForm.validateField('passwordCheck')
        }
        callback()
      }
    }
    var validatePasswordCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateRole = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择职别'))
      } else {
        callback()
      }
    }
    var validateSex = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择性别'))
      } else {
        callback()
      }
    }
    var validateAge = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入年龄'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    }
    var validateVerifyCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入内部员工码'))
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
    return {
      labelPosition: 'top',
      datePickerValue: '',
      registerForm: {
        roleId: '',
        username: '',
        nickname: '',
        sex: '',
        age: '',
        password: '',
        passwordCheck: '',
        phone: '',
        email: '',
        verifyCode: '',
        captchaCode: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur', required: true }
        ],
        nickname: [
          { validator: validateNickname, trigger: 'blur', required: true }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur', required: true }
        ],
        passwordCheck: [
          { validator: validatePasswordCheck, trigger: 'blur', required: true }
        ],
        roleId: [
          { validator: validateRole, trigger: 'change', required: true }
        ],
        sex: [
          { validator: validateSex, trigger: 'change', required: true }
        ],
        age: [
          { validator: validateAge, trigger: 'blur', required: true },
          { min: 1, max: 2, message: '请输入正确的年龄' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur', required: true }
        ],
        verifyCode: [
          { validator: validateVerifyCode, trigger: 'blur', required: true }
        ],
        captchaCode: [
          { validator: validateCaptchaCode, trigger: 'blur', required: true }
        ]
      },
      roles: [],
      src: 'http://localhost:8090/captcha?time=' + new Date()
    }
  },
  created () {
    this.initRoles()
  },
  methods: {
    initRoles () {
      this.$axios.get('/role').then(res => {
        // console.log(res)
        if (res.code === 200) {
          console.log(res.data)
          // this.roles = res.data
        }
      })
    },
    handleRegister (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/register', this.registerForm).then(res => {
            console.log(res)
            // if (res.code === 200) {
            //   this.$message.success('注册成功!')
            //   this.$emit('changestate', true)
            // } else {
            //   this.$message.error(res.message)
            // }
          })
          // console.log(this.registerForm)
        }
      })
    },
    showCode (val) {
      // console.log(val)
      this.$nextTick()
      if (val === 1 || val === 2 || val === 3) {
        return true
      } else {
        return false
      }
    },
    handleDatePickerChange (value) {
      // console.log(value)
      this.registerForm.createdTime = value[0]
      this.registerForm.expiredTime = value[1]
      // console.log(this.registerForm)
    },
    handleResetCaptchaCode () {
      this.src = 'http://localhost:8090/captcha?time=' + new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.register-card-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 1;
  transition: all 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  padding: 5%;
}
.register-card-title {
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
  }
}
.register-card-form {
  margin-bottom: 25px;
}
.el-input, .el-select {
  width: 90%;
}
.register-card-btn {
  display: flex;
  justify-content: center;
  .el-button {
    width: 60%;
    font-size: 1.5vw;
    letter-spacing: 2em;
    margin-bottom: 20px;
  }
}
.register-card-captchaCode-input {
  width: 30%;
  margin-right: 20px;
}
.register-card-captchaCode-image {
  width: 150px;
  height: 50px;
  position: absolute;
  bottom: 0;
}
</style>
