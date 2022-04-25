<template>
  <div class="user-index-container">
    <div class="user-index-cardContainer">
      <div v-if="isLogin">
        <div class="user-index-loginCard">
          <LoginCard />
        </div>
        <div class="user-index-changeCard">
          <h2>欢迎回来!</h2>
          <h6>输入您的账号和密码进行登录,就可以开始您的健身之旅啦!</h6>
          <el-button @click="moveCard" type="info" round icon="el-icon-arrow-left">还没有账号?点击注册</el-button>
        </div>
      </div>

      <div v-else>
        <div class="user-index-registerCard">
          <RegisterCard @changestate="changeState" />
        </div>
        <div class="user-index-changeCard user-index-move">
          <h2>欢迎新成员!</h2>
          <h6>请在表格内填写您的相关信息!若您是员工,请输入Boss提供的内部员工码,即可完成管理员注册并开始您的管理之路啦!</h6>
          <el-button @click="moveCard" type="info" round>已是内部用户?点击登录<i class="el-icon-arrow-right" /></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginCard from '@views/user/LoginCard.vue'
import RegisterCard from '@views/user/RegisterCard.vue'
export default {
  name: 'Index',
  components: {
    LoginCard,
    RegisterCard
  },
  data () {
    return {
      isLogin: true
    }
  },
  methods: {
    moveCard () {
      this.isLogin = !this.isLogin
    },
    changeState (flag) {
      this.isLogin = flag
    }
  }
}
</script>

<style lang="scss" scoped>
.user-index-container{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // 径向渐变背景 ellipse表示椭圆
  background: radial-gradient(ellipse at center, #fffeea 0%, #fffeea 35%, #b7e8eb 100%);
  // 溢出隐藏
  overflow: hidden;
}
.user-index-cardContainer{
  position: relative;
  width: 95%;
  height: 85%;
  border: 1px solid #eee;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba($color: #2a3c60, $alpha: 0.8);
  -webkit-box-shadow: 0 0 20px rgba($color: #2a3c60, $alpha: 0.8);
  -moz-box-shadow: 0 0 20px rgba($color: #2a3c60, $alpha: 0.8);
  background-color: white;
  z-index: 0;
  overflow: hidden;
}
.user-index-loginCard {
  position: absolute;
  left: 0;
  width: 55%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.user-index-registerCard {
  position: absolute;
  left: 45%;
  width: 55%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.user-index-changeCard {
  position: absolute;
  left: 55%;
  width: 45%;
  height: 100%;
  overflow: hidden;
  background-color: #ffc554;
  z-index: 2;
  transition: all 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  h2 {
    font-size: 5vw;
    margin: 0;
  }
  h6 {
    font-size: 2vw;
    margin-top: 1vh;
    margin-bottom: 1vh;
  }
  .el-button {
    align-self: center;
    width: 80%;
    font-size: 1.5vw;
    margin-top: 20px;
  }
  h2, h6, .el-button {
    padding: 5%;
  }
}

.user-index-changeCard.user-index-move {
  left: 0;
  transition: all 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>
