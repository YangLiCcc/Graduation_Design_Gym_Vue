<template>
  <div class="index-container">
    <div class="index-aside" :style="{ width: sideWidth + 'px' }">
      <el-menu
        :default-active="this.$route.path"
        class="index-aside-menu"
        active-text-color="#7700ff"
        :collapse="isCollapse"
        router>
        <div class="index-aside-menu-title">
          <i class="iconfont">&#xea73;</i>
          <span v-show="!isCollapse">健身房管理系统</span>
        </div>
        <el-menu-item index="/manage">
          <i class="iconfont">&#xe6cb;</i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/manage/user">
          <i class="iconfont">&#xe63d;</i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/manage/course">
          <i class="iconfont">&#xe883;</i>
          <span slot="title">课程管理</span>
        </el-menu-item>
        <el-menu-item index="/manage/instrument">
          <i class="iconfont">&#xe614;</i>
          <span slot="title">器械管理</span>
        </el-menu-item>
        <el-menu-item index="/manage/locker">
          <i class="iconfont">&#xe61a;</i>
          <span slot="title">储物柜管理</span>
        </el-menu-item>
        <el-menu-item index="/manage/repair">
          <i class="iconfont">&#xe635;</i>
          <span slot="title">维修管理</span>
        </el-menu-item>
        <el-menu-item index="/manage/reverse">
          <i class="iconfont">&#xe60d;</i>
          <span slot="title">预约管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont">&#xe6ae;</i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item index="2-1">
            <i class="iconfont">&#xe62b;</i>
            <span slot="title">权限管理</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <i class="iconfont">&#xe60e;</i>
            <span slot="title">菜单管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="index-main" :style="{ width: mainWidth + 'px' }">
      <!-- <div class="index-main-back">
        <el-button type="primary" icon="el-icon-arrow-left" size="mini" plain @click="handleBackToHome">退出系统</el-button>
        <el-page-header @back="handleBackToHome" content="管理系统"></el-page-header>
      </div> -->
      <div class="index-main-header">
        <div class="index-main-header-operation">
          <i class="iconfont" v-if="isCollapse" @click="handleMenuCollapse">&#xe624;</i>
          <i class="iconfont" v-else @click="handleMenuCollapse">&#xe622;</i>
        </div>
        <div class="index-main-header-breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
            <el-breadcrumb-item v-for="item in this.$route.matched" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="index-main-header-user">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="50"></el-avatar>
          <el-dropdown @command="handleDropdownItemClick">
            <span class="index-dropdown-user">Admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in dropdownItems" :key="item.index" :command="item.path">{{ item.title }}</el-dropdown-item>
              <el-dropdown-item divided style="color: red;">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="index-main-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      isCollapse: false,
      sideWidth: 200,
      mainWidth: 0,
      dropdownItems: [
        {
          index: 0,
          title: '个人中心',
          path: '/manage/personal'
        },
        {
          index: 1,
          title: '修改密码'
        }
      ]
    }
  },
  created () {
    // console.log(document.body.offsetWidth)
    this.mainWidth = document.body.offsetWidth - this.sideWidth
    console.log(this.$route.matched)
  },
  methods: {
    handleMenuCollapse () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.sideWidth = 64
        this.mainWidth = document.body.offsetWidth - this.sideWidth
      } else {
        this.sideWidth = 200
        this.mainWidth = document.body.offsetWidth - this.sideWidth
      }
    },
    handleBackToHome () {
      this.$confirm('即将退出管理系统返回首页...', '返回首页', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('已返回首页')
        this.$router.push('/')
      }).catch(() => {
        this.$message.info('已取消退出')
      })
    },
    handleDropdownItemClick (path) {
      // console.log(path)
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}
.index-aside {
  // width: 200px;
  height: 100%;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.index-aside-menu-title {
  margin: 20px 10px;
  .iconfont {
    font-size: 24px;
  }
  span {
    font-size: 20px;
    font-weight: bold;
    margin-left: .5em;
  }
}
.index-aside-menu {
  height: 100%;
  background-color: #7777777a;
  overflow: hidden;
  span {
    font-size: 18px;
    margin-left: .5em;
  }
  .el-submenu .el-menu-item {
    background-color: #7777777a;
  }
}
.index-main {
  // width: calc(100% - 200px);
  height: 100%;
  overflow: auto;
  position: absolute;
  right: 0;
  top: 0;
}
.index-main-back {
  width: 100%;
  height: 40px;
  .el-button {
    margin-top: 5px;
    margin-left: 20px;
  }
}
.index-main-header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgb(54, 54, 54);
  position: relative;
}
.index-main-header-operation {
  width: 50px;
  line-height: 60px;
  position: absolute;
  left: 0;
  i {
    font-size: 30px;
    margin-left: 20px;
    cursor: pointer;
  }
  .el-button {
    margin-left: 20px;
  }
}
.index-main-header-breadcrumb {
  width: 50%;
  height: 60px;
  position: absolute;
  left: 80px;
  .el-breadcrumb {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
  }
}
.index-main-header-user {
  position: absolute;
  right: 0;
  width: 200px;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: flex-end;
  .el-dropdown {
    margin-right: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
  .index-dropdown-user {
    font-size: 18px;
  }
}
.index-main-body {
  width: 100%;
  height: 100%;
}
</style>
