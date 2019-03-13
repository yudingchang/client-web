<template>
  <div class="monthlyBillDetail">
    <el-row>
      <!-- 账单详情header时间金额 -->
      <el-col :span="24" class="BillDetail-info">
        <!-- BillDetail-info-totalInfo -->
        <div class="BillDetail-info-totalInfo">
          <ul>
            <li>账单详情:</li>
            <li>07-2018</li>
            <li>最后还款日期:</li>
            <li>2018.08.01</li>
          </ul>
          <ul>
            <li>订单还款金额:</li>
            <li>
              <p>
                <span>人民币</span><span>￥8989.89</span>
              </p>
              <p @click="repaymentRmb">人民币还款</p>
            </li>
            <li/>
            <li>
              <p>
                <span>美元</span><span>$8989.89</span>
              </p>
              <p>美元还款</p>
            </li>
          </ul>
        </div>
        <!-- BillDetail-info-checkTable -->
        <div class="BillDetail-info-checkTable">
          <template>
            <el-table
              :data="billDetailTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              :header-cell-style="{background:'#fff',height:'60px'}"
              stripe
              style="width: 100%">
              <el-table-column
                prop="year_month"
                label="创建时间"
                width="340"/>
              <el-table-column
                prop="order_id"
                label="订单号"
                width="300"/>
              <el-table-column
                prop="currency"
                label="币种"
                width="300"/>
              <el-table-column
                prop="price"
                label="金额"/>
            </el-table>
            <el-pagination
              :current-page="currentPage"
              :page-sizes="[9]"
              :page-size="pagesize"
              :total="billDetailTableData.length"
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { monthlyBillData } from '@/api/monthlyState'
export default {
  name: 'MonthlyBillDetail',
  props: ['monthlyBilldata'],
  data() {
    return {
      // 账单详情列表数据
      billDetailTableData: [],
      // 分页pagination
      currentPage: 1, // 初始页
      pagesize: 9 // 每页的数据
    }
  },
  created() {
    this.getMonthlyBillData()
  },
  methods: {
    // getMonthlyBilldata获取单月账单详情
    getMonthlyBillData(val) {
      // console.log("9999999999999999")
      monthlyBillData({
        id: this.monthlyBilldata
      }).then(response => {
        if (response.data.code == 0) {
          this.billDetailTableData = response.data.data.list
          console.log(response.data.data.list)
          console.log(this.monthlyBilldata)
        }
      })
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },

    // repaymentRmb人民币还款
    repaymentRmb() {
      this.$router.push({ path: 'monthlypayDetail' })
    }
  }
}
</script>

<style rel="styelsheet/scss" lang="scss" scoped>
//monthlyBillDetail普通样式
.monthlyBillDetail{
    // margin-right:100px;
    padding:40px 100px 0;
    .BillDetail-info{
        .BillDetail-info-totalInfo{
            height:200px;
            border-radius:4px;
            border:1px solid #E6EAEE;
            background:#FFFFFF;
            margin-bottom:24px;
            ul:nth-child(1){
                height:61px;
                border-bottom:1px solid #DFE3E9;
                line-height: 61px;
                li{
                    float:left;
                    font-size:16px;
                }
                li:nth-child(1){
                    color:#50688C;
                    margin:0 10px 0 25px;
                }
                li:nth-child(2){
                    color:#50688C;
                    margin-right:40px;
                }
                li:nth-child(3){
                    color:#EF3535;
                    margin-right:10px;
                }
                li:nth-child(4){
                    color:#EF3535;
                }
            }
            ul:nth-child(2){
                height:138px;
                line-height:138px;
                li{
                    float:left;
                }
                li:nth-child(1){
                    margin-left:25px;
                    color:#50688C;
                    font-size:16px;
                }
                li:nth-child(2){
                    margin-left:133px;
                    height:138px;
                    p:nth-child(1){
                        height:36px;
                        line-height: 36px;
                        margin:28px 0 16px 0;
                        span:nth-child(1){
                            font-size:20px;
                            color:#50688C;
                            margin-right:24px;
                        }
                        span:nth-child(2){
                            font-size:22px;
                            color:#158BE4;
                        }
                    }
                    p:nth-child(2){
                        height:32px;
                        width:150px;
                        background:#67C23A;
                        text-align: center;
                        color:#fff;
                        line-height: 32px;
                        border-radius:4px;
                        margin-left:36px;
                    }
                }
                li:nth-child(3){
                    width:1px;
                    height:40px;
                    margin:49px 102px 0 100px;
                    background:#A5B3C5;
                }
                li:nth-child(4){
                    height:138px;
                    p:nth-child(1){
                        height:36px;
                        line-height: 36px;
                        margin:28px 0 16px 0;
                        span:nth-child(1){
                            font-size:20px;
                            color:#50688C;
                            margin-right:24px;
                        }
                        span:nth-child(2){
                            font-size:22px;
                            color:#158BE4;
                        }
                    }
                    p:nth-child(2){
                        height:32px;
                        width:150px;
                        background:#67C23A;
                        text-align: center;
                        color:#fff;
                        line-height: 32px;
                        border-radius:4px;
                        margin-left:24px;
                    }
                }
            }
        }
        .BillDetail-info-checkTable{
            height:490px;

        }
    }
}
</style>

<style rel="styelsheet/scss" lang="scss" >
//monthlyBillDetail  Element组件样式
.monthlyBillDetail{
    .BillDetail-info-checkTable{
        //el-table
        .el-table{
            border:1px solid #E6EAEE;
            border-radius:4px;
        }
        .el-table th{
            height:60px;

        }
        .el-table td{
            height:60px;
        }
        .el-table .cell{
            padding:0;
        }
        .el-table th div, .el-table th>.cell{
            padding:0;
            color:#50688C;
            font-size:14px;
        }
        .el-table th:nth-child(1)>.cell{
            padding-left:40px;
        }
        .el-table td:nth-child(1) div{
            padding-left:40px;
        }

        //el-pagination
        .el-pagination{
            margin-top:24px;
        }
        .el-pagination__total{
            width:88px;
            height:36px;
            border:1px solid #CED0DA;
            border-radius:4px;
            text-align:center;
            line-height:36px;
            color:#7F8FA4;
            font-size:14px;
            margin-left:314px;
        }
        .el-pagination .el-select .el-input .el-input__inner{
            height:36px;
            background:#F3F6F9;
        }
        .el-pagination .btn-prev{
            width:36px;
            height:36px;
            border:1px solid #CED0DA;
            border-radius:4px;
            padding:0;
            margin-right:15px;
            background:#F3F6F9;
        }
        .el-pagination .btn-next{
            width:36px;
            height:36px;
            border:1px solid #CED0DA;
            border-radius:4px;
            padding:0;
            margin-left:15px;
            background:#F3F6F9;
        }
        .el-pager li{
            width:36px;
            height:36px;
            border:1px solid #CED0DA;
            border-radius:4px;
            padding:0;
            line-height:36px;
            text-align:center;
            margin-right:10px;
            color:#7F8FA4;
            background:#F3F6F9;
        }
        .el-pager li:last-child{
            margin-right:0;
        }
        .el-pager li.active{
            background:#158BE4;
            color:#fff;
            border:none;
        }
        .el-pagination__jump{
            width:110px;
            height:36px;
            border:1px solid #CED0DA;
            line-height:36px;
            padding-left:14px;
            background:#CED0DA;
            border-radius:2px;
            color:#fff;
            margin-left:15px;
        }
        .el-pagination__editor.el-input{
            float:right;
            height:36px;
            margin:0;
            padding:0;
            background:#F3F6F9;
        }
        .el-pagination__editor.el-input .el-input__inner{
            border:none;
            height:35px;
            line-height:35px;
            text-align:center;
            border-radius:0;
            padding:0;
            background:#F3F6F9;
            border-bottom:1px solid #CED0DA;
        }
        .el-pagination__jump:focus{
            background:#158BE4;
            border:1px solid #158BE4;
            color:#fff;
        }
    }

}
</style>

