<template>
  <div v-loading="loading" class="companyEdit">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item :rules="[{ required: true, message: 'Please enter company name', trigger: 'blur' }]" label="Company name" prop="company_name">
            <el-input v-model="form.company_name" style="width:480px;" placeholder="Please enter company name"/>
          </el-form-item>
          <el-form-item label="Country & City">
            <el-cascader
              :options="optionsProvinces"
              :props="{label:'chinese_name',value:'id',children:'children_simple'}"
              v-model="form.address"
              expand-trigger="hover"
              style="width:480px;"
              @change="handleChange"/>
          </el-form-item>
          <el-form-item label="Detailed address">
            <el-input v-model="form.address_detail" style="width:480px;" maxlength="500" type="textarea" placeholder="Please enter more details information, such as street, building, room number, zip code etc."/>
          </el-form-item>
          <el-form-item label="Company scale">
            <el-select v-model="form.company_size" placeholder="Select" style="width:480px;">
              <el-option
                v-for="(item,index) in configs.company_size"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="VAT No.">
            <el-input v-model="form.license_number" style="width:480px;" placeholder="Enter registration number"/>
          </el-form-item>
          <button :disabled="form.company_name == null" class="save" @click="saveCompanyInformationData()">Save</button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { saveCompanyInformation, getCompanyInformation } from '@/api/accountManagement.js'
import { fetchList, fetchCounty } from '@/api/fetch'
import { mapGetters } from 'vuex'
import store from '@/store/'
export default {
  name: 'CompanyEdit',
  data() {
    return {
      form: { // 企业信息
        company_name: '',
        address: [],
        address_arr: '',
        address_detail: '',
        company_size: '',
        license_number: '' // 营业执照注册号
      },

      optionsProvinces: [],

      options: [], // options公司规模选项

      loading: false

    }
  },
  created() {
    this.getCompanyInfoData()
    this.getFetchProvinces(7)
    // this.ConfigUnit()
  },
  methods: {
    getCompanyInfoData() {
      this.loading = true
      getCompanyInformation().then(response => {
        if (response.data.code == 0) {
          this.form = response.data.data
          if (this.form.company_size == 0) {
            this.form.company_size = ''
          }
          console.log(this.form)
          this.loading = false
        }
      })
    },

    saveCompanyInformationData() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          saveCompanyInformation(this.form).then(response => {
            if (response.data.code == 0) {
              store.dispatch('GetUserInfo')
              this.$message({
                message: '企业信息保存成功',
                type: 'success'
              })
              this.$router.push({ path: 'companyInformationIndex' })
            }
          })
        }
      })
    },

    // getFetchCounty获取省市区
    getFetchProvinces(val) {
      fetchCounty({ pid: val }).then(response => {
        this.$nextTick(function() {
          // this.locationOptions = response.data.data
          // console.log(response.data.data)
          this.optionsProvinces = response.data.data
        })
      })
    },

    // handleChange
    handleChange() {

    }

    // 配置文件加载
    // ConfigUnit(){
    //     this.options = this.configs.company_size;
    //     // console.log( this.options )
    // },

  },
  computed: {
    ...mapGetters([
      'configs'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//普通DOM样式
.companyEdit{
    padding:34px 0 0 100px;
    .company-content{
    // overflow: hidden;
    height: 36px;
    line-height: 36px;
    margin-bottom: 35px;
    .left{
      float: left;
      width: 150px;
      font-size: 14px;
      color: #7f8fa4;
    }
    .required{
      &::before{
        content: '*';
        color: #FF0000;
        margin-right: 3px;
      }
    }

    .right-fixed{
      float: left;
      margin-left: 34px;
      .empty{
        color: #909399;
      }
    }
  }
  .save {
    margin-left: 150px;
    width: 240px;
    height: 40px;
    line-height: 40px;
    background: #ffa800;
    border-radius: 4px;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.77px;
    text-align: center;
    cursor: pointer;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" >
//element样式
.companyEdit{
    .el-form-item__label{
        text-align:left;
        color:#7F8FA4;
    }
    .el-input__inner:focus{
        border:1px solid rgba(255,168,0,1);
    }
    .el-textarea__inner:focus{
        border:1px solid rgba(255,168,0,1);
    }
    .optionsProvinces{
        .el-cascader .el-input, .el-cascader .el-input__inner{
        width:380px;
        }
    }
}
</style>

