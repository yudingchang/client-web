<template>
  <div class="ReimbursementDetail">
    <el-row>
      <el-col :span="24" class="ReimbursementDetail-info">
        <div class="ReimbursementDetail-info-title">
          <ul>
            <li>账单详情</li>
            <li>流水号:</li>
            <li>65222165610</li>
            <li>到账时间:</li>
            <li>2018-05-25 18:01</li>
            <li>发票类型:</li>
            <li>普通发票</li>
            <li>查看详情</li>
          </ul>
          <ul>
            <li>2018-05账单总金额：</li>
            <li>￥8989.89</li>
            <li>付款方式：</li>
            <li>支付宝</li>
          </ul>
        </div>
        <div class="ReimbursementDetail-info-table">
          <el-table
            :data="ReimbursementDetailData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%">
            <el-table-column
              prop="money_id"
              label="创建时间"
              width="340"/>
            <el-table-column
              prop="status"
              label="订单号"
              width="300"/>
            <el-table-column
              prop="created_at"
              label="币种"
              width="300"/>
            <el-table-column
              prop=""
              label="金额"/>
          </el-table>
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[9]"
            :page-size="pagesize"
            :total="ReimbursementDetailData.length"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ReimbursementData } from '@/api/monthlyState.js'
export default {
  name: 'ReimbursementDetail',
  props: ['ReimbursementDetailDataId'],
  data() {
    return {
      currentPage: 1, // 初始页
      pagesize: 9, // 每页的数据
      ReimbursementDetailData: [] // ReimbursementDetailData接收数据
    }
  },
  created() {
    this.getReimbursementData()
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    getReimbursementData() {
      ReimbursementData({

      }).then(response => {
        if (response.data.code == 0) {
          this.ReimbursementDetailData = response.data.data.list
          console.log(this.ReimbursementDetailData)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//普通样式
.ReimbursementDetail{
    margin-right:100px;
    .ReimbursementDetail-info{
        .ReimbursementDetail-info-title{
            height:144px;
            background:#fff;
            border-radius:4px;
            border:1px solid #E6EAEE;
            margin-bottom:24px;
            ul:nth-child(1){
                height:61px;
                border-bottom:1px solid #DFE3E9;
                line-height: 61px;
                li{
                    float: left;
                    font-size:14px;
                    color:#50688C;
                }
                li:nth-child(1){
                    margin-left:25px;
                }
                li:nth-child(2){
                    margin-left:40px;
                }
                li:nth-child(3){
                    margin-left:10px;
                }
                li:nth-child(4){
                    margin-left:40px;
                }
                li:nth-child(5){
                    margin-left:10px;
                }
                li:nth-child(6){
                    margin-left:18px;
                }
                li:nth-child(7){
                    margin-left:24px;
                }
                li:nth-child(8){
                    margin-left:16px;
                    cursor:pointer;
                    color:#FFA800;
                }
            }
            ul:nth-child(2){
                height:82px;
                line-height: 82px;
                li{
                    float:left;
                }
                li:nth-child(1){
                    margin-left:25px;
                    font-size:18px;
                    color:#50688C;
                }
                li:nth-child(2){
                    margin-left:24px;
                    color:#158BE4;
                    font-size:22px;
                }
                li:nth-child(3){
                    margin-left:40px;
                    color:#50688C;
                    font-size:18px;
                }
                li:nth-child(4){
                    margin-left:10px;
                    color:#50688C;
                    font-size:18px;
                }
            }
        }
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" >
//element-ui组件样式
.ReimbursementDetail{
    .ReimbursementDetail-info-table{
        //el-table
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

        //pagination
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

