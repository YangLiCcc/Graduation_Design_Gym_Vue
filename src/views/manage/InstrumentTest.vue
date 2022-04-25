<template>
  <div class="user-container">
    <div class="user-header">
      <div class="user-header-search">
        <el-button @click="handleChangeUserType('all')">所有区域</el-button>
        <el-button type="success" @click="handleChangeUserType('coach')">男更衣室</el-button>
        <el-button type="danger" @click="handleChangeUserType('admin')">女更衣室</el-button>
      </div>
      <div class="user-header-operation">
        <el-button type="primary" icon="el-icon-document-add" @click="handleAddUser" plain>新增储物柜</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handleDeleteBatchChange" plain>{{ deleteBatchTitle }}</el-button>
        <el-button type="success" icon="el-icon-finished" @click="handleDeleteBatch" v-show="isDeleteBatch" circle></el-button>
      </div>
    </div>
    <div class="user-main">
      <el-table :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" v-if="isDeleteBatch"></el-table-column>
        <el-table-column prop="id" label="编号" width="55"></el-table-column>
        <el-table-column prop="sex" label="更衣室" width="100">
          <template slot-scope="scope">
            <el-tag :type="setTagType('sex', scope.row.sex)">{{ setTagTitle('sex', scope.row.sex) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="area" label="区域" width="100">
          <template slot-scope="scope">
            <el-tag :type="setArea(scope.row.area)" effect="plain">{{ scope.row.area }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="status" label="储物柜状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="setTagType('status', scope.row.status)" effect="dark">{{ setTagTitle('status', scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="usedBy" label="预订人员" width="120"></el-table-column>
        <el-table-column prop="useTime" label="使用时间" width="250"></el-table-column>
        <el-table-column prop="returnTime" label="归还时间" width="250"></el-table-column>
        <el-table-column prop="createdTime" label="创建时间" width="250"></el-table-column>
        <el-table-column prop="createdBy" label="创建人员" width="180"></el-table-column>
        <el-table-column prop="modifiedTime" label="修改时间" width="250"></el-table-column>
        <el-table-column prop="modifiedBy" label="修改人员" width="180"></el-table-column>
        <el-table-column prop="isDeleted" label="删除状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="setTagType('isDeleted', scope.row.isDeleted)" effect="dark">{{ setTagTitle('isDeleted', scope.row.isDeleted) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deletedTime" label="删除时间" width="250"></el-table-column>
        <el-table-column prop="deletedBy" label="删除人员" width="180"></el-table-column>
        <el-table-column label="操作" width="350" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-circle-close" @click="handleDelete(scope.row)" size="mini">删除</el-button>
            <el-button type="info" icon="el-icon-date" @click="handleDialogShow(scope.row)" size="mini">预约</el-button>
            <el-button type="warning" icon="el-icon-share" @click="handleDialogShow(scope.row)" size="mini">报修</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="user-footer">
      <Pagination />
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <el-form :model="form" ref="UserDialogForm">
      <el-form-item label="物品类型" :label-width="formLabelWidth">
        <el-input v-model="form.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="更衣室" :label-width="formLabelWidth">
        <el-radio v-model="form.sex" :label="false" border disabled>女</el-radio>
        <el-radio v-model="form.sex" :label="true" border disabled>男</el-radio>
      </el-form-item>
      <el-form-item label="区域" :label-width="formLabelWidth">
        <el-input v-model="form.area" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="预约日期" :label-width="formLabelWidth">
        <el-date-picker v-model="form.submitTime" type="date" placeholder="选择预约日期" default-time="23:59:59"></el-date-picker>
      </el-form-item>
      <el-form-item label="预约时间" :label-width="formLabelWidth">
        <el-time-picker
          is-range
          v-model="value1"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">
        </el-time-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSendForm">预 约</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import Pagination from '@components/manage/Pagination.vue'
export default {
  name: 'InstrumentTest',
  components: {
    Pagination
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
      dialogVisible: false,
      dialogTitle: '预订储物柜',
      form: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    handleDialogShow (val) {
      this.dialogVisible = true
      this.form = val
    },
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
          sex: true,
          area: 'A区',
          name: '1号柜',
          createdTime: '2022/01/01 09:00:00',
          createdBy: 'Admin',
          modifiedTime: '2022/01/01 23:59:59',
          modifiedBy: 'Admin',
          deletedTime: '',
          isDeleted: false,
          status: true,
          usedBy: '',
          useTime: '',
          returnTime: '',
          type: '储物柜',
          description: '柜门打不开',
          repairBy: 'Admin',
          repairStartTime: '',
          repairDoneTime: ''
        },
        {
          id: 2,
          sex: true,
          area: 'B区',
          name: '1号柜',
          createdTime: '2022/01/01 09:00:00',
          createdBy: 'Admin',
          modifiedTime: '2022/01/01 23:59:59',
          modifiedBy: 'Admin',
          deletedTime: '2022/01/02 10:00:00',
          deletedBy: 'Admin',
          isDeleted: true,
          status: false,
          usedBy: '',
          useTime: '',
          returnTime: ''
        },
        {
          id: 3,
          sex: true,
          area: 'C区',
          name: '1号柜',
          createdTime: '2022/01/01 09:00:00',
          createdBy: 'Admin',
          modifiedTime: '2022/01/01 23:59:59',
          modifiedBy: 'Admin',
          deletedTime: '',
          isDeleted: false,
          status: false,
          usedBy: 'Member',
          useTime: '2022/01/04 12:00:00',
          returnTime: '2022/01/04 13:30:00'
        },
        {
          id: 4,
          sex: false,
          area: 'D区',
          name: '1号柜',
          createdTime: '2022/01/01 09:00:00',
          createdBy: 'Admin',
          modifiedTime: '2022/01/01 23:59:59',
          modifiedBy: 'Admin',
          deletedTime: '',
          isDeleted: false,
          status: true,
          usedBy: '',
          useTime: '',
          returnTime: ''
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
      if (row === 'isDeleted') {
        return val ? 'danger' : 'success'
      }
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
          return '男更衣室'
        } else {
          return '女更衣室'
        }
      } else if (row === 'isDeleted') {
        if (val) {
          return '已被删除'
        } else {
          return '未被删除'
        }
      } else {
        if (val) {
          return '正常使用'
        } else {
          return '无法使用'
        }
      }
    },
    setArea (val) {
      switch (val) {
        case 'A区':
          return 'danger'
        case 'B区':
          return 'waring'
        case 'C区':
          return 'success'
        case 'D区':
          return 'info'
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
