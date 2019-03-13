<template>
  <div v-loading="loading" class="personalInforEdit">
    <el-row>
      <el-col :span="14">
        <!-- 信息编辑界面 -->
        <div :model="fitter">
          <div class="content">
            <div class="left">
              <el-upload
                :action="uploadUrl"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader">
                <img v-if="avatar" :src="avatar" class="avatar">
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                <div v-else >
                  <!-- <img src="/static/image/male.png" style="width:120px;height:120px;"> -->
                  <img v-if="sex==null" src="/static/image/neuter.png" style="width:120px;height:120px;">
                  <img v-if="sex=='male'" src="/static/image/male.png" style="width:120px;height:120px;">
                  <img v-if="sex=='female'" src="/static/image/female.png.png" style="width:120px;height:120px;">
                </div>
                <p style="color:#7C8FA6;font-size:14px">Upload your photo</p>
              </el-upload>
            </div>
            <div class="right">
              <div class="right-content">
                <div class="left-fixed">First Name</div>
                <div class="right-fixed">
                  <el-input v-model="fitter.first_name" style="width:240px;" type="text" placeholder="Please enter your first name"/>
                  <span style="margin:0 15px;">Last Name</span>
                  <el-input v-model="fitter.last_name" style="width:240px;" type="text" placeholder="Please enter your last name"/>
                </div>
              </div>
              <div class="right-content">
                <div class="left-fixed">Gender</div>
                <div class="right-fixed">
                  <el-radio-group v-model="fitter.gender">
                    <el-radio label="male">male</el-radio>
                    <el-radio label="female">female</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="right-content">
                <div class="left-fixed">Dpartment</div>
                <div class="right-fixed">
                  <el-input v-model="fitter.department" style="width:380px;" maxlength="50" type="text" placeholder="Your department"/>
                </div>
              </div>
              <div class="right-content">
                <div class="left-fixed">Position</div>
                <div class="right-fixed">
                  <el-input v-model="fitter.position" style="width:380px;" type="text" placeholder="Your position"/>
                </div>
              </div>
              <div class="right-content">
                <div class="left-fixed">Mobile</div>
                <div class="right-fixed">
                  <el-input v-model="fitter.telephone" placeholder="Enter phone number" class="input-with-select" style="width:380px">
                    <el-select slot="prepend" v-model="fitter.telephone_code" placeholder="+86 china" style="width:150px;">
                      <el-option
                        v-for="item in phone_codeConfig"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                        <!-- <span style="float: left">{{ item.label }}</span>     -->
                      </el-option>
                    </el-select>
                  </el-input>
                </div>
              </div>
              <div class="right-content">
                <div class="left-fixed">Skype</div>
                <div class="right-fixed">
                  <el-input v-model="fitter.skype" style="width:380px;" type="text" placeholder="Your skype account"/>
                </div>
              </div>
              <div class="right-content">
                <div class="left-fixed">QQ</div>
                <div class="right-fixed">
                  <el-input v-model="fitter.qq" style="width:380px;" type="text" placeholder="Your QQ account"/>
                </div>
              </div>
              <div class="right-content">
                <div class="left-fixed">Wechat</div>
                <div class="right-fixed">
                  <el-input v-model="fitter.wechat" style="width:380px;" type="text" placeholder="Your wechat account"/>
                </div>
              </div>
            </div>
            <!-- </el-form> -->
          </div>
          <div :disabled="((fitter.first_name == ''))" class="save" @click="save()">Save</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getpersonalInformation, savePersonalInformation } from '@/api/accountManagement'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import store from '@/store/'
export default {
  name: 'PersonalInforEdit',
  data() {
    return {
      loading: false,
      imageUrl: '',
      uploadingFiles: [],
      radio: '',
      fitter: {
        name: '',
        first_name: '',
        last_name: '',
        gender: '',
        department: '',
        position: '',
        telephone: '',
        telephone_code: '',
        skype: '',
        qq: '',
        wechat: '',
        avatar: ''
      },
      phone_codeConfig: ''

    }
  },
  watch: {
    // radio(val){
    //     console.log(val)
    // }
  },
  computed: {
    ...mapGetters([
      'configs',
      'name',
      'avatar',
      'sex'
    ]),
    uploadUrl() {
      return process.env.BASE_API + 'v1/personal/avatar'
    },
    uploadHeaders() {
      return { Authorization: 'Bearer ' + getToken() }
    }
  },
  created() {
    this.getpersonalInformationData()
    this.ConfigUnit()
  },
  methods: {
    //   图片上传相关
    handleBeforeUpload(file) {
      file.percent = 0
      this.uploadingFiles.push(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    uploadOnProgress(e, file) {
      const index = this.uploadingFiles.findIndex(uploadingFile => uploadingFile.uid === file.uid)
      this.uploadingFiles[index].percent = Math.round(e.percent)
      this.$set(this.uploadingFiles, index, file)
    },
    handleSuccess(response, file, fileList) {
      const index = this.uploadingFiles.findIndex(uploadingFile => uploadingFile.uid === file.uid)
      this.uploadingFiles.splice(index, 1)
      if (response.code === 0) {
        this.files.push(response.data)
      }
    },

    // handleAvatarSuccess
    handleAvatarSuccess(res, file) {
      const avatar = URL.createObjectURL(file.raw)
      this.$store.commit('SET_AVATAR', avatar)
    },

    //   获取个人信息
    getpersonalInformationData() {
      this.loading = true
      getpersonalInformation().then(response => {
        if (response.data.code == 0) {
          this.fitter = response.data.data
          this.fitter.name = this.fitter.first_name + this.fitter.last_name
          this.loading = false
        }
      })
    },

    // beforeAvatarUpload
    beforeAvatarUpload(file) {
      const isJPG = file.type == 'image/jpeg'
      const isPNG = file.type == 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!(isJPG || isPNG)) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },

    // 保存个人信息
    save() {
      savePersonalInformation({
        ...this.fitter,
        avatar: ''
      }).then(response => {
        if (response.data.code == 0) {
          console.log('保存成功')
          // this.name = this.fitter.name
          // this.avatar = this.imageUrl
          // store.dispatch('GetUserInfo')
          // store.dispatch('SET_NAME',this.fitter.name)
          // store.dispatch('SET_AVATAR',this.imageUrl)
          // store.dispatch('GetUserInfo')
          console.log('GetUserInfo')
          console.log(this.avatar)
          this.$message({
            message: '个人信息修改保存成功',
            type: 'success'
          })
          this.$router.push({ path: 'personalInformation' })
        }
      })
    },

    // 配置文件加载
    ConfigUnit() {
      this.phone_codeConfig = this.configs.phone_number_codes
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//普通DOM样式
.personalInforEdit{
    padding:40px 0 0 100px;
    .content {
        overflow: hidden;
        // input {
        //   border: 1px solid #dfe3e9;
        //   outline: none;
        //   box-shadow: none;
        //   color: #164061;
        //   height: 30px;
        //   line-height: 30px;
        //   padding-left: 14px;
        //   border-radius: 4px;
        // }
        input::-webkit-input-placeholder {
        color: #909399;
        }
        input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #909399;
        }
        input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #909399;
        }
        input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #909399;
        }
        .left {
        float: left;
        .hiddenInput{
            opacity: 0;
            }
        .inputFill{
        width: 120px;
        margin: 0 auto;
        position: relative;
        p{
                text-align: center;
                font-size: 16px;
                color: #7C8FA6;
        }
        .hiddenInput{
            position: absolute;
            top: 0;
            width: 120px;
            left: 0;
            opacity: 0;
        }
        }
            // p{
            //     width: 120px;
            //     text-align: center;
            //     font-size: 16px;
            //     color: #7C8FA6;
            // }
            .avatar-uploader{
                img{
                    width:120px;
                    height:120px;
                    border-radius:50%;
                }
            }
        }
        .right {
        float: left;
        margin-left: 70px;
        color: #7F8FA4;
        .right-content {
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            margin-bottom: 30px;
            .left-fixed {
            float: left;
            width: 80px;
            font-size: 14px;
            color: #7f8fa4;
            }
            .right-fixed {
            float: left;
            margin-left: 34px;
            .empty{
                color: #909399;
            }
            .select-input {
                input {
                color: #ffa500;
                }
            }
            }
        }
    }

  }
  .save {
        margin-left: 315px;
        width: 240px;
        height: 40px;
        line-height: 40px;
        background: #ffa800;
        border-radius: 4px;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0.77px;
        text-align: center;
        cursor: pointer;
    }
}

</style>

<style rel="stylesheet/scss" lang="scss">
//element样式
.personalInforEdit{
    .el-radio + .el-radio {
        margin-left: 115px;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #ffa500;
        background: #ffa500;
    }
    .el-radio__input.is-checked + .el-radio__label {
        color: #ffa500;
    }
    .el-select .el-input.is-focus .el-input__inner {
        border-color: #dfe3e9;
    }
    .el-select-dropdown__item.selected {
        color: #164061;
        font-weight: 700;
    }
    .special-input input{
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }
    .el-input__inner:focus{
        border:1px solid rgba(255,168,0,1);
    }
}
</style>

