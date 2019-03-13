<template>
  <div v-loading="loading" class="controlboard">
    <el-row>
      <el-col :span="24">
        <!-- 产品信息 -->
        <div class="product-information">
          <!-- {{editableTabs2}} -->
          <p>Product Info</p>
          <div>
            <el-button
              size="small"
              class="addNewProduct"
              @click="addTab(editableTabsValue2)">
              Add more
            </el-button>
            <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
              <el-tab-pane
                v-for="(item, index) in editableTabs2"
                :key="index"
                :label="'Item' + (index + 1)"
                :name="'tab' + (index + 1)">
                <div class="content">
                  <el-form ref="item" :model="item" :rules="productrules" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="Product" prop="name">
                      <el-input v-model="item.name" maxlength="30" placeholder="Please enter product name" style="width:500px;"/>
                      <div v-if="index>0" class="delete" @click="removeTabIcon(index)">
                        <i class="iconfont icon-shanchu_"/>
                        <p>删除</p>
                      </div>
                      <div class="copy" @click="copy(item,index)">
                        <i class="iconfont icon-fuzhi_"/>
                        <p>copy</p>
                      </div>
                    </el-form-item>
                    <el-form-item label="Item No.">
                      <el-input v-model="item.number" maxlength="20" placeholder="Import product number" style="width:500px;"/>
                    </el-form-item>
                    <!-- <el-form-item v-for="(val,i) in item.PO" :key="i" label="P.O号" :rules="productrules.PONumber" :prop="`PO.${i}.number`"> -->
                    <el-form-item v-for="(val,i) in item.PO" :key="i" label="PO No.">
                      <el-input v-model="val.number" maxlength="20" placeholder="Please enter PO number" style="width:200px;"/>
                      <el-input v-model="val.quantity" maxlength="10" placeholder="Please enter quantity" class="input-with-select" style="width:320px;">
                        <el-select slot="append" v-model="val.unit" style="width:140px" placeholder="Please input">
                          <el-option
                            v-for="item in val.unitValue"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"/>
                        </el-select>
                      </el-input>
                      <el-button type="success" icon="el-icon-plus" @click="addPO(val,index)">Add more</el-button>
                      <el-button v-if="i>0" type="danger" icon="el-icon-minus" @click="removePO(val,index,i)"> P.O 号</el-button>
                      <el-tooltip v-if="i == 0" class="item" effect="dark" placement="right" style="cursor:pointer;">
                        <div slot="content"><span>P.O号为采购订单号码，如果一个产品货号有多个P.O号,<br>请按每个P.O号分别列出对应P.O号的产品数量,您可以点<br>击“+”,增加一个P.O号以及数量<br>注意! 单个产品下的P.O号不能重复,否则影响下单</span></div>
                        <i class="el-icon-question icon-answer"/>
                      </el-tooltip>
                    </el-form-item>
                  </el-form>
                </div>
                <!-- {{item.content}} -->
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 供应商信息 -->
        <div class="supplier-information">
          <p>Supplier Info</p>
          <el-form ref="supplyform" :inline="true" :model="supplyform" :rules="supplyrules" status-icon label-width="130px" class="demo-ruleForm">
            <el-form-item label="Supplier name" prop="supplier_name" maxlength="20">
              <el-select
                v-model="supplyform.supplier_name"
                class="supplier_name"
                filterable
                allow-create
                default-first-option
                placeholder="Please enter company name"
                style="width:460px;cursor:text;"
                @change="getOtherMessage()">
                <el-option
                  v-for="item in supplyNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"/>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item label="First name" prop="last_name">
              <el-input v-model="supplyform.last_name" placeholder="Please input" style="width:163px;" maxlength="20"/>
            </el-form-item>
            <el-form-item label="Last name" prop="first_name" label-width="80px">
              <el-input v-model="supplyform.first_name" placeholder="Please input" style="width:163px;" maxlength="20"/>
            </el-form-item>
            <br>
            <el-form-item label="Mobile" prop="telephone">
              <el-input v-model="supplyform.telephone" placeholder="Enter phone number" class="input-with-select" style="width:460px;">
                <el-select slot="prepend" v-model="supplyform.telephone_code" placeholder="Please input" style="width:150px;">
                  <el-option
                    v-for="item in phone_codeConfig"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-input>
            </el-form-item>
            <br>
            <el-form-item label="Email" prop="email">
              <el-input v-model="supplyform.email" placeholder="Please enter your email" style="width:460px;" />
            </el-form-item>
            <br>
            <el-form-item label="Inspection address">
              <tc-target ref="target" :target="supplier"/>
              <!-- <el-cascader
                expand-trigger="hover"
                :options="optionsProvinces"
                :props="{label:'chinese_name',value:'id',children:'children_simple'}"
                v-model="supplyform.address"
                @change="handleChange"
                style="width:460px;"
                >
              </el-cascader> -->
            </el-form-item>
            <br>
            <el-form-item label="Detailed address" prop="addresses">
              <el-input v-model="supplyform.address_detail" type="textarea" placeholder="Please enter detailed factory address" style="width:460px;"/>
            </el-form-item>
          </el-form>
        </div>
        <!-- 验货基本信息 -->
        <div class="inspection-information">
          <p>Inspection Basic Info</p>
          <el-form ref="examineform" :model="examineform" :rules="examinerules" label-width="180px" class="demo-ruleForm">
            <el-form-item label="Report language" prop="report_locale">
              <!-- <el-input style="width:565px;" placeholder="请输入供应商名称"></el-input> -->
              <el-radio-group v-model="examineform.report_locale">
                <el-radio label="en">English</el-radio>
                <el-radio label="zh_CN">Chinese</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Total report" prop="reports_number">
              <el-input-number v-model="examineform.reports_number" :min="1" />
              <el-tooltip class="item" effect="dark" placement="right">
                <!-- <el-button>右边</el-button> -->
                <div slot="content"><span style="margin-bottom:10px;">1份报告以上（不含1份</span><br><span>可根据指定款号、P.O号出多份不同报告</span></div>
                <i class="el-icon-question icon-answer"/>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="Inspection type" prop="inspection_type">
              <el-radio-group v-model="examineform.inspection_type">
                <el-radio label="3">Pre-Production Inspection<el-tooltip class="item" effect="dark" placement="right">
                  <div slot="content" style="width:400px;"><span style="margin-bottom:10px;">尾期验货</span><br><span>尾期验货在产品100%生产完成 (所有的生产过程都完成,包括生产，组装，独立包装和工厂质量检查), 至少80%装进纸箱, 其余产品正在包装时进行。所有不同工厂的配件都需要集中到验货地点。其目的是通过出货前检验来判断货物是否符合出运要求，适合所有产品。</span></div>
                  <i class="el-icon-question icon-answer"/>
                </el-tooltip></el-radio>
                <el-radio label="2">During-Production Inspection
                  <el-tooltip class="item" effect="dark" placement="right">
                    <div slot="content" style="width:400px;"><span style="margin-bottom:10px;">中期验货</span><br><span>中期验货在30%-50%产品已经完成，其余产品在生成过程中时进行。其目的是通过中期验货了解在初期验货中发现的问题的改进情况，生产每批次的质量差异及生产流程的改进，适用于需制程管控的产品和在初期验货中发现问题较多的产品。</span></div>
                    <i class="el-icon-question icon-answer"/>
                  </el-tooltip>
                </el-radio>
                <el-radio label="1">Pre-Shipment Inspection
                  <el-tooltip class="item" effect="dark" placement="right">
                    <div slot="content" style="width:400px;"><span style="margin-bottom:10px;">初期验货</span><br><span>初期验货在10%产品已经完成，最少要求完成50个产品时进行，其目的是通过初期验货了解产品设计，性能及工厂的生产工序上是否存在问题，适用于新产品或高风险产品。</span></div>
                    <i class="el-icon-question icon-answer"/>
                  </el-tooltip>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Reference samples" prop="sample_type">
              <el-radio-group v-model="examineform.sample_type">
                <el-radio label="0">No sample is available for this inspection</el-radio>
                <el-radio label="1">Your sample/s is/are already with the supplier or will be sent<el-tooltip class="item" effect="dark" placement="right">
                  <div slot="content" style="width:200px;"><span style="margin-bottom:10px;">送往或已在供应商</span><br><span>参考样品寄送给供应商或已提供给供应商以备验货时参照</span></div>
                  <i class="el-icon-question icon-answer"/>
                </el-tooltip></el-radio>
                <el-radio label="2">Your sample/s is/are in Testcoo or will be sent<el-tooltip class="item" effect="dark" placement="right">
                  <div slot="content" style="width:200px;"><span style="margin-bottom:10px;">送往测库</span><br><span>测库验货员将带到工厂作为验货参照</span></div>
                  <i class="el-icon-question icon-answer"/>
                </el-tooltip></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="examineform.sample_type==2" label="" label-width="210px">
              <el-form style="width:800px;padding:16px 20px;background-color:#ffffff;" label-width="140px">
                <el-form-item label="Testcoo recipients:">
                  <span>zhang gui zhou</span>
                </el-form-item>
                <el-form-item label="Mobile:" >
                  <span>+86-17826810000</span>
                </el-form-item>
                <el-form-item label="Address:">
                  <span>No. 365, Binjiang District Road, Binjiang District, Hangzhou, Zhejiang</span>
                </el-form-item>
              </el-form>

            </el-form-item>
            <el-form-item label="Email(report accepting)" prop="accept_report_emails">
              <el-select v-model="examineform.accept_report_emails" multiple placeholder="Please input">
                <el-option
                  v-for="item in emailList"
                  :key="item.id"
                  :label="item.email"
                  :value="item.email"/>
              </el-select>
              <el-button type="success" icon="el-icon-plus" @click="addReportEmail">Add email</el-button>
            </el-form-item>
            <el-form-item label="Estimated inspection date" prop="estimated_dates">
              <el-date-picker
                v-model="examineform.estimated_dates"
                style="width:335px;"
                type="dates"
                value-format="yyyy-MM-dd"
                placeholder="Select an estimated inspection date"/>
            </el-form-item>
          </el-form>
        </div>
        <!-- 其他要求 -->
        <div class="other-requirement" >
          <p>Additional requirements</p>
          <el-form label-width="140px">
            <el-form-item label="Content" prop="name">
              <el-input v-model="requirementText" type="textarea" style="width:565px;" placeholder="Please write down your additional requirements or special points for related inspection" maxlength="200"/>
              <span v-if="requirementText" class="countLimmit">{{ requirementText.length }}/200</span>
            </el-form-item>
            <el-form-item label="File attachment" prop="name">
              <upLoad :files="data.files"/>
            </el-form-item>
          </el-form>
        </div>
        <!-- 上传格式要求 -->
        <div class="uploadLimit"><p>Formats allowed: PDF, PPT Word, Excel, Jpg, Jpeg. Max size per file must less than 30M</p></div>
        <!-- 下单 -->
        <div v-if="!this.$route.query.orderSet" class="orderPlace">
          <!-- <span class="place" @click="checkInspection">《验货协议》</span> -->
          <p><el-checkbox v-model="proptocolAgree">I have read and agreed Testcoo agreement</el-checkbox></p>
          <el-button :disabled="!proptocolAgree" type="primary" @click="placeOrder()">Submit</el-button>
        </div>
        <!-- 保存修改订单 -->
        <div v-if="this.$route.query.orderSet" class="confirmOrder">
          <el-button type="primary" @click="keepData">save</el-button>
          <el-button class="goBack" @click="goBack">return</el-button>
        </div>
        <!-- 新增报告接收电子邮箱 -->
        <el-dialog
          :visible.sync="emailDialogVisible"
          title="New email address for report receiving"
          width="500px"
          class="email-dialog"
          top="20vh"
          center>
          <el-form ref="emailform" :model="emailform" :rules="emailrules" >

            <el-form-item prop="first_name">
              <el-input v-model="emailform.first_name" placeholder="First name"/>
            </el-form-item>
            <el-form-item prop="last_name" >
              <el-input v-model="emailform.last_name" placeholder="Last Name"/>
            </el-form-item>
            <el-form-item style="" prop="email">
              <el-input v-model="emailform.email" placeholder="E-mail address"/>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button class="cancle" @click.native="emailDefault">Cancle</el-button>
            <el-button class="submit" @click.native="emailsubmit()">Save</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addEmail, getdata, getSupplydata, addSupply } from '@/api/accountManagement'
import { order, getOtherMessage, orderId, orderRevise, productDelete } from '@/api/order'
import { fetchList, fetchCounty } from '@/api/fetch'
import InspectionTarget from '@/components/InspectionTarget'
import upLoad from '@/components/Upload'
import { mapGetters } from 'vuex'
import store from '../../store/'
export default {
  name: 'Index',
  components: {
    upLoad,
    'tc-target': InspectionTarget
  },
  data() {
    // PO号唯一
    const validateUniquePONumber = (rule, value, callback) => {
      const productIndex = rule.field.split('.')[1]
      console.log(rule)
      console.log(value)
      const items = _.get(this.editableTabs2, `[0]PO.${productIndex}.number`)
      console.log(items)
      if (this._.filter(items, item => {
        console.log(item.number)
        return item.number == value
      }).length === 1) {
        callback()
      } else {
        callback(new Error())
      }
    }

    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电子邮箱不能为空'))
      }
      setTimeout(() => {
        var regEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        if (!regEmail.test(value)) {
          callback(new Error('电子邮箱格式不正确'))
        } else {
          callback()
        }
      }, 100)
    }
    return {
      loading: false,

      // phone_codeConfig
      phone_codeConfig: '',
      editableTabsValue2: 'tab1',
      labelwidth: '100px',
      checked: '',
      data: {
        id: null,
        target: {},
        inspection_target: {},
        reports: [],
        files: []
      },
      emailList: [],
      supplyNameList: [],
      value10: [],
      supplier: {
      },
      editableTabs2: [
        {
          number: '',
          name: '',
          title: '',
          PO: [
            {
              number: '',
              quantity: '',
              unit: '',
              unitValue: []
            }
          ]
        }
      ],
      productrules: {
        name: [{
          required: true, message: 'Please enter product name', trigger: 'blur'
        }],
        PONumber: [{ validator: validateUniquePONumber, message: 'PO号不能重复', trigger: 'blur' }]
      },
      supplyrules: {
        supplier_name: [{
          required: true, message: '请输入供应商名称', trigger: 'blur'
        }],
        first_name: [{
          required: true, message: '请输入联系人名', trigger: 'blur'
        }],
        last_name: [{
          required: true, message: '请输入联系人姓', trigger: 'blur'
        }],
        telephone: [{
          required: true, message: '请输入联系人手机号', trigger: 'blur'
        }],
        // phone_code: [{
        //    required: true, message: '请选择手机号码区号', trigger: 'blur'
        // }],
        email: [{ validator: checkEmail, trigger: 'blur', required: true }]
      },
      optionsProvinces: [],
      examinerules: {
        report_locale: [{
          required: true, message: '请输入报告语言', trigger: 'blur'
        }],
        reports_number: [{
          required: true, message: '请输入报告份数', trigger: 'blur'
        }],
        inspection_type: [{
          required: true, message: '请输入验货类型', trigger: 'blur'
        }],
        sample_type: [{
          required: true, message: '请选择样品类型', trigger: 'blur'
        }]
      },
      emailrules: {
        email: [{
          required: true, message: 'Please enter email address', trigger: 'blur'
        }],
        first_name: [{
          required: true, message: 'Please enter first name', trigger: 'blur'
        }],
        last_name: [{
          required: true, message: 'Please enter last name', trigger: 'blur'
        }]
      },
      supplyform: {
        supplier_name: '',
        first_name: '',
        last_name: '',
        telephone: '',
        email: '',
        telephone_code: '',
        address: [],
        address_detail: ''
      },
      examineform: {
        report_locale: 'en',
        reports_number: '',
        inspection_type: '3',
        sample_type: '0',
        accept_report_emails: '',
        estimated_dates: []
      },
      tabIndex: 1,
      gender: '',
      radio2: '',
      emailDialogVisible: false,
      value14: '',
      ruleForm: {

      },

      emailform: {
        email: '',
        first_name: '',
        last_name: ''
      },

      // uploadForm
      uploadForm: [],

      // 上传实例fileList
      fileList: [],

      // proptocolAgree下单
      proptocolAgree: false,

      // requirementText要求内容
      requirementText: '',

      // is_exist是否存在
      is_exist: false

    }
  },
  computed: {
    // cachedViews() {
    //   return this.$store.state.tagsView.cachedViews
    // },
    // key() {
    //   return this.$route.fullPath
    // }
  },
  watch: {
    data: {
      // handler: function(newData, oldData) {
      //   this.$store.commit('setOrderData', newData)
      // },
      // deep: true
    }
  },
  created() {
    this.getEmailList()
    this.getOrderIdData('/' + this.$route.query.orderId)
    this.getSupplyNameList()
    this.ConfigUnit()
    this.getFetchProvinces(7) // 获取中国省市区
  },
  mounted() {
    // console.log(this.$route.fullPath)
  },
  computed: {
    ...mapGetters([
      'configs'
    ])
  },
  methods: {
    copy(item, index) {
      const newTabName = 'tab' + ++this.tabIndex + ''
      console.log(item)
      this.editableTabs2.push(_.cloneDeep(item))
      this.editableTabsValue2 = newTabName
    },
    addTab(targetName) {
      const newTabName = 'tab' + ++this.tabIndex + ''
      console.log(newTabName)
      this.editableTabs2.push(
        {
          number: '',
          name: '',
          title: '产品' + this.tabIndex,
          PO: [
            {
              number: '',
              quantity: '',
              unit: '',
              unitValue: this.configs.unit
            }
          ]
        },
      )
      this.$nextTick(() => {
        this.editableTabsValue2 = 'tab' + (this.editableTabs2.length)
      })
    },
    // removeTab通过tabs的删除tabs产品
    removeTab(index) {
      console.log(index)
      if (this.$route.query.orderId) {
        this.tabIndex = this.editableTabs2.length
        productDelete(this.editableTabs2[index.replace('tab', '') - 1]).then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: '删除产品成功了',
              type: 'success'
            })
          }
        })
      }
      this.editableTabs2.splice((index.replace('tab', '') - 1), 1)
      console.log(this.editableTabs2)
      this.editableTabsValue2 = 'tab' + --this.tabIndex
    },
    // removeTabIcon通过Iconfont删除tabs产品
    removeTabIcon(index) {
      console.log(index)
      if (this.$route.query.orderId) {
        this.tabIndex = this.editableTabs2.length
        productDelete(this.editableTabs2[index]).then(response => {
          if (response.data.code == 0) {
            this.$message('删除产品成功了')
          }
        })
      }
      this.editableTabs2.splice(index, 1)
      console.log(this.editableTabs2)
      this.editableTabsValue2 = 'tab' + --this.tabIndex
    },

    //
    // handleTabsEdit(targetName) {
    //       let tabs = this.editableTabs;
    //       let activeName = this.editableTabsValue;
    //       if (activeName === targetName) {
    //         tabs.forEach((tab, index) => {
    //           if (tab.name === targetName) {
    //             let nextTab = tabs[index + 1] || tabs[index - 1];
    //             if (nextTab) {
    //               activeName = nextTab.name;
    //             }
    //           }
    //         });
    //       }
    //       this.editableTabsValue = activeName;
    //       this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    //   },
    //
    addPO(val, index) {
      this.editableTabs2[index].PO.push({
        number: '',
        quantity: '',
        unit: '',
        unitValue: this.configs.unit
      })
    },
    removePO(val, index, i) {
      this.editableTabs2[index].PO.splice(i, 1)
    },
    emailsubmit() {
      this.$refs['emailform'].validate((valid) => {
        if (valid) {
          addEmail({
            ...this.emailform
          }).then(response => {
            if (response.data.code == 0) {
              this.emailDialogVisible = false
              this.$message({
                message: '报告接收邮箱添加成功',
                type: 'success'
              })
              this.getEmailList()
              this.emailform = {
                email: '',
                first_name: '',
                last_name: ''
              }
            }
          })
        }
      })
    },
    emailDefault() {
      this.emailDialogVisible = false
      this.emailform = {
        email: '',
        first_name: '',
        last_name: ''
      }
    },
    // 获取电子邮箱列表
    getEmailList() {
      getdata().then(response => {
        if (response.data.code == 0) {
          this.emailList = response.data.data.list
          console.log(this.emailList)
        }
      })
    },
    // 获取供应商name列表
    getSupplyNameList() {
      const _this = this
      getSupplydata().then(response => {
        if (response.data.code == 0) {
          // this.supplyNameList = response.data.data.list
          // console.log(response.data.data.list)
          _.forEach(response.data.data.list, function(item, index) {
            console.log(index)
            var NameList = {
              label: item.supplier_name,
              value: index + 1
            }
            _this.supplyNameList.push(NameList)
            console.log(_this.supplyNameList)
          })
        }
      })
    },

    // addReportEmail
    addReportEmail() {
      this.emailDialogVisible = true
      this.$nextTick(() => {
        this.$refs.emailform.clearValidate()
      })
    },

    // getFetchCounty获取省市区
    getFetchProvinces(val) {
      fetchCounty({ pid: val }).then(response => {
        this.$nextTick(function() {
          // this.locationOptions = response.data.data
          console.log(response.data.data)
          this.optionsProvinces = response.data.data
        })
      })
    },

    // handleChange
    handleChange(value) {
      // console.log(value)
    },

    // 根据供应商名称获取其他信息
    getOtherMessage() {
      // console.log(this.supplyform.supplier_name)
      getOtherMessage({
        'url': '/v1/supplier/name/' + this.supplyform.supplier_name
      }).then(response => {
        if (response.data.code == 0) {
          this.is_exist = true
          console.log('获取到了name')
          const supplierInfo = response.data.data
          this.supplyform.supplier_name = supplierInfo.supplier_name
          this.supplyform.first_name = supplierInfo.first_name
          this.supplyform.last_name = supplierInfo.last_name
          this.supplyform.telephone = supplierInfo.telephone
          this.supplyform.email = supplierInfo.email
          this.supplyform.telephone_code = supplierInfo.telephone_code
          console.log(this.supplyform)
        } else {
          this.supplyform = {
            name: '',
            supplier_name: this.supplyform.supplier_name,
            first_name: '',
            last_name: '',
            phone_number: '',
            email: ''
          }
        }
      })
    },
    // 数组去重
    toSetUniq(arr) {
      for (var i = 0; i < arr.length; i++) {
        // 如果当前数组的第i项已经保存进了临时数组，忽略掉
        // 否则的话把当前项push到临时数组里面
        if (result.indexOf(arr[i]) == -1) {
          this.$message('产品信息的P.O号不能 重复')
        }
        // indexOf 返回元素在result中的位置，如果没有返回-1；
      }
    },
    // 下单
    placeOrder() {
      // 判断所有的产品名称是否填写
      for (let i = 0; i < this.editableTabs2.length; i++) {
        if (this.editableTabs2[i].name == '') {
          console.log('产品名称没有填写的是' + i)
          this.editableTabsValue2 = 'tab' + (i + 1)
          this.$message({
            message: '产品信息中的产品名称是必填的',
            type: 'warning'
          })
          return false
        }
      }
      console.log(this.supplyform.telephone_code + '手机区号')
      // 判断是否选择手机区号
      if (!this.supplyform.telephone_code) {
        this.$message({
          message: '请选择供应商信息中手机号码前的区号',
          type: 'warning'
        })
        return false
      }

      var _this = this
      var p1 = new Promise(function(resolve, reject) {
        _this.$refs['supplyform'].validate((valid) => {
          if (valid) {
            if (_this.is_exist == false) {
              addSupply({
                ..._this.supplyform
              }).then(response => {
                if (response.data.code == 0) {
                  console.log('供应商信息保存成功')
                }
              })
            }
            resolve()
          } else {
            _this.$message('供应商信息是必填的')
          }
        })
      })

      var p2 = new Promise(function(resolve, reject) {
        _this.$refs['examineform'].validate((valid) => {
          if (valid) {
            resolve()
          } else {
            _this.$message('验货基本信息是必填的')
          }
        })
      })

      // var p3=new Promise(function(resolve, reject){
      //     _this.$refs['editableTabs2'].validate((valid) => {
      //       if (valid) {
      //         resolve();
      //       }
      //     })
      // });
      Promise.all([p2, p1]).then(function() {
        _this.loading = true
        console.log(_this.editableTabs2)
        // _.forEach(_this.editableTabs2, function(value){
        //   console.log(value.number)
        // })
        order({
          ..._this.examineform,
          products: _this.editableTabs2,
          supplier: {
            name: _this.supplyform.supplier_name,
            first_name: _this.supplyform.first_name,
            last_name: _this.supplyform.last_name,
            email: _this.supplyform.email,
            phone_number: _this.supplyform.telephone,
            phone_code: _this.supplyform.telephone_code,
            country: 7,
            address: _this.supplyform.address,
            address_detail: _this.supplyform.address_detail
          },
          description: _this.requirementText,
          files: _this.data.files
        }).then(response => {
          if (response.data.code == 0) {
            _this.loading = false
            _this.$router.push({ path: 'checkoutSuccess', query: { created_at: response.data.data.created_at, orderId: response.data.data.id }})
          } else if (response.data.code == 1000) {
            _this.loading = false
            _this.$message({
              message: '您没有操作的权限,下单失败了',
              type: 'error'
            })
          }
        }).catch(error => {
          this.$message({
            message: '下单失败',
            type: 'error'
          })
          _this.loading = false
          _this.$router.push({ path: 'index' })
        })
      })
    },

    // amputate删除
    // amputate(item,index){
    //   this.editableTabs2.splice( index, 1 )
    // },
    // 删除
    // removeTabNew(targetName) {
    //   console.log("jinru")
    //     let tabs = this.editableTabs2;
    //     let activeName = this.editableTabsValue2;
    //     if (activeName === targetName) {
    //       tabs.forEach((tab, index) => {
    //         if (tab.name === targetName) {
    //           let nextTab = tabs[index + 1] || tabs[index - 1];
    //           if (nextTab) {
    //             activeName = nextTab.name;
    //           }
    //         }
    //       });
    //     }
    //     this.editableTabsValue2 = activeName;
    //     this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
    //   },

    // 判断this.$route.query.orderId是否存在
    getOrderIdData(idValue) {
      if (this.$route.query.orderId) {
        orderId(idValue).then(response => {
          console.log('进入请求ID')
          console.log(response)
          if (response.data.code == 0) {
            const supplier = response.data.data.supplier
            const reports = response.data.data
            console.log('通过ID拿到了之前所有的数据')
            this.supplyform = response.data.data.supplier
            this.supplyform.supplier_name = supplier.name
            this.supplyform.first_name = supplier.first_name
            this.supplyform.last_name = supplier.last_name
            this.supplyform.telephone = supplier.phone_number
            this.supplyform.telephone_code = supplier.phone_code
            this.supplyform.email = supplier.email
            this.supplyform.address = supplier.address
            this.supplyform.address_detail = supplier.address_detail
            this.editableTabs2 = response.data.data.products.reverse() // 产品倒序
            console.log('this.editableTabs2')
            console.log(this.editableTabs2)
            console.log('this.editableTabs2')
            //  vue.delete(this.editableTabs2,'id')
            if (this.$route.query.orderSet) {
              console.log('修改，不删除id')
            } else {
              _.forEach(this.editableTabs2, function(value) {
                value.id = ''
              })
            }
            this.examineform.report_locale = reports.report_locale
            this.examineform.reports_number = reports.reports_number
            this.examineform.inspection_type = reports.inspection.inspection_type
            this.examineform.sample_type = reports.inspection.sample_type
            this.examineform.accept_report_emails = reports.accept_report_emails
            this.examineform.estimated_dates = reports.estimated_dates
            console.log(this.examineform.report_locale)
            this.requirementText = reports.description
            this.data.files = reports.files
            _.forEach(this.data.files, function(value) {
              //  value.detach = true
            })
            console.log(this.data.files)
          }
        })
      } else {
        console.log('这次请求没有接受到ID')
      }
    },

    // uploadUrlUpload上传路径
    // UploadUrl(){
    //   return process.env.BASE_API + 'v1/upload'
    // },

    // handleAvatarSuccess上传成功要处理的
    // handleSuccess(response, file, fileList){
    //   console.log(fileList)

    // },

    // uploadError上传失败了
    // uploadError(response, file, fileList){
    //   console.log("失败了++++++")
    // },

    // beforeAvatarUpload上传前文件验证
    // beforeAvatarUpload(file){
    //   const extension = file.name.split('.')[1] === 'xls'
    //   const extension2 = file.name.split('.')[1] === 'xlsx'
    //   const extension3 = file.name.split('.')[1] === 'doc'
    //   const extension4 = file.name.split('.')[1] === 'docx'
    //   const extension5 = file.name.split('.')[1] === 'ppt'
    //   const extension6 = file.name.split('.')[1] === 'pptx'
    //   const extension7 = file.name.split('.')[1] === 'jpg'
    //   const extension8 = file.name.split('.')[1] === 'jpeg'
    //   const extension9 = file.name.split('.')[1] === 'pdf'
    //   const isLt2M = file.size / 1024 / 1024 < 30
    //   if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6 && !extension7 && !extension8 && !extension9) {
    //     this.$message('上传附件只能是 xls、xlsx、doc、docx 、ppt、pptx、jpg、jpeg、pdf格式!')
    //   }
    //   if (!isLt2M) {
    //    this.$message('上传单个附件大小不能超过 30MB!')
    //   }
    //   return extension || extension2 || extension3 || extension4 || extension5 || extension6 || extension7 || extension8 || extension9 && isLt2M
    // },

    // keepData修改保存数据
    keepData() {
      console.log('修改保存数据')
      console.log(this.editableTabs2)
      var _this = this
      var p1 = new Promise(function(resolve, reject) {
        _this.$refs['supplyform'].validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })

      var p2 = new Promise(function(resolve, reject) {
        _this.$refs['examineform'].validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
      Promise.all([p2, p1]).then(function() {
        orderRevise({
          ..._this.examineform,
          products: _this.editableTabs2,
          supplier: {
            name: _this.supplyform.supplier_name,
            first_name: _this.supplyform.first_name,
            last_name: _this.supplyform.last_name,
            email: _this.supplyform.email,
            phone_number: _this.supplyform.telephone,
            phone_code: _this.supplyform.telephone_code,
            country: 7,
            address: _this.supplyform.address,
            address_detail: _this.supplyform.address_detail
          },
          description: _this.requirementText,
          files: _this.data.files,
          orderId: _this.$route.query.orderId
        }).then(response => {
          if (response.data.code == 0) {
            console.log('返回数据')
            _this.$router.push({ path: '/orderManagement/examineGood' })
          }
        })
      })
    },

    // checkInspection
    checkInspection() {
      this.$router.push({ path: 'inspectionAgreement' })
    },

    // goBack返回上一级路由
    goBack() {
      this.$router.go(-1)
    },

    // 配置文件加载
    ConfigUnit() {
      this.editableTabs2[0].PO[0].unitValue = this.configs.unit
      console.log(this.configs)
      this.phone_codeConfig = this.configs.phone_number_codes
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.controlboard{
  .el-radio + .el-radio {
    margin-left: 40px;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #ffa500;
    background: #ffa500;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #ffa500;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #c0c4cc;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #ffa800;
    border-color: #ffa800;
  }
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
    // background-color: #ffffff;
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
  .el-tabs__header {
    margin: 0;
    // width: 83%;
  }
  .el-form-item__label{
      font-weight: normal;
      color: #7C8FA6;
      text-align: left;
  }
  .el-input--medium {
      vertical-align: middle;
  }
  .el-tabs--card>.el-tabs__header {
      border-bottom: none;
      width: 76%;
  }
  .el-dialog__header {
      padding: 50px 20px 10px;
  }
  .el-dialog__title {
      color: #7F8FA4;
  }
  .el-form-item__label{
    color: #909399;
    font-weight: normal;
  }
  .el-tooltip__popper {
      line-height: 1.5;
  }
  .popper__arrow {
      border-right-color: rgba(144,147,153,0.90) !important;
  }
  .el-button--medium{
    vertical-align: middle;
  }
  .el-select {
    vertical-align: middle;
  }

  //supplier-information
  .supplier-information{
    // .supplier_name{
    //   cursor:text !important;
    // }
    .el-cascader .el-input, .el-cascader .el-input__inner{
      // width:428px;
    }
    .el-form-item__label{
      // padding:0 50px 0 0;
      padding:0;
      margin-right:30px;
    }
    .el-form-item:nth-child(4){
      .el-form-item__label{
        margin-right:39px;
      }
    }
  }

  //orderPlace
  .orderPlace{
    .el-checkbox{
    .el-checkbox__label{
      color:rgba(102,102,102,1);
    }
    }
    .place{
      color:rgba(255,168,0,1);
      text-decoration: underline;
      cursor: pointer;
    }
    .el-button--primary{
      width:200px;
      height:40px;
      background:rgba(255,168,0,1);
      border-radius:4px;
      border:none;
    }
  }

  //confirmOrder
  .confirmOrder{
    padding-left:170px;
    .goBack {
      width:200px;
      height:40px;
      border-radius:4px;
      border:1px solid rgba(151,151,151,1);
    }
    .goBack:hover{
      color:rgba(255,168,0,1);
    }
    .el-button--primary{
      width:200px;
      height:40px;
      background:rgba(255,168,0,1);
      border-radius:4px;
      border:none;
    }
  }

  //other-requirement
  .other-requirement{
    .el-form-item:nth-child(1){
      .el-form-item__label{
        font-size:14px;
        color:rgba(124,143,166,1);
        margin-right:30px;
        padding:0;
      }
      .el-form-item__content{
        position:relative;
        .el-textarea__inner{
          width:700px;
          height:200px;
          border-radius:3px;
          border:1px solid rgba(192,196,204,1);
          padding:10px 16px;
          background:rgba(243,246,249,1);
        }
        .countLimmit{
          position:absolute;
          bottom:10px;
          left:660px;
          font-size:16px;
          color:rgba(144,147,153,1);
          display:inline-block;
          width:70px;
          height:21px;
          line-height: 21px;
          text-align: right;
        }
      }
    }
    .el-form-item:nth-child(2){
      .el-form-item__label{
        font-size:14px;
        color:rgba(124,143,166,1);
        margin-right:50px;
        padding:0;
        text-align: left;
        padding-top:20px;
      }
      .upload-container{
        padding:20px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(223,227,233,1);
        margin-left:30px;
        max-width:1200px;
        .image-preview{
          margin:0;
        }
        .successBorder{
          margin-right:20px;
          margin-bottom:20px;
        }
      }
    }

  }

  .inspection-information{
    .el-form-item__label{
      padding:0;
      margin-right:30px;
    }
  }

  //.el-input__inner:focus光标focus
  .el-input__inner:focus{
    border-color:rgba(255,168,0,1);
  }
  .el-select .el-input__inner:focus{
    // border-color:rgba(255,168,0,1);
    // cursor:text;
  }
  .el-textarea__inner:focus{
    border-color:rgba(255,168,0,1);
  }
  // .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled){
  //   border-color:rgba(255,168,0,1);
  // }
  // .el-input-number__increase:hover{
  //   color:rgba(255,168,0,1);
  // }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.controlboard {
  padding:40px ;
  .icon-answer{
    color:#7F8FA4;
    font-size:16px;
    margin-left:8px;
  }
  .email-dialog{
    .cancle{
      color: #909399;
    }
    .submit{
      color: #ffffff;
      background:#FFA800;
      outline:none;
      border:1px solid #FFA800;
    }
  }
  .product-information {
    position: relative;
    width: 85%;
    .addNewProducts{
      cursor: pointer;
      position: absolute;
      right: 0;
    }
    > p {
      font-size: 18px;
      color: #FFA800;
      margin-bottom:24px;
    }
    .addNewProduct{
      display:inline-block;position:absolute;cursor:pointer;right: 0;z-index:5;top:58px;background-image: linear-gradient(0deg, #f4f7fa 0%, #ffffff 100%);
      span{
        color:#E6EAEE;
      }
    }
    .content {
      width: 100%;
      padding: 30px;
      background-color: #ffffff;
      border-top:1px solid #E6EAEE;
      .delete{
        display: inline-block;
        font-size:10px;
        line-height:36px;
        height: 36px;
        vertical-align:middle;
        cursor: pointer;
        color:rgba(103,194,58,1);
        margin-left:47px;
        p{
              margin:0;
              padding:0;
              position: relative;
              top:-28px;
              text-align:center;
          }
          i{
              position: relative;
              display: inline-block;
              width: 24px;
              top:-10px;
              text-align:center;
          }
      }
      .copy{
          display: inline-block;
          color:#7C8CA5;
          font-size:10px;
          line-height:36px;
          height: 36px;
          vertical-align:middle;
          margin-left:40px;
          cursor: pointer;
          p{
              margin:0;
              padding:0;
              position: relative;
              top:-28px;
              text-align:center;
          }
          i{
              position: relative;
              display: inline-block;
              width: 24px;
              top:-10px;
              text-align:center;
          }
      }
    }
  }
  .supplier-information{
    margin: 32px 0 0 0;
    >p{
      font-size: 18px;
      color: #FFA800;
      margin-bottom:24px;
    }
  }
  .inspection-information{
    margin: 32px 0 0 0;
    >p{
      font-size: 18px;
      color: #FFA800;
      margin-bottom:24px;
    }
  }
  .other-requirement{
     margin: 32px 0 0 0;
    >p{
      height:29px;
      font-size:18px;
      color:#FFA800;
      line-height:29px;
      margin-bottom:25px;
    }

    .t1{
      color: #909399;
      text-align: left;
    }
    .tip{
      color:#666666;
        .agreement{
          margin-left:12px;
        }
      }
    .btn{
      width: 200px;
      height: 40px;
      background-color:#FFA800;
      color:#FFFFFF;
    }

    //requirement-upload
    .requirement-upload{
      padding-left:26px;
      height:166px;
      p{
        float:left;
      }
      p:nth-child(1){
        padding-top:20px;
        height:21px;
        font-size:14px;
        color:rgba(124,143,166,1);
        line-height:21px;
        margin-right:50px;
      }
      p:nth-child(2){
        padding:26px 78px 20px 20px;
        border-radius:3px;
        max-width:1200px;
        border:1px solid rgba(192,196,204,1);
        word-wrap: break-word;
        word-break: normal;
        background:rgba(255,255,255,1);
      }
      .el-upload--picture-card{

      }
      .el-upload--picture-card i{
        font-size:46px;
        color:rgba(255,168,0,1);
      }
      .el-upload__text{
        width:76px;
        margin-left:27px;
        height:28px;
        font-size:10px;
        font-weight:500;
        color:rgba(127,143,164,1);
        line-height:14px;

      }
    }
  }

  //uploadLimit
  .uploadLimit{
    height:21px;
    font-size:14px;
    color:rgba(144,147,153,1);
    line-height:21px;
    padding-left:170px;
    margin-bottom:25px;
  }

  //orderPlace
  .orderPlace{
    padding-left:170px;
    p:nth-child(1){
      margin-bottom:8px;
    }
  }
}
</style>

