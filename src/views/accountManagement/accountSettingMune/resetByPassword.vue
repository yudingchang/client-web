<template>
  <div class="resetByPassword">
    <el-form ref="form" :model="data">
      <el-steps :active="active" finish-status="finish" align-center>
        <el-step title="Login password verification"/>
        <el-step title="Set a new password"/>
        <el-step title="Password resetting successfully"/>
      </el-steps>
      <div v-if="active==1" class="password">
        <el-form-item :rules="[{ required: true, message: 'Please enter your old password', trigger: 'blur' }]" prop="password" style="width:350px;margin:0 auto;">
          <el-input
            v-model="data.password"
            placeholder="Enter your old password"
            name="username"
            type="password"
            style="text-align:center"
          />
        </el-form-item>
        <el-button class="next" @click="goActiveTwo()">Next</el-button>
        <a class="back" @click="back()">Other ways to reset password</a>
      </div>

      <div v-if="active==2" class="password">
        <el-form-item :rules="[{ required: true, message: 'Please enter your new password', trigger: 'blur' }]" prop="new_password" style="width:350px;margin:0 auto 24px;">
          <el-input
            v-model="data.new_password"
            placeholder="Set a new password"
            name="username"
            type="password"
          />
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: 'Please enter your password again', trigger: 'blur' }]" prop="repeat_new_password" style="width:350px;margin:0 auto;">
          <el-input
            v-model="data.repeat_new_password"
            placeholder="Repeat new password"
            name="username"
            type="password"
          />
        </el-form-item>
        <el-button class="next" @click="goActiveThree()">Save</el-button>
        <a class="back" @click="back()">Other ways to reset password</a>
      </div>
      <div v-if="active==3" class="partThree">
        <i class="iconfont icon-Fill4"/>
        <p class="text1">You’ve reset login password successfully!</p>
      </div>

    </el-form>

  </div>
</template>

<script>

import { validpassword, resetpassword } from '@/api/accountSetting'
export default {
  name: 'ResetByPassword',
  components: {
  },
  props: {
  },
  data() {
    return {
      active: 1,
      data: {
        password: ''
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    goActiveTwo() {
      this.$refs.form.validate(valid => {
        if (valid) {
          validpassword({
            password: this.data.password
          }).then(res => {
            if (res.data.code == 0) {
              if (this.active++ > 2) this.active = 1
            }
          })
        }
      })
    },
    goActiveThree() {
      this.$refs.form.validate(valid => {
        if (valid) {
          resetpassword({
            password: this.data.password,
            new_password: this.data.new_password,
            repeat_new_password: this.data.repeat_new_password
          }).then(res => {
            if (res.data.code == 0) {
              if (this.active++ > 2) this.active = 1
            }
          })
          // if (this.active++ > 2) this.active = 1;
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang='scss'>
  .resetByPassword{
    $body_padding: 20px;
    .el-input__inner{
      height: 40px;
      line-height:40px;
      padding: 0 16px;
    }
    .el-checkbox__inner {
  border: 1px solid #c0c4cc;
  background: transparent;
}
// 步骤样式格式化
.el-step__title.is-process {
  color: #909399;
  font-weight: normal;
}
.el-step__head.is-process {
  color: #909399;
  border-color: #ffffff;
}
.el-step__icon {
  width: 40px;
  height: 40px;
  background-color: transparent;
}
.el-step.is-center .el-step__line {
  left: calc(50% + #{$body_padding});
  right: calc(-50% + #{$body_padding});
  background-color: #909399;
  top: 19px;
  height: 2px;
}
.is-finish .is-text{
  border:2px solid #ffa800 !important;
}
.el-step__icon.is-text {
  border: 2px solid #909399;
}
.el-step__icon-inner {
  font-weight: bold;
  font-size: 14px;
}
.el-step__title.is-finish {
  color: #ffa800;
}
.el-step__head.is-finish {
  color: #ffa800;
  border-color: #ffa800;
}
.el-step__head.is-wait {
  color: #909399;
  border-color: #909399;

}
.el-step__title.is-wait {
  color: #909399;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #c0c4cc;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ffa800;
  border-color: #ffa800;
}
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .resetByPassword{
    width: 800px;
    margin:100px auto 0;
    .password{
      margin-top:80px;
      position: relative;
      i{
        position:absolute;
        display: block;
        top: 8px;
        left: 14px;
        color:#C0C4CC;
        font-size:16px;
        z-index: 10;
      }
    }
    .partThree{
      i{
        text-align:center;
        display: block;
        font-size:108px;
        color:#67C23A;
        margin:70px auto 0;
      }
      .text1{
        color: #768CAA;
        text-align:center;
      }
      .text2{
        color: #999999;
        text-align:center;
      }
    }
    .next{
      display: block;
      text-align:center;
      width: 200px;
      margin:50px auto 0;
      height: 40px;
      border:none;
      outline:none;
      background:#FFA800;
      color:#ffffff;
    }
    .back{
      margin-top:10px;
      display: block;
      text-decoration: underline;
      color:#999999;
      text-align:center;
    }
  }
</style>
