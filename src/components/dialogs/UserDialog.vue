<template>
  <el-dialog :title="GET_USERDIALOGTITLE" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
    <el-form :model="form" ref="UserDialogForm">
      <el-form-item label="职别" :label-width="formLabelWidth">
        <el-select v-model="form.role" placeholder="请选择活动区域">
          <el-option v-for="option in roleOptions" :key="option.id" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" :disabled="isAdd"></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio v-model="form.sex" :label="false" border>女</el-radio>
        <el-radio v-model="form.sex" :label="true" border>男</el-radio>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" :label-width="formLabelWidth">
        <el-date-picker v-model="form.createdTime" type="datetime" placeholder="选择注册时间" default-time="00:00:00" :disabled="isAdd"></el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间" :label-width="formLabelWidth">
        <el-date-picker v-model="form.expiredTime" type="datetime" placeholder="选择到期时间" default-time="23:59:59"></el-date-picker>
      </el-form-item>
      <el-form-item label="用户状态" :label-width="formLabelWidth">
        <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" active-text="正常" inactive-text="注销"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSendForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserDialog',
  props: {
    // form: Object,
    dialogFormVisible: Boolean
  },
  data () {
    return {
      form: {
        role: '',
        username: '',
        nickname: '',
        sex: true,
        phone: '',
        address: '',
        createdTime: '',
        expiredTime: '',
        status: true
      },
      formLabelWidth: '120px',
      roleOptions: [
        {
          id: 0,
          label: '管理员',
          value: 'ROLE_ADMIN'
        },
        {
          id: 1,
          label: '工作人员',
          value: 'ROLE_STUFF'
        },
        {
          id: 2,
          label: '健身教练',
          value: 'ROLE_COACH'
        },
        {
          id: 3,
          label: '会员用户',
          value: 'ROLE_MEMBER'
        }
      ],
      isAdd: true
    }
  },
  methods: {
    initForm () {
      this.form = this.$store.getters.GET_USERINFOFORM ? this.$store.getters.GET_USERINFOFORM : this.form
      // console.log(this.form)
    },
    initAdd () {
      this.isAdd = false
    },
    handleClose () {
      // console.log(done)
      this.$confirm('该操作不会保存已填写的信息,是否继续?', '取消', {
        confirmButtonText: '确认取消',
        cancelButtonText: '继续填写',
        type: 'warning'
      }).then(() => {
        const msg = this.$store.getters.GET_USERDIALOGTITLE
        this.$message.error('已取消' + msg.substring(0, 2) + '!')
        this.$emit('closeUserDialog')
        this.$store.commit('REMOVE_USERINFOFORM')
        this.$store.commit('REMOVE_USERDIALOGTITLE')
        location.reload()
      }).catch(() => {})
    },
    handleSendForm () {
      const operation = this.$store.getters.GET_USERDIALOGTITLE
      this.$confirm('是否保存已填写的信息?', '保存', {
        confirmButtonText: '确认',
        cancelButtonText: '继续填写',
        type: 'warning'
      }).then(() => {
        if (operation.substring(0, 2) === '编辑') {
          this.$axios.post('/user/update', this.form).then(res => {
            console.log(res)
          })
        } else if (operation.substring(0, 2) === '添加') {
          this.$axios.post('/user/save', this.form).then(res => {
            console.log(res)
          })
        }
      }).catch(() => {
        this.$message.info('已取消保存,请继续填写')
      })
      // this.$emit('closeUserDialog')
      // this.$store.commit('REMOVE_USERINFOFORM')
      // this.$store.commit('REMOVE_USERDIALOGTITLE')
    }
  },
  computed: {
    ...mapGetters(['GET_USERDIALOGTITLE'])
  }
}
</script>

<style lang="scss" scoped>

</style>
