<template>
  <div class="login-container" @click.self="popoverShow=false">
    <!-- 头部 -->
    <div class="hometop">
      <span class="logo"/>
      <el-dropdown trigger="click" class="switch" @command="handleCommand">
        <span class="el-dropdown-link">
          English<i class="el-icon-arrow-down el-icon--right"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">English</el-dropdown-item>
          <el-dropdown-item command="b">中文</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>
        400-627-8168
      </span>
    </div>

    <!-- 登录界面主体 -->
    <el-form v-if="loginShow" class="login-form-box">
      <!-- <ul class="tabs">
        <li :class="{active:item.isBool}" v-for="(item,index) in denglustyle" :key = index @click="tab(item,index)">{{item.content}}</li>
      </ul> -->
      <div class="title">Email sign in</div>
      <!-- 电子邮箱登录 -->
      <el-form v-if="num==0" ref="loginForm" :model="loginForm" class="login-form" label-position="left">
        <el-form-item prop="username" class="email">
          <el-input
            v-model="loginForm.email"
            placeholder="Email address"
            name="username"
            type="text"
            class="email-content"
          />
        </el-form-item>
        <el-form-item prop="username" class="email">
          <el-input
            v-model="loginForm.password"
            placeholder="Password"
            name="username"
            type="password"
            class="email-content"
            @keyup.native.enter="loginByEmail()"
          />
        </el-form-item>
        <p class="text1" @click="forgetPassword()">Forgot password?</p>
        <el-button :disabled="((loginForm.email == '') || (this.loginForm.password == ''))" :class="{disabled:((loginForm.email == '') || (this.loginForm.password == '')),isactive:((loginForm.email != '') && (this.loginForm.password != ''))}" type="primary" @click="loginByEmail()" @keyup.enter.native="enterLogin()">Sign In</el-button>
        <p class="tip">Don't have Testcoo account?.</p>
        <a class="register" @click="toregister">Join free</a>
        <!-- <p @click="toregister">Join free</p>	 -->
      </el-form>
      <!-- 手机号登录 -->
      <el-form v-if="num==1" :model="phoneLoginForm" class="login-form" >
        <el-form-item prop="username" class="phone-email clearfloat">
          <span @click="getpopover()">
            <span class="phone-style">
              {{ phoneLoginForm.phone_number_code?phoneLoginForm.phone_number_code:'中国大陆 +8613213123' }}
            </span>
            <i class="el-icon-arrow-down arrow-next"/>
          </span>

          <!-- <span class="arrow-next" ></span> -->
          <el-input
            v-model="phoneLoginForm.phone_number"
            placeholder="Phone number"
            name="username"
            type="text"
            class="phone-email-content"
          />
          <div v-show="popoverShow" class="popover">
            <ul>
              <li v-for="(item,index) in Configs.phone_number_codes" :key="index" @click.stop="selectedLogin(item)">{{ item.label }}</li>
            </ul>
            <div class="popper-arrow"/>
          </div>
        </el-form-item>
        <el-form-item prop="username" class="email">
          <el-input
            v-model="phoneLoginForm.password"
            placeholder="Password"
            name="username"
            type="password"
            class="email-content"
            @keyup.native.enter="loginByPhone()"
          />
        </el-form-item>
        <p class="text1" @click="forgetPassword()">Forgot password?</p>
        <el-button :disabled="(phoneLoginForm.phone_number=='') || (phoneLoginForm.password=='')" :class="{disabled:(phoneLoginForm.phone_number=='') || (phoneLoginForm.password==''),isactive:(phoneLoginForm.phone_number!='') && (phoneLoginForm.password!='')}" type="primary" @click="loginByPhone()">Sign In</el-button>
        <p class="tip">Don't have Testcoo account?</p>
        <a class="register" @click="toregister">Join free</a>
      </el-form>
      <!-- 登录报错信息报文 -->
      <div v-if="loginPumpShow" class="errorPump">
        <div class="error-content">{{ wrongMessage }}</div>
        <div class="errorPump-arrow"/>
      </div>
    </el-form>

    <!-- 注册界面主体 -->
    <el-form v-if="registerShow" class="login-form-box register-form-box">
      <!-- <ul class="tabs">
        <li :class="{active:item.isBool}" v-for="(item,index) in registerstyle" :key = index @click="registerTab(item,index)">{{item.content}}</li>
      </ul> -->
      <div class="title">Email register</div>
      <!-- {{registerForm}} -->
      <!-- 电子邮箱注册 -->
      <el-form v-if="registernum==0" ref="registerForm" :model="registerForm" class="login-form" label-position="left">
        <el-form-item prop="email" class="email">
          <el-input
            v-model="registerForm.email"
            placeholder="Email address"
            name="username"
            type="text"
            class="email-content"
            maxlength="50"
          />
        </el-form-item>
        <el-form-item prop="password" class="email">
          <el-input
            v-model="registerForm.password"
            placeholder="Password"
            name="username"
            type="password"
            class="email-content"
            maxlength="20"
            @focus="showPump()"
            @blur="hidePump()"
          />
          <transition name="slide-fade">
            <div v-if="passwordPumpShow" class="passwordPump">
              <p class="title">Your password must:</p>
              <p :class="{'activeTip':lengthReg}" class="tips">
                <i class="iconfont icon-duihao1" style="display:inline-block"/>
                <span>Need 8 to 20 characters</span>
              </p>
              <p :class="{'activeTip':capitalReg}" class="tips">
                <i class="iconfont icon-duihao1" style="display:inline-block"/>
                <span>Include capital & small letters</span>
              </p>
              <p :class="{'activeTip':numberReg}" class="tips">
                <i class="iconfont icon-duihao1" style="display:inline-block"/>
                <span>Contain at least one number</span>
              </p>

              <!-- 1、8-20位字符<br>
              2、大写字母、小写字母、数字、特殊符号两种组合以上 -->
              <div class="hover-pump-arrow"/>
            </div>
          </transition>
        </el-form-item>
        <el-form-item prop="confirmpassword" class="email">
          <el-input
            v-model="registerForm.confirmpassword"
            placeholder="Repeat password"
            name="username"
            type="password"
            class="email-content"
          />
        </el-form-item>
        <el-form-item prop="company_name" class="email">
          <el-input
            v-model="registerForm.company_name"
            placeholder="Company name"
            name="username"
            type="text"
            class="email-content"
          />
        </el-form-item>

      </el-form>
      <!-- 手机号注册 -->
      <el-form v-show="registernum==1" :model="phoneRegisterForm" class="login-form">
        <el-form-item prop="username" class="email clearfloat">
          <!-- <span class="phone-style">
            {{ phoneRegisterForm.phone_number_code?phoneRegisterForm.phone_number_code:'中国大陆 +86' }}
          </span>
          <span class="arrow-next" @click="getpopover()"></span> -->
          <el-input
            v-model="phoneRegisterForm.phone_number"
            placeholder="Phone number"
            name="username"
            type="text"
            class="email-content"
          />
          <!-- <div class="popover" v-show="popoverShow">
            <ul>
              <li v-for="(item,index) in Configs.phone_number_codes" :key='index' @click="selectedRegistered(item)">{{item.label}}</li>
            </ul>
            <div class="popper-arrow"></div>
          </div>          -->
        </el-form-item>
        <el-form-item prop="username" class="email">
          <el-input
            v-model="phoneRegisterForm.password"
            placeholder="Password"
            name="username"
            type="password"
            class="email-content"
            @focus="showPump()"
            @blur="hidePump()"
          />
          <div v-if="passwordPumpShow" class="passwordPump">
            1、8-20位字符<br>
            2、大写字母、小写字母、数字、特殊符号两种组合以上
            <div class="hover-pump-arrow"/>
          </div>
        </el-form-item>
        <el-form-item prop="username" class="email">
          <el-input
            v-model="phoneRegisterForm.confirmpassword"
            placeholder="Repeat password"
            name="username"
            type="password"
            class="email-content"
          />
        </el-form-item>
        <el-form-item prop="username" class="email">
          <el-input
            v-model="phoneRegisterForm.company_name"
            placeholder="Company name"
            name="username"
            type="text"
            class="email-content"
          />
        </el-form-item>
        <!-- <el-button type="primary"  class="isactive margin40">注册</el-button>
        <el-button type="primary"  class="btnreturn margin16">返回登录</el-button>
        <p class="tip"><el-checkbox v-model="checked"></el-checkbox><span class="agreement">我已阅读并同意<a href="">《用户协议》</a></span></p> -->
      </el-form>
      <el-button :disabled="!checked" type="primary" class="isactive" @click="goRegister()">Create my account</el-button>
      <el-button type="primary" class="btnreturn margin16" @click="goLogin">I already have an account</el-button>
      <!-- <p class="tip"><el-checkbox v-model="checked"></el-checkbox><span class="agreement">我已阅读并同意<a href="">《用户协议》</a></span></p> -->
      <!-- 注册报错信息报文 -->
      <div v-if="registerwrongPump" class="errorPump">
        <div class="error-content">{{ registerWrongMessage }}</div>
        <div class="errorPump-arrow"/>
      </div>
    </el-form>
    <!-- 验证电子邮箱 -->
    <el-form v-if="verifyEmail" class="verify-email">
      <span class="email-img"/>
      <p class="t1">We've sent a verification code to your email address</p>
      <p class="orangeText">{{ registerForm.email }}</p>
      <p class="margin18">Please enter the code and activate account:</p>
      <el-form-item class="input-box">
        <!-- <ul class="write-input"> -->
        <!-- getbackMoney -->
        <!-- <li v-for="disInput in disInputs" :key="disInput.value"><input class="disInput" type="tel" maxlength="1" v-model="disInput.value" ></li>
        </ul> -->
        <div id="inputList" class="write-input">
          <input
            v-model="pwdList[i]"
            v-for="(v, i) in 6"
            type="tel"
            :key="i"
            maxlength="1"
            class="disInput"
            @input="changeInput"
            @click="changePwd"
            @keyup="keyUp($event)"
            @keydown="oldPwdList = pwdList.length">
        </div>

        <!-- <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">
        <input type="text" maxlength="1">  -->
      </el-form-item>
      <div class="t2">Didn't receive message?
        <div class="hover-pump">Please check your spam folder, perhaps will find code there. If not, please click ‘resend’and wait for seconds.
          <div class="hover-pump-arrow"/>
        </div>
      </div>
      <div class="button-group">
        <div :class="{sendma:true,recolor:sendMaDisabled}" @click="resend()">{{ reSend }}</div>
        <div @click="backregister()">Cancel</div>
        <div class="changeColorCon " @click="userRegister()">Confirm</div>
      </div>
    </el-form>
    <!-- 密码找回 -->
    <el-form v-if="passwordRecoveryShow" class="password-recovery">
      <el-steps :active="active" finish-status="finish" align-center style="padding:0 15px;">
        <el-step title="Select a way to reset password"/>
        <el-step title="Get a verification code"/>
        <el-step title="Set up a new password"/>
        <el-step title="Reset password successfully"/>
      </el-steps>
      <div v-if="firstStepShow" class="first-step">
        <div class="recovery-style">
          <div @click="recoveryByEmail()">
            <i class="iconfont icon-mimazhaohuiyouxiang-"/>
            <span>Email address</span>
          </div>
          <!-- <div @click="recoveryByPhone()">
            <i class="iconfont icon-Fill"></i>
            <span>Mobile number</span>
          </div> -->
        </div>
        <div class="btn-recovery-return margin70" @click="goLogin()">Log in now</div>
      </div>
      <div v-if="secondStepShow" class="second-step" >
        <el-form v-if="secondStepEmailShow" :model="secondStepForm" class="login-form ma-content">
          <el-form-item prop="username" class="email">
            <el-input
              v-model="secondStepForm.email"
              :placeholder="mamessage"
              name="username"
              type="text"
              class="email-content"
            />
          </el-form-item>
          <el-form-item prop="username" class="email">
            <el-input
              v-model="secondStepForm.verification_code"
              placeholder="Enter verification code"
              name="username"
              type="text"
              class="ma-input email-content"
            />
            <div :class="{sendma:true,changeColor:sendMaDisabled}" :disabled="sendMaDisabled" @click="secondStepSendMa()" >
              {{ secondStepText }}
            </div>
          </el-form-item>
          <el-button :disabled="secondStepForm.email==''|| secondStepForm.verification_code==''" class="btn-next" @click="goThirdStep()">Next step</el-button>
          <el-button class="btn-return-sm" @click="backFirstStep()">Return to previous step</el-button>
        </el-form>

        <el-form v-if="secondStepPhoneShow" :model="secondStepFormPhone" class="login-form ma-content">
          <el-form-item prop="username" class="email clearfloat secondStepPhone">
            <span @click="getpopover()">
              <span class="phone-style">
                {{ secondStepFormPhone.phone_number_code?secondStepFormPhone.phone_number_code:'中国大陆 +86' }}
              </span>
              <i class="el-icon-arrow-down arrow-next"/>
            </span>
            <!-- <span class="phone-style">
            {{secondStepFormPhone.phone_number_code?secondStepFormPhone.phone_number_code:'中国大陆 +86'}}
          </span>
          <span class="arrow-next" @click="getpopover()"></span> -->
            <el-input
              v-model="secondStepFormPhone.phone_number"
              placeholder="Phone number"
              name="username"
              type="text"
              class="phone-email-content"
            />
            <div v-show="popoverShow" class="popover popoverForget">
              <ul>
                <li v-for="(item,index) in Configs.phone_number_codes" :key="index" @click="selectedForget(item)">{{ item.label }}</li>
              </ul>
              <div class="popper-arrow"/>
            </div>
          </el-form-item>
          <el-form-item prop="username" class="email">
            <!-- <span>
              <img src="/static/image/ma.png" alt="">
            </span> -->
            <el-input
              v-model="secondStepFormPhone.verification_code"
              placeholder="Enter verification code"
              name="username"
              type="text"
              class="ma-input email-content"
            />
            <div :class="{sendma:true,changeColor:sendMaDisabled}" @click="secondStepSendMa()">
              {{ secondStepText }}
            </div>
          </el-form-item>
          <el-button :disabled="secondStepFormPhone.phone_number==''|| secondStepFormPhone.verification_code==''" class="btn-next" @click="goThirdStep()">Next step</el-button>
          <el-button class="btn-return-sm" @click="backFirstStep()">Return to previous step</el-button>
        </el-form>

      </div>
      <div v-if="thirdStepShow" class="second-step third-step">
        <el-form :model="thirdStepForm" class="login-form ma-content">
          <el-form-item prop="username" class="email">
            <el-input
              v-model="thirdStepForm.password"
              placeholder="new password"
              name="username"
              type="password"
              class="email-content"
            />
          </el-form-item>
          <el-form-item prop="username" class="email">
            <el-input
              v-model="thirdStepForm.confirmpassword"
              placeholder="Repeat password"
              name="username"
              type="password"
              class="email-content"
            />
          </el-form-item>
          <el-button :disabled="thirdStepForm.password=='' || thirdStepForm.confirmpassword==''" class="btn-next" @click="goFourStep()">Confirm</el-button>
          <el-button class="btn-return-sm" @click="backSecondStep()">Return to previous step</el-button>

        </el-form>
      </div>
      <div v-if="fourStepShow" class="four-step">
        <el-form class="login-form ma-content">
          <span class="success"/>
          <p class="t1">Your new password has been reset successfully</p>
          <el-button class="btn-next" @click="goLogin()">Sign in</el-button>
        </el-form>
      </div>

      <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    </el-form>
    <!-- 注册成功页面 -->
    <div v-if="registerResultShow" class="registerResult">
      <el-form class="ma-content">
        <span class="success"/>
        <p class="t1">Congratulations on your successful registration.</p>
        <el-button class="btn-next" @click="goLogin()">Sign In</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  sendma,
  userRegister,
  userLogin,
  forgetSendMa,
  resetPassword
} from '@/api/login'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
import { getConfigs } from '@/api/login'

export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        // callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      Configs: {},
      thirdStepForm: {
        password: '',
        confirmpassword: '',
        type: 'email'
      },
      lengthReg: false,
      capitalReg: false,
      numberReg: false,
      secondStepForm: {
        email: '',
        password: '',
        phone_number: '',
        type: '',
        verification_code: ''
      },
      secondStepFormPhone: {
        password: '',
        phone_number: '',
        type: 'phone_number',
        verification_code: '',
        phone_number_code: ''
      },
      loginForm: {
        email: '',
        password: '',
        type: 'email'
      },
      phoneLoginForm: {
        phone_number: '',
        type: 'phone_number',
        password: '',
        phone_number_code: ''
      },
      // 邮箱注册发送验证码参数
      sendMail: {
        to: '',
        type: 'email'
      },
      // 邮箱注册参数
      registerForm: {
        type: 'email',
        email: '',
        password: '',
        confirmpassword: '',
        company_name: '',
        verification_code: ''
      },
      // 手机号注册参数
      phoneRegisterForm: {
        type: 'phone_number',
        phone_number: '',
        password: '',
        confirmpassword: '',
        company_name: '',
        verification_code: '',
        phone_number_code: ''
      },
      // 用户登录参数
      userLogin: {
        type: '',
        email: '',
        phone_number: '',
        password: ''
      },
      pwdList: [],
      oldPwdList: [],
      isDelete: false,
      ipt: [],
      // 发送电子邮箱页面
      verifyEmail: false,
      passwordPumpShow: true,
      loginPumpShow: false,
      loginShow: true,
      registerShow: false,
      registerwrongPump: false,
      registerResultShow: false,
      passwordRecoveryShow: false,
      firstStepShow: true,
      secondStepShow: false,
      secondStepText: 'Send',
      reSend: 'Resend',
      thirdStepShow: false,
      fourStepShow: false,
      secondStepPhoneShow: false,
      secondStepEmailShow: false,
      sendMaDisabled: false,
      timer: null,
      active: 1,
      checked: true,
      num: 0,
      registernum: 0,
      registerWrongMessage: '',
      wrongMessage: '',
      mamessage: 'Email address',
      popoverShow: false,
      areaselect: '中国大陆 +86',
      disabled: true,
      isactive: false,
      denglustyle: [
        {
          content: 'Email sign in',
          isBool: true
        },
        {
          content: 'Mobile sign in',
          isBool: false
        }
      ],
      registerstyle: [
        {
          content: 'Email sign in',
          isBool: true
        },
        {
          content: 'Mobile sign in',
          isBool: false
        }
      ],
      area: ['中国大陆 +86', '中国大陆 +86', '中国大陆 +86', '中国大陆22'],
      // passwordType: "password",
      loading: false,
      showDialog: false,
      redirect: undefined,

      // 判断找回方式
      wayBack: '',

      // continue
      continue: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    'registerForm.password': function() {
      const lengthReg = /^[0-9A-Za-z]{8,20}$/
      const capitalReg = /^(?=.*[a-z])(?=.*[A-Z])/
      const numberReg = /(?=.*\d)/
      const passwordReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,20}$/
      const self = this
      if (lengthReg.test(this.registerForm.password)) {
        this.lengthReg = true
      } else {
        this.lengthReg = false
      }
      if (capitalReg.test(this.registerForm.password)) {
        this.capitalReg = true
      } else {
        this.capitalReg = false
      }
      if (numberReg.test(this.registerForm.password)) {
        this.numberReg = true
      } else {
        this.numberReg = false
      }
      if (passwordReg.test(this.registerForm.password)) {
        setTimeout(function() {
          self.passwordPumpShow = false
        }, 500)
      } else {
        this.passwordPumpShow = true
      }
    }
  },
  created() {
    this.getConfigs()
    // window.addEventListener('hashchange', this.afterQRScan)\
    this.keyupEnter()
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  mounted() {
    this.ipt = document.querySelectorAll('#inputList .disInput')
  },
  methods: {
    // 点击切换中英文版本
    handleCommand(command) {
      this.$message('click on item ' + command)
    },
    goFourStep() {
      var pPattern = /^(\w){6,20}$/
      if (!pPattern.test(this.thirdStepForm.password)) {
        this.$notify.warning({
          title: '警告',
          message: '密码只能输入6-20个字母、数字、下划线',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      }

      if (this.thirdStepForm.password != this.thirdStepForm.confirmpassword) {
        this.$notify.error({
          title: '错误',
          message: '密码输入不一致',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      }
      if (this.secondStepEmailShow) {
        resetPassword({
          type: 'email',
          verification_code: this.secondStepForm.verification_code,
          email: this.secondStepForm.email,
          password: this.thirdStepForm.password,
          repeat_password: this.thirdStepForm.confirmpassword
        }).then(response => {
          if (response.data.code == 0) {
            this.fourStepShow = true
            this.thirdStepShow = false
            this.active++
          } else {
            //  this.registerWrongMessage =
          }
        })
      } else {
        resetPassword({
          type: 'phone_number',
          verification_code: this.secondStepFormPhone.verification_code,
          phone_number: this.secondStepFormPhone.phone_number,
          password: this.thirdStepForm.password,
          repeat_password: this.thirdStepForm.confirmpassword
        }).then(response => {
          if (response.data.code == 0) {
            this.fourStepShow = true
            this.thirdStepShow = false
            this.active++
          } else {
            //  this.registerWrongMessage =
          }
        })
      }
      // this.active--
    },
    // 回退第二步
    backSecondStep() {
      this.thirdStepShow = false
      this.secondStepShow = true
      this.active--
    },
    backFirstStep() {
      this.secondStepShow = false
      this.firstStepShow = true
      this.active--
    },
    // 重置密码第三步
    goThirdStep() {
      // var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      // if( reg.test(this.secondStepForm.email) ){
      this.secondStepShow = false
      this.thirdStepShow = true
      this.active++
      // }else{
      //   this.$message()
      // }
    },
    forgetSendMa() {
      if (this.secondStepEmailShow) {
        forgetSendMa({
          type: 'email',
          to: this.secondStepForm.email
        }).then(response => {
          if (response.data.code == 0) {
          } else {
            //  this.registerWrongMessage =
          }
        })
      } else {
        forgetSendMa({
          type: 'phone_number',
          to: this.secondStepFormPhone.phone_number
        }).then(response => {
          if (response.data.code == 0) {
          } else {
            //  this.registerWrongMessage =
          }
        })
      }
    },
    // 第二步发送验证码
    secondStepSendMa() {
      console.log(this.wayBack)
      if (this.secondStepForm.email == '' && this.wayBack == 'email') {
        this.$notify.warning({
          title: '警告',
          message: '电子邮箱不可为空',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      }
      var regEmail = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$') // 正则表达式
      if (!regEmail.test(this.secondStepForm.email) && this.wayBack == 'email') {
        this.$notify.error({
          title: '错误',
          message: '您输入的电子邮箱格式错误',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      }

      if (this.secondStepFormPhone.phone_number == '' && this.wayBack == 'phone') {
        this.$notify.warning({
          title: '警告',
          message: '手机号码不可为空',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      }
      var regPhone = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!regPhone.test(this.secondStepFormPhone.phone_number) && this.wayBack == 'phone') {
        this.$notify.error({
          title: '错误',
          message: '您输入的手机号码格式错误',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      }

      this.forgetSendMa()
      const TIME_COUNT = 60
      this.sendMaDisabled = true
      this.secondStepText = TIME_COUNT
      this.timer = setInterval(() => {
        if (this.secondStepText > 0 && this.secondStepText <= TIME_COUNT) {
          this.secondStepText--
        } else {
          this.sendMaDisabled = false
          this.secondStepText = '发送验证码'
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    // 通过邮箱找回密码
    recoveryByEmail() {
      this.firstStepShow = false
      this.secondStepShow = true
      this.secondStepPhoneShow = false
      this.secondStepEmailShow = true
      if (this.active++ > 2) this.active = 0
      this.wayBack = 'email'
      this.secondStepForm.email = '' // 清空上一次的内容
      this.secondStepForm.verification_code = '' // 清空验证码
    },
    // 通过手机号找回密码
    recoveryByPhone() {
      this.firstStepShow = false
      this.secondStepShow = true
      this.secondStepPhoneShow = true
      this.secondStepEmailShow = false
      if (this.active++ > 2) this.active = 0
      this.wayBack = 'phone',
      this.secondStepFormPhone.phone_number = '' // 清空手机号码
      this.secondStepFormPhone.verification_code = '' // 清空验证码
    },
    // 进入找回密码页面
    forgetPassword() {
      this.fourStepShow = false
      this.loginShow = false
      this.passwordRecoveryShow = true
    },
    // 邮箱登录
    loginByEmail() {
      const emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/
      if (emailReg.test(this.loginForm.email)) {
        this.$store
          .dispatch('LoginByUsername', this.loginForm)
          .then(() => {
            this.$router.push({ path: this.redirect || '/' })
          })
          .catch(() => {

          })
      } else {
        this.$notify.warning({
          title: '警告',
          message: '电子邮箱格式输入错误',
          position: 'bottom-right',
          duration: 1500
        })
      }
    },
    //
    keyupEnter() {
      document.onkeydown = e => {
        const body = document.getElementsByTagName('body')[0]
        if (e.keyCode === 13 && e.target.baseURI.match(/inputbook/) && e.target === body) {
          console.log('enter')
          this.enterLogin()
        }
      }
    },
    // enterLogin回车键
    enterLogin() {
      this.loginByEmail()
    },
    // 手机号登录
    loginByPhone() {
      // let emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
      // if (emailReg.test(this.loginForm.email)) {
      this.$store
        .dispatch('LoginByUsername', this.phoneLoginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || '/' })
        })
      // .catch(() => {
      //   this.$message.error('账号或密码错误')
      // });
      // }
    },
    // 去注册
    goRegister() {
      this.countdownVerification()
      if (this.registernum == 0) {
        this.emailsendma()
      } else {
        this.phonesendma()
      }
    },
    // 重发验证码
    resend() {
      if (this.registernum == 0) {
        this.emailsendma()
      } else {
        this.phonesendma()
      }
      console.log(this.registernum)
      this.countdownVerification()
    },

    // 验证码倒计时
    countdownVerification() {
      const TIME_COUNT = 60
      this.sendMaDisabled = true
      this.secondStepText = TIME_COUNT
      this.timer = setInterval(() => {
        if (this.secondStepText > 0 && this.secondStepText <= TIME_COUNT) {
          this.secondStepText--
        } else {
          this.sendMaDisabled = false
          this.secondStepText = '发送验证码'
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    // 验证电子邮箱，密码，确认密码，公司名称是否合理
    checkValidate() {
      const emailReg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/
      const passwordReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,20}$/
      if (this.registerForm.email == '') {
        // this.registerWrongMessage = "电子邮箱不能为空";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '电子邮箱不能为空',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (!emailReg.test(this.registerForm.email)) {
        // this.registerWrongMessage = "电子邮箱格式错误";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '电子邮箱格式错误',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (this.registerForm.password == '') {
        // this.registerWrongMessage = "密码不能为空";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '密码不能为空',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (!passwordReg.test(this.registerForm.password)) {
        // this.registerWrongMessage = "密码格式错误";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '密码格式错误',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (this.registerForm.confirmpassword == '') {
        // this.registerWrongMessage = "确认密码不能为空";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '确认密码不能为空',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (
        !(this.registerForm.confirmpassword == this.registerForm.password)
      ) {
        // this.registerWrongMessage = "密码不一致";
        // this.registerwrongPump = true;
        this.$notify.error({
          title: '错误',
          message: '两次输入密码不一致，请重新输入',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (this.registerForm.company_name == '') {
        // this.registerWrongMessage = "公司名称不能为空";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '公司名称不能为空',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      }
      this.registerwrongPump = false
      return true
    },
    checkPhoneValidate() {
      const passwordReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,20}$/
      if (this.phoneRegisterForm.phone_number == '') {
        // this.registerWrongMessage = "手机号码不能为空";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '手机号码不能为空',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (this.phoneRegisterForm.password == '') {
        // this.registerWrongMessage = "密码不能为空";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '密码不能为空',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (!passwordReg.test(this.phoneRegisterForm.password)) {
        // this.registerWrongMessage = "密码格式错误";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '密码格式错误',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (this.phoneRegisterForm.confirmpassword == '') {
        // this.registerWrongMessage = "确认密码不能为空";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '确认密码不能为空',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (
        !(
          this.phoneRegisterForm.confirmpassword ==
          this.phoneRegisterForm.password
        )
      ) {
        // this.registerWrongMessage = "密码不一致";
        // this.registerwrongPump = true;
        this.$notify.error({
          title: '错误',
          message: '两次输入密码不一致，请重新输入',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      } else if (this.phoneRegisterForm.company_name == '') {
        // this.registerWrongMessage = "公司名称不能为空";
        // this.registerwrongPump = true;
        this.$notify.warning({
          title: '警告',
          message: '公司名称不能为空',
          position: 'bottom-right',
          duration: 1500
        })
        return false
      }
      this.registerwrongPump = false
      return true
    },
    // 聚焦的时候验证密码
    showPump() {
      this.passwordPumpShow = true
    },
    hidePump() {
      this.passwordPumpShow = false
    },
    // checkPassword(){
    //   console.log("lllllllll")
    //   let passwordReg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,20}$/
    //   if(passwordReg.test(this.registerForm.password)){
    //     this.passwordPumpShow = false
    //   }
    // },
    // 电子邮件发送验证码
    emailsendma() {
      if (this.checkValidate()) {
        sendma({
          ...this.sendMail,
          to: this.registerForm.email
        }).then(response => {
          console.log(response)
          if (response.data.code == 0) {
            this.verifyEmail = true
            this.$nextTick(() => {
              this.ipt = document.querySelectorAll('#inputList .disInput')
            })
            // this.registerForm.email = ''
            // this.registerForm.password = ''
            // this.registerForm.confirmpassword = ''
            // this.registerForm.company_name = ''
          } else {
          }
        }).catch((error) => {
          console.log(error + '99999999999999')
          // if( error && error.response){
          //   switch( error.response.status ){
          //     case 422:
          //       error.message = '邮箱账号已经存在'
          //       break;
          //   }
          // }
        })
      }
    },
    // 手机号发送验证码
    phonesendma() {
      if (this.checkPhoneValidate()) {
        sendma({
          type: 'phone_number',
          to: this.phoneRegisterForm.phone_number
        }).then(response => {
          console.log(response)
          if (response.data.code == 0) {
            this.verifyEmail = true
            this.$nextTick(() => {
              this.ipt = document.querySelectorAll('#inputList .disInput')
            })
            // this.phoneRegisterForm.phone_number = ''
            // this.phoneRegisterForm.password = ''
            // this.phoneRegisterForm.confirmpassword = ''
            // this.phoneRegisterForm.company_name = ''
          } else {
          }
        })
      }
    },
    // 返回注册页
    backregister() {
      this.verifyEmail = false
      this.pwdList = []
    },
    // 返回登录页
    goLogin() {
      this.registerShow = false
      this.registerResultShow = false
      this.passwordRecoveryShow = false
      this.fourStepShow = false
      this.loginShow = true
    },
    // 去注册页
    toregister() {
      this.loginShow = false
      this.registerShow = true
      //
      this.registerForm.email = ''
      this.registerForm.password = ''
      this.registerForm.confirmpassword = ''
      this.registerForm.company_name = ''
      //
      this.phoneRegisterForm.phone_number = ''
      this.phoneRegisterForm.password = ''
      this.phoneRegisterForm.confirmpassword = ''
      this.phoneRegisterForm.company_name = ''
    },
    // 电子邮箱注册
    userRegister() {
      if (this.registernum == 0) {
        userRegister({
          ...this.registerForm,
          verification_code: this.pwdList.join('')
        }).then(response => {
          if (response.data.code == 0) {
            this.registerResultShow = true
            this.verifyEmail = false
            this.registerShow = false
            // this.pwdList = [];
          }
        })
      } else {
        userRegister({
          ...this.phoneRegisterForm,
          verification_code: this.pwdList.join('')
        }).then(response => {
          if (response.data.code == 0) {
            this.registerResultShow = true
            this.verifyEmail = false
            this.registerShow = false
            // this.pwdList = []
          }
        })
      }
    },
    getpopover() {
      this.popoverShow = true
    },
    next() {
      if (this.active++ > 3) this.active = 1
    },
    selectedLogin(item) {
      this.phoneLoginForm.phone_number_code = item.value
      this.popoverShow = false
    },
    selectedRegistered(item) {
      this.phoneRegisterForm.phone_number_code = item.value
      this.popoverShow = false
    },
    selectedForget(item) {
      this.secondStepFormPhone.phone_number_code = item.value
      this.popoverShow = false
    },
    tab(item, index) {
      this.denglustyle.forEach((item, index) => {
        item.isBool = false
      })
      this.num = index

      item.isBool = true
    },
    registerTab(item, index) {
      this.registerstyle.forEach((item, index) => {
        item.isBool = false
      })
      this.registernum = index
      item.isBool = true
    },
    // showPwd() {
    //   if (this.passwordType === "password") {
    //     this.passwordType = "";
    //   } else {
    //     this.passwordType = "password";
    //   }
    // },
    // handleLogin() {
    //   this.$refs.loginForm.validate(valid => {
    //     if (valid) {
    //       this.loading = true;
    //       this.$store
    //         .dispatch("LoginByUsername", this.loginForm)
    //         .then(() => {
    //           this.loading = false;
    //           this.$router.push({ path: this.redirect || "/" });
    //         })
    //         .catch(() => {
    //           this.loading = false;
    //         });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    },
    keyUp(ev) {
      let index = this.pwdList.length
      if (!index) return
      if (ev.keyCode === 8) {
        this.isDelete = true
        if (this.oldPwdList === this.pwdList.length) {
          if (index === this.pwdList.length) {
            this.pwdList.pop()
          }
          index--
        } else {
          index > 0 && index--
        }
        this.ipt[index].focus()
      } else if (
        this.isDelete &&
        index === this.pwdList.length &&
        /^\d$/.test(ev.key)
      ) {
        this.isDelete = false
        this.pwdList.pop()
        this.pwdList.push(ev.key)
        this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus()
      }
      // this.$emit('getPwd', this.pwdList.join(''))
    },
    changePwd() {
      console.log(1111)
      let index = this.pwdList.length
      index === 6 && index--
      console.log(this.ipt)
      this.ipt[index].focus()
    },
    changeInput() {
      console.log(2222)
      let index = this.pwdList.length
      const val = this.pwdList[index - 1]
      if (!/[0-9]/.test(val)) {
        this.pwdList.pop()
        return
      }
      if (!val) {
        this.pwdList.pop()
        index--
        console.log(index)
        if (index > 0) this.ipt[index - 1].focus()
      } else {
        console.log(index)
        if (index < 6) this.ipt[index].focus()
      }
    },
    // 加载配置文件
    getConfigs() {
      getConfigs().then(res => {
        if (res.data.code == 0) {
          this.Configs = res.data.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;
$body_padding: 13px;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  // .login-container .el-input input {
  //   // color: $cursor;
  //   // &::first-line {
  //   //   color: $light_gray;
  //   // }
  // }
}
.el-step__title{
  line-height: 1;
}
.el-step__main{
  margin-top: 10px;
}
.el-checkbox__inner {
  border: 1px solid #c0c4cc;
  background: transparent;
}
// 步骤样式格式化
.el-step__title.is-process {
  color: #DADADA;
  font-weight: normal;
}
.el-step__head.is-process {
  color: #ffffff;
  border-color: #ffffff;
}
.el-step__icon {
  width: 26px;
  height: 26px;
  background-color: transparent;
}
.el-step.is-center .el-step__line {
  left: calc(50% + #{$body_padding});
  right: calc(-50% + #{$body_padding});
  background-color: #DADADA;
  top: 11.5px;
  height: 2px;
}
.el-step__icon.is-text {
  border: 2px solid;
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
  color: #DADADA;
  border-color: #DADADA;
}
.el-step__title.is-wait {
  color: #DADADA;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #c0c4cc;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ffa800;
  border-color: #ffa800;
}
// .el-tabs__nav-wrap::after{
//   background-color:transparent
// }
// .el-tabs__active-bar{
//   background-color: #FFA800;
// }

/* reset element-ui css */
.login-container {
  // .el-input {
  //   display: inline-block;
  //   height: 47px;
  //   width: 85%;
  //   input {
  //     background: transparent;
  //     border: 0px;
  //     -webkit-appearance: none;
  //     border-radius: 0px;
  //     padding: 12px 5px 12px 15px;
  //     color: $light_gray;
  //     height: 47px;
  //     caret-color: $cursor;
  //     &:-webkit-autofill {
  //       -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
  //       -webkit-text-fill-color: $cursor !important;
  //     }
  //   }
  // }
  .el-input__inner {
    text-align: center;
    background-color: transparent;
    color: #ffffff;
    border: none;
    height: 28px !important;
    line-height: 28px !important;
  }
  .phone-email-content{
    .el-input__inner{
      text-align: left;
    }
  }
  .el-form-item--medium .el-form-item__content,
  .el-form-item--medium .el-form-item__label {
    line-height: 28px;
  }
  .el-form-item {
    border-bottom: 1px solid #c0c4cc;
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    // border-radius: 5px;
    // color: #454545;
    margin-bottom:12px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.changeColor{
  color:#DADADA !important;
  cursor:auto !important;
}
.recolor{
  border: 1px solid #C0C4CC !important;
  color: #909399 !important;
}
.disabled {
  width: 400px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  background: #b9b9b9;
  border: none;
}
.disabled:hover {
  background: #b9b9b9;
}
.isactive {
  display: block;
  margin: 0 auto;
  width: 400px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  background: #ffa800;
  border: none;
}
.isactive:hover {
  background: #ffc500;
}
.btnreturn {
  display: block;
  width: 400px;
  margin: 0 auto 16px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  background: transparent;
  color: #979797;
  border: 2px solid #979797;
  border-radius: 4px;
  color: #ffffff;
}
.margin40 {
  margin-top: 40px;
}
.margin16 {
  margin-top: 16px;
}
.tip {
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 8px;
  margin-top:12px;
  // .agreement {
  //   margin-left: 8px;
  // }
  // a {
  //   color: #ffa800;
  //   text-decoration: underline;
  // }
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url("/static/image/homebackground.png") no-repeat 100% 100%;
  // 注册成功弹窗
  .registerResult {
    position: absolute;
    width: 550px;
    height: 400px;
    padding: 80px 0;
    background: rgba(255, 255, 255, 0.2);
    left: 50%;
    top: 50%;
    margin-left: -275px;
    margin-top: -200px;
    .success {
      background: url("/static/image/success.png") no-repeat;
      display: block;
      width: 108px;
      height: 108px;
      margin: 0 auto;
    }
    .t1 {
      text-align: center;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 0.71px;
      margin-top: 20px;
    }
    .btn-next {
      display: block;
      width: 400px;
      height: 40px;
      background: #ffa800;
      border-radius: 6px;
      color: #ffffff;
      text-align: center;
      font-size: 16px;
      border: none;
      margin: 50px auto 0;
    }
  }
  // 找回密码
  .password-recovery {
    position: absolute;
    width: 800px;
    height: 600px;
    padding: 100px 0 80px;
    background: rgba(255, 255, 255, 0.2);
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -300px;
    .first-step {
      margin-top: 70px;
      padding:0 80px;
      .recovery-style {
        overflow: hidden;
        > div {
          margin:0 auto;
          border: 2px solid #dadada;
          border-radius: 4px;
          width: 300px;
          height: 200px;
          text-align: center;
          line-height: 200px;
          font-size: 20px;
          color: #dadada;
        }
        > div:hover {
          cursor: pointer;
          color: #ffa800;
          background: rgba(255, 168, 0, 0.1);
          border: 2px solid #ffa800;
        }
        > div:first-child {
          // float: left;
          .iconfont {
            font-size: 40px;
            vertical-align: middle;
            margin-right: 20px;
          }
        }
        > div:nth-child(2) {
          float: right;
          .iconfont {
            font-size: 40px;
            vertical-align: middle;
            margin-right: 20px;
          }
        }
      }
      .btn-recovery-return {
        margin: 0 auto;
        width: 400px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #dadada;
        letter-spacing: 0.77px;
        border: 1px solid #dadada;
        border-radius: 4px;
        cursor: pointer;
      }
      .margin70 {
        margin-top: 70px;
      }
    }
    .second-step {
      width: 400px;
      margin: 70px auto 0;
      .ma-content {
        padding: 0;
        .secondStepPhone {
          .phone-style {
            display: inline-block;
            width: 120px;
            float: left;
            font-size: 16px;
            color: #ffffff;
            font-weight: normal;
            white-space:nowrap;
            overflow:hidden;
            text-overflow: ellipsis;
          }
          .arrow-next {
            cursor:pointer;
            float: left;
            font-size:16px;
            color:#DADADA;
            line-height:28px;
            margin:0 10px 0 9px;
          }
          .phone-email-content{
            float: left;
            width: 200px;
            color: #ffffff;
            border-left: 1px solid #ffffff;
            height: 28px;
            // padding-left: 10px;
            font-size: 16px;
          }
        }
        .ma-input {
          width: 280px;
          border-right: 1px solid #ffffff;
        }
        .sendma {
          float: right;
          padding: 0 16px;
          font-size: 16px;
          color: #ffa800;
          cursor: pointer;
        }
      }
      .btn-next {
        width: 400px;
        height: 40px;
        background: #ffa800;
        border-radius: 6px;
        color: #ffffff;
        text-align: center;
        font-size: 16px;
        border: none;
        margin-top: 40px;
      }
      .btn-return-sm {
        width: 400px;
        height: 40px;
        background: transparent;
        border-radius: 6px;
        color: #ffffff;
        text-align: center;
        font-size: 16px;
        border: 2px solid #979797;
        border-radius: 4px;
        margin: 16px 0 0;
      }
    }
    .four-step {
      margin-top: 80px;
      .success {
        background: url("/static/image/success.png") no-repeat;
        display: block;
        width: 108px;
        height: 108px;
        margin: 0 auto;
      }
      .t1 {
        text-align: center;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0.71px;
      }
      .btn-next {
        display: block;
        width: 400px;
        height: 40px;
        background: #ffa800;
        border-radius: 6px;
        color: #ffffff;
        text-align: center;
        font-size: 16px;
        border: none;
        margin: 50px auto 0;
      }
    }
  }
  .verify-email {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 800px;
    margin-left: -400px;
    margin-top: -300px;
    background: #ffffff;
    height: 600px;
    z-index: 2;
    .email-img {
      background: url("/static/image/bigemail.png") no-repeat 100% 100%;
      width: 122px;
      height: 80px;
      display: block;
      margin: 94px auto 0;
    }
    .input-box {
      border: none;
      overflow: hidden;
      width: 470px;
      margin: 0 auto;
      .write-input {
        overflow: hidden;
        list-style: none;
        // li{
        //   float: left;
        //    margin-right: 20px;
        input {
          width: 60px;
          height: 60px;
          padding: 0;
          text-align: center;
          line-height: 60px;
          font-size: 30px;
          color: #ffa800;
          border: 1px solid #909399;
          border-radius: 2px;
          margin-right: 20px;
          outline: none;
        }
        input:last-child {
          margin-right: 0;
        }
      }
    }
    .t1 {
      font-size: 16px;
      color: #606266;
      letter-spacing: 3px;
      text-align: center;
      margin:30px auto 10px;
    }
    .orangeText{
      font-size: 16px;
      color: #FFA800;
      letter-spacing: 3px;
      text-align: center;
    }
    .margin18{
      font-size: 16px;
      color: #606266;
      letter-spacing: 3px;
      text-align: center;
      margin:18px auto 20px;
    }
    .t2 {
      position: relative;
      font-size: 16px;
      color: #ffa800;
      letter-spacing: 3.82px;
      text-align: center;
      margin-top: 18px;
      cursor: pointer;
      // line-height: 38px;
    }
    .t2:hover .hover-pump {
      display: block;
    }
    .hover-pump {
      display: none;
      position: absolute;
      top: -105px;
      left: 50%;
      padding: 16px 0;
      margin-left: -250px;
      width: 500px;
      // height: 90px;
      background: rgba(96, 98, 102, 0.9);
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      .hover-pump-arrow {
        position: absolute;
        content: " ";
        width: 0;
        height: 0;
        border: 10px solid rgba(96, 98, 102, 0.9);
        border-top-color: rgba(96, 98, 102, 0.9);
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        bottom: -20px;
        left: 50%;
        margin-left: -10px;
      }
    }
    .button-group {
      overflow: hidden;
      width: 560px;
      margin: 50px auto 0;
      > div {
        float: left;
        cursor: pointer;
      }
      > div:nth-child(1) {
        border: 1px solid #ffa800;
        border-radius: 4px;
        width: 180px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #ffa800;
        letter-spacing: 3.44px;
      }
      > div:nth-child(2) {
        float: left;
        margin-left: 164px;
        border: 1px solid #c0c4cc;
        border-radius: 4px;
        width: 98px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #c0c4cc;
        letter-spacing: 3.44px;
      }
      > div:nth-child(3) {
        float: right;
        border: 1px solid #c0c4cc;
        background: #c0c4cc;
        border-radius: 4px;
        width: 98px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 3.44px;
        text-align: center;
      }
      .changeColorCon{
        background:rgba(255,168,0,1) !important;
        color:red;
      }
    }
  }
  .hometop {
    width: 80%;
    margin: 40px auto 0 auto;
    overflow: hidden;
    span:nth-child(1) {
      background: url("/static/image/logo.png") no-repeat;
      float: left;
      width: 130px;
      height: 20px;
      display: block;
    }
    span:nth-child(3) {
      float: right;
      font-size: 14px;
      color: #c0c4cc;
      vertical-align: middle;
      margin-right:35px;
    }
    .switch{
      float:right;
      width:100px;
      cursor:pointer;
      span:nth-child(1){
        background:none;
        font-size:13px;
        font-weight:500;
        color:#C0C4CC;
        line-height:20px;
      }
      .el-icon--right{
        color:rgba(185,185,185,1);
      }
    }
  }
  .register-form-box{
    height:600px !important;
  }
  .login-form-box {
    position: relative;
    width:550px !important;
    height:450px;
    background:rgba(214,214,214,0.2);
    .title{
      text-align:center;
      margin:30px auto 0;
      font-size:20px;
      color:#DADADA;
    }
    .errorPump {
      position: absolute;
      right: -370px;
      bottom: 216px;
      background: rgba(214, 214, 214, 0.2);
      // opacity: 0.2;
      width: 350px;
      // height: 226px;
      font-size: 20px;
      padding: 20px;
      color: #ffffff;
      .error-content {
        font-size: 16px;
        color: #ffffff;
        z-index: 11;
      }
      .errorPump-arrow:after {
        position: absolute;
        content: " ";
        width: 0;
        height: 0;
        border: 10px solid #ffffff;
        border-top-color: transparent;
        border-left-color: transparent;
        border-right-color: rgba(214, 214, 214, 0.2);
        border-bottom-color: transparent;
        top: 23px;
        left: -20px;
      }
    }
    .tabs {
      width: 100%;
      overflow: hidden;
      list-style: none;
      margin: 0;
      padding: 0;
      .active {
        border-bottom: 2px solid #ffa800;
        color: #ffa800;
      }
      li {
        float: left;
        width: 50%;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 18px;
        color: #dadada;
        cursor:pointer;
      }
    }
    .text1 {
      text-align: right;
      margin-right: 5px;
      font-size: 14px;
      color: #bbbbbb;
      cursor: pointer;
      height:22px;
      font-weight:500;
      color:rgba(187,187,187,1);
      line-height:22px;
      margin-bottom:40px;
    }
    background: rgba(255, 255, 255, 0.2);
    position: absolute;
    left: 0;
    right: 0;
    max-width: 100%;
    margin: 180px auto 0 auto;
  }
  .login-form {
    .phone-email {
      padding: 0 0 10px 10px;
      margin-top: 32px;
      position: relative;
      .passwordPump {
        position: absolute;
        top: 55px;
        left: -10px;
        padding: 16px 23px;
        width: 400px;
        // height: 90px;
        background: #ffffff;
        font-size: 14px;
        color: #909399;
        text-align: left;
        z-index: 2;
        .hover-pump-arrow {
          position: absolute;
          content: " ";
          width: 0;
          height: 0;
          border: 10px solid rgba(96, 98, 102, 0.9);
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: #ffffff;
          top: -20px;
          left: 50%;
          margin-left: -10px;
        }
      }
      .phone-style {
        display: inline-block;
        width: 120px;
        float: left;
        font-size: 16px;
        color: #ffffff;
        font-weight: normal;
        white-space:nowrap;
        overflow:hidden;
        text-overflow: ellipsis;
      }
      .arrow-next {
        cursor:pointer;
        float: left;
        font-size:16px;
        color:#DADADA;
        line-height:28px;
        margin:0 10px 0 9px;
        // background: url("/static/image/arrow-next.png") no-repeat;
        // background-size: 33%;
        // background-position: 50% 50%;
        // display: inline-block;
        // width: 42px;
        // height: 24px;
        // margin: 3px 8px 0 0;
      }
      .phone-email-content {
        float: left;
        width: 200px;
        color: #ffffff;
        border-left: 1px solid #ffffff;
        height: 28px;
        font-size: 16px;
        text-align: left;
        .el-input__inner{
          text-align: left;
        }
      }
      .popover {
        position: absolute;
        top: 50px;
        width: 191px;
        // height: 200px;
        border-radius: 5px;
        background: #ffffff;
        z-index: 5;
        > ul {
          height: 310px;
          overflow-y: scroll;
          list-style: none;
          margin-left: -20px;
          padding-top:21px;
          li {
            color: #7c8ca5;
            font-size: 14px;
            height: 22px;
            line-height: 22px;
            margin-bottom: 10px;
            padding-left:40px;
            cursor:pointer;
          }
          li:active{
            color:rgba(22,64,97,1);
          }
        }
        .popper-arrow:after {
          position: absolute;
          content: " ";
          width: 0;
          height: 0;
          border: 6px solid #ffffff;
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: #ffffff;
          top: -12px;
          left: 20px;
        }
      }
    }
    .email {
      padding: 0 0 10px 10px;
      margin-top: 30px;
      position: relative;
      span {
        position: relative;
        float: left;
        // bottom: -6px;
      }
      .email-content {
        // width: 80%;
        // float: left;
        // margin-left: 20px;
        border: none;
        background-color: transparent;
        font-size: 16px;
        color: #cfcfcf;
      }
      .passwordPump {
        position: absolute;
        top: 65px;
        left: -10px;
        padding: 25px 20px;
        width: 400px;
        // height: 90px;
        background: #ffffff;
        font-size: 14px;
        color: #909399;
        text-align: left;
        z-index: 2;
        .activeTip{
          i{
            color: #F5A623 !important;
          }
          span{
            color: #F5A623 !important;
          }
        }
        .hover-pump-arrow {
          position: absolute;
          content: " ";
          width: 0;
          height: 0;
          border: 10px solid rgba(96, 98, 102, 0.9);
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: #ffffff;
          top: -20px;
          left: 50%;
          margin-left: -10px;
        }
        .title{
          color:#606266;
          font-size:18px;
          margin-bottom:15px;
        }
        .tips{
          margin-bottom:0;
          i{
            color:#909399;
            font-size:16px;
            margin-right:10px;
          }
          span{
            font-size:14px;
            color:#909399;
            float: none;
          }
        }
      }
    }
    padding: 15px 75px 15px 75px;
    .tip {
      text-align: center;
      font-size: 14px;
      color: #BCC0C8;

      // .agreement {
      //   margin-left: 8px;
      // }
      // a {
      //   color: #ffa800;
      //   text-decoration: underline;
      // }
    }
    .register{
      color: #ffa800;
      text-decoration: underline;
      display: block;
      text-align:center;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .popoverForget{
    position: absolute;
    top: 50px;
    width: 191px;
    // height: 200px;
    border-radius: 5px;
    background: #ffffff;
    z-index: 5;
    > ul {
      height: 310px;
      overflow-y: scroll;
      list-style: none;
      margin-left: -20px;
      padding-top:21px;
      li {
        color: #7c8ca5;
        font-size: 14px;
        height: 22px;
        line-height: 22px;
        margin-bottom: 10px;
        padding-left:40px;
        cursor:pointer;
      }
      li:active{
        color:rgba(22,64,97,1);
      }
    }
    .popper-arrow:after {
      position: absolute;
      content: " ";
      width: 0;
      height: 0;
      border: 6px solid #ffffff;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: #ffffff;
      top: -12px;
      left: 20px;
    }
  }
}
</style>
