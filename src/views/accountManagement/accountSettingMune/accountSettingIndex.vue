<template>
  <div v-loading="loading" class="accountSettingIndex">
    <el-row>
      <el-col :span="24" class="accountSetting-info">
        <!-- 手机号码 -->
        <!-- <div class="Setting-info-Mobile">
          <p>Mobile</p>
          <p>
            <span v-if=" AccountSettingData.phone_number == null ">unbound</span>
            <span v-else>{{ AccountSettingData.phone_number }}</span>
            <span @click="ImmediatelyBind" v-if="AccountSettingData.phone_number == null">Immediate binding</span>
            <span @click="reviseMobile" v-else>modify</span>
          </p>
        </div> -->
        <!-- 手机号码绑定 -->
        <div class="Setting-info-MobileBind">
          <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormMobile">
            <div class="chooseOption">
              <!-- <el-select v-model="PhoneOptionValue" placeholder="+86">
                <el-option
                  v-for="item in areaPhoneOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="inputMobile" placeholder="请输入号码"></el-input> -->
              <el-input v-model="inputMobile" placeholder="请输入手机号码" class="input-with-select" >
                <el-select slot="prepend" v-model="PhoneOptionValue" placeholder="请选择" style="width:150px;">
                  <el-option
                    v-for="item in phone_codeConfig"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-input>
              <!-- <el-form :model="MobileRuleForm" :rules="rules" ref="MobileRuleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="region">
                  <el-input placeholder="请输入内容" v-model="MobileRuleForm.telephone" class="input-with-select" style="width:360px">
                      <el-select v-model="MobileRuleForm.region" slot="prepend" placeholder="请选择" style="width:150px;">
                      <el-option label="86" value="1"></el-option>
                      <el-option label="86" value="2"></el-option>
                      <el-option label="86" value="3"></el-option>
                      </el-select>
                  </el-input>
                </el-form-item>
              </el-form> -->
            </div>
            <!-- <p class="existIf" v-show="existIf">请输入手机号码</p> -->
            <div class="inputAuthCode">
              <el-input
                v-model="inputIdentify"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"/>
              <span v-show="getAuthCode" class="getAuthCode" @click="getAuthCodeSend">获取验证码</span>
              <span v-show="CountDown" class="inputAuthTime">{{ auth_time }}秒后重新获取</span>
            </div>
            <p v-show="authCodePromt">{{ authCodePromtValue }}</p>
            <div slot="footer" class="dialog-footer">
              <el-button :disabled="inputIdentify == ''" type="primary" @click="MobileBindTrue">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <!-- 手机号码绑定成功 -->
        <div class="MobileBind-Success">
          <el-dialog
            :visible.sync="dialogSuccess"
            title=""
            width="30%"
          >
            <p><i class="iconfont icon-CloseButton"/></p>
            <p>您的手机号码绑定成功</p>
            <p>下次请使用绑定后的手机号码登录</p>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogSuccess = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 电子邮箱 -->
        <div class="Setting-info-mail">
          <p>Email address</p>
          <p>
            <span v-if="AccountSettingData.email==null">unbound</span>
            <span v-else>{{ AccountSettingData.email }}</span>
            <span v-if="AccountSettingData.email==null" @click="BindMail">Immediate binding</span>
            <span v-else @click="reviseMail">modify</span>
          </p>
        </div>
        <!-- 修改电子邮箱 -->
        <div class="reviseMailDialog">
          <el-dialog :title="emailForm.emailText" :visible.sync="emailForm.dialogFormVisible">
            <el-form ref="emailForm" :model="emailForm">
              <el-form-item :rules="[{ required: true, message: 'Please enter E-mail', trigger: 'blur' }]" class="inputMailAddress" prop="email">
                <el-input
                  v-model="emailForm.email"
                  placeholder="E-mail input"/>
              </el-form-item>
              <el-form-item :rules="[{ required: true, message: 'Please enter verification_code', trigger: 'blur' }]" class="mailValidate" prop="verification_code">
                <el-input
                  v-model="emailForm.verification_code"
                  placeholder="Input validation code">
                  <!-- :disabled="emailForm.email=='' || emailForm.sendMaDisabled == true" -->
                  <!-- @click="emailSendMa()" -->
                  <el-button slot="append" :disabled="emailForm.email=='' || emailForm.sendMaDisabled == true" style="width:120px;text-align:center;color:#F5A623;border-left: 1px solid #C0C4CC;border-radius: 0;" @click="emailSendMa()">{{ emailForm.secondStepText }}</el-button>
                </el-input>

                <!-- <span @click="getMailValidate" class="getMailValidate" v-show="getMailValidateVS">获取验证码</span>
                <span class="inputMailTime" v-show="inputMailTimeVS">{{auth_time_Validate}}秒后重新获取</span> -->
              </el-form-item>
              <!-- <p class="mailPromt" v-show="mailPromtVS">{{mailPromtValue}}</p> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button style="background:#FFA800;border:none;width:160px;" type="primary" @click="email_submit('emailForm')">Save</el-button>
              <!-- <el-button type="primary" :disabled="inputMailValidate == ''" @click="ConfirmRevise">Save</el-button> -->
            </div>
          </el-dialog>
        </div>
        <!-- 电子邮箱修改成功 -->
        <div class="reviseMail-Success">
          <el-dialog
            :visible.sync="emailForm.reviseMailSuccess"
            title="Edit your Email"
            width="30%"
          >
            <p><i class="icon icon-CloseButton"/></p>
            <p>You have Edit Email successfully. <br> Please log in by this Email next time</p>
            <!-- <p>下次请使用修改后的电子邮箱登录</p> -->
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="emailForm.reviseMailSuccess = false">OK</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 密码登录 -->
        <div class="Setting-info-loginPassword">
          <p>Account password</p>
          <p>
            <span>*********</span>
            <span @click="resetLoginpass">Reset</span>
          </p>
        </div>
        <!-- 重置登录密码 -->
        <div class="ResetLoginPassword">
          <!-- 子组件位置 -->
        </div>
        <!-- 支付密码 -->
        <div class="Setting-info-payPassword">
          <p>Payment password</p>
          <p>
            <span v-if="AccountSettingData.is_paypassword == false">Not set</span>
            <span v-else>*******</span>
            <span v-if="AccountSettingData.is_paypassword == false" @click="SettingPay">Set</span>
            <span v-else @click="revisePayDialog">Reset</span>
          </p>
        </div>
        <!-- 支付密码设置 -->
        <div class="Setting-info-PayPasswordBlind">
          <el-dialog :visible.sync="payForm.DialogForm" title="Set up Payment Password">
            <el-form ref="payForm" :model="payForm" :rules="rulesPayPassword" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item label="" prop="password">
                <el-input v-model="payForm.password" type="password" placeholder="Payment password" auto-complete="off"/>
              </el-form-item>
              <el-form-item label="" prop="checkPassword">
                <el-input v-model="payForm.checkPassword" type="password" placeholder="Confirm payment password" auto-complete="off"/>
              </el-form-item>
              <el-form-item>
                <el-button :disabled="payForm.password =='' || payForm.checkPassword==''" type="primary" @click="submitSetForm('payForm')">save</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <!-- 支付密码设置成功 -->
        <div class="PayPasswordBlind-Success">
          <el-dialog
            :visible.sync="payForm.DialogFormSuccess"
            width="30%"
            title="Set up Payment Password"
            center
          >
            <i class="iconfont icon-duihao1"/>
            <span>Your payment password has been set successfully</span>
            <span>Please make your payment by using new password.</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="payForm.DialogFormSuccess = false">OK</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAccountInformation } from '@/api/accountManagement.js'
import { sendMa } from '@/api/accountSetting.js'
import { changeUserInfo, set_password } from '@/api/accountSetting'
import { mapGetters } from 'vuex'
import store from '../../../store/'

export default {
  name: 'AccountSettingIndex',
  components: { },
  data() {
    var regPassword = new RegExp('^[0-9]*$')
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter Payment password'))
      } else if (value.length < 6 || value.length > 6) {
        // console.log("密码长度等于六位")
        callback(new Error('The length of the password is equal to six bits'))
      } else if (!regPassword.test(value)) {
        callback(new Error('Passwords should be numbers'))
      } else {
        if (this.payForm.checkPassword !== '') {
          this.$refs.payForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        // callback(new Error('请再次输入密码'));
      } else if (value !== this.payForm.password) {
        callback(new Error('The two time the password is different!'))
      } else {
        callback()
      }
    }
    return {
      //
      loading: false,

      accountSettingVif: true, // 主页显示隐藏

      ResetLoginPassword: true, // 登录密码重置页面显示隐藏

      // ---------------------------------------------    手机号码
      AccountSettingData: [], // 页面加载数据

      dialogFormTitle: '绑定手机号码', // dialog标题

      dialogFormMobile: false, // 绑定手机号码弹框

      PhoneOptionValue: '', // 地区号码开头选择结果

      phone_codeConfig: '', // 地区选择

      // MobilePhone: '',        //手机号码输入

      // existIf: false,        //手机号码是否输入

      inputMobile: '', // 地区号码输入

      inputIdentify: '', // 输入验证码

      getAuthCode: true, // 获取验证码按钮点击之后隐藏 和 出现

      CountDown: false, // 倒计时按钮出现隐藏

      auth_time: '', // 多少秒之后重新获取验证码

      authCodePromt: false, // 验证码输入错误提示

      authCodePromtValue: '', // 输入错误提示内容

      dialogSuccess: false, // 显示隐藏绑定成功弹框

      // -------------------------------------------------    电子邮箱
      emailForm: {
        email: '',
        verification_code: '',
        sendMaDisabled: false,
        dialogFormVisible: false,
        secondStepText: 'send',
        emailText: 'Bind e-mail',
        reviseMailSuccess: false
      },

      dialogFormMail: false, // 显示隐藏电子邮箱

      inputMailInfo: '', // 输入的邮箱

      inputMailValidate: '', // 输入电子邮箱验证码

      getMailValidateVS: true, // 点击获取按钮

      inputMailTimeVS: false, // 邮件 倒计时 重新获取按钮

      auth_time_Validate: '', // 邮件发送验证码 倒计时

      mailPromtVS: false, // 提示行 显示隐藏

      mailPromtValue: '', // 电子邮箱验证错误提示内容

      reviseMailSuccess: false, // 修改成功弹框

      EmailFormText: 'Bind e-mail',

      // -------------------------------------------------
      loginPassword: '123456789', // 登陆密码

      whetherSeted: true, // 支付密码是否已经设置

      paymentPassword: '未设置',

      payForm: {
        DialogForm: false, // 打开设置支付密码弹框
        password: '',
        checkPassword: '',
        DialogFormSuccess: false // 打开支付密码设置成功
      },
      // 支付密码弹框
      rulesPayPassword: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },

      // dialogTitle
      dialogTitle: ''

    }
  },
  created() {
    this.getAccountInfoData()
    // console.log(new Date)
    // let Configs = JSON.parse(window.localStorage.getItem('Configs'))
    // this.areaPhoneOption = Configs.phone_number_codes
    this.ConfigUnit()
    console.log(this.Configs)
  },
  methods: {
    // 打开页面获取账户信息
    getAccountInfoData() {
      this.loading = true
      getAccountInformation().then(response => {
        if (response.data.code == 0) {
          this.loading = false
          this.AccountSettingData = response.data.data
          console.log('this.AccountSettingData')
          console.log(this.AccountSettingData)
          console.log('this.AccountSettingData')
        }
      })
    },

    // 立即绑定手机号码
    ImmediatelyBind() {
      this.dialogFormTitle = '绑定手机号码'
      this.dialogFormMobile = true
      this.authCodePromt = false
      this.inputMobile = ''
      this.PhoneOptionValue = ''
      this.inputIdentify = ''
      this.getAuthCode = true
      this.CountDown = false
    },

    // 点击获取验证码，发送短信
    getAuthCodeSend() {
      if (this.PhoneOptionValue == '') {
        this.authCodePromt = true
        this.authCodePromtValue = '*请选择手机区号'
        return false
      }
      // 非空验证
      if (this.inputMobile == '') {
        this.authCodePromt = true
        this.authCodePromtValue = '*手机号码不能为空'
      } else if (!/^[0-9]*$/.test(this.inputMobile)) {
        this.authCodePromt = true
        this.authCodePromtValue = '*手机号码输入格式错误'
      } else {
        // 判断
        this.authCodePromt = false
        this.getAuthCode = false
        this.CountDown = true
        this.auth_time = 59
        this.sendPhoneMa()
        const auth_timetimer = setInterval(() => { // 启动定时器,倒计时
          this.auth_time--
          if (this.auth_time <= 0) {
            this.getAuthCode = true
            this.CountDown = false
            clearInterval(auth_timetimer)
          }
        }, 1000)
      }
    },
    sendPhoneMa() {
      sendMa({
        to: this.inputMobile,
        type: 'phone_number'
      }).then(response => {
        if (response.data.code == 0) {
          console.log('手机验证码获取成功')
        }
      })
    },
    // 确定绑定成功的按钮
    MobileBindTrue() {
      changeUserInfo({
        verification_code: this.inputIdentify,
        type: 'phone_number',
        phone_number: this.inputMobile,
        phone_code: this.PhoneOptionValue
      }).then(response => {
        if (response.data.code == 0) {
          this.$message({
            message: this.dialogFormTitle + '成功',
            type: 'success'
          })
          this.dialogFormMobile = false
          // this.dialogSuccess = true
          this.getAccountInfoData()
          store.dispatch('GetUserInfo')
        } else if (response.data.code == 10001) {
          this.dialogFormMobile = false
          this.$message({
            message: '手机号码已被使用',
            type: 'warning'
          })
        }
      }).catch(response => {
        this.$message('验证码输入错误')
      })
    },

    // 修改手机号码
    reviseMobile() {
      this.dialogFormTitle = '修改手机号码'
      this.dialogFormMobile = true
      this.authCodePromt = false
      this.inputMobile = ''
      this.PhoneOptionValue = ''
      this.inputIdentify = ''
      this.getAuthCode = true
      this.CountDown = false
    },

    // 绑定电子邮箱
    BindMail() {
      this.EmailFormText = 'Bind e-mail'
      this.mailPromtVS = false
      this.inputMailInfo = ''
      this.inputMailValidate = ''
      this.dialogFormMail = true
    },

    // 修改电子邮箱
    reviseMail() {
      this.EmailFormText = 'Edit e-mail'
      // this.mailPromtVS = false;
      // this.inputMailInfo = '';
      // this.inputMailValidate = '';
      this.emailForm.dialogFormVisible = true
    },

    // email绑定验证码
    emailSendMa() {
      this.sendMa2()
      const TIME_COUNT = 60
      //   this.sendMaDisabled = true
      this.emailForm.secondStepText = TIME_COUNT
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.emailForm.secondStepText > 0 && this.emailForm.secondStepText <= TIME_COUNT) {
          this.emailForm.sendMaDisabled = true
          this.emailForm.secondStepText--
        } else {
          this.emailForm.sendMaDisabled = false
          this.emailForm.secondStepText = 'Send'
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    // 邮箱发送验证码
    sendMa2() {
      sendMa({
        to: this.emailForm.email,
        type: 'email'
      }).then(res => {
        if (res.data.code == 0) {

        }
      })
    },
    getMailValidate() { // 点击 发送邮件地址到后台，发送验证码
      if (this.inputMailInfo == '') {
        this.mailPromtVS = true
        this.mailPromtValue = '电子邮箱号码不能为空'
      } else if (!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g).test(this.inputMailInfo)) {
        this.mailPromtVS = true
        this.mailPromtValue = '电子邮箱号码输入格式错误'
      } else {
        this.mailPromtVS = false
        this.getMailValidateVS = false
        this.inputMailTimeVS = true
        this.auth_time_Validate = 59
        this.sendEailMa()
        const auth_timetimer = setInterval(() => { // 启动定时器,倒计时
          this.auth_time_Validate--
          if (this.auth_time_Validate <= 0) {
            this.getMailValidateVS = true
            this.inputMailTimeVS = false
            clearInterval(auth_timetimer)
          }
        }, 1000)
      }
    },
    sendEailMa() {
      sendMa({
        to: this.inputMailInfo,
        type: 'email'
      }).then(response => {
        if (response.data.code == 0) {
          console.log('邮件验证码获取成功')
        }
      })
    },
    ConfirmRevise() { // 修改弹框确认修改
      changeUserInfo({
        verification_code: this.inputMailValidate,
        type: 'email',
        email: this.inputMailInfo
      }).then(response => {
        if (response.data.code == 0) {
          this.dialogFormMail = false
          // this.reviseMailSuccess = true
          this.$message({
            message: this.EmailFormText + '成功',
            type: 'success'
          })
          this.getAccountInfoData()
          store.dispatch('GetUserInfo')
        } else if (response.data.code == 10002) {
          this.$message({
            message: '该邮箱号码已被使用',
            type: 'warning'
          })
        }
      })
    },
    // 确认绑定邮箱
    email_submit(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          changeUserInfo({
            verification_code: this.emailForm.verification_code,
            type: 'email',
            email: this.emailForm.email
          }).then(res => {
            if (res.data.code == 0) {
              this.emailForm.dialogFormVisible = false
              this.emailForm.reviseMailSuccess = true
              store.dispatch('GetUserInfo')
            }
          })
        }
      })
    },

    // 重置登录密码
    resetLoginpass() {
      // this.accountSettingVif = false
      this.$route.meta.keepAlive = false
      this.$router.push({ path: 'accountResetLoginPassword' })
      // this.ResetLoginPassword = true
    },

    // 点击设置支付密码SettingPay
    SettingPay() {
      this.payForm.DialogForm = true
      // this.payForm.password = ''
      // this.payForm.checkPassword = ''
      this.$nextTick(() => {
        this.$refs.payForm.resetFields() // 移除校验结果并重置字段值
      })
    },

    // revisePayDialog修改支付密码
    revisePayDialog() {
      this.$router.push({ path: 'accountResetPayPassword' })
    },

    // 设置支付密码Dialog
    submitSetForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          set_password({
            password: this.payForm.password
          }).then(response => {
            if (response.data.code == 0) {
              this.payForm.DialogForm = false
              this.payForm.DialogFormSuccess = true
              this.getAccountInfoData()
              this.whetherSeted = false
              store.dispatch('GetUserInfo')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 配置文件加载
    ConfigUnit() {
      this.phone_codeConfig = this.configs.phone_number_codes
    }

  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'phone_number',
      'email',
      'is_paypassword',
      'avatar',
      'device',
      'configs'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//普通样式
.accountSettingIndex{
  padding:40px 0 0 150px;
  .accountSetting-info{
      .Setting-info-Mobile{
        height:24px;
        line-height: 24px;
        margin-bottom:45px;
        p{
          float:left;
          height:24px;
          line-height: 24px;
        }
        p:nth-child(1){
          width: 140px;
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(127,143,164,1);
          margin-right:51px;
        }
        p:nth-child(2){
          span{
            display:inline-block;
          }
          span:nth-child(1){
            width:214px;
            height:24px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(80,104,140,1);
          }
          span:nth-child(2){
            height:24px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(255,168,0,1);
            line-height:24px;
            cursor: pointer;
          }
        }
      }
      .Setting-info-MobileBind{
        // width:600px;
        // height:400px;
        // background:rgba(255,255,255,1);
        // border-radius:8px;
      }
      .Setting-info-mail{
        height:24px;
        line-height: 24px;
        margin-bottom:45px;
        p{
          float:left;
          height:24px;
          line-height: 24px;
        }
        p:nth-child(1){
          width:140px ;
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(127,143,164,1);
          margin-right:51px;
        }
        p:nth-child(2){
          span{
            display:inline-block;
          }
          span:nth-child(1){
            width:214px;
            height:24px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(80,104,140,1);
          }
          span:nth-child(2){
            height:24px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(255,168,0,1);
            line-height:24px;
            cursor: pointer;
          }
        }
      }
      .Setting-info-loginPassword{
        height:24px;
        line-height: 24px;
        margin-bottom:45px;
        p{
          float:left;
          height:24px;
          line-height: 24px;
        }
        p:nth-child(1){
          width: 140px;
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(127,143,164,1);
          margin-right:51px;
        }
        p:nth-child(2){
          span{
            display:inline-block;
          }
          span:nth-child(1){
            width:214px;
            height:24px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            line-height: 24px;
            color:rgba(80,104,140,1);
          }
          span:nth-child(2){
            height:24px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(255,168,0,1);
            line-height:24px;
            cursor: pointer;
          }
        }
      }
      .Setting-info-payPassword{
        height:24px;
        line-height: 24px;
        p{
          float:left;
          height:24px;
          line-height: 24px;
        }
        p:nth-child(1){
          width: 140px;
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(127,143,164,1);
          margin-right:51px;
        }
        p:nth-child(2){
          span{
            display:inline-block;
          }
          span:nth-child(1){
            width:214px;
            height:24px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            line-height: 24px;
            color:rgba(80,104,140,1);
          }
          span:nth-child(2){
            height:24px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(255,168,0,1);
            line-height:24px;
            cursor: pointer;
          }
        }
      }
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" >
//element-ui样式
.accountSettingIndex{
  .Setting-info-loginPassword{
    .el-input__inner{
      float:left;
    }
  }
  //绑定手机号码
  .Setting-info-MobileBind{
    .el-dialog{
        width:600px;
        height:400px;
        background:rgba(255,255,255,1);
        border-radius:8px;
        .el-dialog__header{
          padding:60px 0 0 0;
          height:93px;
          margin-bottom:50px;
          .el-dialog__title{
            margin-left:228px;
            font-size:24px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(127,143,164,1);
          }
          .el-icon-close:before{
            font-size:24px;
            color:rgba(144,147,153,1);
            font-weight:600;
          }
        }
        .el-dialog__body{
          padding:0 0 31px 0;
          height:164px;
          .chooseOption{
            width:360px;
            height:40px;
            border-radius:4px;
            // border:1px solid rgba(192,196,204,1);
            line-height:40px;
            margin:0 auto;
            // overflow: hidden;
            // .el-select{
            //   float:left;
            //   width:178px;
            // }
            // .el-input--medium{
            //   float:left;
            //   width:180px;
            // }
            // .el-select--medium .el-input__inner{
            //   border:none;
            // }
            // .el-input--medium .el-input__inner{
            //   width:178px;
            //   height:40px;
            //   float:left;
            //   border-right:1px solid rgba(192,196,204,1);
            //   border-radius:0;
            // }
            // .el-input--medium:nth-child(2) .el-input__inner{
            //   border:none;
            //   border-left:1px solid rgba(192,196,204,1);
            //   border-radius:0;
            //   border:1px solid rgba(192,196,204,1);
            //   border-top-right-radius:4px;
            //   border-bottom-right-radius:4px;
            // }
            // .el-input--medium:nth-child(1) .el-input__inner{
            //   font-size:14px;
            //   font-family:PingFang-SC-Medium;
            //   font-weight:500;
            //   color:rgba(255,165,0,1);
            //   border:1px solid rgba(192,196,204,1);
            //   border-right:none;
            //   border-top-right-radius:0;
            //   border-bottom-right-radius:0;
            // }
            // .el-input--medium:nth-child(1) .el-input__inner::-webkit-input-placeholder{
            //   font-size:14px;
            //   font-family:PingFang-SC-Medium;
            //   font-weight:500;
            //   color:rgba(255,165,0,1);
            // }
            .el-input--suffix .el-input__inner{
              // height:40px;
              //
            }
            .el-input--medium .el-input__inner{
              height:40px;
            }
            .el-input--medium:nth-child(1) .el-input__inner:nth-child(2):focus{
              border:1px solid rgba(255,168,0,1);
            }
            .el-input--medium:nth-child(2) .el-input__inner:focus{
              border:1px solid rgba(255,168,0,1);
            }
          }
          .chooseOption .el-input--medium:nth-child(2):focus{
            border:1px solid rgba(255,168,0,1);
          }
          .inputAuthCode{
            width:360px;
            height:40px;
            border-radius:4px;
            // border:1px solid rgba(192,196,204,1);
            line-height:40px;
            margin:24px auto 8px;
            overflow: hidden;
            .el-input--medium{
              height:40px;
              width:250px;
              float:left;
            }
            .el-input--medium .el-input__inner{
              border:none;
              height:40px;
              width:250px;
              border-radius:4px;
              border:1px solid rgba(192,196,204,1);
              // border-top-right-radius:0;
              // border-bottom-right-radius:0;
            }
            .el-input--medium .el-input__inner:focus{
              border:1px solid rgba(255,168,0,1);
            }
            span{
              float: left;
            }
            .getAuthCode{
              width:108px;
              height:40px;
              background:rgba(255,168,0,1);
              border-radius:4px;
              text-align:center;
              font-size:14px;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
              border-radius:0;
              border:none;
              cursor: pointer;
              border:1px solid rgba(192,196,204,1);
              border-left:none;
              border-top-right-radius:4px;
              border-bottom-right-radius:4px;
            }
            .getAuthCode:hover{
              opacity: 0.8;
            }
            .inputAuthTime{
              width:108px;
              height:40px;
              background:rgba(255,168,0,1);
              border-radius:4px;
              text-align:center;
              font-size:14px;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
              border-radius:0;
              border:none;
              // border:1px solid rgba(192,196,204,1);
              border-left:none;
              border-top-right-radius:4px;
              border-bottom-right-radius:4px;
            }
          }
          p{
            width:480px;
            height:21px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(239,53,53,1);
            line-height:21px;
            padding-left:256px;
            text-align:right;
          }
        }
        .el-dialog__footer{
          padding:0;
          text-align:center;
          .el-button--medium{
            width:140px;
            height:40px;
            background:rgba(255,168,0,1);
            border-radius:4px;
            border:none;
            span{
              font-size:18px;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
            }
          }
        }
    }
  }
  //手机号码绑定成功
  .MobileBind-Success{
    .el-dialog{
      width:600px;
      height:360px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      .el-dialog__header{
          // padding:60px 0 0 0;
          padding:0;
          height:78px;
          // margin-bottom:50px;
          .el-icon-close:before{
            font-size:24px;
            color:rgba(144,147,153,1);
            font-weight:600;
          }
      }
      .el-dialog__body{
        padding:0;
        text-align:center;
        margin-bottom:41px;
        P:nth-child(1){
          width:80px;
          height:80px;
          border:5px solid rgba(103,194,58,1);
          margin:0 auto 16px;
          border-radius:50%;
          i{
            color:rgba(103,194,58,1);
            font-size:20px;
          }
        }
        p:nth-child(2){
          height:26px;
          font-size:20px;
          font-family:MicrosoftYaHei;
          color:rgba(51,51,51,1);
          line-height:26px;
          margin-bottom:10px;
        }
        p:nth-child(3){
          height:21px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          color:rgba(153,153,153,1);
          line-height:21px;
        }
      }
      .el-dialog__footer{
        padding:0;
        text-align:center;
        .el-button--medium{
          width:140px;
          height:40px;
          background:rgba(255,168,0,1);
          border-radius:4px;
          border:none;
        }
        .el-button--primary{
          font-size:18px;
          font-family:MicrosoftYaHei;
          color:rgba(255,255,255,1);
        }
      }
    }
  }
  //绑定或者修改邮箱地址
  .reviseMailDialog{
    .el-dialog{
      width:600px;
      height:400px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      .el-dialog__header{
        padding:60px 0 0 0;
        height:93px;
        margin-bottom:50px;
        .el-dialog__title{
          margin-left:228px;
          font-size:18px;
          font-weight:500;
          color:rgba(127,143,164,1);
          line-height:33px;
        }
      }
      .el-dialog__body{
        padding:0;
        margin-bottom:40px;
        height:133px;
        .inputMailAddress{
          width:360px;
          height:40px;
          margin:0 auto 24px;
          .el-input--medium .el-input__inner{
            width:360px;
            height:40px;
            border-radius:4px;
            border:1px solid rgba(192,196,204,1);
          }
          .el-input--medium .el-input__inner::-webkit-input-placeholder{    //使用webkit内核的浏览器
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(144,147,153,1);
          }
          .el-input--medium .el-input__inner:-moz-placeholder{      //Firefox版本4-18
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(144,147,153,1);
          }
          .el-input--medium .el-input__inner::-moz-placeholder{       //Firefox版本19+
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(144,147,153,1);
          }
          .el-input--medium .el-input__inner:-ms-input-placeholder{         //IE浏览器
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(144,147,153,1);
          }
          .el-input--medium .el-input__inner:focus{
            border:1px solid rgba(255,168,0,1);
          }
        }
        .mailValidate{
          width:360px;
          height:40px;
          border-radius:4px;
          margin:0 auto 8px;
          .el-input--medium{
            float:left;
            width:261px;
            height:40px;
          }
          .el-input__inner{
            height:40px;
            border-radius:4px;
            border:1px solid rgba(192,196,204,1);
            border-top-right-radius:0;
            border-bottom-right-radius:0;
            border-right:none;
          }
          .el-input--medium .el-input__inner::-webkit-input-placeholder{    //使用webkit内核的浏览器
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(144,147,153,1);
          }
          .el-input--medium .el-input__inner:-moz-placeholder{      //Firefox版本4-18
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(144,147,153,1);
          }
          .el-input--medium .el-input__inner::-moz-placeholder{       //Firefox版本19+
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(144,147,153,1);
          }
          .el-input--medium .el-input__inner:-ms-input-placeholder{         //IE浏览器
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(144,147,153,1);
          }
          .el-input__inner:focus{
            border:1px solid rgba(255,168,0,1);
          }
          .getMailValidate{
            float:left;
            display:inline-block;
            width:99px;
            height:40px;
            background:rgba(255,168,0,1);
            border-radius:4px;
            line-height:40px;
            text-align:center;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(255,255,255,1);
            border-top-left-radius:0;
            border-bottom-left-radius:0;
            cursor:pointer;
          }
          .getMailValidate:hover{
            opacity: 0.8;
          }
          .inputMailTime{
            float:left;
            display:inline-block;
            width:99px;
            height:40px;
            background:rgba(255,168,0,1);
            border-radius:4px;
            line-height:40px;
            text-align:center;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(255,255,255,1);
            border-top-left-radius:0;
            border-bottom-left-radius:0;
            cursor:pointer;
          }
        }
        p{
          width:480px;
          height:21px;
          font-size:14px;
          font-family:MicrosoftYaHei;
          color:rgba(239,53,53,1);
          line-height:21px;
          padding-left:256px;
          text-align:right;
        }
      }
      .el-dialog__footer{
        padding:0;
        text-align:center;
        .el-button--primary{
          width:140px;
          // height:40px;
          background:rgba(255,168,0,1);
          border-radius:4px;
          border:none;
          font-size:18px;
          font-family:MicrosoftYaHei;
          color:rgba(255,255,255,1);
        }
      }
      .el-input-group__append{
        background: none;
      }
    }
  }
  //绑定或者修改邮箱地址成功
  .reviseMail-Success{
    .el-dialog{
      width:600px;
      height:360px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      .el-dialog__header{
          // padding:60px 0 0 0;
          padding:0;
          height:78px;
          // margin-bottom:50px;
          .el-icon-close:before{
            font-size:24px;
            color:rgba(144,147,153,1);
            font-weight:600;
          }
      }
      .el-dialog__body{
        padding:0;
        text-align:center;
        margin-bottom:41px;
        P:nth-child(1){
          width:80px;
          height:80px;
          border:5px solid rgba(103,194,58,1);
          margin:0 auto 16px;
          border-radius:50%;
          i{
            color:rgba(103,194,58,1);
            font-size:20px;
          }
        }
        p:nth-child(2){
          height:26px;
          font-size:20px;
          font-family:MicrosoftYaHei;
          color:rgba(51,51,51,1);
          line-height:26px;
          margin-bottom:10px;
        }
        p:nth-child(3){
          height:21px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          color:rgba(153,153,153,1);
          line-height:21px;
        }
      }
      .el-dialog__footer{
        padding:0;
        text-align:center;
        .el-button--medium{
          width:140px;
          height:40px;
          background:rgba(255,168,0,1);
          border-radius:4px;
          border:none;
        }
        .el-button--primary{
          font-size:18px;
          font-family:MicrosoftYaHei;
          color:rgba(255,255,255,1);
        }
      }
    }
  }
  //设置支付密码
  .Setting-info-PayPasswordBlind{
    .el-dialog{
      width:600px;
      height:400px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      .el-dialog__header{
        padding:60px 0 0 0;
        text-align:center;
        .el-dialog__title{
          height:33px;
          font-size:18px;
          font-weight:500;
          color:rgba(127,143,164,1);
          line-height:33px;
        }
        .el-dialog__headerbtn .el-dialog__close{
          font-size:24px;
          color:rgba(144,147,153,1);
        }
      }
      .el-dialog__body{
        padding:50px 0 0 0;
        .el-form-item__content{
          margin:0 auto !important;
          width:360px;
          height:40px;
          border-radius:4px;
          position: relative;
          .el-input-group__prepend{
            padding:0;
            border:none;
            position:absolute;
            left:12px;
            top:11px;
          }
          .el-input--medium .el-input__inner{
            width:360px;
            height:40px;
            border-radius:4px;
            border:1px solid rgba(192,196,204,1);
            padding:0 44px;
          }
          .el-input__suffix{
            // display:none;
          }
        }
        .el-form-item:nth-child(2){
          margin-bottom:60px;
        }
        .el-form-item:nth-child(3) .el-form-item__content{
          text-align:center;
        }
        .el-form-item:nth-child(3) .el-form-item__content .el-button--primary{
          width:140px;
          height:40px;
          background:rgba(255,168,0,1);
          border-radius:4px;
          border:none;
          font-size:16px;
          color:rgba(255,255,255,1);
        }
      }
    }
  }
  //设置密码成功弹窗
  .PayPasswordBlind-Success{
    .el-dialog{
      width:600px;
      height:360px;
      background:rgba(255,255,255,1);
      border-radius:8px;
    }
    .el-dialog__header{
      padding:78px 0 0 0;
      .el-dialog__headerbtn .el-dialog__close{
        font-size:24px;
        color:rgba(144,147,153,1);
      }
    }
    .el-dialog__body{
      padding:0;
      margin-bottom:40px;
      .iconfont{
        display:block;
        width:80px;
        height:80px;
        color:rgba(103,194,58,1);
        font-size:80px;
        line-height:80px;
        margin:0 auto 16px;
      }
      span{
        display:block;
        text-align:center;
      }
      span:nth-child(2){
        height:26px;
        font-size:16px;
        color:#50688C;
        line-height:26px;
        margin-bottom:10px;
      }
      span:nth-child(3){
        height:21px;
        font-size:16px;
        color:#768CAA;
        line-height:21px;
      }
    }
    .el-dialog__footer{
      padding:0;
      text-align:center;
      .el-button--primary{
        width:140px;
        height:40px;
        background:rgba(255,168,0,1);
        border-radius:4px;
        border:none;
      }
    }
  }
}
</style>

