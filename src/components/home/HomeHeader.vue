<template>
  <div class="home-header-container">
    <div class="home-header-logo">
      <img src="@images/MyLogo.png" alt="Logo">
    </div>
    <div class="home-header-menu">
      <el-menu default-active="1" class="home-header-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <i class="iconfont">&#xe6cb;</i>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="iconfont">&#xe69d;</i>
          <span>教练介绍</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="iconfont">&#xe883;</i>
          <span>课程介绍</span>
        </el-menu-item>
        <el-menu-item index="4" v-if="isLogin">
          <i class="iconfont">&#xe6ae;</i>
          <span>用户登录</span>
        </el-menu-item>
        <el-menu-item index="4" v-else>
          <i class="iconfont">&#xe63d;</i>
          <span>个人中心</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      isLogin: true
    }
  }
}
</script>

<style lang="scss" scoped>
.home-header-container {
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: relative;
  line-height: 60px;
}
.home-header-logo {
  width: 250px;
  height: 60px;
  position: absolute;
  left: 10px;
  top: 0;
  img {
    width: 240px;
    height: 60px;
  }
}
.home-header-menu {
  width: 520px;
  height: 60px;
  position: absolute;
  right: 0;
  top: 0;
}
.home-header-menu-demo {
  background-color: #ffffff00;
}
.el-menu-item {
  span {
    font-size: 18px;
    padding-left: .5em;
  }
}
</style>
