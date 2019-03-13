<template>
  <div class="walletRechargeRmb">
    <el-row>
      <el-col :span="24">
        <div class="wallet-pay-Rmb">
          <p>Pre-charge (RMB)</p>
          <ul class="wallet-pay-Rmb-ul">
            <li>Amount</li>
            <li v-for="(item,index) in RechargeRmb" :class="{'BgColor':item.show}" :key="index" @click="addBgcolor(item)">RMB {{ item.count }}</li>
          </ul>
          <el-form ref="numberValidateForm" :model="numberValidateForm" :rules="Accountrule" status-icon label-width="100px" class="demo-ruleForm">
            <el-form-item prop="AccountInput">
              <el-input v-model="numberValidateForm.AccountInput" placeholder="Other amount" maxlength="9" auto-complete="off" style="width:300px;"/>
              <span>RMB</span>
            </el-form-item>
          </el-form>
          <div class="payAmount">
            <p>Amount payable</p>
            <p>{{ numberValidateForm.AccountInput?returnFloat(numberValidateForm.AccountInput):'0.00' }}RMB</p>
          </div>
          <div class="payment clearfix">
            <p>Payment method</p>
            <div class="paymentAll content">
              <!-- 引入组件CHN -->
              <pay-ment-chn :payment="paymentProp" @receiveDateChn="paymentWayChn"/>
            </div>
          </div>
          <!-- 点击提交 -->
          <div class="pay-rmb-submit">
            <el-button :disabled="paymentTypeId == ''" style="width:180px;background:rgba(255,168,0,1);color:#ffffff;margin-left:176px;" @click="confirmSubmit('numberValidateForm')">Submit</el-button>
            <el-dialog
              :visible.sync="centerDialogVisible"
              width="30%"
              center>
              <p class="su-payment" @receiveDateUsa="paymentWayChn($event)">You are pre-charging money from {{ detailPayWayInMessage }}</p>
              <p class="su-payaccount">Amount RMB{{ returnFloat(numberValidateForm.AccountInput) }}</p>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="JudgePayIsSuccess">Confirm</el-button>
                <el-button @click="centerDialogVisible = false">Other pre-charge ways</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import payMentChn from '../../common/paymentCHN.vue'
import { recharge, rechargeProps, rechargeSuccess, Is_Paysuccess } from '@/api/walletDetail'
let newTab
export default {
  name: 'WalletRechargeRmb',
  components: { payMentChn },
  data() {
    // 自定义规则验证输入金额
    var checkAccount = (rule, value, callback) => {
      // console.log(value)
      const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/ // 正则验证为纯数字，且保留两位小数
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('充值金额的输入格式不正确，请确认'))
        } else {
          if (value.length > 10 || value <= 0) {
            callback(new Error('请充值有效的金额'))
          } else {
            callback()
          }
        }
      }, 300)
    }
    return {
      paymentProp: '',

      // 人民币充值金额
      RechargeRmb: [
        {
          count: 700,
          show: true
        },
        {
          count: 1000,
          show: false
        },
        {
          count: 5000,
          show: false
        },
        {
          count: 10000,
          show: false
        }
      ],

      // 默认页面选中金额
      ConfirmCount: 700,

      // 自定义验证规则
      Accountrule: { AccountInput: { validator: checkAccount, trigger: 'blur' }},

      // 输入金额框
      numberValidateForm: {
        AccountInput: ''
      },

      // input框的value
      // AccountInput: '',

      // 弹框接收支付方式
      detailPayWayInMessage: '',

      // 弹出框显示隐藏
      centerDialogVisible: false,

      // 页面进入收取数据
      RechargeData: [],

      // 选择支付方式
      paymentTypeId: '',

      // payurl
      payurl: ''
    }
  },
  created() {
    this.getRechargeData({
      currency: 'CNY'
    })
  },
  methods: {
    // 点击添加样式
    addBgcolor(item) {
      this.$nextTick(() => {
        this.$refs.numberValidateForm.clearValidate() // 移除校验结果并重置字段值
      })
      for (let i = 0; i < this.RechargeRmb.length; i++) {
        this.RechargeRmb[i].show = false
      }
      item.show = !item.show
      this.numberValidateForm.AccountInput = item.count
      this.ConfirmCount = item.count
      console.log(this.numberValidateForm.AccountInput)
      console.log(item)
    },

    // 提交传递数据CHN
    paymentWayChn(evl) {
      if (evl == '1') {
        this.detailPayWayInMessage = '支付宝'
      } else if (evl == '2') {
        this.detailPayWayInMessage = '银联'
      } else if (evl == '3') {
        this.detailPayWayInMessage = '测库月结'
      } else if (evl == '4') {
        this.detailPayWayInMessage = '钱包'
      }
      this.paymentTypeId = evl
      console.log(evl)
    },

    // 点击确定付款
    confirmSubmit(formName) {
      //  if( this.numberValidateForm.AccountInput == '' ){  //判断有没有选择输入 金额
      //         // this.centerDialogVisible = true
      //         this.finalConfirmCount()
      //         console.log( this.numberValidateForm.AccountInput )
      //     }else {
      console.log('11111111111111')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(' 格式验证通过，可以进入确认弹框 ')
          this.centerDialogVisible = true
          this.finalConfirmCount()
        } else {
          console.log('error submit!! ')
          return false
        }
      })
      // }
    },

    // 弹框最终确认信息
    finalConfirmCount() {
      if (this.paymentTypeId == 1) {
        newTab = window.open()
      }
      this.RechargeParams('/' + this.RechargeData.payment_id + '/' + this.paymentTypeId, {
        price: this.numberValidateForm.AccountInput
      })
    },

    // 充值金额，付款方式参数值
    RechargeParams(val1, val2) {
      rechargeProps(val1, val2).then(response => {
        if (response.data.code == 0) {
          // 进入这个判断说明支付成功，请求url地址
          this.payurl = response.data.data.url.split('api/')[1].toString()
          console.log(response)
          this.RwchargeSuccessRes()
        }
      })
    },

    // 请求url地址
    RwchargeSuccessRes() {
      console.log('进入请求地址')
      console.log(this.payurl)
      rechargeSuccess({ url: this.payurl }).then(response => {
        console.log('支付成功1')
        if (this.paymentTypeId == 1) {
          console.log(response)
          // this.$router.push({ path: 'walletAccountIndex' })
          const div = document.createElement('div')
          div.innerHTML = response.data // html code
          newTab.document.body.appendChild(div)
          newTab.document.forms.alipaysubmit.submit()
        }
      })
    },

    // JudgePayIsSuccess
    JudgePayIsSuccess() {
      Is_Paysuccess(this.RechargeData.payment_id).then(response => {
        if (response.data.code == 0) {
          console.log(response)
          if (response.data.data.status == 4) {
            this.$message.success({
              message: 'Alipay paid successfully'
            })
            this.$router.go(-1)
          } else {
            this.$message.error({
              message: 'Alipay payment failed. Please reconfirm.'
            })
          }
        }
      })
    },

    // 获取数据,传递参数（充值金额，付款方式）
    getRechargeData(val) {
      console.log(' 创建函数success ')
      recharge(val).then(response => {
        if (response.data.code == 0) {
          console.log(' 充值界面进入success ')
          this.RechargeData = response.data.data
          this.paymentProp = response.data.data.select.CNY
          console.log(this.RechargeData)
        }
      })
    },

    // 金额数据处理returnFloat
    returnFloat(value) {
      var value = Math.round(parseFloat(value) * 100) / 100
      var xsd = value.toString().split('.')
      if (xsd.length == 1) {
        value = value.toString() + '.00'
        return value
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + '0'
        }
        return value
      }
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scope>
//普通样式
.walletRechargeRmb{
    // wallet-pay
    .wallet-pay-Rmb{
        padding-left:100px;
        padding-top:38px;
        p:nth-child(1){
            height:25px;
            line-height: 25px;
            font-size:16px;
            color:#50688C;
            margin-bottom:30px;
        }
        .wallet-pay-Rmb-ul{
            height:40px;
            padding:0;
            margin-bottom:24px;
            li{
                width:140px;
                height:100%;
                border:1px solid #C0C4CC;
                border-radius:4px;
                float:left;
                text-align:center;
                line-height: 40px;
                color:#909399;
                font-size:14px;
                margin-right:30px;
                cursor:pointer;
            }
            li:nth-child(1){
                border:none;
                width:150px;
                margin-right:26px;
                text-align: left;
                color:#7F8FA4;
            }
            div{
              .el-radio-group{
                .el-radio-button__inner{
                  width:140px !important;
                }
              }
            }
            // .addBg{
            //     background:#67C23A;
            //     color:#fff;
            // }
            .class-G{
                background:#67C23A;
                color:#fff;
            }
            // .class-B{
            //     background:#F3F6F9;
            //     color:#909399;
            // }
            //radio3的样式

        }
        p:nth-child(3){
            height:40px;
            margin-left:90px;
            position:relative;
            width:300px;
            margin-bottom:24px;
            #sumFin{
                width:284px;
                height:100%;
                border:1px solid #C0C4CC;
                outline: none;
                border-radius:4px;
                color:#909399;
                font-size:14px;
                padding-left:16px;
                background:#F3F6F9;
            }
            span{
                color:#909399;
                font-size:14px;
                position:absolute;
                right:26px;
                top:13px;
            }
        }
        .payAmount{
            overflow: hidden;
            p{
                float:left;
            }
            p:nth-child(1){
                width: 150px;
                height:64px;
                line-height: 64px;
                font-size:14px;
                color:#7F8FA4;
                margin:0 26px 0 0;
            }
            p:nth-child(2){
                height:64px;
                line-height: 64px;
                font-size:24px;
                color:#158be4;
                font-weight:600;
            }
        }
        //payment
        .payment{
            // height:400px;
            margin-bottom:24px;
            margin-top:20px;
            p{
                width: 150px;
                height:80px;
                color:#7F8FA4;
                font-size:14px;
                float:left;
                line-height:80px;
                margin-right:26px;

            }
            .paymentAll{
                float:left;
                // height:400px;
                width:660px;
            }

        }
        //propsData
        .propsData{
            width:250px;
            height:50px;
            border:none;
            border-radius:4px;
            text-align: center;
            line-height: 50px;
            background:#FFA800;
            color:#fff;
            font-size:18px;
            margin-left:147px;
            cursor:pointer;
        }
        //pay-rmb-submit
        .pay-rmb-submit{
          p{
            height:28px;
            text-align: center;
            font-size:20px;
            color:#6F90AE;
          }
          .su-payment{
            margin-bottom:0;
          }
        }
    }
     //common
    .BgColor{
        background:#67C23A;
        color:#fff !important;
        border:none !important;
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scope>
//element样式
  .wallet-pay-Rmb{
      //输入金额框
    .demo-ruleForm{
        .el-form-item{
            margin-bottom:0;
        }
        .el-form-item__content{
            margin-left:176px !important;
            position:relative;
        }
        .el-input--medium .el-input__inner{
            width:300px;
            height:40px;
            border-radius:4px;
            border:1px solid rgba(192,196,204,1);
            padding-right:40px;
        }
        .el-input__suffix{
            width:28px;
            margin-left:42px;
        }
        span{
            font-size:14px;
            color:rgba(144,147,153,1);
            position:absolute;
            left:258px;
            // top:10;
            top:0;
            height:40px;
            line-height:40px;
            display:block;
        }
    }
    //充值金额
    .el-button--medium{
      width:140px;
      height:40px;
      background:#F3F6F9;
      margin:0;
      border:1px solid #C0C4CC;
      margin-right:30px;
      span{
        font-size:14px !important;
        color:#909399;
      }
    }
  //弹出框样式调整
  .pay-rmb-submit{
    //点击按钮
    .el-button--medium{
      margin-left:146px;
      width:250px;
      height:50px;
      border-radius:4px;
      background:#FFA800;
      border:none;
      span{
        color:#fff;
        font-size:18px;
      }
    }
    //弹出框界面
    .el-dialog__wrapper{
      .el-dialog--center{
        width:600px !important;
        height:360px !important;
        border-radius:8px;
        border:none;
        //弹出框header
        .el-dialog__header{
          height:48px;
          margin-bottom:49px;
          .el-dialog__headerbtn{
            i{
              font-size:32px;
              color:#909399;
              font-weight:600;
            }
          }
        }
        //弹出框body
        .el-dialog__body{
          padding:0;
          margin-bottom:27px;
        }
        //弹出框footer
        .el-dialog__footer{
          padding:0;
          button{
            margin-left:210px !important;
            width:180px !important;
            height:40px !important;
            border:none;
            padding: 0;
            display:block;
          }
          button:nth-child(1){
            margin-bottom:16px;
            span{
              font-size:14px !important;
              color:#fff;
            }
          }
          button:nth-child(2){
            background:#fff;
            border:1px solid #909399;
            span{
              color:#909399;
              font-size:14px !important;
            }
          }
        }
      }
    }
  }
}
</style>

