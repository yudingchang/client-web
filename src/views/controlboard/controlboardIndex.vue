<template>
  <div v-loading="loading" class="controlboardIndex">
    <el-row>
      <!-- Immediately order -->
      <el-col :span="24" class="controlboardIndex-immediately">
        <ul>
          <li/>
          <li>Immediately order</li>
        </ul>
        <el-row :gutter="20" class="ImmediatelyOrder">
          <el-col :span="6" class="Inspection">
            <li @click="OrderImmediateExamine" >
              <i class="iconfont icon-hebingxingzhuangcopy"/>
              <span>Inspection</span>
              <i class="iconfont icon-hebingxingzhuangcopy"/>
            </li>
          </el-col>
          <el-col :span="6" class="factoryAudit">
            <li @click="OrderImmediateAufiting">
              <i class="iconfont icon-hebingxingzhuang1"/>
              <span>Factory Audit</span>
              <i class="iconfont icon-hebingxingzhuang1"/>
            </li>
          </el-col>
          <el-col :span="6" class="loadingSupervision">
            <li @click="OrderImmediateSupervision">
              <i class="iconfont icon-FillCopy"/>
              <span>Loading Supervision</span>
              <i class="iconfont icon-FillCopy"/>
            </li>
          </el-col>
          <el-col :span="6" class="samplingService">
            <li @click="OrderImmediateSample">
              <i class="iconfont icon-hebingxingzhuang2"/>
              <span>Sampling Service</span>
              <i class="iconfont icon-hebingxingzhuang2"/>
            </li>
          </el-col>
        </el-row>
      </el-col>

      <!-- Add Information -->
      <el-col :span="24" style="margin-bottom:32px;">
        <el-row :gutter="30" class="controlboardIndex-user">
          <el-col :span="13" class="controlboardIndex-orderInfo">
            <ul>
              <li/>
              <li>Add Information</li>
            </ul>
            <ul>
              <li>
                <p>{{ totalOrder?totalOrder:0 }}</p>
                <p>Cumulative single volume</p>
              </li>
              <li/>
              <li>
                <p>{{ totalReport?totalReport:0 }}</p>
                <p>Cumulative completion report</p>
              </li>
              <li/>
              <li>
                <p>{{ (totalWaitOut?totalWaitOut:0 )+( totalWaitCheck?totalWaitCheck:0)+( totalWaitModify?totalWaitModify:0 ) }}</p>
                <p>uncompleted reports</p>
              </li>
            </ul>
          </el-col>
          <el-col :span="11" class="controlboardIndex-WalletBalance">
            <ul>
              <li/>
              <li>Money in Testcoo</li>
              <li @click="WalletBalance">
                <span>More details</span><i class="iconfont icon-hebingxingzhuang7"/>
              </li>
            </ul>
            <div class="WalletBalance-ul">
              <ul>
                <li>
                  <p @click="walletDetailCheck"><span>RMB</span><span>￥{{ _.get(userAccountBalance, '[0].price') }}</span></p>
                  <p @click="rechargeRmb">Recharge</p>
                </li>
                <li/>
                <li>
                  <p @click="walletDetailCheck"><span>USD</span><span>${{ _.get(userAccountBalance, '[1].price') }}</span></p>
                  <p @click="rechargeDollar">Recharge</p>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-col>

      <!-- Monthly payment -->
      <el-col :span="24" class="controlboardIndex-monthlyState" style="margin-bottom:32px;">
        <ul class="controlboardIndex-monthlyState-ul">
          <li/>
          <li>Monthly payment</li>
        </ul>
        <div class="controlboardIndex-monthlyState-div">
          <div>
            <ul>
              <li>RMB</li>
              <li>￥8989.89</li>
              <li/>
              <li>USD</li>
              <li>$8989.89</li>
            </ul>
            <p>Total amount of confirmed outstandings</p>
          </div>
          <div>
            <ul>
              <li>RMB</li>
              <li>￥8989.89</li>
              <li/>
              <li>USD</li>
              <li>$8989.89</li>
            </ul>
            <p>Repayments</p>
          </div>
          <div>
            <p @click="ImmediatePay">repayment</p>
          </div>
        </div>
      </el-col>

      <!-- Order information -->
      <!-- <el-col :span="24" style="margin-bottom:32px;" class="OrderInformation">
                <el-row>
                    <el-col :span="24" class="controlboardIndex-TBDorder">
                        <ul>
                            <li></li>
                            <li>Order information</li>
                        </ul>
                    </el-col>
                </el-row>
                <el-row class="orderContent">
                    <el-col :span="5">
                        <li class="part clearfix">
                            <div class="fl content">
                                <p>56</p>
                                <p>Cumulative single volume</p>
                            </div>
                            <p class="line fr"></p>
                        </li>
                    </el-col>
                    <el-col :span="5">
                        <li class="part clearfix">
                            <div class="fl content">
                                <p>¥18986.00</p>
                                <p>Cumulative singlevolume</p>
                            </div>
                            <p class="line fr"></p>
                        </li>
                    </el-col>
                    <el-col :span="5">
                        <li class="part clearfix">
                            <div class="fl content">
                                <p>¥0.00</p>
                                <p>Accumulated consumption of RMB</p>
                            </div>
                            <p class="line fr"></p>
                        </li>
                    </el-col>
                    <el-col :span="5">
                        <li class="part clearfix">
                            <div class="fl content">
                                <p>56</p>
                                <p>Cumulative completion repor</p>
                            </div>
                            <p class="line fr"></p>
                        </li>
                    </el-col>
                    <el-col :span="4">
                        <li class="part clearfix">
                            <div class="fl content">
                                <p>56</p>
                                <p>uncompleted reports</p>
                            </div>
                        </li>
                    </el-col>
                </el-row>
            </el-col>  -->

      <!-- Uncompleted orders -->
      <el-col :span="24" style="margin-bottom:32px;" class="uncompletedOrders">
        <el-row>
          <el-col :span="24" class="controlboardIndex-TBDorder">
            <ul>
              <li/>
              <li>Uncompleted orders</li>
            </ul>
          </el-col>
        </el-row>
        <el-row class="orderContent">
          <el-col :span="6">
            <li class="part clearfix">
              <a class="fl" @click="TBDquoted">Await quotation</a>
              <p class="fl">{{ (waitQuote?waitQuote:0) + (waitInit?waitInit:0) }}</p>
              <p class="line fr"/>
            </li>
          </el-col>
          <el-col :span="6">
            <li class="part clearfix">
              <a class="fl" @click="TBDpayment">Await payment</a>
              <p class="fl">{{ waitPay?waitPay:0 }}</p>
              <p class="line fr"/>
            </li>
          </el-col>
          <el-col :span="6">
            <li class="part clearfix">
              <a class="fl" @click="TBDexamine">Await inspection</a>
              <p class="fl">{{ ( waitInspect?waitInspect:0 ) + ( waitSplit?waitSplit:0 ) }}</p>
              <p class="line fr"/>
            </li>
          </el-col>
          <el-col :span="6">
            <li class="part clearfix">
              <a class="fl" @click="examining">Inspection now</a>
              <p class="fl">{{ inspecting?inspecting:0 }}</p>
            </li>
          </el-col>
        </el-row>
      </el-col>

      <!-- 最新订单 -->
      <el-col :span="24" class="controlboardIndex-latestOrder">
        <ul class="latestOrder-ul">
          <li/>
          <li>Recent orders</li>
          <li @click="latestOrderMore"><span>More</span><i class="iconfont icon-hebingxingzhuang7"/></li>
        </ul>
        <div v-loading="latestOrderLoading" class="latestOrder-div">
          <el-table
            :data="latestOrderTableData"
            stripe
            empty-text="Sorry, no orders going through recently."
            height="300px"
            style="width: 100%">
            <el-table-column
              label="Order No."
              width="241">
              <template slot-scope="scope">
                <span type="text" size="small" @click="OrderNumberhandleClick(scope.row)">{{ scope.row.number }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="inspection_first_date"
              label="Booking time"
              width="200"/>
            <el-table-column
              label="Product name">
              <template slot-scope="scope">
                <el-button type="text" size="small">{{ _.get(scope.row.products, '[0].name') }}</el-button>
                <el-button v-if="_.get(scope.row.products, '[0].name').length > 9?true:false " type="text" size="small" @click="UnfoldTexthandleClick(scope.row.products)"><i class="iconfont icon-IconCopy"/></el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="Service">
              <template slot-scope="scope">
                <span>验货</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="fees_total"
              label="Amount">
              <template slot-scope="scope">
                <el-button type="text" size="small"><span v-if="scope.row.fees_total.CNY">￥{{ returnFloat(scope.row.fees_total.CNY) }}</span><span v-if="scope.row.fees_total.USD && scope.row.fees_total.CNY">/</span><span v-if="scope.row.fees_total.USD">${{ returnFloat(scope.row.fees_total.USD) }}</span></el-button>
                <el-button v-if="!scope.row.fees_total.CNY && !scope.row.fees_total.USD" type="text" size="small">————</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="marking_name"
              label="Status"/>
            <el-table-column
              label="Action"
            >
              <template slot-scope="scope">
                <!-- <el-button @click="PayhandleClick(scope.row)" v-if="can.pay" type="text" size="small">付款</el-button>
                            <el-button @click="ClosehandleClick(scope.row)" v-if="can.close" type="text" size="small">关闭</el-button>
                            <el-button @click="CopyhandleClick(scope.row)" v-if="true" type="text" size="small">复制</el-button>
                            <el-button @click="CheckhandleClick(scope.row)" v-if="false" type="text" size="small">查看原因</el-button>
                            <el-button @click="BackhandleClick(scope.row)" v-if="can.refund" type="text" size="small">退单</el-button>
                            <el-button @click="VideohandleClick(scope.row)" type="text" size="small"><i class="iconfont icon-sanjiaoxing"></i>  视频</el-button> -->
                <!--  -->
                <el-button v-if="scope.row.can && scope.row.can.modify" type="text" size="small" @click="setDefault(scope.row)">修改</el-button>
                <el-button v-if="scope.row.can && scope.row.can.later_pay" type="text" size="small" @click="addPayment(scope.row)">追加付款</el-button>
                <!-- <el-tooltip placement="top">
                                <div slot="content">{{ scope.row.number }}<br/>{{ scope.row.number }}</div>
                                <el-button type="text" size="small" v-if="scope.row.marking != 'INIT'" class="phone"><i class="iconfont icon-hebingxingzhuang4"></i></el-button>
                            </el-tooltip> -->
                <el-button v-if="scope.row.marking == 'INSPECTING'" type="text" size="small" class="video"><i class="iconfont icon-hebingxingzhuang3"/></el-button>
                <el-button v-if="scope.row.can && scope.row.can.pay" type="text" size="small" @click="PayhandleClick(scope.row)">付款</el-button>
                <el-button v-if="scope.row.can && scope.row.can.close" type="text" size="small" @click="ClosehandleClick(scope.row)">关闭</el-button>
                <el-button v-if="scope.row.can && scope.row.can.refund" type="text" size="small" @click="BackhandleClick(scope.row)">退单</el-button>
                <el-button v-if="scope.row.marking == 'WAIT_INSPECT'" type="text" size="small" @click="checkRefund()">查看退单</el-button>
                <el-button v-if="scope.row.marking == 'COMPLETED'" type="text" size="small" @click="CheckhandleClick(scope.row)">查看报告</el-button>
                <el-button v-if="true" type="text" size="small" @click="CopyhandleClick(scope.row)">复制订单</el-button>
                <el-button v-if="scope.row.can && scope.row.can.delete" type="text" size="small" @click="DeleteBtn(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="latestOrder-div-div" v-if="orderTotal">
                        <p>暂无最新订单</p>
                        <p @click="placeOrder">立即下单</p>
                    </div> -->
        </div>
        <!-- 全部产品Dialog -->
        <el-dialog :visible.sync="latestOrderDialog" title="全部产品" class="productsDialog">
          <el-table
            :data="OproductNameTableData"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop=""
              label="序号"
              width="108">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="产品名称"
            >
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <!-- 待报价  关闭订单Dialog -->
        <el-dialog :visible.sync="closeForm.DialogForm" title="是否关闭订单" class="closeDialog">
          <el-form :model="closeForm">
            <el-form-item label="关闭原因:">
              <el-select v-model="closeForm.region" placeholder="请选择活动区域">
                <el-option label="不验货了不需要了" value="不验货了不需要了"/>
                <el-option label="产品信息修改/产品数量减少" value="产品信息修改/产品数量减少"/>
                <el-option label="区域二" value="区域二"/>
                <el-option label="区域二" value="区域二"/>
              </el-select>
            </el-form-item>
            <el-form-item label="备注信息:">
              <el-input v-model="closeForm.desc" type="textarea"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeForm.DialogForm = false">取 消</el-button>
            <el-button :disabled="closeForm.region == '' || closeForm.desc == ''" type="primary" @click="ConfirmClose">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 待验货  退单弹窗Dialog -->
        <el-dialog :visible.sync="refundForm.DialogForm" title="是否退单" class="refundDialog">
          <el-form :model="refundForm">
            <el-form-item label="关闭原因:">
              <el-select v-model="refundForm.desc" placeholder="请选择活动区域">
                <el-option label="不验货了不需要了" value="不验货了不需要了"/>
                <el-option label="区域二" value="区域二"/>
                <el-option label="区域二" value="区域二3"/>
                <el-option label="区域二" value="区域二4"/>
              </el-select>
            </el-form-item>
            <el-form-item label="备注信息:">
              <el-input v-model="refundForm.desc" type="textarea"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="refundForm.DialogForm = false">取 消</el-button>
            <el-button :disabled=" refundForm.desc == '' " type="primary" @click="ConfirmRefund">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 已关闭  删除弹窗Dialog -->
        <div class="DeleteDialog">
          <el-dialog
            :visible.sync="DeleteDialog"
            title="是否删除"
            width="30%"
            center>
            <span slot="footer" class="dialog-footer">
              <el-button @click="DeleteDialog = false">取 消</el-button>
              <el-button type="primary" @click="ConfirmDelete">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
      <!-- 最新报告 -->
      <el-col :span="24" class="controlboardIndex-latestRepot">
        <ul class="latestRepot-ul">
          <li/>
          <li>Recent reports</li>
          <li @click="latestRepotMore"><span>More</span><i class="iconfont icon-hebingxingzhuang7"/></li>
        </ul>
        <div v-loading="latestRepotLoading" class="latestRepot-div">
          <el-table
            :data="latestRepotTableData"
            empty-text="Sorry, no reports going through recently."
            stripe
            height="300px"
            style="width: 100%">
            <el-table-column
              prop="number"
              label="Report No."
              width="241"/>
            <el-table-column
              label="Order No."
              width="200">
              <template slot-scope="scope">
                <span type="text" size="small" @click="OrderNumberhandleClick(scope.row)">{{ scope.row.order.number }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Inspection day"
              width="160">
              <template slot-scope="scope">
                <el-tooltip placement="left">
                  <div slot="content">{{ scope.row.order.inspection_dates.join('，') }}<br></div>
                  <span>{{ scope.row.order.inspection_dates.join('，') }}</span>
                </el-tooltip>
                <!-- <span>{{scope.row.order.inspection_dates.join('，')}}</span> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="order.supplier.name"
              label="Suppliers"
              width="206"/>
            <el-table-column
              label="Item No."
              width="220">
              <template slot-scope="scope">
                <el-button type="text" size="small">{{ scope.row.products.numbers.join(',') }}</el-button>
                <el-button v-if="scope.row.products.numbers.join('').length > 9?true:false " type="text" size="small" @click="latestRepotUnfoldArt(scope.row.products.numbers)"><i class="iconfont icon-IconCopy"/></el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="Product"
              width="252">
              <template slot-scope="scope">
                <el-button type="text" size="small">{{ scope.row.products.names.join(',') }}</el-button>
                <el-button v-if="scope.row.products.names.join('').length > 9?true:false " type="text" size="small" @click="latestRepotUnfoldName(scope.row.products.names)"><i class="iconfont icon-IconCopy"/></el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="Action"
            >
              <template slot-scope="scope">
                <el-button v-if="scope.row.type_name == '线上'" type="text" size="small" @click="WebRepothandleClick(scope.row)">网页报告</el-button>
                <el-button type="text" size="small" @click="PDFreporthandleClick(scope.row)">下载PDF报告</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog :visible.sync="latestRepotDialog5" title="全部产品货号">
          <el-table
            :data="RproductOrderTableData"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              label="序号"
              width="108">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column
              label="款号/货号"
            >
              <template slot-scope="scope">
                {{ scope.row.numbers }}
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <el-dialog :visible.sync="latestRepotDialog6" title="全部产品">
          <el-table
            :data="RproductNameTableData"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              label="序号"
              width="108">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column
              label="产品名称"
            >
              <template slot-scope="scope">
                {{ scope.row }}
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { MoneyBlanace } from '@/api/walletDetail' // 钱包余额请求数据
import { getSupplydata, getInvoiceList, getAddressList, getdata } from '@/api/accountManagement.js'
import { getReportManagement } from '@/api/reportManagement'
import { getList, DeleteOrder, CloseOrder, RefundOrder, getWaitComplete } from '@/api/order'
import { mapGetters } from 'vuex'
import store from '../../store'
export default {
  name: 'ControlboardIndex',
  data() {
    return {
      // 过渡动画
      loading: false,
      // 订单数有无数据
      orderTotal: '',
      reportTotal: '',
      // 完善信息
      completeInfo: {
        supply: '',
        invoice: '',
        Receives: '',
        ReportMailbox: ''
      },
      EVPILoading: false,

      // 钱包余额
      userAccountBalance: [], // 用户钱包余额
      WalletBalanceLoading: false,

      // 订单信息
      totalOrder: '', // 累计完成单量
      totalReport: '', // 累计完成报告

      totalWaitOut: '', // 待出报告
      totalWaitCheck: '',
      totalWaitModify: '',

      // 待完成订单
      waitQuote: '',
      waitInit: '',
      waitPay: '',
      waitInspect: '',
      waitSplit: '',
      inspecting: '',

      // 最新订单
      latestOrderLoading: false,
      latestOrderTableAllData: [], // 最新订单latestOrderTableAllData数据

      latestOrderDialog: false, // 最新订单点击展开表格
      OproductNameTableData: [], // 最新订单 产品名称展开弹框数据
      Servicetype: '验货',
      DeleteDialog: false, // DeleteDialog删除弹窗
      closeForm: { // closeForm关闭弹框
        DialogForm: false, // DialogForm关闭订单Dialong
        region: '',
        desc: '',
        scopeRowId: ''
      },
      refundForm: { // refundForm退单弹窗-待验货
        DialogForm: false, // DialogForm退单的Dialong
        region: '',
        desc: '',
        scopeRowId: ''
      },

      // 最新报告
      latestRepotLoading: false,
      latestRepotTableAllData: [], // 最新报告latestRepotTableData数据
      latestRepotDialog5: false, // 最新报告latestRepotDialog5 产品货号
      latestRepotDialog6: false, // 最新报告latestRepotDialog6 产品名称
      RproductOrderTableData: [], // 产品货号 展开列表
      RproductNameTableData: [] // 产品名称  展开列表

    }
  },
  watch: {
    refundForm: {
      handler(newValue, oldValue) {
        // console.log('99999999999999')
        this.refundForm.desc = this.refundForm.region
      },
      deep: true
    },
    closeForm: {
      handler(newValue, oldValue) {
        this.closeForm.desc = this.closeForm.region
      },
      deep: true
    }
  },
  created() {
    this.getMoneyBlanaceData()
    this.getWaitCompleteData()
    this.getListData()
    this.getReportManagementData()
  },
  methods: {

    // 立即下单
    OrderImmediateExamine() { // 验货
      this.$router.push({ path: 'index' }) // 路由 跳转
    },
    OrderImmediateAufiting() { // 审核
      this.$message('线上暂时未开通此服务，如您需要请联系测库工作人员 联系电话: 18292669357')
    },
    OrderImmediateSupervision() { // 监装
      this.$message('线上暂时未开通此服务，如您需要请联系测库工作人员 联系电话: 18292669357')
    },
    OrderImmediateSample() { // 取样
      this.$message('线上暂时未开通此服务，如您需要请联系测库工作人员 联系电话: 18292669357')
    },

    // 完善信息
    ViewVendorInfo() { // ViewVendorInfo查看供应商信息
      this.$router.push({ path: '/accountManagement/dataSetting', query: { tabsIndex: 1 }})
    },

    PerfectingPerInfo() { // PerfectingPerInfo完善个人信息
      this.$router.push({ path: '/accountManagement/personalInformation' })
    },

    ViewInvoiceInfo() { // ViewInvoiceInfo查看发票信息
      this.$router.push({ path: '/accountManagement/dataSetting', query: { tabsIndex: 2 }})
    },

    PerfectingCompInfo() { // PerfectingCompInfo完善企业信息

    },

    ViewDeliveryAddress() { // ViewDeliveryAddress查看收件地址
      this.$router.push({ path: '/accountManagement/dataSetting', query: { tabsIndex: 3 }})
    },

    setPayPassword() { // setPayPassword设置支付密码
      this.$router.push({ path: '/accountManagement/accountSetting/accountSettingIndex' })
    },

    modifyPassword() { // modifyPassword修改支付密码
      this.$router.push({ path: '/accountManagement/accountSetting/accountResetPayPassword' })
    },

    ViewReportBox() { // ViewReportBox查看报告邮箱
      this.$router.push({ path: '/accountManagement/dataSetting', query: { tabsIndex: 0 }})
    },

    // getgetSupplyData(){
    //     getSupplydata().then(response => {
    //         if( response.data.code == 0){
    //             this.completeInfo.supply = response.data.data.list.length
    //             // console.log(this.completeInfo.supply)
    //         }
    //     })
    // },
    // getInvoiceListData(){
    //     getInvoiceList().then( response => {
    //         if( response.data.code == 0){
    //             this.completeInfo.invoice = response.data.data.list.length
    //             // console.log(response.data.data.list)
    //         }
    //     })
    // },

    // getAddressListData(){
    //     getAddressList().then( response => {
    //         if( response.data.code == 0){
    //             this.completeInfo.Receives = response.data.data.list.length
    //             console.log(this.completeInfo.Receives)
    //         }
    //     })
    // },

    // getData(){
    //     this.EVPILoading = true
    //     getdata().then( response => {
    //         if( response.data.code == 0){
    //             this.completeInfo.ReportMailbox = response.data.data.list.length
    //             this.EVPILoading = false;
    //         }
    //     })
    // },
    // 钱包余额

    getMoneyBlanaceData() { // 获取用户账户人民币和美元余额
      this.WalletBalanceLoading = true
      MoneyBlanace().then(response => {
        if (response.data.code == 0) {
          this.userAccountBalance = response.data.data.list
          console.log(this.userAccountBalance)
          this.WalletBalanceLoading = false
        }
      })
    },
    rechargeRmb() { // rechargeRmb人民币充值入口
      this.$router.push({ path: '/fundManagement/wallet/walletRechargeRmb', query: {}})
    },

    rechargeDollar() { // rechargeDollar美元充值入口
      this.$router.push({ path: '/fundManagement/wallet/walletRechargeDollar', query: {}})
    },
    WalletBalance() { // 查看钱包明细
      this.$router.push({ path: '/fundManagement/wallet/walletAccountIndex', query: {}})
    },

    walletDetailCheck() {
      this.$router.push({ path: '/fundManagement/wallet/walletAccountIndex' })
    },

    // 测库月结
    ImmediatePay() { // ImmediatePay立即还款接口

    },

    // 订单信息
    getWaitCompleteData() { // 获取订单信息  和 待完成订单信息
      getWaitComplete().then(response => {
        if (response.data.code == 0) {
          console.log(response.data)
          this.totalOrder = response.data.data.orders_total.COMPLETED
          this.totalReport = response.data.data.report_total.COMPLETED
          this.totalWaitOut = response.data.data.report_total.WAIT_WRITE
          this.totalWaitModify = response.data.data.report_total.WAIT_MODIFY
          this.totalWaitCheck = response.data.data.report_total.WAIT_CHECK

          this.waitQuote = response.data.data.orders_total.WAIT_QUOTE
          this.waitInit = response.data.data.orders_total.INIT
          this.waitPay = response.data.data.orders_total.WAIT_PAY
          this.waitInspect = response.data.data.orders_total.WAIT_INSPECT
          this.waitSplit = response.data.data.orders_total.WAIT_SPLIT
          this.inspecting = response.data.data.orders_total.INSPECTING
        }
      })
    },

    // 待完成订单
    TBDquoted() { // 待报价
      this.$router.push({ path: '/orderManagement/examineGood', query: { tabIndex: 1 }})
    },

    TBDpayment() { // 待付款
      this.$router.push({ path: '/orderManagement/examineGood', query: { tabIndex: 2 }})
    },

    TBDexamine() { // 待验货
      this.$router.push({ path: '/orderManagement/examineGood', query: { tabIndex: 3 }})
    },

    examining() { // 验货中ing
      this.$router.push({ path: '/orderManagement/examineGood', query: { tabIndex: 4 }})
    },

    // getWaitInfo(){
    //     this.getListData('WAIT_QUOTE')
    //     this.getListData('WAIT_PAY')
    //     this.getListData('WAIT_INSPECT')
    //     this.getListData('INSPECTING')
    // },

    // 最新订单

    UnfoldTexthandleClick(val) { // 点击展开产品名称
      this.latestOrderDialog = true
      console.log(val)
      this.OproductNameTableData = val
    },

    OrderNumberhandleClick(row) { // 订单号链接至
      console.log(row)
      // console.log(this.latestOrderTableData.length)
      this.$router.push({ path: '/orderManagement/orderDetails', query: { orderId: row.id }})
      // console.log(row)
    },

    PayhandleClick(row) { // 付款
      console.log(row)
      this.$router.push({ path: '/orderManagement/pay', query: { order: row.id }})
    },

    ClosehandleClick(row) { // 关闭
      this.closeForm.DialogForm = true
      console.log(row.id)
      this.closeForm.scopeRowId = row.id
      this.closeForm.region = ''
      this.closeForm.desc = ''
    },

    // ConfirmClose确定关闭订单
    ConfirmClose() {
      this.closeForm.DialogForm = false
      console.log('进入关闭')
      CloseOrder({
        message: this.closeForm.region,
        remark: this.closeForm.desc,
        orderId: this.closeForm.scopeRowId
      }).then(response => {
        if (response.data.code == 0) {
          this.getListData()
        }
      })
      this.closeForm.region = ''
      this.closeForm.desc = ''
    },

    CopyhandleClick(row) { // 复制
      this.$router.push({ path: '/index', query: { orderId: row.id }})
    },

    CheckhandleClick() { // 查看报告
      this.$router.push({ path: '/reportManagement/inspectionReport', query: { orderId: row.id }})
    },

    VideohandleClick() { // 视频

    },

    setDefault(row) { // 修改
      this.$router.push({ path: '/index', query: { orderId: row.id, orderSet: 'set' }})
    },

    addPayment(row) { // addPayment追加付款
      console.log(row)
      this.$router.push({ path: 'pay', query: { order: row.id }})
    },

    checkRefund(row) { // checkRefund查看退单详情
      this.$router.push({ path: 'orderRefundDetail', query: { orderId: row.id }})
    },

    BackhandleClick(row) { // Refund退单
      this.refundForm.DialogForm = true
      console.log(row.id)
      this.refundForm.scopeRowId = row.id
    },

    ConfirmRefund() { // ConfirmRefund确定退单
      this.refundForm.DialogForm = false
      RefundOrder({
        remark: this.refundForm.desc,
        orderId: this.refundForm.scopeRowId
      }).then(response => {
        if (response.data.code = 0) {
          console.log('退单成功')
          this.getListData()
        }
      })
      this.refundForm.region = ''
      this.refundForm.desc = ''
    },

    DeleteBtn(row) { // DeleteBtn删除订单
      this.DeleteDialog = true
      this.DeleteDialogId = row.id
    },

    // ConfirmDelete确定删除订单
    ConfirmDelete() {
      this.DeleteDialog = false
      DeleteOrder({
        orderId: this.DeleteDialogId
      }).then(response => {
        if (response.data.code == 0) {
          console.log('删除成功')
          this.getListData()
        }
      })
    },

    getListData(markingstyle) { // 获取最新订单数据
      this.latestOrderLoading = true
      getList({
        marking: markingstyle == '' ? '' : markingstyle
      }).then(response => {
        if (response.data.code == 0) {
          this.latestOrderTableAllData = response.data.data
          if (response.data.meta.total == 0) {
            this.orderTotal = true
          } else {
            this.orderTotal = false
          }
          this.latestOrderLoading = false
          console.log(this.latestOrderTableAllData)
          // this.returnFloat(199.1)
          // if( markingstyle != '' && markingstyle == 'WAIT_QUOTE'){
          //     // this.waitQuote = response.data.data.length
          // }else if( markingstyle != '' && markingstyle == 'WAIT_PAY' ){
          //     // this.waitPay = response.data.data.length
          // }else if( markingstyle != '' && markingstyle == 'WAIT_INSPECT' ){
          //     // this.waitInspect = response.data.data.length
          // }else if( markingstyle != '' && markingstyle == 'INSPECTING' ){
          //     // this.inspecting = response.data.data.length
          // }
        }
      })
    },

    // latestOrderMore更多
    latestOrderMore() {
      this.$router.push({ path: '/orderManagement/examineGood' })
    },

    // placeOrder下单
    placeOrder() {
      this.$router.push({ path: 'index' })
    },

    returnFloat(value) { // 处理金额数据
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
    },

    // 最新报告
    latestRepotUnfoldArt(row) { // 最新报告 产品货号展开
      this.latestRepotDialog5 = true
      this.RproductOrderTableData = row
    },

    latestRepotUnfoldName(row) { // 最新报告 产品名称展开
      this.latestRepotDialog6 = true
      this.RproductNameTableData = row
    },

    WebRepothandleClick(row) { // 网页报告
      this.$router.push({ path: '/reportManagement/inspectionReport', query: { accountApi: row._links.self.substring(4) }})
      // console.log(row._links.self.substring(4))
    },

    PDFreporthandleClick() { // 下载PDF版报告

    },

    getReportManagementData() {
      this.loading = true
      this.latestRepotLoading = true
      getReportManagement().then(response => {
        if (response.data.code == 0) {
          this.latestRepotLoading = false
          this.latestRepotTableAllData = response.data.data
          if (response.data.meta.total == 0) {
            this.reportTotal = true
          } else {
            this.reportTotal = false
          }
          this.loading = false
          console.log(this.latestRepotTableData)
        }
      })
    },

    // latestRepotMore更多
    latestRepotMore() {
      this.$router.push({ path: '/reportManagement/ReportManagement' })
    }
  },
  computed: {
    ...mapGetters([
      'is_paypassword'
    ]),
    latestOrderTableData: function() {
      return this.latestOrderTableAllData.slice(0, 5) // 截取数组的前5个
    },
    latestRepotTableData: function() {
      return this.latestRepotTableAllData.slice(0, 5)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//普通样式
.controlboardIndex{
    padding:40px;
    .controlboardIndex-immediately{
        margin-bottom:32px;
        ul:nth-child(1){
            height: 33px;
            line-height: 33px;
            margin-bottom:16px;
            li{
                float:left;
            }
            li:nth-child(1){
                width:3px;
                height:28px;
                background:rgba(103,194,58,1);
                margin:3px 16px 0 0;
            }
            li:nth-child(2){
                height:33px;
                font-size:20px;
                font-weight:400;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(80,104,140,1);
                line-height:33px;
            }
        }
        .ImmediatelyOrder{
            height:120px;
            // width:1540px;
            line-height: 120px;
            li{
                float:left;
                cursor: pointer;
                list-style: none;
            }
            .Inspection{
                li:first-child{
                    width:100%;
                    height:120px;
                    background:linear-gradient(315deg,rgba(140,129,246,1) 0%,rgba(200,109,215,1) 100%);
                    border-radius: 4px;
                    position: relative;
                    overflow: hidden;
                    i:nth-child(1){
                        font-size:30px;
                        color:rgba(255,255,255,1);
                        margin-left:26px;
                    }
                    span{
                        height:37px;
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                        line-height:37px;
                        margin-left:16px;
                    }
                    i:nth-child(3){
                        position:absolute;
                        top:30px;
                        right:15px;
                        font-size:142px;
                        color: rgba(255,255,255,1);
                        opacity: 0.2;
                    }
                }
            }

            .factoryAudit{
                li:first-child{
                    width:370px;
                    height:120px;
                    background:linear-gradient(131deg,rgba(234,124,97,1) 0%,rgba(254,113,151,1) 100%);
                    border-radius:4px;
                    margin-right:20px;
                    position: relative;
                    overflow: hidden;
                    i:nth-child(1){
                        font-size:30px;
                        color:rgba(255,255,255,1);
                        margin-left:26px;
                    }
                    span{
                        height:37px;
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                        line-height:37px;
                        margin-left:16px;
                    }
                    i:nth-child(3){
                        position:absolute;
                        top:30px;
                        right:15px;
                        font-size:142px;
                        color: rgba(255,255,255,1);
                        opacity: 0.2;
                    }
                }
            }

            .loadingSupervision{
                li:first-child{
                    width:370px;
                    height:120px;
                    background:linear-gradient(135deg,rgba(98,178,255,1) 0%,rgba(134,162,253,1) 100%);
                    border-radius:4px;
                    margin-right:20px;
                    position: relative;
                    overflow: hidden;
                    i:nth-child(1){
                        font-size:30px;
                        color:rgba(255,255,255,1);
                        margin-left:26px;
                    }
                    span{
                        height:37px;
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                        line-height:37px;
                        margin-left:16px;
                    }
                    i:nth-child(3){
                        position:absolute;
                        top:30px;
                        right:15px;
                        font-size:142px;
                        color: rgba(255,255,255,1);
                        opacity: 0.2;
                    }
                }
            }
            .samplingService{
                li:first-child{
                    width:370px;
                    height:120px;
                    background:linear-gradient(136deg,rgba(54,200,196,1) 0%,rgba(22,161,207,1) 100%);
                    border-radius:4px;
                    position: relative;
                    overflow: hidden;
                    i:nth-child(1){
                        font-size:30px;
                        color:rgba(255,255,255,1);
                        margin-left:26px;
                    }
                    span{
                        height:37px;
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                        line-height:37px;
                        margin-left:16px;
                    }
                    i:nth-child(3){
                        position:absolute;
                        top:30px;
                        right:15px;
                        font-size:142px;
                        color: rgba(255,255,255,1);
                        opacity: 0.2;
                    }
                }
            }

        }
    }
    .controlboardIndex-user{
        // width:1540px;
        .controlboardIndex-EVPI{
            width:720px;
            margin-right:50px;
            float:left;
            .controlboardIndex-EVPI-ul{
                height: 33px;
                line-height: 33px;
                margin-bottom:16px;
                li{
                    float:left;
                }
                li:nth-child(1){
                    width:3px;
                    height:28px;
                    background:rgba(103,194,58,1);
                    margin:3px 16px 0 0;
                }
                li:nth-child(2){
                    height:33px;
                    font-size:20px;
                    font-weight:400;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                    color:rgba(80,104,140,1);
                    line-height:33px;
                }
            }
            div{
                width:720px;
                height:168px;
                background:rgba(255,255,255,1);
                border-radius:4px;
                border:1px solid rgba(230,234,238,1);
                padding:16px 58px 17px 40px;
                ul{
                    height:24px;
                    line-height: 24px;
                    margin-bottom:13px;
                    li:nth-child(1){
                        float:left;
                        height:24px;
                        line-height: 24px;
                        width:224px;
                        span:nth-child(1){
                            float:left;
                            font-size:16px;
                            font-family:MicrosoftYaHei;
                            color:rgba(118,140,170,1);
                        }
                        span:nth-child(2){
                            float:right;
                            font-size:16px;
                            font-family:MicrosoftYaHei;
                            color:rgba(255,168,0,1);
                            cursor:pointer;
                        }
                    }
                    li:nth-child(2){
                        float:right;
                        height:24px;
                        line-height: 24px;
                        width:242px;
                        span:nth-child(1){
                            float:left;
                            font-size:16px;
                            font-family:MicrosoftYaHei;
                            color:rgba(118,140,170,1);
                        }
                        span:nth-child(2){
                            float:right;
                            font-size:16px;
                            font-family:MicrosoftYaHei;
                            color:rgba(255,168,0,1);
                            cursor: pointer;
                        }
                    }
                }
                ul:last-child{
                    margin-bottom:0;
                }
            }
        }
        .controlboardIndex-WalletBalance{
            // width:770px;
            float:left;
            ul:nth-child(1){
                height: 33px;
                line-height: 33px;
                margin-bottom:16px;
                li:nth-child(1){
                    float:left;
                    width:3px;
                    height:28px;
                    background:rgba(103,194,58,1);
                    margin:3px 16px 0 0;
                }
                li:nth-child(2){
                    float:left;
                    height:33px;
                    font-size:20px;
                    font-weight:400;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                    color:rgba(80,104,140,1);
                    line-height:33px;
                }
                li:nth-child(3){
                    float:right;
                    height:33px;
                    line-height: 33px;
                    cursor: pointer;
                    span{
                        font-size:16px;
                        font-family:PingFang-SC-Medium;
                        font-weight:500;
                        color:rgba(245,166,35,1);
                        margin-right:8px;
                    }
                    i{
                        font-size:14px;
                        color:rgba(245,166,35,1);
                    }
                }
            }
            .WalletBalance-ul{
                height:168px;
                border-radius:4px;
                border:1px solid rgba(230,234,238,1);
                box-sizing:border-box;
                ul:nth-child(1){
                    height:166px;
                    background:rgba(255,255,255,1);
                    // border-radius:4px;
                    // border:1px solid rgba(230,234,238,1);
                    // line-height: 168px;

                    li{
                        float:left;
                    }
                    li:nth-child(1),li:nth-child(3){
                        width:49%;
                        height:166px;
                        line-height: 168px;
                        text-align: center;
                        background:rgba(255,255,255,1);
                        margin:0;
                        p:nth-child(1){
                            height:37px;
                            line-height: 37px;
                            margin:32px 0 23px 0;
                            cursor:pointer;
                            span:nth-child(1){
                                font-size:18px;
                                color:rgba(80,104,140,1);
                                margin-right:32px;
                            }
                            span:nth-child(2){
                                font-size:22px;
                                color:rgba(21,139,228,1);
                            }
                        }
                        p:nth-child(2){
                            height:40px;
                            width:120px;
                            background:rgba(103,194,58,1);
                            border-radius:4px;
                            line-height: 40px;
                            font-size:16px;
                            color:rgba(255,255,255,1);
                            margin:0 auto;
                            cursor: pointer;
                        }
                    }
                    li:nth-child(2){
                        width:1px;
                        height:80px;
                        background:rgba(223,227,233,1);
                        margin-top:46px;
                    }
                }
            }

        }
    }
    // Monthly payment
    .controlboardIndex-monthlyState{
        margin:16px 0 0 0;
        .controlboardIndex-monthlyState-ul{
            height: 33px;
            line-height: 33px;
            margin-bottom:16px;
            li{
                float:left;
            }
            li:nth-child(1){
                width:3px;
                height:28px;
                background:rgba(103,194,58,1);
                margin:3px 16px 0 0;
            }
            li:nth-child(2){
                height:33px;
                font-size:20px;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(80,104,140,1);
                line-height:33px;
            }
        }
        .controlboardIndex-monthlyState-div{
            height:162px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            border:1px solid rgba(230,234,238,1);
            div{
                float: left;
            }
            div:nth-child(1){
                width:667px;
                height:162px;
                line-height: 162px;
                border-right:1px solid rgba(223,227,233,1);
                padding-top:40px;
                ul{
                    height:50px;
                    line-height: 50px;
                    margin:0 0 16px 0;
                    li{
                        float:left;
                    }
                    li:nth-child(1),li:nth-child(4){
                        font-size:18px;
                        color:rgba(80,104,140,1);
                        margin-left:50px;
                    }
                    li:nth-child(2),li:nth-child(5){
                        font-size:22px;
                        color:rgba(21,139,228,1);
                        margin-left:24px;
                    }
                    li:nth-child(3){
                        width:1px;
                        height:50px;
                        background:rgba(223,227,233,1);
                        margin-left:50px;
                    }
                }
                p{
                    height:31px;
                    line-height: 31px;
                    text-align: center;
                    font-size:16px;
                    color:rgba(118,140,170,1);
                    margin-left:10px;
                }
            }
            div:nth-child(2){
                width:656px;
                height:162px;
                line-height: 162px;
                padding-top:40px;
                ul{
                    height:50px;
                    line-height: 50px;
                    margin:0 0 16px 0;
                    li{
                        float:left;
                    }
                    li:nth-child(1),li:nth-child(4){
                        font-size:18px;
                        color:rgba(80,104,140,1);
                        margin-left:50px;
                    }
                    li:nth-child(2),li:nth-child(5){
                        font-size:22px;
                        color:rgba(21,139,228,1);
                        margin-left:24px;
                    }
                    li:nth-child(3){
                        width:1px;
                        height:50px;
                        background:rgba(223,227,233,1);
                        margin-left:50px;
                    }
                }
                p{
                    height:31px;
                    line-height: 31px;
                    text-align: center;
                    margin-left:20px;
                    font-size:16px;
                    color:rgba(118,140,170,1);
                }
            }
            div:nth-child(3){
                line-height: 162px;
                height:162px;
                padding-top:64px;
                p{
                    width:130px;
                    height:40px;
                    background:rgba(103,194,58,1);
                    border-radius:4px;
                    color:rgba(255,255,255,1);
                    font-size:16px;
                    line-height: 40px;
                    text-align: center;
                    cursor: pointer;
                }
            }
        }
    }

    // Order information
    .OrderInformation{
       .orderContent{
            border: 1px solid #e6eaee;
            border-radius: 4px;
            background-color: #ffffff;
            li{
                list-style: none;
            }
            .part{
                height: 140px;
                .content{
                    width:calc(100% - 1px);
                    margin: 0 auto;
                    p:first-child{
                        font-size: 30px;
                        color:#50688C;
                        text-align: center;
                        margin-top:25px;
                    }
                    p:nth-child(2){
                        color: #768CAA;
                        font-size: 16px;
                        margin-top: 16px;
                        text-align: center;
                    }
                }
                .line{
                    margin-top: 45px;
                    height: 50px;
                    width: 1px;
                    background-color: #DFE3E9;
                }
            }
        }
    }

    // Uncompleted orders
    .uncompletedOrders{
        .orderContent{
            border: 1px solid #e6eaee;
            border-radius: 4px;
            background-color: #ffffff;
            li{
                list-style: none;
            }
            .part{
                height: 100px;
                a{
                    text-decoration:underline;
                    color:#FFA800;
                    font-size: 20px;
                    display: inline-block;
                    line-height: 100px;
                    margin-left: 13%;
                }
                p:nth-child(2){
                    margin-top:20px;
                    margin-left:15.6%;
                    width: 60px;
                    height: 60px;
                    background:rgba(103,194,58,1);
                    border-radius:4px;
                    color: #FFFFFF;
                    text-align: center;
                    line-height:60px;
                    font-size: 24px;
                }
                .line{
                    margin-top: 25px;
                    margin-left:13%;
                    height: 50px;
                    width: 1px;
                    background-color: #DFE3E9;
                }
            }
        }
    }

    .controlboardIndex-orderInfo{
        // height:168px;
        // margin-bottom:16px;
        ul:nth-child(1){
            height: 33px;
            line-height: 33px;
            margin-bottom:16px;
            li{
                float:left;
            }
            li:nth-child(1){
                width:3px;
                height:28px;
                background:rgba(103,194,58,1);
                margin:3px 16px 0 0;
            }
            li:nth-child(2){
                height:33px;
                font-size:20px;
                font-weight:400;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(80,104,140,1);
                line-height:33px;
            }
        }
        ul:nth-child(2){
            height:168px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            border:1px solid rgba(230,234,238,1);
            line-height: 168px;
            li{
                float:left;
            }
            li:nth-child(1),li:nth-child(3),li:nth-child(5),li:nth-child(7){
                width:33%;
                height: 140px;
                padding-top:36px;
                p:nth-child(1){
                    height:36px;
                    font-size:30px;
                    color:rgba(80,104,140,1);
                    line-height:36px;
                    text-align: center;
                    margin-bottom:14px;
                }
                p:nth-child(2){
                    height:22px;
                    font-size:16px;
                    font-weight:500;
                    color:rgba(118,140,170,1);
                    line-height:22px;
                    text-align: center;
                }
            }
            li:nth-child(9){
                width: 302px;
                height: 140px;
                padding-top:36px;
                p:nth-child(1){
                    height:36px;
                    font-size:30px;
                    color:rgba(80,104,140,1);
                    line-height:36px;
                    text-align: center;
                    margin-bottom:14px;
                }
                p:nth-child(2){
                    height:22px;
                    font-size:16px;
                    font-weight:500;
                    color:rgba(118,140,170,1);
                    line-height:22px;
                    text-align: center;
                }
            }
            li:nth-child(2),li:nth-child(4),li:nth-child(6),li:nth-child(8){
                width:1px;
                height:50px;
                background:rgba(223,227,233,1);
                margin-top:45px;
            }
        }
    }
    .controlboardIndex-TBDorder{
        width:1540px;
        margin-bottom:16px;
        ul:nth-child(1){
            height: 33px;
            line-height: 33px;
            li{
                float:left;
            }
            li:nth-child(1){
                width:3px;
                height:28px;
                background:rgba(103,194,58,1);
                margin:3px 16px 0 0;
            }
            li:nth-child(2){
                height:33px;
                font-size:20px;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(80,104,140,1);
                line-height:33px;

            }
        }
        ul:nth-child(2){
            width:1540px;
            height:100px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            border:1px solid rgba(230,234,238,1);
            line-height: 100px;
            li{
                float:left;
            }
            li:nth-child(1),li:nth-child(3),li:nth-child(5){
                width:385px;
                height:100px;
                p{
                    float:left;
                }
                p:nth-child(1){
                    width:45px;
                    height:45px;
                    background:rgba(255,84,84,1);
                    line-height: 45px;
                    text-align: center;
                    margin:28px 32px 0 116px;
                    font-size:18px;
                    color:rgba(255,255,255,1);
                    border-radius:50%;
                }
                p:nth-child(2){
                    font-size:20px;
                    font-weight:500;
                    color:rgba(255,168,0,1);
                    text-decoration: underline;
                    cursor:pointer;
                }
            }
            li:nth-child(7){
                width:380px;
                height:100px;
                p{
                    float:left;
                }
                p:nth-child(1){
                    width:45px;
                    height:45px;
                    background:rgba(255,84,84,1);
                    line-height: 45px;
                    text-align: center;
                    margin:28px 32px 0 116px;
                    font-size:18px;
                    color:rgba(255,255,255,1);
                    border-radius:50%;
                }
                p:nth-child(2){
                    font-size:20px;
                    font-weight:500;
                    color:rgba(255,168,0,1);
                    text-decoration: underline;
                    cursor:pointer;
                }
            }
            li:nth-child(2),li:nth-child(4),li:nth-child(6){
                width:1px;
                height:50px;
                background:rgba(223,227,233,1);
                margin:24px 0 0 0;
            }
        }
    }
    .controlboardIndex-latestOrder{
        margin-bottom:16px;
        .latestOrder-ul{
            height: 33px;
            line-height: 33px;
            margin-bottom:16px;
            li{
                float:left;
            }
            li:nth-child(1){
                width:3px;
                height:28px;
                background:rgba(103,194,58,1);
                margin:3px 16px 0 0;
            }
            li:nth-child(2){
                height:33px;
                font-size:20px;
                font-weight:400;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(80,104,140,1);
                line-height:33px;
            }
            li:nth-child(3){
                float:right;
                height:33px;
                line-height: 33px;
                cursor: pointer;
                span{
                    font-size:16px;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                    color:rgba(245,166,35,1);
                    margin-right:8px;
                }
                i{
                    font-size:14px;
                    color:rgba(245,166,35,1);
                    // text-align: right;
                }
            }
        }
        .latestOrder-div{
            background:rgba(255,255,255,1);
            border-radius:4px;
            opacity:0.9;
            // border:1px solid rgba(230,234,238,1);
            .latestOrder-div-div{
                height:138px;
                text-align: center;
                padding-top:32px;
                p:nth-child(1){
                    height: 24px;
                    line-height: 24px;
                    font-size:18px;
                    font-family:MicrosoftYaHei;
                    color:rgba(127,143,164,1);
                    margin-bottom:13px;
                }
                p:nth-child(2){
                    width:120px;
                    height:32px;
                    background:rgba(103,194,58,1);
                    border-radius:4px;
                    line-height: 32px;
                    text-align: center;
                    margin-left:707px;
                    font-size:14px;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    cursor:pointer;
                }
            }
        }
    }
    .controlboardIndex-latestRepot{
        .latestRepot-ul{
            height: 33px;
            line-height: 33px;
            margin-bottom:16px;
            li{
                float:left;
            }
            li:nth-child(1){
                width:3px;
                height:28px;
                background:rgba(103,194,58,1);
                margin:3px 16px 0 0;
            }
            li:nth-child(2){
                height:33px;
                font-size:20px;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(80,104,140,1);
                line-height:33px;
            }
            li:nth-child(3){
                float:right;
                height:33px;
                line-height: 33px;
                cursor:pointer;
                span{
                    font-size:16px;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                    color:rgba(245,166,35,1);
                    margin-right:8px;
                }
                i{
                    font-size:14px;
                    color:rgba(245,166,35,1);
                    // text-align: right;
                }
            }
        }
        .latestRepot-div{
            background:rgba(255,255,255,1);
            border-radius:4px;
            opacity:0.9;
            // border:1px solid rgba(230,234,238,1);
            .latestRepot-div-div{
                height:136px;
                line-height: 136px;
                text-align: center;
                font-size:18px;
                font-family:MicrosoftYaHei;
                color:rgba(127,143,164,1);
            }
        }
    }
}

</style>

<style rel="stylesheet/scss" lang="scss">
//element-ui样式
.controlboardIndex{
    .controlboardIndex-latestOrder{
         //el-table
        .el-table th{
            padding:0;
            height:60px;
        }
        .el-table td{
            padding:0;
            height:60px;
            line-height:60px;
            font-size:12px;
        }
        .el-table .cell{
            padding:0;
        }
        .el-table th div, .el-table th>.cell{
            padding:0;
            color:rgba(80,104,140,1);
            font-size:14px;
        }
        .el-table th:nth-child(1)>.cell{
            padding-left:40px;
        }
        .el-table td:nth-child(1) div{
            padding-left:40px;
        }
        .el-table td:nth-child(1) div{
            font-size:12px;
            color:rgba(21,139,228,1);
            cursor:pointer;
        }

        .el-button--text{
            color:rgba(255,168,0,1);
            // font-size:14px;
        }

        .el-table th:nth-child(3)>.cell .el-button--text:nth-child(1){     //产品名称第一个button
            width:96px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:rgba(80,104,140,1);
            float:left;
        }
        .el-table td:nth-child(3) div .el-button--text:nth-child(1){
            width:96px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:rgba(80,104,140,1);
            float:left;
        }
        .el-table th:nth-child(3)>.cell .el-button--text:nth-child(2){     //产品名称第二个button
            width:24px;
            color:rgba(80,104,140,1);
            float:right;
            margin:0 60px 0 0;
        }
        .el-table td:nth-child(3) div .el-button--text:nth-child(2){
            width:24px;
            color:rgba(80,104,140,1);
            float:right;
            margin:0 60px 0 0;
        }
        .el-table td:nth-child(5) div .el-button--text{
            color:rgba(80,104,140,1);
            text-align:left;
            margin:0;
        }
        .el-table td:nth-child(7){

            line-height:60px;
        }
        .el-table td:nth-child(7) div .el-button--text i{
            font-size:22px;
            color:rgba(103,194,58,1);
        }

        //Dialog Table
        // .productsDialog{
        //     width:387px;
        //     height:294px;
        //     background:rgba(255,255,255,1);
        //     box-shadow:0px 2px 4px 0px rgba(118,140,170,1);
        //     border-radius:4px;
        //     .el-dialog__header{
        //         width:387px;
        //         height:41px;
        //         background:rgba(230,234,238,1);
        //         border-radius:3px 3px 0px 3px;
        //         text-align:center;
        //         line-height:41px;
        //         padding:0;
        //         position:relative;
        //         .el-dialog__headerbtn{
        //             width:12px;
        //             height:12px;
        //             line-height:12px;
        //             position:absolute;
        //             top:13px;
        //             right:13px;
        //             .el-icon-close:before{
        //                 color:rgba(22,64,97,1);
        //                 font-weight:600;
        //             }
        //         }
        //     }
        //     .el-dialog__body{
        //         width:387px;
        //         height:253px;
        //         padding:0;
        //         .el-table th{
        //             height:31px;
        //             padding:0;
        //         }
        //         .el-table td{
        //             height:36px;
        //         }
        //         .el-table th:nth-child(1) > .cell{
        //             padding:0;
        //         }
        //         .el-table .cell, .el-table th div{
        //             font-size:14px;
        //             color:rgba(124,140,165,1);
        //             text-align:center;
        //         }
        //         .el-table td:nth-child(1) div{
        //             padding:0;
        //             color:rgba(22,64,97,1);
        //             font-size:14px;
        //         }
        //         .el-table td:nth-child(2) div{
        //             color:rgba(22,64,97,1);
        //             font-size:14px;
        //         }
        //     }
        // }

        .productsDialog{
            //Dialog Table
                .el-dialog{
                    width:387px;
                    height:294px;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 2px 4px 0px rgba(118,140,170,1);
                    border-radius:4px;
                    .el-dialog__header{
                        width:387px;
                        height:41px;
                        background:rgba(230,234,238,1);
                        border-radius:3px 3px 0px 3px;
                        text-align:center;
                        line-height:41px;
                        padding:0;
                        position:relative;
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
                        .el-table th{
                            height:31px;
                            padding:0;
                        }
                        .el-table td{
                            height:36px;
                            padding:0;
                        }
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

        //closeDialog订单关闭Dialog
        .closeDialog{
            .el-dialog{
            width:600px;
            height:480px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            .el-dialog__header{
                padding:60px 0 0 0;
                text-align: center;
                .el-dialog__title{
                height:33px;
                font-size:24px;
                font-weight:500;
                color:rgba(124,143,166,1);
                line-height:33px;
                }
                .el-dialog__headerbtn .el-dialog__close{
                font-size:24px;
                color:rgba(144,147,153,1);
                font-weight:600;
                }
            }
            .el-dialog__body{
                padding:40px 102px 0 84px;
                margin-bottom:32px;
                // text-align: center;
                .el-form-item:nth-child(1){
                margin-bottom:24px;
                .el-form-item__label{
                    width:90px;
                    height:40px;
                    line-height: 40px;
                    font-size:18px;
                    font-family:MicrosoftYaHei;
                    color:rgba(144,147,153,1);
                    // line-height:24px;
                }
                .el-input--medium .el-input__inner{
                    width:316px;
                    height:40px;
                    border-radius:4px;
                    border:1px solid rgba(192,196,204,1);
                }
                }
                .el-form-item:nth-child(2){
                margin:0;
                .el-form-item__label{
                    width:90px;
                    height:40px;
                    line-height: 40px;
                    font-size:18px;
                    font-family:MicrosoftYaHei;
                    color:rgba(144,147,153,1);
                    float:left;
                }
                .el-input--medium{
                    width:316px;
                    height:150px;
                }
                .el-textarea__inner{
                    width:316px;
                    height:150px;
                    border-radius:3px;
                    border:1px solid rgba(192,196,204,1);
                    padding:9px 16px 0;
                }
                }
            }
            .el-dialog__footer{
                padding:0;
                text-align: center;
                .el-button--medium:nth-child(1){
                width:98px;
                height:50px;
                border-radius:4px;
                border:1px solid rgba(144,147,153,1);
                margin-right:40px;
                }
                .el-button--medium:nth-child(2){
                width:98px;
                height:50px;
                background:rgba(255,168,0,1);
                border-radius:4px;
                }
            }
            }
        }
        // refundDialog退单Dialog
        .refundDialog{
            .el-dialog{
            width:600px;
            height:480px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            .el-dialog__header{
                padding:60px 0 0 0;
                text-align: center;
                .el-dialog__title{
                height:33px;
                font-size:24px;
                font-weight:500;
                color:rgba(124,143,166,1);
                line-height:33px;
                }
                .el-dialog__headerbtn .el-dialog__close{
                font-size:24px;
                color:rgba(144,147,153,1);
                font-weight:600;
                }
            }
            .el-dialog__body{
                padding:40px 102px 0 84px;
                margin-bottom:32px;
                // text-align: center;
                .el-form-item:nth-child(1){
                margin-bottom:24px;
                .el-form-item__label{
                    width:90px;
                    height:40px;
                    line-height: 40px;
                    font-size:18px;
                    font-family:MicrosoftYaHei;
                    color:rgba(144,147,153,1);
                    // line-height:24px;
                }
                .el-input--medium .el-input__inner{
                    width:316px;
                    height:40px;
                    border-radius:4px;
                    border:1px solid rgba(192,196,204,1);
                }
                }
                .el-form-item:nth-child(2){
                margin:0;
                .el-form-item__label{
                    width:90px;
                    height:40px;
                    line-height: 40px;
                    font-size:18px;
                    font-family:MicrosoftYaHei;
                    color:rgba(144,147,153,1);
                    float:left;
                }
                .el-input--medium{
                    width:316px;
                    height:150px;
                }
                .el-textarea__inner{
                    width:316px;
                    height:150px;
                    border-radius:3px;
                    border:1px solid rgba(192,196,204,1);
                    padding:9px 16px 0;
                }
                }
            }
            .el-dialog__footer{
                padding:0;
                text-align: center;
                .el-button--medium:nth-child(1){
                width:98px;
                height:50px;
                border-radius:4px;
                border:1px solid rgba(144,147,153,1);
                margin-right:40px;
                }
                .el-button--medium:nth-child(2){
                width:98px;
                height:50px;
                background:rgba(255,168,0,1);
                border-radius:4px;
                }
            }
            }
        }
        //DeleteDialog删除Dialog
        .DeleteDialog{
            .el-dialog{
            width:480px;
            height:240px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            }
            .el-dialog--center{
            width:480px !important;
            height:240px !important;
            background:rgba(255,255,255,1);
            border-radius:8px;
            }
            .el-dialog__header{
            padding:60px 0 45px 0;
            .el-dialog__title{
                font-size:24px;
                font-weight:500;
                color:rgba(124,143,166,1);
            }
            .el-dialog__headerbtn .el-dialog__close{
                font-size:24px;
                color:rgba(144,147,153,1);
                font-weight:600;
                }
            }
            .el-dialog__body{
            padding:0;
            }
            .el-dialog__footer{
            padding-top:0;
            .el-button--medium:nth-child(1){
                width:98px;
                height:50px;
                border-radius:4px;
                border:1px solid rgba(144,147,153,1);
            }
            .el-button--medium:nth-child(2){
                width:98px;
                height:50px;
                background:rgba(255,168,0,1);
                border-radius:4px;
                margin-left:40px;
            }
            }
        }

    }
    .controlboardIndex-latestRepot{
         //el-table
        .el-table th{
            height:60px;
        }
        .el-table td{
            height:60px;
            font-size:12px;
        }
        .el-table .cell{
            padding:0;
        }
        .el-table th div, .el-table th>.cell{
            padding:0;
            color:rgba(80,104,140,1);
            font-size:14px;
        }
        .el-table th:nth-child(1)>.cell{
            padding-left:40px;
        }
        .el-table td:nth-child(1) div{
            padding-left:40px;
        }
        .el-table td:nth-child(2) div{
            font-size:12px;
            color:rgba(21,139,228,1);
        }
        .el-table td:nth-child(3) div{
            font-size:12px;
            width:80px;
            white-space:nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
            cursor:pointer;
        }
        .el-table td:nth-child(6) div .el-button--text:nth-child(1){
            text-align:left;
            font-size:12px;
            color:rgba(80,104,140,1);
        }
        .el-button--text{
            color:rgba(255,168,0,1);
            // font-size:14px;
        }

        .el-table th:nth-child(5)>.cell .el-button--text:nth-child(1){     //产品名称第一个button
            width:108px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:rgba(80,104,140,1);
            float:left;
        }
        .el-table td:nth-child(5) div .el-button--text:nth-child(1){
            width:108px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:rgba(80,104,140,1);
            float:left;
        }
        .el-table th:nth-child(5)>.cell .el-button--text:nth-child(2){     //产品名称第二个button
            width:24px;
            color:rgba(80,104,140,1);
            float:right;
            margin:0 60px 0 0;
        }
        .el-table td:nth-child(5) div .el-button--text:nth-child(2){
            width:24px;
            color:rgba(80,104,140,1);
            float:right;
            margin:0 60px 0 0;
        }
        .el-table th:nth-child(6)>.cell .el-button--text:nth-child(1){     //产品名称第一个button
            width:96px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:rgba(80,104,140,1);
            float:left;
        }
        .el-table td:nth-child(6) div .el-button--text:nth-child(1){
            width:96px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:rgba(80,104,140,1);
            float:left;
        }
        .el-table th:nth-child(6)>.cell .el-button--text:nth-child(2){     //产品名称第二个button
            width:24px;
            color:rgba(80,104,140,1);
            float:right;
            margin:0 60px 0 0;
        }
        .el-table td:nth-child(6) div .el-button--text:nth-child(2){
            width:24px;
            color:rgba(80,104,140,1);
            float:right;
            margin:0 60px 0 0;
        }

        //Dialog Table
        .el-dialog{
            width:387px;
            height:294px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 4px 0px rgba(118,140,170,1);
            border-radius:4px;
            .el-dialog__header{
                width:387px;
                height:41px;
                background:rgba(230,234,238,1);
                border-radius:3px 3px 0px 3px;
                text-align:center;
                line-height:41px;
                padding:0;
                position:relative;
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
                .el-table th{
                    height:31px;
                    padding:0;
                }
                .el-table td{
                    height:36px;
                }
                .el-table th:nth-child(1) > .cell{
                    padding:0;
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
}

</style>

