<template>
  <div class="user-container">
    <div class="user-header">
      <div class="user-header-search">
        <el-input v-model="username" placeholder="输入用户名..." prefix-icon="el-icon-user-solid" clearable></el-input>
        <el-input v-model="nickname" placeholder="输入昵称..." prefix-icon="el-icon-info" clearable></el-input>
        <el-input v-model="phone" placeholder="输入手机号..." prefix-icon="el-icon-phone" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch" size="mini" circle></el-button>
        <el-button type="danger" icon="el-icon-refresh-left" @click="handleSearchReset" size="mini" circle></el-button>
      </div>
      <div class="user-header-operation">
        <el-button type="primary" icon="el-icon-document-add" @click="handleAddUser" plain>新增用户</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handleDeleteBatchChange" plain>{{ deleteBatchTitle }}</el-button>
        <el-button type="success" icon="el-icon-finished" @click="handleDeleteBatch" v-show="isDeleteBatch" circle></el-button>
      </div>
    </div>
    <div class="user-main">
      <div class="user-main-header">
        <el-button @click="handleChangeUserType('all')">所有用户</el-button>
        <el-button type="primary" @click="handleChangeUserType('member')">会员用户</el-button>
        <el-button type="success" @click="handleChangeUserType('coach')">健身教练</el-button>
        <el-button type="warning" @click="handleChangeUserType('stuff')">工作人员</el-button>
        <el-button type="danger" @click="handleChangeUserType('admin')">管理员</el-button>
      </div>
      <el-table :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" v-if="isDeleteBatch"></el-table-column>
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="role" label="职别" width="100">
          <template slot-scope="scope">
            <el-tag :type="setRole(scope.row.role)" effect="plain">{{ setRoleTitle(scope.row.role) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别" width="55">
          <template slot-scope="scope">
            <el-tag :type="setTagType('sex', scope.row.sex)">{{ setTagTitle('sex', scope.row.sex) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="address" label="地址" width="200"></el-table-column>
        <el-table-column prop="createdTime" label="注册时间" width="250"></el-table-column>
        <el-table-column prop="expiredTime" label="到期时间" width="250"></el-table-column>
        <el-table-column prop="modifiedTime" label="修改时间" width="250"></el-table-column>
        <el-table-column prop="status" label="用户状态" width="80">
          <template slot-scope="scope">
            <el-tag :type="setTagType('status', scope.row.status)" effect="dark">{{ setTagTitle('status', scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-circle-close" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="user-footer">
      <Pagination />
    </div>
    <UserDialog ref="UserDialog" :dialogFormVisible="dialogVisible" @closeUserDialog="handleCloseUserDialog" />
  </div>
</template>

<script>
import Pagination from '@components/manage/Pagination.vue'
import UserDialog from '@components/dialogs/UserDialog.vue'
export default {
  name: 'User',
  components: {
    Pagination,
    UserDialog
  },
  data () {
    return {
      type: '',
      username: '',
      nickname: '',
      phone: '',
      isDeleteBatch: false,
      deleteBatchTitle: '批量删除',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // formData: [],
      dialogVisible: false
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      // this.$axios.get('/user/get/page', {
      //   params: {
      //     type: this.type,
      //     currentPage: this.currentPage,
      //     pageSize: this.pageSize,
      //     username: this.username,
      //     nickname: this.nickname,
      //     phone: this.phone
      //   }
      // }).then(res => {
      //   // console.log(res)
      //   this.$message.success(res.msg)
      //   const data = res.data
      //   this.tableData = data.records
      //   this.pageSize = data.size
      //   this.currentPage = data.current
      //   this.total = data.total
      // })
      this.tableData = [
        {
          id: 1,
          role: 'ROLE_ADMIN',
          username: 'admin',
          nickname: 'Admin',
          sex: true,
          phone: '12345678901',
          email: 'admin@test.com',
          createdTime: '2022/01/01 09:00:00',
          expiredTime: '2023/01/01 23:59:59',
          modifiedTime: '2022/01/01 23:59:59',
          status: true
        },
        {
          id: 2,
          role: 'ROLE_STUFF',
          username: 'stuff',
          nickname: 'Stuff',
          sex: false,
          phone: '12345678901',
          email: 'stuff@test.com',
          createdTime: '2022/01/01 09:00:00',
          expiredTime: '2023/01/01 23:59:59',
          modifiedTime: '2022/01/01 23:59:59',
          status: true
        },
        {
          id: 3,
          role: 'ROLE_COACH',
          username: 'coach',
          nickname: 'Coach',
          sex: true,
          phone: '12345678901',
          email: 'coach@test.com',
          createdTime: '2022/01/01 09:00:00',
          expiredTime: '2023/01/01 23:59:59',
          modifiedTime: '2022/01/01 23:59:59',
          status: true
        },
        {
          id: 4,
          role: 'ROLE_MEMBER',
          username: 'member',
          nickname: 'Member',
          sex: false,
          phone: '12345678901',
          email: 'member@test.com',
          createdTime: '2022/01/01 09:00:00',
          expiredTime: '2023/01/01 23:59:59',
          modifiedTime: '2022/01/01 23:59:59',
          status: true
        }
      ]
    },
    handleChangeUserType (type) {
      switch (type) {
        case 'all':
          this.type = ''
          break
        case 'admin':
          this.type = 'admin'
          break
        case 'stuff':
          this.type = 'stuff'
          break
        case 'coach':
          this.type = 'coach'
          break
        case 'member':
          this.type = 'member'
          break
        default:
          break
      }
      this.initData()
    },
    handleSearch () {},
    handleSearchReset () {
      this.username = ''
      this.nickname = ''
      this.phone = ''
      this.initData()
    },
    handleAddUser () {
      this.dialogVisible = true
      this.$store.commit('SET_USERDIALOGTITLE', {
        title: '添加用户'
      })
      this.$refs.UserDialog.initAdd()
    },
    handleDeleteBatchChange () {
      this.isDeleteBatch = !this.isDeleteBatch
    },
    handleDeleteBatch () {},
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (user) {
      this.dialogVisible = true
      // console.log(user)
      this.$store.commit('SET_USERINFOFORM', {
        user: user
      })
      this.$store.commit('SET_USERDIALOGTITLE', {
        title: '编辑用户'
      })
      this.$refs.UserDialog.initForm()
    },
    handleCloseUserDialog () {
      // 关闭UserDialog
      this.dialogVisible = false
    },
    sendEditInfo (user, event) {
      if (event === 'send') {
        // 向后端发送请求
      } else {
        // 关闭UserDialog
        this.dialogVisible = false
      }
    },
    handleDelete (user) {},
    setTagType (row, val) {
      if (val) {
        return 'success'
      } else {
        if (row === 'sex') {
          return 'danger'
        } else {
          return 'info'
        }
      }
    },
    setTagTitle (row, val) {
      if (row === 'sex') {
        if (val) {
          return '男'
        } else {
          return '女'
        }
      } else {
        if (val) {
          return '正常'
        } else {
          return '注销'
        }
      }
    },
    setRole (val) {
      switch (val) {
        case 'ROLE_ADMIN':
          return 'danger'
        case 'ROLE_STUFF':
          return 'waring'
        case 'ROLE_COACH':
          return 'success'
        case 'ROLE_MEMBER':
          return 'info'
        default:
          break
      }
    },
    setRoleTitle (val) {
      switch (val) {
        case 'ROLE_ADMIN':
          return '管理员'
        case 'ROLE_STUFF':
          return '工作人员'
        case 'ROLE_COACH':
          return '健身教练'
        case 'ROLE_MEMBER':
          return '会员用户'
        default:
          break
      }
    }
  },
  watch: {
    isDeleteBatch (newVal) {
      // console.log(newVal)
      // if (newVal) {
      //   this.deleteBatchTitle = '取消批量删除'
      // } else {
      //   this.deleteBatchTitle = '批量删除'
      // }
      this.deleteBatchTitle = newVal ? '取消批量删除' : '批量删除'
    },
    dialogVisible (newVal) {
      this.dialogVisible = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.user-header {
  width: 100%;
  height: 60px;
  position: relative;
}
.user-header-search {
  width: 70%;
  position: absolute;
  left: 20px;
  top: 20px;
  .el-input {
    width: 220px;
    margin-right: 20px;
  }
}
.user-header-operation {
  width: 30%;
  position: absolute;
  right: 0;
  top: 20px;
  display: flex;
  justify-content: flex-end;
  .el-button {
    margin-right: 20px;
  }
}
.user-main {
  width: 100%;
  height: 100%;
  margin: 25px auto;
  .el-table {
    width: calc(100% - 40px);
    margin: 0 auto;
  }
}
.user-main-header {
  width: calc(100% - 40px);
  margin: 20px auto;
  .el-button {
    margin-right: 20px;
  }
}
.user-footer {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
}
</style>
