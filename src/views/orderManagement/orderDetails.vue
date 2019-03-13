<template>
  <div v-loading="loading" class="order-detail">
    <el-row>
      <el-col :span="24">
        <!-- 订单号orderNumber -->
        <el-row>
          <el-col :span="20">
            <div class="order-number">
              <span>Order no: {{ number }}</span><span class="greencolor">({{ marking_name }})</span>
              <span>Order time: {{ created_at }}</span>
              <div v-if="can.pay" class="payImmedity" @click="DetailPayment">
                <i class="iconfont icon-fukuan"/>
                <p>immediate payment</p>
              </div>
              <div v-if="can.modify" class="modify-Detail" @click="setDefault">
                <i class="iconfont icon-bianji"/>
                <p>modify</p>
              </div>
              <div v-if="can.delete" class="delete-Detail">
                <i class="iconfont icon-fuzhi"/>
                <p>delete</p>
              </div>
              <!-- <div v-if="can.refund" class="refund-Detail">
                  <i class="iconfont icon-tuikuan"/>
                  <p>退单</p>
              </div> -->
              <!-- <div v-if="can.close" class="close-Detail">
                  <i class="iconfont icon-guanbi_"/>
                  <p>关闭</p>
              </div> -->
              <div class="copy-Detail" @click="CopyOrder()">
                <i class="iconfont icon-fuzhi"/>
                <p>copy</p>
              </div>
            </div>
          </el-col>
        </el-row>

        <!-- 关闭订单相关原因和备注 -->
        <div v-if="marking == 'CLOSED'" class="OrderClosed">
          <p><span>Cause of closure:</span><span>重复下单</span></p>
          <!-- <p><span>备注信息:</span><span>无</span></p> -->
        </div>
        <!-- 付款信息 -->
        <div v-if="marking == 'WAIT_SPLIT' || marking == 'INSPECTING' || marking == 'COMPLETED' " class="paymentInfoTitle">
          <p>Payment Info</p>
          <p v-if="can.later_pay">
            <span>Other charges</span>
            <span>{{ _.get(paid_payments, '[0].paid_currency') == 'CNY'?'￥':'$' }}{{ returnFloat(_.get(paid_payments, '[0].paid_currency') == 'CNY'?this.AdditionalPaymentCNY:this.AdditionalPaymentUSD) }} (&nbsp;<span v-for="(item,index) in _.get(unpaid_payments, '[0].fees')" :key="index" style="color:rgba(239,53,53,1);">{{ item.name }}{{ CurrencySymbol }}{{ CurrencySymbol == '￥'?_.get(item.currencies, '[0].fee'):_.get(item.currencies, '[1].fee') }}&nbsp;</span>)</span>
            <span @click="addPayment">Pay now</span>
          </p>
        </div>
        <!-- 已付款信息框 -->
        <el-row>
          <el-col :span="20">
            <div v-if=" _.get(fees, '[0].paid_at') " class="accountPaidInfo">
              <ul class="accountPaidInfo-ul">
                <li>Order amount</li>
                <li><span v-if="_.get(paid_payments, '[0].paid_currency') == 'CNY'">￥{{ returnFloat(CNYpay) }}</span><span v-if="_.get(paid_payments, '[0].paid_currency') == 'USD'">${{ returnFloat(USDpay) }}</span></li>
                <li>Workload:</li>
                <li>{{ workload }}Manday</li>
                <li v-if=" paid_payments.length > 1 ">其它费用:{{ CurrencySymbol }}{{ returnFloat(_.get(paid_payments, '[0].paid_currency') == 'CNY'?this.AdditionalPaymentCNY:this.AdditionalPaymentUSD) }} (&nbsp;<span v-for="(item,index) in paid_paymentsLater" :key="index">{{ _.get(item.fees, '[0].name') }}{{ CurrencySymbol }}{{ item.paid_fee }}&nbsp;</span>)</li>
              </ul>
              <div class="middle-paiInfo">
                <ul class="middle-paiInfo-ul1">
                  <li>Payment amount</li>
                  <li><span v-if="_.get(paid_payments, '[0].paid_currency') == 'CNY'">￥{{ returnFloat(_.get(_.get(fees, '[0].currencies'), '[0].fee')) }}</span><span v-if="_.get(paid_payments, '[0].paid_currency') == 'USD'">${{ returnFloat(_.get(_.get(fees, '[0].currencies'), '[1].fee')) }}</span>(报价金额)</li>
                  <li>Payment method</li>
                  <li>{{ _.get(paid_payments, '[0].paytype') }}</li>
                  <li>Time</li>
                  <li>{{ created_at }}</li>
                  <li>Payment time</li>
                  <li>{{ _.get(paid_payments, '[0].paid_at') }}</li>
                </ul>
                <ul v-for="(item,index) in paid_paymentsLater" :key="index" class="middle-paiInfo-ul2">
                  <li>{{ CurrencySymbol }}{{ item.paid_fee }}({{ _.get(item.fees, '[0].name') }})</li>
                  <li>Payment method</li>
                  <li>{{ item.paytype }}</li>
                  <li>Payment time</li>
                  <li>2018-05-25 10:00</li>
                </ul>
              </div>
              <ul>
                <li>Invoice type</li>
                <li>普通发票</li>
                <li @click="checkInvoice">查看详情</li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <!-- 产品信息框 -->
        <el-row>
          <el-col :span="20">
            <div class="productInformation">
              <div class="productInformation-box">
                <p class="productInformation-title">Product Info</p>
                <div v-if="marking == 'WAIT_PAY'" class="supplierInformation">
                  <p v-if=" !can.later_pay ">
                    <span class="manDay">Workload &nbsp; {{ workload }}MD &nbsp; Payment amount</span>
                    <span class="payNumber">
                      <span>¥{{ returnFloat(CNYpay) }}</span>
                      <span>/${{ returnFloat(USDpay) }}</span>
                    </span>
                    <span class="btn" @click="payImmediately(orderId)">
                      Pay now
                    </span>
                  </p>
                </div>
              </div>
              <el-tabs v-model="editableTabsValue2" type="card" @tab-click="handleClickTab">
                <el-tab-pane
                  v-for="(item, index) in editableTabs2"
                  :key="index"
                  :label="'Item' + (index + 1)"
                  :name="'tab' + (index + 1)">
                  <div class="content">
                    <el-form :model="item" label-width="80px" class="demo-ruleForm" label-position="left">
                      <el-form-item label="Product" prop="name">
                        <span class="left30">{{ item.name }}</span>
                        <!-- <el-input v-model="item.name" placeholder="请输入产品名称" style="width:500px;"/>
                        <div class="copy" @click="copy(item,index)">
                          <i class="iconfont icon-fuzhi_"/>
                          <p>复制</p>
                        </div> -->
                      </el-form-item>
                      <el-form-item label="Item No.">
                        <span class="left30">{{ item.number?item.number:'' }}</span>
                        <!-- <el-input v-model="item.number" placeholder="请输入产品货号" style="width:500px;"/> -->
                      </el-form-item>
                      <el-form-item v-for="(val,i) in item.PO" :key="i" label="PO No.">
                        <span class="left30">{{ val.number?val.number:'' }}</span>
                        <span class="left30">{{ val.quantity }}</span>
                        <span>{{ val.unit }}</span>
                        <!-- <el-input v-model="val.number" placeholder="请输入P.O号" style="width:155px;"/> -->
                        <!-- <el-input v-model="val.quantity" placeholder="请输入数量" class="input-with-select" style="width:240px;">
                          <el-select slot="append" v-model="val.unit" style="width:100px" placeholder="请选择">
                            <el-option label="件" value="1"/>
                            <el-option label="个" value="2"/>
                            <el-option label="条" value="3"/>
                          </el-select>
                        </el-input> -->
                        <!-- <el-button type="success" icon="el-icon-plus" @click="addPO(val,index)"> P.O 号</el-button>
                        <el-button v-if="i>0" type="danger" icon="el-icon-minus" @click="removePO(val,index,i)"> P.O 号</el-button> -->
                      </el-form-item>
                    </el-form>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>

        <!-- 供应商信息框 -->
        <el-row>
          <el-col :span="20">
            <div class="supplierDetail">
              <p>Supplier Info</p>
              <div class="supplierContent">
                <el-form ref="item" :model="supplier" label-width="140px" class="demo-ruleForm" label-position="left">
                  <el-form-item label="Supplier name" prop="name">
                    <span class="left30">{{ supplier.name }}</span>
                  </el-form-item>
                  <el-form-item label="Name" prop="name">
                    <span class="left30">{{ supplier.first_name + supplier.last_name }}</span>
                  </el-form-item>
                  <el-form-item label="Mobile" prop="name">
                    <span class="left30">{{ supplier.phone_number }}</span>
                  </el-form-item>
                  <el-form-item label="Email" prop="name">
                    <span class="left30">{{ supplier.email }}</span>
                  </el-form-item>
                  <el-form-item label="Inspection location" prop="name">
                    <span class="left30">{{ supplier.address_summary + (supplier.address_detail == null?'':supplier.address_detail) }}</span>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
        </el-row>

        <!-- 验货基本信息框 -->
        <el-row>
          <el-col :span="20">
            <div class="examineGoodsMessage">
              <p>Inspection Basic Info</p>
              <div class="examineGoodContent">
                <el-form ref="item" label-width="200px" class="demo-ruleForm" label-position="left">
                  <el-form-item v-if="marking == 'INIT'" label="Report language">
                    <span class="left30">{{ _.get( this.tableData, '[0].locale' )== 'zh_CN'?'Chinese':'English' }}</span>
                  </el-form-item>
                  <el-form-item v-if="marking == 'INIT'" label="Total report">
                    <span class="left30">{{ reports_number?reports_number:'' }}copies</span>
                  </el-form-item>
                  <el-form-item label="Estimated inspection date">
                    <span class="left30">{{ inspection_dates?inspection_dates:'' }}</span>
                  </el-form-item>
                  <el-form-item v-if="marking == 'INIT'" label="Email (Report accepting)">
                    <span class="left30">{{ accept_report_emails?accept_report_emails:'' }}</span>
                  </el-form-item>
                  <el-form-item v-if="marking != 'INIT' && 'WAIT_QUOTE'" label="actual inspection date">
                    <span class="left30">{{ inspection_first_date?inspection_first_date:'' }}</span>
                  </el-form-item>
                  <el-form-item label="Inspection type">
                    <span class="left30">{{ inspection.inspection_type_name?inspection.inspection_type_name:'' }}</span>
                  </el-form-item>
                  <el-form-item label="Reference samples">
                    <p class="examineGoodContent_p"><span class="left30">{{ inspection.sample_type_name }}</span></p>
                    <p v-if="inspection.sample_type == '2'" class="left30"><span>Testcoo recipients</span><span class="left30">zhang gui zhou</span></p>
                    <p v-if="inspection.sample_type == '2'" class="left30"><span>Mobile</span><span class="left30">+86-17826810000</span></p>
                    <p v-if="inspection.sample_type == '2'" class="left30"><span>Address</span><span class="left30">No. 365, Binjiang District Road, Binjiang District, Hangzhou, Zhejiang</span></p>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
        </el-row>

        <!-- 报告表格列表 -->
        <el-row>
          <el-col :span="24">
            <div v-if="marking != 'INIT'" class="reportList">
              <el-table
                :data="tableData"
                border
              >
                <el-table-column
                  prop="number"
                  label="Report"
                  align="center"
                  width="170"/>
                <!-- <el-table-column
                  label="Product"
                  align='center'
                  width="160">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">
                      <span v-for="(item,index) in scope.row.products" :key="index">
                          {{item.name}}
                      </span>
                    </el-button>
                    <el-button v-if="true" @click="checkNameHandleClick(scope.row)" type="text" size="small"><i class="iconfont icon-IconCopy"></i></el-button>
                  </template>
                  </el-table-column> -->
                <!-- <el-table-column
                  prop=""
                  label="Quantity"
                  align='center'
                  width="140">
                  </el-table-column>
                  <el-table-column
                  prop="address"
                  align='center'
                  width="140"
                  label="Sample size">
                  </el-table-column> -->
                <el-table-column
                  align="center"
                  label="AQL standard">
                  <template slot-scope="scope">
                    <span v-if="scope.row.sampling.type == '1'" >抽样标准1</span>
                    <span v-if="scope.row.sampling.type == '2'" >抽样标准2</span>
                    <span v-if="scope.row.sampling.type == '3'" >抽样标准3</span>
                    <span v-if="scope.row.sampling.type == '4'" >抽样标准4</span>
                    <span v-if="scope.row.sampling.type == '5'" >抽样标准5</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Language">
                  <template slot-scope="scope">
                    <span>{{ scope.row.locale == 'zh_CN'?'Chinese':'English' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Email (Report accepting)">
                  <template slot-scope="scope">
                    {{ accept_report_emails }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Your report template">
                  <template slot-scope="scope">
                    <ShowReportFile v-if="scope.row.type == 'offline'" :file-list="scope.row.templates" :can-down-load="scope.row.type == 'offline'?true:false" class="1"/>
                    <span v-if="scope.row.type == 'online'">在线报告</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <!-- 其他要求 -->
        <el-row>
          <el-col :span="24">
            <div class="otherRequirements">
              <p>Additional requirements</p>
              <div class="otherRequirementsContent">
                <div><span class="requirementText">Content</span><span>{{ description == null?'Nothing':description }}</span></div>
                <div>
                  <span class="requirementText">Documents</span>
                  <ShowFile :file-list="files" class="requirementFiles"/>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <!-- 返回button -->
        <div class="goback-button">
          <el-button type="primary" @click="confirm">Go Back</el-button>
        </div>
        <!-- 包含名称展开Dialog -->
        <div class="nameExpend-Dialog">
          <el-dialog :visible.sync="expendProductsDialog" title="全部产品名称">
            <el-table
              :data="ProductsNameTableData"
              height="250"
              border
              style="width: 100%">
              <el-table-column
                label="序号"
                width="108">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                label="产品名称"
              >
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
        </div>
        <!-- 开票详情-普通发票Dialog -->
        <div class="InvoiceDetails-common">
          <el-dialog
            :visible.sync="commonDialog"
            title=""
            width="30%">
            <p>开票详情</p>
            <p><span>开票类型</span><span>普通发票</span></p>
            <p><span>单位名称</span><span>测库有限公司</span></p>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="commonDialog = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 开票详情-增值税发票Dialog -->
        <div class="InvoiceDetails-VAT">
          <el-dialog
            :visible.sync="VATDialog"
            title=""
            width="30%">
            <p>开票详情</p>
            <p><span>开票类型</span><span>普通发票</span></p>
            <p><span>单位名称</span><span>测库有限公司</span></p>
            <p><span>纳税人识别号</span><span>57854882825845636</span></p>
            <p><span>开户银行</span><span>工商银行</span></p>
            <p><span>银行账号</span><span>625550214642050</span></p>
            <p><span>单位电话</span><span>测库有限公司</span></p>
            <p><span>单位地址</span><span>杭州市滨江区网商路365号</span></p>
            <p>寄票地址</p>
            <p><span>收件人</span><span>测库有限公司</span></p>
            <p><span>收件人电话</span><span>测库有限公司</span></p>
            <p><span>收件人地址</span><span>测库有限公司</span></p>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="VATDialog = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ShowFile from '@/components/showfile'
import ShowReportFile from '@/components/showReportFile'
import { getOrderList, DeleteOrder, CloseOrder, RefundOrder } from '@/api/order'
export default {
  components: {
    ShowFile,
    ShowReportFile
  },
  data() {
    return {
      loading: '',
      orderId: this.$route.query.orderId,
      can: [],
      number: '',
      marking: '',
      marking_name: '',
      fees: '',
      inspection: [],
      reports_number: '',
      inspection_dates: '',
      inspection_first_date: '',
      created_at: '',
      accept_report_emails: '',
      description: '',
      workload: 1,
      files: [],
      //   fileList:'',
      CNYpay: '',
      USDpay: '',
      supplier: {},
      supplierName: '',
      supplierFullName: '',
      phone: '',
      email: '',
      address: '',
      tableData: [],
      editableTabs2: [
        {
          number: '',
          name: '',
          title: '',
          PO: [
            {
              number: '',
              quantity: '',
              unit: ''
            }
          ]
        },
        {
          number: '',
          name: '',
          title: '',
          PO: [
            {
              number: '',
              quantity: '',
              unit: ''
            },
            {
              number: '',
              quantity: '',
              unit: ''
            }
          ]
        }
      ],
      editableTabsValue2: 'tab1',

      // Dialog属性
      expendProductsDialog: false,
      ProductsNameTableData: [],

      // commonDialog普通发票
      commonDialog: false,
      // VATDialog增值税发票
      VATDialog: false,

      // Additional payment追加付款
      AdditionalPayment: '',

      // paid_payments
      paid_payments: [],

      paid_paymentsLater: [],

      // unpaid_payments
      unpaid_payments: ''

    }
  },
  computed: {},
  created() {
    this.getOrderList()
  },
  mounted() {

  },
  methods: {
    //   获取订单详情
    getOrderList() {
      this.loading = true
      getOrderList({
        url: '/v1/inspection/' + this.orderId
      }).then(response => {
        if (response.data.code == 0) {
          this.loading = false
          const { id, number, marking, marking_name, created_at, products, supplier, reports, workload, fees, fees_total, paid_payments, unpaid_payments, description, files, accept_report_emails, can, inspection, reports_number, inspection_dates, inspection_first_date } = response.data.data
          this.number = number
          this.marking = marking
          this.marking_name = marking_name
          this.created_at = created_at
          this.editableTabs2 = products.reverse() // 数组倒叙
          this.supplier = supplier
          this.tableData = reports
          this.workload = workload
          // _.forEach( fees, function(value, key){
          //   console.log(value,key)

          // })
          this.fees = fees
          this.CNYpay = fees_total.CNY
          this.USDpay = fees_total.USD
          this.paid_payments = paid_payments
          this.paid_paymentsLater = paid_payments.slice(1) // 浅拷贝删除第一个元素
          this.unpaid_payments = unpaid_payments
          this.CurrencySymbol = _.get(paid_payments, '[0].paid_currency') == 'CNY' ? '￥' : '$'
          this.description = description
          if (accept_report_emails) {
            this.accept_report_emails = accept_report_emails.join('')
          } else {
            this.accept_report_emails = ''
          }

          // console.log(this.accept_report_emails+'9999999999999999999999999999999999999999999999')
          this.files = files
          this.can = can
          if (inspection_dates) {
            this.inspection_dates = inspection_dates.join(',')
          } else {
            this.inspection_dates = ''
          }
          this.inspection_first_date = inspection_first_date
          this.inspection = inspection
          // console.log(this.inspection+'9999999999999999999999999999999999999999')
          this.reports_number = reports_number
          // console.log( this.marking)
        }
      })
    },

    // checkNameHandleClick列表包含产品名称展开
    checkNameHandleClick(row) {
      this.expendProductsDialog = true
      this.ProductsNameTableData = row.products.map((item, index) => {
        return { name: item.name }
      })
    },

    // payImmediately立即付款
    payImmediately(row) {
      console.log(row)
      this.$router.push({ path: 'pay', query: { order: row }})
    },

    // 查看发票详情
    checkInvoice() {
      // this.commonDialog = true
      this.VATDialog = true
    },

    // confirm返回上一界面
    confirm() {
      this.$router.go(-1)
    },

    // DetailPayment 待付款--付款
    DetailPayment() {
      this.$router.push({ path: 'pay', query: { order: this.$route.query.orderId }})
    },

    // setDefault  待修改--修改
    setDefault() {
      this.$router.push({ path: '/index', query: { orderId: this.$route.query.orderId, orderSet: 'set' }})
    },

    // addPayment  待验货--额外支付
    addPayment() {
      this.$router.push({ path: 'pay', query: { order: this.$route.query.orderId }})
    },

    // handleClickTab tab
    handleClickTab(tab, event) {
      console.log(tab)
      // this.editableTabsValue2 = tab.index+1
    },

    // CopyOrder复制订单
    CopyOrder() {
      this.$router.push({ path: '/index', query: { orderId: this.orderId }})
      console.log('复制订单')
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
<style rel="stylesheet/scss" lang="scss" >
.order-detail{
  .el-tabs__item.is-active {
    color: #ffa800;
    height: 40px;
    line-height: 40px;
    position: relative;
    background-image: none;
    background-color: #ffffff;
    top: 0;
    width: 100px;
    text-align: center;
  }
  .el-tabs__nav-wrap {
    margin-bottom: 0;
  }
  .el-tabs__item {
    margin-right: 10px;
    border: 1px solid #e6eaee;
    line-height: 35px;
    height: 35px;
    /* // background-color: #ffffff; */
    border-radius: 4px;
    position: relative;
    color: #768caa;
    top: 5px;
    background-image: linear-gradient(0deg, #f4f7fa 0%, #ffffff 100%);
  }
  .el-tabs__item:hover {
    color: #ffa800;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
    border-left: 1px solid #e6eaee;
  }
  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    line-height: 50px;
  }
  .el-tabs--card > .el-tabs__header {
    border-bottom: none;
    margin: 0;
  }
  .el-form-item__label {
    font-size: 14px;
    color: #7c8fa6;
  }
  .el-form-item {
      margin-bottom: 15px;
  }
  //productInformation
  .productInformation{
    .content{
      .el-form-item:nth-child(n+2){
        .el-form-item__content{
          span:nth-child(1){
            // width:116px;
            display:inline-block;
          }
        }
      }
    }
  }
  //reportList
  .reportList{
    .el-table--border{
      // width:1420px;
      background:rgba(255,255,255,1);
      border-radius:4px;
    }
    .el-table th{
      height:60px;
      background:rgba(125,200,85,1);
    }
    .el-table td{
      height:100px;
      background:rgba(255,255,255,1);
    }
    .el-table th>.cell{
      font-size:14px;
      color:rgba(255,255,255,1);
    }
    .el-table td div{
      font-size:14px;
      color:rgba(80,104,140,1);
    }
    .el-table td:nth-child(2){
      .el-button--text:nth-child(1){
        font-size:14px;
        color:rgba(80,104,140,1);
        width:68px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .el-button--text:nth-child(2){
        font-size:14px;
        color:rgba(118,140,170,1);
        margin-left:38px;
      }
    }
  }
  //nameExpend-Dialog
  .nameExpend-Dialog{
    //Dialog Table
    .el-dialog{
        width:387px;
        height:294px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 4px 0px rgba(118,140,170,1);
        border-radius:4px;
        .el-dialog__header{
            width:387px;
            background:rgba(230,234,238,1);
            border-radius:3px 3px 0px 3px;
            text-align:center;
            padding: 20px 20px 15px;
            position:relative;
            .el-dialog__title{
              color: #164061;
              font-size: 14px;
              font-weight: bold;
            }
            .el-dialog__headerbtn{
                width:12px;
                height:12px;
                line-height:12px;
                position:absolute;
                top:13px;
                right:13px;
                .el-icon-close:before{
                    color:rgba(22,64,97,1);
                    font-weight:600;
                }
            }
        }
        .el-dialog__body{
            width:387px;
            height:253px;
            padding:0;
            // .el-table th{
            //     height:31px;
            //     padding:0;
            // }
            // .el-table td{
            //     height:36px;
            //     padding:0;
            // }
            .el-table th:nth-child(1) > .cell{
                padding:0;
                width:108px;
            }
            .el-table .cell, .el-table th div{
                font-size:14px;
                color:rgba(124,140,165,1);
                text-align:center;
            }
            .el-table td:nth-child(1) div{
                padding:0;
                color:rgba(22,64,97,1);
                font-size:14px;
            }
            .el-table td:nth-child(2) div{
                color:rgba(22,64,97,1);
                font-size:14px;
            }
        }
    }
  }
  //InvoiceDetails-common
  .InvoiceDetails-common{
    .el-dialog{
      width:600px;
      height:300px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      border:1px solid rgba(223,227,233,1);
      .el-dialog__header{
        padding:56px 0 0 0;
        .el-dialog__headerbtn .el-dialog__close{
          font-size:24px;
          color:rgba(144,147,153,1);
          font-weight: 600;
        }
      }
      .el-dialog__body{
        padding:0 0 0 120px;
        margin-bottom:45px;
        p:nth-child(1){
          height:33px;
          font-size:20px;
          font-weight:500;
          color:rgba(80,104,140,1);
          line-height:33px;
          margin-bottom:16px;
        }
        p:nth-child(2){
          height:24px;
          line-height: 24px;
          margin-bottom:17px;
          span:nth-child(1){
            font-size:16px;
            color:rgba(118,140,170,1);
            margin-right:32px;
          }
          span:nth-child(2){
            font-size:16px;
            color:rgba(80,104,140,1);
          }
        }
        p:nth-child(3){
          height:24px;
          line-height: 24px;
          span:nth-child(1){
            font-size:16px;
            color:rgba(118,140,170,1);
            margin-right:32px;
          }
          span:nth-child(2){
            font-size:16px;
            color:rgba(80,104,140,1);
          }
        }
      }
      .el-dialog__footer{
        padding:0;
        text-align: center;
        .el-button--primary{
          width:98px;
          height:40px;
          background:rgba(255,168,0,1);
          border-radius:4px;
          font-size:16px;
          color:rgba(255,255,255,1);
          border:none;
        }
      }
    }
  }
  //InvoiceDetails-VAT
  .InvoiceDetails-VAT{
    .el-dialog{
      width:600px;
      height:700px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      border:1px solid rgba(223,227,233,1);
      .el-dialog__header{
        padding:56px 0 0 0;
        .el-dialog__headerbtn .el-dialog__close{
          font-size:24px;
          color:rgba(144,147,153,1);
          font-weight: 600;
        }
      }
      .el-dialog__body{
        padding:0 0 0 120px;
        margin-bottom: 41px;
        p{
          height:24px;
          line-height:24px;
          margin-bottom:17px;
          span:nth-child(1){
            font-size:16px;
            color:rgba(118,140,170,1);
            margin-right:68px;
          }
          span:nth-child(2){
            font-size:16px;
            color:rgba(80,104,140,1);
          }
        }
        p:nth-child(1){
          font-size:24px;
          font-weight:500;
          color:rgba(80,104,140,1);
        }
        p:nth-child(4){
          span:nth-child(1){
            margin-right:35px;
          }
        }
        p:nth-child(8){
          margin-bottom:25px;
        }
        p:nth-child(9){
          font-size:24px;
          font-weight:500;
          color:rgba(80,104,140,1);
        }
        p:nth-child(10){
          span:nth-child(1){
            margin-right:86px;
          }
        }
        p:nth-child(11),p:nth-child(12){
          span:nth-child(1){
            margin-right:54px;
          }
        }
        p:last-child{
          margin:0;
        }
      }
      .el-dialog__footer{
        padding:0;
        text-align: center;
        .el-button--primary{
          width:98px;
          height:40px;
          background:rgba(255,168,0,1);
          border-radius:4px;
          font-size:16px;
          color:rgba(255,255,255,1);
          border:none;
        }
      }
    }
  }
  //goback-button
  .goback-button{
    height:40px;
    margin-top:40px;
    text-align: center;
    .el-button--primary{
      width:200px;
      height:40px;
      background:rgba(255,168,0,1);
      border-radius:4px;
      border:none;
      font-size:16px;
      color:rgba(255,255,255,1);
    }
  }

  //examineGoodsMessage
  .examineGoodsMessage{
    .examineGoodContent_p{
     height:36px !important;
     line-height: 36px;
     span{
       display:inline-block;
       height:36px !important;
       line-height: 36px !important;
       margin:0;
     }
    }
  }

  //otherRequirements
  .otherRequirements{
    .requirementText{
      display:inline-block;
      float:left;
    }
    .requirementFiles{

    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.order-detail {
  padding: 32px 50px 100px;
  .greencolor {
    color: #ffc500;
  }
  .order-number {
    height:84px;
    line-height:84px;
    color: #50688c;
    border:1px solid rgba(230,234,238,1);
    border-left: 2px solid #158be4;
    margin-bottom:32px;
    background:rgba(255,255,255,1);
    padding-left:42px;
    span{
      display:inline-block;
      float:left;
    }
    span:nth-child(1){
      font-size:14px;
      color:rgba(80,104,140,1);
      margin-right:8px;
    }
    span:nth-child(2){
      font-size:14px;
      color:rgba(255,168,0,1);
      margin-right:20px;
    }
    span:nth-child(3){
      font-size:14px;
      color:rgba(80,104,140,1);
      margin-right:28px;
    }
    .payImmedity{
      // width:56px;
      height:84px;
      text-align:center;
      line-height:84px;
      float:left;
      margin-right:24px;
      cursor:pointer;
      i{
        display:block;
        line-height:18px;
        height:18px;
        color:rgba(103,194,58,1);
        margin-bottom:4px;
        margin-top:21px;
      }
      p{
        height:19px;
        font-size:14px;
        color:rgba(103,194,58,1);
        line-height:19px;
      }
    }
    .modify-Detail{
      // width:28px;
      height:84px;
      text-align:center;
      line-height:84px;
      float:left;
      margin-right:24px;
      cursor:pointer;
      i{
        display:block;
        line-height:18px;
        height:18px;
        color:rgba(103,194,58,1);
        margin-bottom:4px;
        margin-top:21px;
      }
      p{
        height:19px;
        font-size:14px;
        color:rgba(103,194,58,1);
        line-height:19px;
      }
    }
    .delete-Detail{
      // width:28px;
      height:84px;
      text-align:center;
      line-height:84px;
      float:left;
      margin-right:24px;
      cursor:pointer;
      i{
        display:block;
        line-height:18px;
        height:18px;
        color:rgba(103,194,58,1);
        margin-bottom:4px;
        margin-top:21px;
      }
      p{
        height:19px;
        font-size:14px;
        color:rgba(103,194,58,1);
        line-height:19px;
      }
    }
    .refund-Detail{
      width:28px;
      height:84px;
      text-align:center;
      line-height:84px;
      float:left;
      margin-right:24px;
      cursor:pointer;
      i{
        display:block;
        line-height:18px;
        height:18px;
        color:rgba(103,194,58,1);
        margin-bottom:4px;
        margin-top:21px;
      }
      p{
        height:19px;
        font-size:14px;
        color:rgba(103,194,58,1);
        line-height:19px;
      }
    }
    .close-Detail{
      width:28px;
      height:84px;
      text-align:center;
      line-height:84px;
      float:left;
      margin-right:24px;
      cursor:pointer;
      i{
        display:block;
        line-height:18px;
        height:18px;
        color:rgba(124,140,165,1);
        margin-bottom:4px;
        margin-top:21px;
      }
      p{
        height:19px;
        font-size:14px;
        color:rgba(124,140,165,1);
        line-height:19px;
      }
    }
    .copy-Detail{
      // width:28px;
      height:84px;
      text-align:center;
      line-height:84px;
      float:left;
      margin-right:24px;
      cursor:pointer;
      i{
        display:block;
        line-height:18px;
        height:18px;
        color:rgba(124,140,165,1);
        margin-bottom:4px;
        margin-top:21px;
      }
      p{
        height:19px;
        font-size:14px;
        color:rgba(124,140,165,1);
        line-height:19px;
      }
    }
  }
  .OrderClosed{
    margin-top:10px;
    p:nth-child(1){
      height:24px;
      font-size:16px;
      color:rgba(80,104,140,1);
      line-height:24px;
      margin-bottom:11px;
      span:nth-child(1){
        margin-right:16px;
      }
    }
    p:nth-child(2){
      height:24px;
      font-size:16px;
      color:rgba(80,104,140,1);
      line-height:24px;
      span:nth-child(1){
        margin-right:16px;
      }
    }
  }

  .paymentInfoTitle{
    height:29px;
    line-height:29px;
    margin-bottom:17px;
    p:nth-child(1){
      font-size:16px;
      color:#FFA800;
      float:left;
    }
    p:nth-child(2){
      float:left;
      margin-left:32px;
      span:nth-child(1){
        font-size:20px;
        color:rgba(22,64,97,1);
      }
      span:nth-child(2){
        font-size:20px;
        color:rgba(239,53,53,1);
        margin-right:22px;
      }
      span:nth-child(3){
        width:120px;
        height:32px;
        background:rgba(103,194,58,1);
        border-radius:4px;
        display:inline-block;
        text-align:center;
        line-height:32px;
        font-size:16px;
        color:rgba(255,255,255,1);
        cursor:pointer;
      }
    }
  }
  .accountPaidInfo {
    // width:1320px;
    // height:212px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(230,234,238,1);
    margin-bottom:32px;
    ul:nth-child(1){
      height:70px;
      line-height:70px;
      border-bottom:1px solid rgba(230,234,238,1);
      padding-left:40px;
      li{
        float:left;
      }
      li:nth-child(1){
        font-size:14px;
        font-weight:500;
        color:rgba(80,104,140,1);
        margin-right:16px;
      }
      li:nth-child(2){
        font-size:14px;
        color:#ef3535;
        font-weight:bold;
        margin-right:60px;
      }
      li:nth-child(3),li:nth-child(4){
        font-size:14px;
        font-weight:500;
        color:rgba(80,104,140,1);
      }
      li:nth-child(5){
        font-size:18px;
        font-weight:500;
        color:rgba(80,104,140,1);
        margin:0 0 0 50px;
      }
    }
    .middle-paiInfo{
      border-bottom:1px solid rgba(230,234,238,1);
      padding:25px 0;
      ul:nth-child(1){
        height:21px;
        line-height:21px;
        padding-left:40px;
        border:none;
        li{
          float:left;
           font-size:14px;
        }
        li:nth-child(1){
          color:rgba(124,143,166,1);
          margin-right:32px;
        }
        li:nth-child(2){
          color:rgba(80,104,140,1);
          margin-right:51px;
        }
        li:nth-child(3){
          color:rgba(124,143,166,1);
          margin-right:16px;
        }
        li:nth-child(4){
          color:rgba(80,104,140,1);
          margin-right:33px;
        }
        li:nth-child(5){
          color:rgba(124,143,166,1);
          margin-right:16px;
        }
        li:nth-child(6){
          color:rgba(80,104,140,1);
          margin-right:32px;
        }
        li:nth-child(7){

          color:rgba(124,143,166,1);
          margin-right:16px;
        }
        li:nth-child(8){
          font-size:14px;
          color:rgba(80,104,140,1);
        }
      }
      ul:nth-child(2){
        height:21px;
        line-height:21px;
        padding-left:136px;
        margin-top:17px;
        display:none;
        li{
          float:left;
        }
        li:nth-child(1){
          font-size:16px;
          color:rgba(80,104,140,1);
          margin-right:124px;
        }
        li:nth-child(2){
          font-size:16px;
          color:rgba(124,143,166,1);
          margin-right:14px;
        }
        li:nth-child(3){
          font-size:16px;
          color:rgba(80,104,140,1);
          margin-right:57px;
        }
        li:nth-child(4){
          font-size:16px;
          color:rgba(124,143,166,1);
          margin-left:14px;
        }
        li:nth-child(5){
          font-size:16px;
          color:rgba(80,104,140,1);

        }
      }
    }
    ul:nth-child(3){
      height:70px;
      line-height:70px;
      padding-left:40px;
      li{
        float:left;
        font-size:14px;
      }
      li:nth-child(1){
        color:rgba(124,143,166,1);
        margin-right:32px;
      }
      li:nth-child(2){
        color:rgba(80,104,140,1);
        margin-right:16px;
      }
      li:nth-child(3){
        color:rgba(255,165,0,1);
        text-decoration: underline;
        cursor:pointer;
      }
    }
  }
  .productInformation {
    position: relative;
    .productInformation-box{
      height:32px;
      margin-bottom:16px;
      .productInformation-title{
        height:31px;
        font-size:16px;
        color:#FFA800;
        line-height:31px;
        font-weight:100;
        float:left;
        margin-right:32px;
      }
      .supplierInformation{
        float:left;
        height:31px;
        p{
          height:31px;
          line-height:31px;
          .manDay{
            font-size:16px;
            color:rgba(80,104,140,1);
            margin-right:6px;
          }
          .payNumber{
            font-size:16px;
            color:#E65C5C;
            margin-right:26px;
          }
          .btn{
            width:120px;
            height:32px;
            background:rgba(103,194,58,1);
            border-radius:4px;
            display:inline-block;
            text-align:center;
            line-height:32px;
            font-size:16px;
            color:rgba(255,255,255,1);
            cursor:pointer;
          }
        }
      }
    }
    .addNewProduct {
      display: inline-block;
      position: absolute;
      cursor: pointer;
      right: 0;
      z-index: 5;
      top: 55px;
      background-image: linear-gradient(0deg, #f4f7fa 0%, #ffffff 100%);
    }
    .content {
      width: 100%;
      padding: 20px 30px 10px;
      background-color: #ffffff;
      border-radius:4px;
      border:1px solid rgba(230,234,238,1);
      color: #50688c;
      .left30 {
        margin-left: 30px;
      }
      .copy {
        display: inline-block;
        color: #7c8ca5;
        font-size: 10px;
        line-height: 36px;
        height: 36px;
        vertical-align: middle;
        margin-left: 30px;
        cursor: pointer;
        p {
          margin: 0;
          padding: 0;
          position: relative;
          top: -28px;
          text-align: center;
        }
        i {
          position: relative;
          display: inline-block;
          width: 24px;
          top: -10px;
          text-align: center;
        }
      }
    }
  }
  .supplierDetail{
      margin-top: 32px;
      >p:first-child{
          height:29px;
          font-size:16px;
          color:#FFA800;
          line-height:29px;

      }
      .supplierContent{
          background-color: #ffffff;
          padding: 20px 40px 10px;
          margin-top:16px;
          color: #50688C;
          border-radius:4px;
          border:1px solid rgba(230,234,238,1);
          .left30 {
            margin-left: 30px;
        }
      }
  }
  .examineGoodsMessage{
      margin-top: 32px;
      >p:first-child{
        height:29px;
        font-size:16px;
        color:#FFA800;
        line-height:29px;
      }
      .examineGoodContent{
          background-color: #ffffff;
          padding: 20px 40px 10px;
          color: #50688C;
          margin-top:16px;
          border-radius:4px;
          border:1px solid rgba(230,234,238,1);
          .left30 {
            margin-left: 30px;
          }
          .el-form-item{
            span:nth-child(1){
              height:21px;
              font-size:15px;
              color:rgba(80,104,140,1);
              line-height:21px;
              margin-bottom:17px;
            }
          }
          .el-form-item:last-child{
            p:nth-child(1){
              height:36px;
              font-size:15px;
              color:rgba(80,104,140,1);
              line-height:36px;
              margin-bottom:10px;
            }
            p:nth-child(2){
              height:21px;
              line-height:21px;
              margin-bottom:17px;
              span:nth-child(1){
                font-size:15px;
                color:rgba(124,143,166,1);
                margin-right:50px;
              }
              span:nth-child(2){
                font-size:15px;
                color:rgba(80,104,140,1);
                margin:0;
              }
            }
            p:nth-child(3){
              height:21px;
              line-height:21px;
              margin-bottom:17px;
              span:nth-child(1){
                font-size:15px;
                color:rgba(124,143,166,1);
                margin-right:66px;
              }
              span:nth-child(2){
                font-size:15px;
                color:rgba(80,104,140,1);
                margin:0;
              }
            }
            p:last-child{
              height:21px;
              line-height:21px;
              span:nth-child(1){
                font-size:15px;
                color:rgba(124,143,166,1);
                margin-right:96px;
              }
              span:nth-child(2){
                font-size:15px;
                color:rgba(80,104,140,1);
                margin:0;
              }
            }
          }
      }
  }
  .reportList{
      margin-top:25px;
  }
  .otherRequirements{
      margin-top: 32px;
      padding: 0;
       >p:first-child{
          height:29px;
          font-size:16px;
          color:#FFA800;
          line-height:29px;
      }
      .otherRequirementsContent{
          padding: 24px 0 24px 40px;
          margin-top:16px;
          background:rgba(255,255,255,1);
          border-radius:4px;
          border:1px solid rgba(230,234,238,1);
          .left30 {
            margin-left: 30px;
        }
        >div{
            margin-bottom: 24px;
            >span:first-child{
                height:21px;
                font-size:16px;
                color:rgba(124,143,166,1);
                line-height:21px;
                margin-right:65px;
            }
            >span:last-child{
                color: #50688C;
                display:inline-block;
                // width:1072px;
            }
        }
      }
  }

}
</style>

