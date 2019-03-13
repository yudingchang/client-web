<template>
  <div v-loading="loading" class="companyInformationIndex">
    <el-row>
      <el-col :span="12">
        <!-- 显示企业信息 -->
        <div :model="form">
          <div class="company-content clearfloat">
            <div class="left required">Company name</div>
            <div class="right-fixed">
              <span v-if="form.company_name">{{ form.company_name }}</span>
              <span v-else class="empty">No info</span>
            </div>
          </div>
          <div class="company-content clearfloat">
            <div class="left">Country & City</div>
            <div class="right-fixed">
              <div v-if="form.address || form.address_detail">
                {{ form.address?form.address:'' }}
                <br>
                {{ form.address_detail?form.address_detail:'' }}
              </div>
              <span v-else class="empty">No info</span>
            </div>
          </div>
          <!-- <div class="company-content clearfloat">
            <div class="left">Company scale</div>
            <div class="right-fixed">
                <span v-if="form.address_detail">{{form.address_detail}}</span>
                <span class="empty" v-else>未设置</span>
            </div>
          </div> -->
          <div class="company-content clearfloat">
            <div class="left">Company scale</div>
            <div class="right-fixed">
              <span v-if="form.company_size">{{ form.company_size }}</span>
              <span v-else class="empty">No info</span>
            </div>
          </div>
          <div class="company-content clearfloat">
            <div class="left">VAT No.</div>
            <div class="right-fixed">
              <span v-if="form.license_number">{{ form.license_number }}</span>
              <span v-else class="empty">No info</span>
            </div>
          </div>
          <div class="edit" @click="editPersonalMessage()">Modify</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCompanyInformation } from '@/api/accountManagement.js'
// import { mapGetters } from 'vuex'
// import store from '../../store/'
export default {
  name: 'CompanyInformationIndex',
  components: { },
  data() {
    return {
      // editMessage:true,   //编辑信息

      // normalStatu:false,   //正常状态显示

      form: { // 企业信息
        company_name: '',
        address: [],
        address_arr: '',
        address_detail: '',
        company_size: '',
        license_number: '' // 营业执照注册号
      },

      optionsProvinces: [],

      // options:[      //options公司规模选项
      //   {
      //     value: "0~20",
      //     label: "0~20"
      //   },
      //   {
      //     value: "20~100",
      //     label: "20~100"
      //   },
      //   {
      //     value: "100~500",
      //     label: "100~500"
      //   },
      // ],
      loading: false
    }
  },
  computed: {
    // ...mapGetters([
    //   'company'
    // ])
  },
  created() {
    this.getCompanyInfoData()
  },
  methods: {
    // save(){                   //点击保存企业信息
    // // console.log(this.form)
    //     saveCompanyInformation(this.form).then(response =>{
    //       if(response.data.code == 0){
    //         // console.log("success")
    //         // console.log(response.data)
    //         this.$store.commit('SET_COMPANY', false)
    //         this.getCompanyInfoData()
    //       }
    //     })
    // },

    editPersonalMessage() { // 修改企业信息
      this.$router.push({ path: 'companyEdit' })
    },

    // getCompanyInfoData(val){
    //   console.log(this.company)
    //   console.log("进入")
    //   getCompanyInformation(val).then(response =>{
    //     if(response.data.code == 0){
    //   console.log("进入response")
    //       this.form=response.data.data
    //       if( this.company == ''){
    //         this.form.address = ''
    //         for(var i=0;i<this.form.address_arr.length;i++){
    //           this.form.address += this.form.address_arr[i].chinese_name
    //         }
    //       }
    //     }
    //   })
    // },

    getCompanyInfoData(val) {
      this.loading = true
      getCompanyInformation(val).then(response => {
        if (response.data.code == 0) {
          console.log('进入response')
          this.form = response.data.data
          if (this.form.company_size == 1) {
            this.form.company_size = '0-20'
          } else if (this.form.company_size == 2) {
            this.form.company_size = '20-50'
          } else if (this.form.company_size == 3) {
            this.form.company_size = '50-100'
          }
          this.form.address = ''
          for (var i = 0; i < this.form.address_arr.length; i++) {
            this.form.address += this.form.address_arr[i].chinese_name
          }
          this.loading = false
        }
      })
    },

    // handleChange
    handleChange() {

    }

    // getFetchCounty获取省市区
    // getFetchProvinces(val){
    //   fetchCounty({ pid: val }).then( response => {
    //     this.$nextTick(function() {
    //       // this.locationOptions = response.data.data
    //       // console.log(response.data.data)
    //       this.optionsProvinces = response.data.data
    //     })
    //   })
    // },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.companyInformationIndex{
    margin: 40px 0 0 100px;
    color: #164061;
    font-size: 14px;
    .edit{
    margin-left: 185px;
    width: 240px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #FFA800;
    border-radius: 4px;
    font-size: 16px;
    color: #FFA800;
    letter-spacing: 0.77px;
    text-align: center;
    cursor: pointer;
  }
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
      color: #50688C;
      .empty{
        color: #909399;
      }
    }
  }

}
</style>
<style rel="stylesheet/scss" lang="scss">
.company-information{
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

