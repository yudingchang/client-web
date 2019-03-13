<template>
  <div class="resetPayByTelephone">
    <el-form ref="form" :model="form">
      <el-steps :active="active" finish-status="finish" align-center>
        <el-step title="手机号码验证"/>
        <el-step title="重置交易密码"/>
        <el-step title="重置成功"/>
      </el-steps>
      <div v-if="active==1" class="password">
        <el-form-item :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' }]" prop="phone">
          <i class="iconfont icon-dianziyouxiangzhongzhi"/>
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号码"
            name="username"
            type="text"
          />
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]" prop="identifyCode">
          <i class="iconfont icon-yanzhengma"/>
          <el-input
            v-model="form.identifyCode"
            placeholder="请输入验证码"
            name="username"
            type="text"
            style="width:530px;"
          >
            <el-button slot="append" :disabled="(sendMaDisabled == true) || (form.phone =='')" style="width:120px;height:48px;" @click="secondStepSendMa()">{{ secondStepText }}</el-button>
          </el-input>
          <!-- <el-button class="sendMa" @click="sendma()">{{sendmaText}}</el-button> -->
        </el-form-item>
        <el-button class="next" @click="goActiveTwo()">下一步</el-button>
        <a class="back" @click="back()">重新选择验证方式</a>
      </div>

      <div v-if="active==2" class="password">
        <el-form-item :rules="[{ required: true, message: '请输入登录密码', trigger: 'blur' }]" prop="new_password">
          <i class="iconfont icon-denglumimazhongzhi"/>
          <el-input
            v-model="form.new_password"
            placeholder="请输入6位数字交易密码"
            name="username"
            type="text"
          />
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: '请确认输入登录密码', trigger: 'blur' }]" prop="repeat_new_password">
          <i class="iconfont icon-denglumimazhongzhi"/>
          <el-input
            v-model="form.repeat_new_password"
            placeholder="确认交易密码"
            name="username"
            type="text"
          />
        </el-form-item>
        <el-button class="next" @click="goActiveThree()">确认</el-button>
        <a class="back" @click="back()">重新选择验证方式</a>
      </div>
      <div v-if="active==3" class="partThree">
        <i class="iconfont icon-Fill4"/>
        <p class="text1">您的交易密码重置成功</p>
        <p class="text2">下次请使用新密码进行交易</p>
      </div>

    </el-form>

  </div>
</template>

<script>
import { forgotpaypasswordMa, forgotpaypassword } from '@/api/accountSetting'
export default {
  name: 'ResetPayByTelephone',
  components: {
  },
  props: {
  },
  data() {
    return {
      active: 1,
      secondStepText: '获取验证码',
      sendMaDisabled: false,
      form: {
        password: '',
        phone: ''
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
          if (this.active++ > 2) this.active = 1
        //   validpassword({
        //     password:this.data.password
        //   }).then(res=>{
        //     if(res.data.code == 0){

        //     }
        //   })
        }
      })
    },
    goActiveThree() {
      this.$refs.form.validate(valid => {
        if (valid) {
          forgotpaypassword({
            verification_code: this.form.identifyCode,
            type: 'phone_number',
            phone_number: this.form.phone,
            password: this.form.new_password,
            repeat_password: this.form.repeat_new_password
          }).then(res => {
            if (res.data.code == 0) {
              if (this.active++ > 2) this.active = 1
            }
          })
          // if (this.active++ > 2) this.active = 1;
        }
      })
    },
    secondStepSendMa() {
      this.sendMa()
      const TIME_COUNT = 60
      //   this.sendMaDisabled = true
      this.secondStepText = TIME_COUNT
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.secondStepText > 0 && this.secondStepText <= TIME_COUNT) {
          this.sendMaDisabled = true
          this.secondStepText--
        } else {
          this.sendMaDisabled = false
          this.secondStepText = '发送验证码'
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    // 发送验证码
    sendMa() {
      forgotpaypasswordMa({
        to: this.form.phone,
        type: 'phone_number'
      }).then(res => {
        if (res.data.code == 0) {

        }
      })
    }
  }
}
</script>
<style lang='scss'>
  .resetPayByTelephone{
    $body_padding: 20px;
    .el-input__inner{
      height: 50px;
      line-height:50px;
      padding: 0 40px;
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
  top: 20px;
  height: 1px;
}
.is-finish .is-text{
  border:1px solid #ffa800 !important;
}
.el-step__icon.is-text {
  border: 1px solid #909399;
}
.el-step__icon-inner {
  font-weight: normal;
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
  .resetPayByTelephone{
    width: 530px;
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
      .sendMa{
          width: 115px;
          height: 50px;
          background:#FFA800;
          color:#ffffff;
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
        color: #474747;
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
      width: 140px;
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
