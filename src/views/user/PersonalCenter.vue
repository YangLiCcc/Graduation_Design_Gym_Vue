<template>
  <div class="personal-center-container">
    <div class="personal-center-avatar">
      <div class="avatar-container">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="128"></el-avatar>
        <div class="avatar-upload-button">
          <el-button type="primary" size="mini" @click="handleUploadAvatar">点击上传头像</el-button>
        </div>
      </div>
    </div>
    <div class="personal-center-info">
      <div class="info-header">
        <div class="info-header-title">
          <span>个人信息</span>
        </div>
        <div class="info-header-operation">
          <el-button type="info" round @click="handleModifyInfo" :disabled="isChange">修改信息</el-button>
        </div>
      </div>
      <div class="info-description" v-if="!isChange">
        <el-descriptions :column="1" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            admin
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-collection-tag"></i>
              昵称
            </template>
            Admin
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i :class="sexIcon"></i>
              性别
            </template>
            <el-tag type="success">男</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-star-off"></i>
              年龄
            </template>
            22
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            12345678901
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-message"></i>
              邮箱
            </template>
            admin@test.com
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              地址
            </template>
            浙江省杭州市西湖区
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-magic-stick"></i>
              账号状态
            </template>
            <el-tag type="success" effect="dark">正常使用</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-date"></i>
              注册时间
            </template>
            2022/01/01 09:00:00
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-date"></i>
              到期时间
            </template>
            2023/01/01 23:59:59
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-date"></i>
              上次修改
            </template>
            2022/01/02 10:59:32
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="info-description-edit" v-else>
        <el-form model="infoEditForm" :label-width="labelWidth">
          <el-form-item label="用户名">
            <el-input v-model="infoEditForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="infoEditForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="infoEditForm.sex" :label="false" border>女</el-radio>
            <el-radio v-model="infoEditForm.sex" :label="true" border>男</el-radio>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="infoEditForm.age"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="infoEditForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="infoEditForm.email"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="infoEditForm.address" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="el-form-item-button">
              <el-button @click="handleModifyInfo">取 消</el-button>
              <el-button type="primary">保 存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" center>
      <div class="dialog-content">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8090/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSendForm">上 传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PersonalCenter',
  data () {
    return {
      imageUrl: '',
      tabPosition: 'top',
      sexIcon: '',
      isChange: false,
      labelWidth: '120px',
      infoEditForm: {
        username: 'admin',
        nickname: 'Admin',
        sex: true,
        age: '22',
        phone: '12345678901',
        email: 'admin@test.com',
        address: '浙江省杭州市西湖区'
      },
      dialogVisible: false,
      dialogTitle: '上传头像'
    }
  },
  created () {
    this.handleSexIcon()
  },
  methods: {
    handleSexIcon () {
      const flag = true
      if (flag) {
        this.sexIcon =  'el-icon-male'
      } else {
        this.sexIcon =  'el-icon-female'
      }
    },
    handleModifyInfo () {
      this.isChange = !this.isChange
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleUploadAvatar () {
      this.dialogVisible = !this.dialogVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-center-container {
  width: 100%;
  height: 100%;
}
.personal-center-avatar {
  width: 50%;
  height: 180px;
  margin: 20px auto;
  // border-bottom: 1px solid grey;
}
.avatar-container {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  text-align: center;
}
.avatar-upload-button {
  width: 100%;
  height: 30px;
  margin: 5px auto;
  text-align: center;
}
.personal-center-info {
  width: 50%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 20px;
  box-shadow: 10px 10px 5px grey;
}
.info-header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  position: relative;
}
.info-header-title {
  width: 20%;
  height: 60px;
  position: absolute;
  left: 0;
  span {
    font-size: 24px;
    font-weight: bold;
  }
}
.info-header-operation {
  width: 20%;
  height: 60px;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: flex-end;
  .el-button {
    height: 40px;
    margin-top: 10px;
  }
}
.el-form-item-button {
  display: flex;
  justify-content: flex-end;
}
.dialog-content {
  width: 100%;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed grey !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 64px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
}
.avatar {
  width: 128px;
  height: 128px;
  display: block;
}
</style>
