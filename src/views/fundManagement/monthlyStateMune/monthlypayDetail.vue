<template>
  <div class="monthlypayDetail">
    <el-row>
      <el-col :span="24" class="payDetail-info">
        <div class="payDetail-info-total">
          <p>还款</p>
          <ul>
            <li>还款金额：</li>
            <li>人民币</li>
            <li>￥8989.89</li>
            <li/>
            <li>共11单</li>
            <li>
              <span>查看详情</span>
              <span/>
            </li>
          </ul>
        </div>
        <div class="payDetail-info-invoice">
          <p>发票类型</p>
          <template>
            <el-radio v-model="invoiceType" label="1">不开发票</el-radio>
            <el-radio v-model="invoiceType" label="2">增值税发票</el-radio>
            <el-radio v-model="invoiceType" label="3">普通发票</el-radio>
          </template>
        </div>
        <div v-show="makeInvoice" class="payDetail-info-makeInvoice">
          <p>开票公司</p>
          <template>
            <el-select v-model="invoiceCompanyValue" placeholder="选择开票公司">
              <el-option
                v-for="item in invoiceCompany"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </template>
          <el-button type="primary" class="increasedCompany" @click="editFormVisible = true">
            <i>+</i>
            <span>新增开票公司</span>
          </el-button>
        </div>
        <div v-show="invoicePersonVif" class="payDetail-info-invoicePerson">
          <p>发票收件人</p>
          <template>
            <el-select v-model="invoicePersonValue" placeholder="选择收件人">
              <el-option
                v-for="item in invoicePerson"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </template>
          <el-button type="primary" class="increasedAddress" @click="editFormVisibleADS = true">
            <i>+</i>
            <span >新增寄送地址</span>
          </el-button>
        </div>
        <div class="payDetail-info-payment">
          <p>付款方式</p>
          <!-- 引入组件 -->
          <div>
            <payment-chn v-if="paymentCHN" @receiveDateChn="getPaymentInfo"/>
            <payment-usa v-if="paymentUSA" @receiveDateUsa="getPaymentInfo"/>
          </div>
        </div>
        <div v-show="payPassword" class="payDetail-info-payPassword">
          <p>支付密码</p>
          <el-input v-model="payPasswordInput" type="password" placeholder="输入支付密码"/>
          <p>忘记密码？</p>
        </div>
        <!-- <button class="payDetail-info-submit">确定付款</button> -->
        <el-button class="payDetail-info-submit" type="text" @click="confirmPayDialog">确定付款</el-button>
        <!-- 编辑弹出框 - 新增开票公司-->
        <div class="payDetail-info-increasedCompany">
          <el-dialog :visible.sync="editFormVisible" title="新增发票信息" width="42%">
            <el-form ref="editForm" :model="editForm" :rules="rules" label-width="100px" class="demo-ruleForm">
              <el-form-item label="公司名称:" prop="name">
                <el-input v-model="editForm.name" placeholder="请输入"/>
              </el-form-item>
              <el-form-item label="纳税人识别号:" prop="identify">
                <el-input v-model="editForm.identify" placeholder="请输入"/>
              </el-form-item>
              <el-form-item label="开户银行:" prop="bank">
                <el-input v-model="editForm.bank" placeholder="请输入"/>
              </el-form-item>
              <el-form-item label="银行账号:" prop="bankAccount">
                <el-input v-model="editForm.bankAccount" placeholder="请输入"/>
              </el-form-item>
              <el-form-item label="单位电话:" prop="workTelephone">
                <el-input v-model="editForm.workTelephone" placeholder="+86"/>
              </el-form-item>
              <el-form-item label="单位地址:" prop="workAddress">
                <!-- <el-input v-model="editForm.workAddress"></el-input> -->
                <el-cascader
                  :options="editFormOptions"
                  v-model="editForm.editFormSelected"
                  expand-trigger="hover"
                  @change="editFormHandleChange"/>
              </el-form-item>
              <el-form-item label="详细地址:" prop="detailAddress">
                <el-input v-model="editForm.detailAddress" type="textarea" placeholder="请输入"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editSubmit('editForm')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <!-- 编辑弹出框 - 新增寄送地址 -->
        <div class="payDetail-info-increasedAddress">
          <el-dialog :visible.sync="editFormVisibleADS" title="新增寄送地址" width="42%">
            <el-form ref="editFormADS" :model="editFormADS" :rules="rulesADS" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓:" prop="surname">
                <el-input v-model="editFormADS.surname" placeholder="请输入"/>
              </el-form-item>
              <el-form-item label="名:" prop="name">
                <el-input v-model="editFormADS.name" placeholder="请输入"/>
              </el-form-item>
              <el-form-item label="收件地址:" prop="acceptAddress">
                <!-- <el-input v-model="editFormADS.bank" placeholder="请输入"></el-input> -->
                <el-cascader
                  :options="editFormOptions"
                  v-model="editFormADS.editFormSelected"
                  expand-trigger="hover"
                  @change="editFormADSHandleChange"/>
              </el-form-item>
              <el-form-item label="详细地址:" prop="detailAddress">
                <el-input v-model="editFormADS.detailAddress" placeholder="请输入"/>
              </el-form-item>
              <el-form-item label="单位电话:" prop="workTelephone">
                <el-input v-model="editFormADS.workTelephone" placeholder="+86"/>
              </el-form-item>
              <el-form-item label="固定电话:" prop="fixedTelephone">
                <el-input v-model="editFormADS.fixedTelephone" placeholder="+86"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editFormVisibleADS = false">取 消</el-button>
              <el-button type="primary" @click="editSubmitADS('editFormADS')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <!-- 编辑弹出框 - 还款成功 -->
        <div class="payDetail-info-confirm">
          <el-dialog
            :visible.sync="confirmDialogVisible"
            title=""
            width="31%"
            center>
            <div>
              <i class="iconfont icon-Fill4"/>
              <p>还款成功</p>
            </div>
            <span slot="footer" class="dialog-footer">
              <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
              <el-button type="primary" @click="confirmDialogVisible = false">Confirm</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import paymentChn from '../../common/paymentCHN.vue'
import paymentUsa from '../../common/paymentUSA.vue'
import { editFormVisibleData } from '@/api/monthlyState'
export default {
  name: 'MonthlypayDetail',
  components: { paymentChn, paymentUsa },
  props: ['outAccountPayMay'],
  data() {
    return {
      // paymentCHN组件显示隐藏
      paymentCHN: false,

      // paymentUSA组件显示隐藏
      paymentUSA: false,

      invoiceType: '1',

      // 显示隐藏开票公司
      makeInvoice: false,

      // 显示隐藏发票收件人
      invoicePersonVif: false,

      // 显示隐藏支付密码
      payPassword: false,

      invoiceCompany: [{
        value: '1',
        label: '黄金糕'
      }, {
        value: '2',
        label: '双皮奶'
      }, {
        value: '3',
        label: '蚵仔煎'
      }, {
        value: '4',
        label: '龙须面'
      }, {
        value: '5',
        label: '北京烤鸭'
      }],
      // 开票公司选择结果
      invoiceCompanyValue: '',
      invoicePerson: [{
        value: '1',
        label: '黄金糕'
      }, {
        value: '2',
        label: '双皮奶'
      }, {
        value: '3',
        label: '蚵仔煎'
      }, {
        value: '4',
        label: '龙须面'
      }, {
        value: '5',
        label: '北京烤鸭'
      }],
      // 发票人选择结果
      invoicePersonValue: '',
      // 支付密码输入
      payPasswordInput: '',

      // 编辑新增开票公司弹出框
      editFormVisible: false,
      editForm: { // 编辑需要的字段
        name: '',
        identify: '',
        bank: '',
        bankAccount: '',
        workTelephone: '',
        detailAddress: '',
        // editFormSelected选择的值
        editFormSelected: []
      },
      rules: {
        name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        identify: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }],
        bank: [{ required: true, message: '请输入开户银行名称', trigger: 'blur' }],
        bankAccount: [{ required: true, message: '请输入银行账号', trigger: 'blur' }],
        workTelephone: [{ required: true, message: '请输入单位电话', trigger: 'blur' }],
        workAddress: [{ required: true, message: '请选择单位地址', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入单位详细地址', trigger: 'blur' }]
      },
      // editFormOptions地区选择数据
      editFormOptions: [],

      // 编辑新增寄送地址弹出框
      editFormVisibleADS: false,
      editFormADS: {
        surname: '',
        name: '',
        detailAddress: '',
        workTelephone: '',
        fixedTelephone: '',
        // editFormSelected选择的值
        editFormSelected: []
      },
      rulesADS: {
        surname: [{ required: true, message: '请输入姓', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名', trigger: 'blur' }],
        acceptAddress: [{ required: true, message: '请选择收件地址', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        workTelephone: [{ required: true, message: '请输入收件人手机号码', trigger: 'blur' }],
        fixedTelephone: [{ required: true, message: '请输入收件人固定号码', trigger: 'blur' }]
      },

      // 还款成功-弹出框
      confirmDialogVisible: false

    }
  },
  watch: {
    // invoiceType发票类型判断选择
    invoiceType(val) {
      // console.log(val)
      if (val == 2 || val == 3) {
        this.makeInvoice = true
        this.invoicePersonVif = true
      } else {
        this.makeInvoice = false
        this.invoicePersonVif = false
      }
    }
  },
  created() {
    this.judgePayWay()
  },
  methods: {
    // 判断进入这个界面是什么付款方式
    judgePayWay(val) {
      console.log('8988888888888888888888')

      if (this.outAccountPayMay == 'CNY') {
        this.paymentCHN = true
        this.paymentUSA = false
      } else {
        this.paymentUSA = true
        this.paymentCHN = false
      }
    },

    // 接收-付款方式组件传过来的点击值
    getPaymentInfo(val) {
      console.log(val)
      if (val == 4) {
        this.payPassword = true
      } else {
        this.payPassword = false
      }
    },

    // editSubmit新增开票公司弹窗
    editSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 内容不为空
          const HandleEdit = {
            name: this.editForm.name,
            identify: this.editForm.identify,
            bank: this.editForm.bank,
            bankAccount: this.editForm.bankAccount,
            workTelephone: this.editForm.workTelephone,
            workAddress: this.editForm.editFormSelected,
            detailAddress: this.editForm.detailAddress
          }
          editFormVisibleData(HandleEdit).then(response => {
            console.log('res')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // editFormHandleChange选择地址
    editFormHandleChange(value) {
      console.log('1111111111111111111111111111111111111')
    },

    // editSubmitADS新增开票公司弹窗
    editSubmitADS(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 内容不为空
          const HandleEdit = {
            surname: this.editFormADS.surname,
            name: this.editFormADS.name,
            acceptAddress: this.editFormADS.editFormSelected,
            detailAddress: this.editFormADS.detailAddress,
            workTelephone: this.editFormADS.workTelephone,
            fixedTelephone: this.editFormADS.fixedTelephone
          }
          editFormVisibleData(HandleEdit).then(response => {
            console.log('res')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // editFormADSHandleChange选择地址
    editFormADSHandleChange(value) {
      console.log('1111111111111111111111111111111111111')
    },

    // confirmPayDialog点击确定付款
    confirmPayDialog() {
      this.confirmDialogVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// monthlypayDetail
.monthlypayDetail{
    // margin-bottom:61px;
    padding:40px 0 88px 100px;
    .payDetail-info{
        .payDetail-info-total{
            width:1000px;
            min-width:1000px;
            height:150px;
            border:1px solid #E6EAEE;
            border-radius:4px;
            background:#FFFFFF;
            margin-bottom:24px;
            margin-left:16px;
            p:nth-child(1){
                font-size:16px;
                color:#50688C;
                height:72px;
                line-height: 72px;
                padding-left:25px;
                border-bottom:1px solid #DFE3E9;
            }
            ul{
                height:77px;
                line-height: 77px;
                li{
                    float:left;
                }
                li:nth-child(1){
                    font-size:16px;
                    color:#50688C;
                    margin-left:25px;
                }
                li:nth-child(2){
                    font-size:16px;
                    color:#50688C;
                    margin-left:40px;
                }
                li:nth-child(3){
                    color:#158BE4;
                    font-size:22px;
                    margin-left:20px;
                }
                li:nth-child(4){
                    width:1px;
                    height:40px;
                    background:#A5B3C5;
                    margin:18px 0 0 89px;
                }
                li:nth-child(5){
                    font-size:16px;
                    color:#50688C;
                    margin-left:60px;
                }
                li:nth-child(6){
                    width:159px;
                    height:32px;
                    border:1px solid #DFE3E9;
                    border-radius:4px;
                    margin:21px 0 0 22px;
                    overflow: hidden;
                    cursor: pointer;
                    span{
                        float:left;
                    }
                    span:nth-child(1){
                        display:inline-block;
                        width:127px;
                        height:32px;
                        line-height: 32px;
                        text-align: center;
                        font-size:14px;
                        color:#768CAA;
                        border-right:1px solid #DFE3E9;
                    }
                    span:nth-child(2){
                        display:inline-block;
                        width:30px;
                        height:32px;
                        line-height: 32px;
                        text-align: center;
                        font-size:14px;
                        color:#768CAA;
                        background:#39B54A;
                    }
                }
            }
        }
        .payDetail-info-invoice{
            height:22px;
            margin:0 0 24px 16px;
            line-height: 22px;
            P:nth-child(1){
                float:left;
                color:#7F8FA4;
                font-size:14px;
            }
        }
        .payDetail-info-makeInvoice{
            height:40px;
            margin:0 0 24px 16px;
            line-height: 40px;
            p:nth-child(1){
                float:left;
                margin-right:26px;
                color:#7F8FA4;
                font-size:14px;
            }
            .increasedCompany{
                float:left;
                margin-left:16px;
                width:180px;
                height:40px;
                // line-height: 40px;
                line-height:18px;
                background:#67C23A;
                border-radius:4px;
                text-align: center;
                cursor:pointer;
                outline: none;
                border:none;
                i{
                    font-size:20px;
                    color:#fff;
                }
                span{
                    font-size:16px;
                    color:#fff;
                }
            }
        }
        .payDetail-info-invoicePerson{
            height:40px;
            margin:0 0 24px 2px;
            line-height: 40px;
            p:nth-child(1){
                float:left;
                margin-right:26px;
                color:#7F8FA4;
                font-size:14px;
            }
            .increasedAddress{
                float:left;
                margin-left:16px;
                width:180px;
                height:40px;
                line-height: 18px;
                background:#67C23A;
                border-radius:4px;
                text-align: center;
                cursor: pointer;
                outline: none;
                border:none;
                i{
                    font-size:20px;
                    color:#fff;
                }
                span{
                    font-size:16px;
                    color:#fff;
                }
            }
        }
        .payDetail-info-payment{
            height:400px;
            margin:0 0 24px 16px;
            p:nth-child(1){
                float:left;
                margin-right:26px;
                color:#7F8FA4;
                font-size:14px;
                margin-top:30px;
            }
            div{
                width:660px;
                height:400px;
                // background:#ccc;
                float: left;
            }
        }
        .payDetail-info-payPassword{
            height:40px;
            margin:0 0 24px 16px;
            line-height: 40px;
            p:nth-child(1){
                float:left;
                margin-right:26px;
                color:#7F8FA4;
                font-size:14px;
            }
            p:nth-child(3){
                float:left;
                color:#158BE4;
                font-size:14px;
                cursor:pointer;
            }
        }
        .payDetail-info-submit{
            width:250px;
            height:50px;
            border-radius:4px;
            outline: none;
            background:#FFA800;
            // line-height: 50px;
            text-align: center;
            color:#fff;
            font-size:16px;
            cursor: pointer;
            margin-left:100px;
        }
    }
}
</style>

<style rel="stylesheet/scss" lang="scss">
.monthlypayDetail{
    // payDetail-info-invoice
    .payDetail-info-invoice{
        .el-radio:nth-child(2){
            margin-left:25px;
            color:#909399;
            font-size:14px;
            .el-radio__input.is-checked .el-radio__inner{
                background:#FFA500;
                border-color:#FFA500;
            }
            .el-radio__input.is-checked+.el-radio__label{
                color:#FFA500;
            }
            .el-radio__inner:hover{
                border-color:#FFA500 !important;
            }
        }
        .el-radio:nth-child(3),.el-radio:nth-child(4){
            margin-left:32px;
            color:#909399;
            font-size:14px;
            .el-radio__input.is-checked .el-radio__inner{
                background:#FFA500;
                border-color:#FFA500;
            }
            .el-radio__input.is-checked+.el-radio__label{
                color:#FFA500;
            }
            .el-radio__inner:hover{
                border-color:#FFA500 !important;
            }
        }
    }
    // payDetail-info-makeInvoice
    .payDetail-info-makeInvoice{
        .el-select,.el-select--medium{
            float:left;
            .el-input--medium .el-input__inner{
                height:40px;
            }
        }
        .el-select .el-input.is-focus .el-input__inner{
            border-color:#FFA500;
        }
        .el-select .el-input__inner:focus{
            border-color:#FFA500;
        }
    }
    // payDetail-info-invoicePerson
    .payDetail-info-invoicePerson{
        .el-select,.el-select--medium{
            float:left;
            .el-input--medium .el-input__inner{
                height:40px;
            }
        }
        .el-select .el-input.is-focus .el-input__inner{
            border-color:#FFA500;
        }
        .el-select .el-input__inner:focus{
            border-color:#FFA500;
        }
    }
    //payDetail-info-payPassword
    .payDetail-info-payPassword{
        .el-input,.el-input--medium{
            float:left;
            width:280px !important;
            margin-right:16px;
            .el-input--medium .el-input__inner{
                width:280px !important;
                height:40px;
            }
            .el-input__inner:focus{
                border-color:#FFA500;
            }
        }
    }
    //payDetail-info-increasedCompany编辑弹出框-新增开票公司
    .payDetail-info-increasedCompany{
        .el-dialog{
            border-radius:8px;
        }
        .el-dialog__header{
            padding:0;
            height:92px;
            position:relative;
            .el-dialog__headerbtn{
                position:absolute;
                top:23px;
                right:24px;
                .el-icon-close:before{
                    font-size:28px;
                    color:#909399;
                    font-weight:900;
                }
            }
            .el-dialog__title{
                position:absolute;
                left:41%;
                bottom:0;
                color:#7C8FA6;
                font-size:24px;
                font-weight:normal;
            }
        }
        .el-dialog__body{
            padding:0 145px 37px 111px;;
            margin-top:40px;
            .el-form-item__label{
                width:126px !important;
                color:#909399;
                font-size:16px;
            }
            .el-form-item__content{
                width:400px;
                height:40px;
                margin-left:126px !important;
                .el-input--medium .el-input__inner{
                    height:40px;
                    line-height:40px;
                    border-color:#C0C4CC;
                }
                .el-textarea__inner{
                    height:80px;
                }
                .el-cascader{
                    width:400px;
                }

            }
            // .el-form-item__content:last-child(){
            //     height:80px;
            // }
            .el-form-item.is-success .el-input__inner{
                border-color:#FFA500;
            }
            .el-form-item.is-success .el-textarea__inner{
                border-color:#FFA500;
            }
            .el-form-item:last-child .el-form-item__content{
                height:80px;
            }
            .el-form-item:nth-child(5) .el-form-item__content .el-input__inner::-webkit-input-placeholder{
                color:#FFA800;
            }
        }
        .el-dialog__footer{
            padding:0 0 48px 0;
            .dialog-footer{
                text-align:center;
                .el-button--medium{
                    width:98px;
                    height:50px;
                    border-radius:4px;
                    font-size:16px;
                }
                .el-button:focus, .el-button:hover{
                    border-color:#FFA800;
                    color:#FFA800;
                }
                .el-button--primary{
                    background:#FFA800;
                    border-color:#FFA800;
                    margin-left:40px;
                }
                .el-button--primary:focus, .el-button--primary:hover{
                    background:#FFA800;
                    color:#fff;
                }
            }
        }
    }
    //payDetail-info-increasedAddress编辑弹出框 - 新增寄送地址
    .payDetail-info-increasedAddress{
        .el-dialog{
            border-radius:8px;
        }
        .el-dialog__header{
            padding:0;
            height:92px;
            position:relative;
            .el-dialog__headerbtn{
                position:absolute;
                top:23px;
                right:24px;
                .el-icon-close:before{
                    font-size:28px;
                    color:#909399;
                    font-weight:900;
                }
            }
            .el-dialog__title{
                position:absolute;
                left:41%;
                bottom:0;
                color:#7C8FA6;
                font-size:24px;
                font-weight:normal;
            }
        }
        .el-dialog__body{
            padding:40px 142px 50px 106px;
            position:relative;
            .el-input--medium .el-input__inner{
                width:400px;
                height:40px;
                border-color:#C0C4CC;
            }
            .el-form-item:nth-child(1){
                width:248px;
                position:absolute;
                left:106px;
                top:40px;
            }
            .el-form-item:nth-child(2){
                width:248px;
                position:absolute;
                left:355px;
                top:40px;
            }
            .el-form-item:nth-child(3){
                margin-top:64px;
            }
            .el-form-item:nth-child(1) .el-form-item__content .el-input__inner{
                width:150px;
            }
            .el-form-item:nth-child(2) .el-form-item__content .el-input__inner{
                width:150px;
            }
            .el-form-item:nth-child(3) .el-form-item__content .el-cascader--medium{
                width:400px;
            }
            .el-form-item:nth-child(5) .el-form-item__content .el-input__inner::-webkit-input-placeholder{
                color:#FFA800;
            }
            .el-form-item:nth-child(6) .el-form-item__content .el-input__inner::-webkit-input-placeholder{
                color:#FFA800;
            }
            .el-form-item__label{
                width:144px;
                color:#909399;
                font-size:16px;
            }
            .el-form-item.is-success .el-input__inner{
                border-color:#FFA800;
            }
        }
        .el-dialog__footer{
            padding:0 0 48px 0;
            .dialog-footer{
                text-align:center;
                .el-button--medium{
                    width:98px;
                    height:50px;
                    border-radius:4px;
                    font-size:16px;
                }
                .el-button:focus, .el-button:hover{
                    border-color:#FFA800;
                    color:#FFA800;
                }
                .el-button--primary{
                    background:#FFA800;
                    border-color:#FFA800;
                    margin-left:40px;
                }
                .el-button--primary:focus, .el-button--primary:hover{
                    background:#FFA800;
                    color:#fff;
                }
            }
        }
    }
    //payDetail-info-confirm编辑弹出框 - 确认付款
    .payDetail-info-confirm{
        .el-dialog{
            border-radius:8px;
            height:350px;
            .el-dialog__header{
                padding:0;
                height:92px;
                position:relative;
                .el-dialog__headerbtn{
                    position:absolute;
                    top:23px;
                    right:24px;
                    .el-icon-close:before{
                        font-size:28px;
                        color:#909399;
                        font-weight:900;
                    }
                }
                .el-dialog__title{
                    position:absolute;
                    left:41%;
                    bottom:0;
                    color:#7C8FA6;
                    font-size:24px;
                    font-weight:normal;
                }
            }
            .el-dialog__body{
                padding:0;
                // height:147px;
                text-align:center;
                margin-bottom:32px;
                i{
                    font-size:108px;
                    color:rgba(103,194,58,1);
                    display: inline-block;
                    width:108px;
                    height:108px;
                    line-height:108px;
                    margin-bottom:14px;
                }
                p{
                    height:24px;
                    font-size:18px;
                    color:rgba(80,104,140,1);
                }
            }
            .el-dialog__footer{
                padding:0;
                .el-button--primary{
                    width:240px;
                    height:50px;
                    background:rgba(255,168,0,1);
                    border-radius:4px;
                    border:none;
                    font-size:18px;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                }
            }
        }
    }
}
</style>

