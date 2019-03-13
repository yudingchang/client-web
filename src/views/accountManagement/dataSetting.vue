<template>
  <div class="datasetting">
    <el-row>
      <el-col :span="24">
        <div class="datasetting-content">
          <!-- tabs -->
          <div class="tab-content">
            <ul class="tabs">
              <li v-for="(item,index) in tablist" :class="{active:item.isBool}" :key = "index" @click="tab(item,index)">{{ item.content }}</li>
            </ul>
            <el-button class="add" @click="add()"><i class="iconfont icon-Fill2"/><span>Add</span></el-button>
          </div>
          <!-- el-table 报告接收电子邮箱 -->
          <el-table
            v-loading="loading"
            v-show="num==0"
            :data="tableData"
            class="receiveEmail"
            height="calc(100vh - 300px)"
            style="width: 100%"
          >
            <el-table-column
              label="Person"
              width="290"
            >
              <template slot-scope="scope">
                {{ scope.row.last_name + scope.row.first_name }}
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              label="E-mail"
              width="250"
            />
            <el-table-column
              prop="created_at"
              label="Time"
              width="250"
            />
            <el-table-column
              prop="address"
              label="Operation">
              <template slot-scope="scope">
                <el-button v-if="scope.row.default==0" type="text" size="small" @click="setDefault(scope.row)">
                  <i class="iconfont icon-Fill9"/>
                </el-button>
                <el-button v-if="scope.row.default==1" :class="{changecolor:scope.row.default==1}" type="text" size="small">
                  <i class="iconfont icon-hebingxingzhuang10"/>
                </el-button>
                <el-button type="text" size="small" @click="editEmail(scope.row)">
                  <i class="iconfont icon-bianji"/>
                </el-button>
                <el-button type="text" size="small" @click="removeEmail(scope.row)">
                  <i class="iconfont icon-shanchu"/>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- el-table 供应商信息 -->
          <el-table
            v-loading="loading"
            v-show="num==1"
            :data="supplyTableData"
            height="calc(100vh - 300px)"
            style="width: 100%"
          >
            <el-table-column
              label="Supplier"
              prop="supplier_name"
              width="270"
            />
            <el-table-column
              label="Contact"
              width="202"
            >
              <template slot-scope="scope">
                {{ scope.row.last_name + scope.row.first_name }}
              </template>
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="Mobile"
              width="323"
            />
            <el-table-column
              prop="email"
              label="E-mail"
              width="345"
            />
            <el-table-column
              label="Operation">
              <template slot-scope="scope">
                <el-button v-if="scope.row.is_default==0" type="text" size="small" @click="setSupplyDefault(scope.row)">
                  <i class="iconfont icon-Fill9"/>
                </el-button>
                <el-button v-if="scope.row.is_default==1" :class="{changecolor:scope.row.is_default==1}" type="text" size="small">
                  <i class="iconfont icon-hebingxingzhuang10"/>
                </el-button>
                <el-button type="text" size="small" @click="editSupply(scope.row)">
                  <i class="iconfont icon-bianji"/>
                </el-button>
                <el-button type="text" size="small" @click="removeSupply(scope.row)">
                  <i class="iconfont icon-shanchu"/>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- el-table 发票信息 -->
          <el-table
            v-loading="loading"
            v-if="num==2"
            :data="invoiceTableData"
            height="calc(100vh - 300px)"
            style="width: 100%"
          >
            <el-table-column
              label="Invoice type"
              prop="company_name"
            />
            <el-table-column
              prop="tax_id_number"
              label="Corporate name"
            />
            <el-table-column
              prop="bank_account"
              label="VAT No."
            />
            <el-table-column
              prop="bank"
              label="Bank"
            />
            <el-table-column
              prop="bank"
              label="Bank account"
            />
            <el-table-column
              prop="telephone"
              label="Mobile"
            />
            <el-table-column
              label="Operation"
              width="500px"
            >
              <template slot-scope="scope">
                <el-button v-if="scope.row.default==0" type="text" size="small" @click="setInvoiceDefault(scope.row)">
                  <i class="iconfont icon-Fill9"/>
                </el-button>
                <el-button v-if="scope.row.default==1" :class="{changecolor:scope.row.default==1}" type="text" size="small">
                  <i class="iconfont icon-hebingxingzhuang10"/>
                </el-button>
                <el-button type="text" size="small" @click="editInvoice(scope.row)">
                  <i class="iconfont icon-bianji"/>
                </el-button>
                <el-button type="text" size="small" @click="removeInvoice(scope.row)">
                  <i class="iconfont icon-shanchu"/>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- el-table 寄送地址 -->
          <el-table
            v-loading="loading"
            v-show="num==3"
            :data="addressTableData"
            height="calc(100vh - 300px)"
            style="width: 100%"
          >
            <el-table-column
              label="Recipients"
            >
              <template slot-scope="scope">
                {{ scope.row.first_name + scope.row.last_name }}
              </template>
            </el-table-column>
            <el-table-column
              prop="detailed_address"
              label="Addresses"
            />
            <el-table-column
              prop="telephone"
              label="Mobile"
            />
            <el-table-column
              prop="fixed_telephone"
              label="Telephone"

            />
            <el-table-column
              width="320"
              label="Operation">
              <template slot-scope="scope">
                <el-button v-if="scope.row.default==0" type="text" size="small" @click="setaddressDefault(scope.row)">
                  <i class="iconfont icon-Fill9"/>
                </el-button>
                <el-button v-if="scope.row.default==1" :class="{changecolor:scope.row.default==1}" type="text" size="small">
                  <i class="iconfont icon-hebingxingzhuang10"/>
                </el-button>
                <el-button type="text" size="small" @click="editaddress(scope.row)">
                  <i class="iconfont icon-bianji"/>
                </el-button>
                <el-button type="text" size="small" @click="removeaddress(scope.row)">
                  <i class="iconfont icon-shanchu"/>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- el-dialog 新增报告接收电子邮箱 -->
        <el-dialog
          :title="emailTitle"
          :visible.sync="emailDialogVisible"
          width="500px"
          class="email-dialog"
          top="20vh"
          center>
          <el-form ref="form" :model="form" :rules="rules" label-width="60px">
            <el-form-item prop="first_name" >
              <el-input v-model="form.first_name" style="width:344px;" placeholder="First name"/>
            </el-form-item>
            <el-form-item prop="last_name">
              <el-input v-model="form.last_name" style="width:344px;" placeholder="Last Name"/>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="form.email" placeholder="E-mail address" style="width:344px;"/>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button class="cancle" @click="emailDialogVisible = false">Cancel</el-button>
            <el-button class="submit" @click.native="emailsubmit">Save</el-button>
          </span>
        </el-dialog>
        <!-- el-dialog 新增供应商信息 -->
        <el-dialog
          :title="supplyTitle"
          :visible.sync="supplyDialogVisible"
          width="500px"
          class="supply-dialog"
          top="20vh"
          center>
          <el-form ref="supplyform" :model="supplyform" :rules="supplyrules" :inline="true" >
            <el-form-item style="" prop="supplier_name">
              <el-input v-model="supplyform.supplier_name" placeholder="Company name" style="width:450px;"/>
            </el-form-item>
            <el-form-item prop="first_name">
              <el-input v-model="supplyform.first_name" style="width:225px;" placeholder="First name"/>
            </el-form-item>
            <el-form-item prop="last_name">
              <el-input v-model="supplyform.last_name" style="width:220px;" placeholder="Last name"/>
            </el-form-item>
            <br>
            <el-form-item prop="telephone">
              <el-input v-model="supplyform.telephone" placeholder="Enter phone number" style="width:450px;" class="input-with-select" >
                <el-select slot="prepend" v-model="supplyform.telephone_code" placeholder="choic" style="width:170px;">
                  <el-option
                    v-for="item in phone_codeConfig"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="supplyform.email" placeholder="Email address" style="width:450px;"/>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button class="cancle" @click="supplyDialogVisible = false">Cancel</el-button>
            <el-button class="submit" @click.native="supplysubmit">Save</el-button>
          </span>
        </el-dialog>
        <!-- el-dialog 新增发票信息 -->
        <el-dialog
          :title="invoiceTitle"
          :visible.sync="invoiceDialogVisible"
          width="600px"
          class="invoice-dialog"
          top="20vh"
          center>
          <el-form ref="invoiceform" :model="invoiceform" :rules="invoicerules" label-width="100px">
            <el-form-item prop="company_name">
              <el-input v-model="invoiceform.company_name" style="width:350px;" placeholder="Company name"/>
            </el-form-item>
            <el-form-item prop="tax_id_number">
              <el-input v-model="invoiceform.tax_id_number" style="width:350px;" placeholder="Taxpayer ID"/>
            </el-form-item>
            <el-form-item prop="bank">
              <el-input v-model="invoiceform.bank" style="width:350px;" placeholder="Beneficiary Bank"/>
            </el-form-item>
            <el-form-item prop="bank_account">
              <el-input v-model="invoiceform.bank_account" style="width:350px;" placeholder="Bank Account"/>
            </el-form-item>
            <el-form-item prop="telephone">
              <el-input v-model="invoiceform.telephone" placeholder="Telephone no." class="input-with-select" style="width:350px;">
                <el-select slot="prepend" v-model="invoiceform.telephone_code" placeholder="choic" style="width:150px;">
                  <el-option
                    v-for="item in phone_codeConfig"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item prop="address" >
              <el-cascader
                :options="optionsProvinces"
                :props="{label:'chinese_name',value:'id',children:'children_simple'}"
                v-model="invoiceform.address"
                expand-trigger="hover"
                style="width:350px;"
                @change="handleChange"/>
            </el-form-item>
            <el-form-item prop="detailed_address">
              <el-input v-model="invoiceform.detailed_address" type="textarea" style="width:350px;" maxlength="500" placeholder="Please enter detailed address, such as street, building or door number, etc"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="cancle" @click="invoiceDialogVisible = false">Cancel</el-button>
            <el-button type="primary" class="submit" @click="invoicesubmit()">Save</el-button>
          </div>
        </el-dialog>
        <!-- el-dialog 新增寄送地址 -->
        <el-dialog
          :title="addressTitle"
          :visible.sync="addressDialogVisible"
          width="600px"
          class="address-dialog"
          top="20vh"
          center>
          <el-form ref="addressform" :model="addressform" :rules="addressrules" label-width="100px" >
            <el-form-item prop="first_name">
              <el-input v-model="addressform.first_name" placeholder="Recipient First name" style="width:350px"/>
            </el-form-item>
            <el-form-item prop="last_name" >
              <el-input v-model="addressform.last_name" placeholder="Recipient Last name" style="width:350px"/>
            </el-form-item>
            <el-form-item prop="address">
              <!-- <el-input v-model="addressform.address"   style="width:375px"></el-input> -->
              <el-cascader
                :options="optionsProvinces"
                :props="{label:'chinese_name',value:'id',children:'children_simple'}"
                v-model="addressform.address"
                expand-trigger="hover"
                style="width:350px"
                @change="handleChange"/>
            </el-form-item>
            <br>
            <el-form-item prop="detailed_address">
              <el-input v-model="addressform.detailed_address" type="textarea" placeholder="Please enter detailed address information, such as street, building number, etc." style="width:350px" />
            </el-form-item>
            <br>
            <el-form-item prop="telephone">
              <el-input v-model="addressform.telephone" placeholder="Phone number" class="input-with-select" style="width:350px">
                <el-select slot="prepend" v-model="addressform.telephone_code" placeholder="choic" style="width:150px;">
                  <el-option
                    v-for="item in phone_codeConfig"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-input>
            </el-form-item>
            <br>
            <el-form-item prop="fixed_telephone">
              <el-input v-model="addressform.fixed_telephone" placeholder="telephone number" class="input-with-select" style="width:350px">
                <el-select slot="prepend" v-model="addressform.fixed_telephone_code" placeholder="choic" style="width:150px;">
                  <el-option
                    v-for="item in phone_codeConfig"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="cancle" @click="addressDialogVisible = false">Cancel</el-button>
            <el-button type="primary" class="submit" @click="addresssubmit()">Save</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getdata, addEmail, setDefault, editEmail, removeEmail, getSupplydata, addSupply, editSupply, setSupplyDefault, removeSupply, addInvoice, getInvoiceList, setInvoiceDefault, removeInvoice, getAddressList, addAddress, setaddressDefault, removeaddress } from '@/api/accountManagement'
import { fetchList, fetchCounty } from '@/api/fetch'
import { mapGetters } from 'vuex'
import store from '../../store/'
export default {
  name: '',
  components: {},
  data() {
    return {
      // loading 过渡动画
      loading: false,
      // phone_codeConfig
      phone_codeConfig: '',
      tablist: [
        {
          content: 'Report to',
          isBool: true
        },
        {
          content: 'Suppliers Info',
          isBool: false
        },
        {
          content: 'Invoice Info',
          isBool: false
        },
        {
          content: 'Delivery address',
          isBool: false
        }
      ],
      options: [
        {
          value: '0~20',
          label: '0~20'
        },
        {
          value: '20~100',
          label: '20~100'
        },
        {
          value: '100~500',
          label: '100~500'
        }],
      form: {
        first_name: '',
        last_name: '',
        email: ''
      },
      supplyform: {
        first_name: '',
        last_name: '',
        email: '',
        supplier_name: '',
        telephone: '',
        telephone_code: ''
      },
      editform: '',
      rules: {
        first_name: [
          { required: true, message: 'Please enter first name', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        last_name: [
          { required: true, message: 'Please enter last name', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter Email', trigger: 'blur' }
        ]
      },
      supplyrules: {
        first_name: [
          { required: true, message: 'Please enter first name', trigger: 'blur' }
        ],
        last_name: [
          { required: true, message: 'Please enter last name', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter Email', trigger: 'blur' }
        ],
        supplier_name: [{
          required: true, message: 'Please enter Company name', trigger: 'blur'
        }]

      },
      invoiceTableData: [],
      invoiceform: {
        company_name: '',
        tax_id_number: '',
        bank: '',
        bank_account: '',
        telephone: '',
        telephone_code: '',
        address: [],
        detailed_address: ''
      },
      optionsProvinces: [],
      invoicerules: {
        company_name: [{ required: true, message: 'Please enter Company name', trigger: 'blur' }],
        tax_id_number: [{ required: true, message: 'Please enter Taxpayer ID', trigger: 'blur' }],
        bank: [{ required: true, message: 'Please enter Beneficiary Bank', trigger: 'blur' }],
        bank_account: [{ required: true, message: 'Please enter Bank Account', trigger: 'blur' }],
        // telephone:[{ required: true, message: '请输入单位电话', trigger: 'blur'}],
        address: [{ required: true, message: 'Please enter Company address', trigger: 'blur' }],
        detailed_address: [{ required: true, message: 'Please enter detailed address', trigger: 'blur' }]
      },
      addressTableData: [],
      addressTitle: 'New delivery address information',
      addressform: {
        first_name: '',
        last_name: '',
        address: [],
        detailed_address: '',
        telephone: '',
        fixed_telephone: '',
        telephone_code: '',
        fixed_telephone_code: ''
      },
      addressrules: {
        last_name: [{ required: true, message: 'Please enter first name', trigger: 'blur' }],
        first_name: [{ required: true, message: 'Please enter last name', trigger: 'blur' }],
        address: [{ required: true, message: 'Please enter Company address', trigger: 'blur' }],
        detailed_address: [{ required: true, message: 'Please enter detailed address', trigger: 'blur' }],
        telephone: [{ required: true, message: 'Please enter Phone number', trigger: 'blur' }],
        fixed_telephone: [{ required: false, message: 'Please enter telephone number', trigger: 'blur' }]
      },
      tableData: [],
      supplyTableData: [],
      num: 0,
      formLabelWidth: '140px',
      invoiceLabelWidth: '130px',
      emailDialogVisible: false,
      supplyDialogVisible: false,
      invoiceDialogVisible: false,
      addressDialogVisible: false,
      labelwidth: '100px',
      emailTitle: 'New email address for report receiving',
      supplyTitle: 'New supplier information',
      invoiceTitle: 'New invoice information'
    }
  },
  created() {
    this.getdata()
    this.routerIndex()
    this.ConfigUnit()
    // this.getFetchCounty()     获取所有的国家
    this.getFetchProvinces(7) // 获取中国省市区
  },
  methods: {
    // tab切换
    tab(item, index) {
      this.tablist.forEach((item, index) => {
        item.isBool = false
      })
      this.num = index
      item.isBool = true
      if (index == 0) {
        this.$nextTick(() => {
          this.getdata()
        })
      }
      if (index == 1) {
        this.$nextTick(() => {
          this.getSupplydata()
        })
      }
      if (index == 2) {
        this.$nextTick(() => {
          this.getinvoicedata()
        })
      }
      if (index == 3) {
        this.$nextTick(() => {
          this.getaddressdata()
        })
      }
    },
    // 获取电子邮箱表格数据
    getdata() {
      this.loading = true
      getdata().then(response => {
        if (response.data.code == 0) {
          this.tableData = response.data.data.list
          this.loading = false
          console.log(this.tableData)
        }
      })
    },
    // 获取供应商信息表格数据
    getSupplydata() {
      this.loading = true
      getSupplydata().then(response => {
        if (response.data.code == 0) {
          this.supplyTableData = response.data.data.list
          this.loading = false
        }
      })
    },
    // 弹出dialog
    add() {
      if (this.num == 0) {
        this.emailDialogVisible = true
        this.emailTitle = 'New email address for report receiving'
        this.form.first_name = ''
        this.form.last_name = ''
        this.form.email = ''
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      }
      if (this.num == 1) {
        this.supplyDialogVisible = true
        this.supplyTitle = 'New supplier information'
        this.supplyform.first_name = ''
        this.supplyform.last_name = ''
        this.supplyform.email = ''
        this.supplyform.supplier_name = ''
        this.supplyform.telephone = ''
        this.supplyform.telephone_code = ''
        this.$nextTick(() => {
          this.$refs.supplyform.clearValidate()
        })
      }
      if (this.num == 2) {
        this.invoiceDialogVisible = true
        this.invoiceTitle = 'New invoice information'
        this.invoiceform.company_name = ''
        this.invoiceform.tax_id_number = ''
        this.invoiceform.bank = ''
        this.invoiceform.bank_account = ''
        this.invoiceform.telephone = ''
        this.invoiceform.telephone_code = ''
        this.invoiceform.address = []
        this.invoiceform.detailed_address = ''
        this.$nextTick(() => {
          this.$refs.invoiceform.clearValidate()
        })
      }
      if (this.num == 3) {
        this.addressDialogVisible = true
        this.addressTitle = 'New delivery address information'
        this.addressform.first_name = ''
        this.addressform.last_name = ''
        this.addressform.address = []
        this.addressform.detailed_address = ''
        this.addressform.telephone = ''
        this.addressform.fixed_telephone = ''
        this.addressform.telephone_code = ''
        this.addressform.fixed_telephone_code = ''
        this.$nextTick(() => {
          this.$refs.addressform.clearValidate()
        })
      }
    },
    // 添加一条数据
    emailsubmit() {
      if (this.emailTitle != 'Edit email address for report receiving') {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            addEmail({
              ...this.form
            }).then(response => {
              if (response.data.code == 0) {
                this.emailDialogVisible = false
                this.getdata()
              }
            })
          }
        })
      } else {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            editEmail({
              ...this.form,
              url: 'v1/email/update/' + this.form.id
            }).then(response => {
              if (response.data.code == 0) {
                this.emailDialogVisible = false
                this.getdata()
              }
            })
          }
        })
      }
    },
    // 设置默认电子邮箱
    setDefault(row) {
      setDefault({
        url: 'v1/email/set/' + row.id
      }).then(response => {
        if (response.data.code == 0) {
          this.getdata()
        }
      })
    },
    // 编辑电子邮箱
    editEmail(row) {
      this.emailTitle = 'Edit email address for report receiving'
      this.emailDialogVisible = true
      this.form = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 删除电子邮箱
    removeEmail(row) {
      this.$confirm('Do you really want to delete this email address for report receiving?', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        // type: 'warning',
        center: true
      }).then(() => {
        removeEmail({
          url: 'v1/email/delete/' + row.id
        }).then(response => {
          if (response.data.code == 0) {
            this.getdata()
          }
        })
      })
    },
    // 增加一条供应商信息
    supplysubmit() {
      // this.supplyform.telephone_code = this.supplyform.telephone_code.toString();
      console.log(typeof (this.supplyform.telephone_code))
      if (this.supplyTitle != 'Edit supplier information') {
        this.$refs['supplyform'].validate((valid) => {
          if (valid) {
            addSupply({
              ...this.supplyform
            }).then(response => {
              if (response.data.code == 0) {
                this.supplyDialogVisible = false
                this.getSupplydata()
              }
            })
          }
        })
      } else {
        console.log(this.supplyform)
        this.$refs['supplyform'].validate((valid) => {
          if (valid) {
            editSupply({
              ...this.supplyform,
              url: 'v1/supplier/update/' + this.supplyform.id
            }).then(response => {
              if (response.data.code == 0) {
                this.supplyDialogVisible = false
                this.getSupplydata()
              }
            })
          }
        })
      }
    },
    // 编辑供应商信息
    editSupply(row) {
      this.supplyTitle = 'Edit supplier information'
      this.supplyDialogVisible = true
      this.supplyform = _.cloneDeep(row)
      this.supplyform.phone_codeConfig = this.configs.phone_number_codes
      // console.log(this.supplyform)
      this.$nextTick(() => {
        this.$refs.supplyform.clearValidate()
      })
    },
    // 设置默认供应商
    setSupplyDefault(row) {
      console.log(row)
      setSupplyDefault({
        url: 'v1/supplier/set/' + row.id
      }).then(response => {
        if (response.data.code == 0) {
          this.getSupplydata()
        }
      })
    },
    // 删除电子邮箱
    removeSupply(row) {
      this.$confirm('Do you really want to delete this email address for report receiving?', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        // type: 'warning',
        center: true
      }).then(() => {
        removeSupply({
          url: 'v1/supplier/delete/' + row.id
        }).then(response => {
          if (response.data.code == 0) {
            this.getSupplydata()
          }
        })
      })
    },
    // 获取发票信息表格数据
    getinvoicedata() {
      this.loading = true
      getInvoiceList().then(response => {
        if (response.data.code == 0) {
          this.invoiceTableData = response.data.data.list
          this.loading = false
        }
      })
    },
    // 获取发票信息默认
    setInvoiceDefault(row) {
      setInvoiceDefault({
        url: 'v1/receipt/set/' + row.id
      }).then(response => {
        if (response.data.code == 0) {
          this.getinvoicedata()
        }
      })
    },
    // 编辑发票信息
    editInvoice(row) {
      this.invoiceTitle = 'Edit invoice information'
      this.invoiceDialogVisible = true
      this.invoiceform = _.cloneDeep(row)
      this.invoiceform.phone_codeConfig = this.configs.phone_number_codes
      this.invoiceform.address = row.address.map(Number)
      console.log(this.invoiceform.address)
      this.$nextTick(() => {
        this.$refs.invoiceform.clearValidate()
      })
    },
    // 新增发票信息
    invoicesubmit() {
      if (this.invoiceTitle != 'Edit invoice information') {
        this.$refs['invoiceform'].validate((valid) => {
          if (valid) {
            addInvoice({
              ...this.invoiceform
            }).then(response => {
              if (response.data.code == 0) {
                this.invoiceDialogVisible = false
                this.getinvoicedata()
              }
            })
          }
        })
      } else {
        this.$refs['invoiceform'].validate((valid) => {
          if (valid) {
            editEmail({
              ...this.invoiceform,
              url: 'v1/receipt/update/' + this.invoiceform.id
            }).then(response => {
              if (response.data.code == 0) {
                this.invoiceDialogVisible = false
                this.getinvoicedata()
              }
            })
          }
        })
      }
    },
    // 删除发票信息
    removeInvoice(row) {
      this.$confirm('Do you really want to delete this email address for report receiving?', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        // type: 'warning',
        center: true
      }).then(() => {
        removeInvoice({
          url: 'v1/receipt/delete/' + row.id
        }).then(response => {
          if (response.data.code == 0) {
            this.getinvoicedata()
          }
        })
      })
    },

    // 获取寄送地址表格数据
    getaddressdata() {
      this.loading = true
      getAddressList().then(response => {
        if (response.data.code == 0) {
          this.addressTableData = response.data.data.list
          this.loading = false
        }
      })
    },
    // 获取寄送地址默认
    setaddressDefault(row) {
      setaddressDefault({
        url: 'v1/sendaddress/set/' + row.id
      }).then(response => {
        if (response.data.code == 0) {
          this.getaddressdata()
        }
      })
    },
    // 编辑寄送地址
    editaddress(row) {
      this.addressTitle = 'Edit delivery address information'
      this.addressDialogVisible = true
      this.addressform = Object.assign({}, row)
      console.log(this.addressform)
      this.addressform.phone_codeConfig = this.configs.phone_number_codes
      this.addressform.address = row.address.map(Number)
      this.$nextTick(() => {
        this.$refs.addressform.clearValidate()
      })
    },
    // 新增寄送地址
    addresssubmit() {
      if (this.addressTitle != 'Edit delivery address information') {
        this.$refs['addressform'].validate((valid) => {
          if (valid) {
            addAddress({
              ...this.addressform
            }).then(response => {
              if (response.data.code == 0) {
                this.addressDialogVisible = false
                this.getaddressdata()
              }
            })
          }
        })
      } else {
        this.$refs['addressform'].validate((valid) => {
          if (valid) {
            editEmail({
              ...this.addressform,
              url: 'v1/sendaddress/update/' + this.addressform.id
            }).then(response => {
              if (response.data.code == 0) {
                this.addressDialogVisible = false
                this.getaddressdata()
              }
            })
          }
        })
      }
    },
    // 删除寄送地址
    removeaddress(row) {
      this.$confirm('Do you really want to delete this email address for report receiving?', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        // type: 'warning',
        center: true
      }).then(() => {
        removeaddress({
          url: 'v1/sendaddress/delete/' + row.id
        }).then(response => {
          if (response.data.code == 0) {
            this.getaddressdata()
          }
        })
      })
    },
    // 跳转进入
    routerIndex() {
      if (this.$route.query.tabsIndex) {
        this.num = this.$route.query.tabsIndex
        console.log('进入的是' + this.num)
        this.tablist.forEach((i, index) => {
          i.isBool = false
        })
        this.tablist[this.num].isBool = true
        if (this.num == 0) {
          this.$nextTick(() => {
            this.getdata()
          })
        }
        if (this.num == 1) {
          this.$nextTick(() => {
            this.getSupplydata()
          })
        }
        if (this.num == 2) {
          this.$nextTick(() => {
            this.getinvoicedata()
          })
        }
        if (this.num == 3) {
          this.$nextTick(() => {
            this.getaddressdata()
          })
        }
      }
    },

    // 配置文件加载
    ConfigUnit() {
      this.phone_codeConfig = this.configs.phone_number_codes
    },

    // fetchList获取所有的国家
    getFetchCounty() {
      fetchList().then(response => {
        if (response.data.code == 0) {
          console.log(response.data.data)
        }
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
    }

  },
  computed: {
    ...mapGetters([
      'configs'
    ])
  },
  mounted() {
    // console.log(this.$route.fullPath)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.datasetting {
  .el-button+.el-button {
    margin-left: 20px;
  }
  .el-dialog__header {
    padding: 50px 20px 10px;
  }
  .el-form--inline .el-form-item{
    margin-right: 0;
  }
  .el-input-group__prepend{
    background-color: transparent;
  }
  .el-dialog__title {
      color: #7F8FA4;
  }
  .el-form-item__label{
    color: #909399;
    font-weight: normal;
  }
  .el-table th{
      background:rgba(245,248,250,1);
      text-align: left;
      font-size: 14px;
      height:60px;
      padding:0;
      color:rgba(80,104,140,1);
  }
  .el-table th>.cell{
    padding:0;
  }
  .el-table th:nth-child(1)>.cell{
    padding-left:40px;
  }
  .el-table td {
    height:60px;
    text-align: left;
    font-size: 12px;
  }
  .el-table td div{
    padding:0;
    font-size:14px;
    color:rgba(80,104,140,1);
  }
  .el-table td:nth-child(1) div{
    padding-left:40px;
  }
  .el-button--text{
    color: #50688C;
  }
  .el-form-item__error{
    // color: #ffa800;
  }
  .el-button--primary{
    background-color: #FFA800;
    border-color: #FFA800;
  }
  .el-message-box__btns button:nth-child(2) {
      background-color: #FFA800;
    border-color: #FFA800;
  }
  .special-input input{
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
  }

  //email-dialog

  //supply-dialog
  .supply-dialog{
    .el-input-group>.el-input__inner{
      // width:175px;
    }
    .dialog-footer{
      .el-button:nth-child(2){
        background:rgba(255,168,0,1);
        color:rgba(255,255,255,1);
      }
    }
  }

  //invoice-dialog
  .invoice-dialog{
    .el-cascader .el-input, .el-cascader .el-input__inner{
      // width:410px;
    }
  }

  //address-dialog
  .address-dialog{
    .el-form-item:nth-child(1){
      // .el-input__inner{
      //   width:150px;
      // }
    }
    .el-form-item:nth-child(2){
      .el-form-item__label{
        width:51px !important;
      }
      .el-input__inner{
        // width:150px;
      }
    }
   .el-form-item:nth-child(3){
     .el-cascader__label{
        // width:375px;
      }
   }
   .el-cascader .el-input, .el-cascader .el-input__inner{
      // width:375px;
    }
  }

}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.datasetting{
  padding:24px 40px 0 40px;

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
  .changecolor{
    color: #67C23A;
  }
  .datasetting-content {
    // height:731px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    opacity:0.9;
    border:1px solid rgba(230,234,238,1);
    .tab-content {
      // line-height: 200px;
      height: 73px;
      border-bottom: 1px solid #F5F8FA;
      background-color:#ffffff;
      .tabs {
        display: inline-block;
        width: 800px;
        overflow: hidden;
        list-style: none;
        margin: 0;
        padding:0;
        li {
          float: left;
          width: 25%;
          height: 73px;
          line-height: 73px;
          text-align: center;
          font-size: 14px;
          color: #50688c;
          cursor:pointer;
        }
        .active {
          border-bottom: 2px solid #ffa800;
          color: #ffa800;
        }
      }
      .add {
        // display: inline-block;
        float: right;
        margin-right: 40px;
        width: 130px;
        height: 40px;
        vertical-align: top;
        margin-top:16px;
        font-size: 14px;
        background: #67c23a;
        color: #ffffff;
        outline: none;
        i{
          margin-right:15px;
          font-size: 14px;
        }
        &:hover {
          color: #ffffff;
        }
        span {
          &::before {
            font-size: 16px;
            margin-right: 15px;
          }
        }
      }
    }
  }
}
</style>

