<template>
  <div class="monthlyReimbursement">
    <el-row>
      <el-col :span="24" class="Reimbursement-info">
        <div class="Reimbursement-info-title">
          <p>已还款明细</p>
        </div>
        <div class="Reimbursement-info-tableDetail">
          <ul class="Reimbursement-info-tableDetail-query">
            <li>月份</li>
            <li>
              <el-date-picker
                v-model="queryStartTime"
                type="month"
                format="yyyy 年 MM 月"
                value-format="yyyyMM"
                placeholder="选择月"/>
            </li>
            <li/>
            <li>
              <el-date-picker
                v-model="queryEndTime"
                type="month"
                format="yyyy 年 MM 月"
                value-format="yyyyMM"
                placeholder="选择月"
                @blur="dateRange"/>
            </li>
          </ul>
          <div class="Reimbursement-info-tableDetail-data">
            <el-table
              :data="ReimbursementTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%">
              <el-table-column
                prop="year_month"
                label="月份"
                width="250"/>
              <el-table-column
                prop="order_id"
                label="流水号"
                width="210"/>
              <el-table-column
                prop="status"
                label="支付方式"
                width="210"/>
              <el-table-column
                prop="price"
                label="总金额"
                width="210"/>
              <el-table-column
                prop="repayment_days"
                label="到账时间"
                width="210"/>
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleClick(scope.row,scope.$index)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="Reimbursement-info-pages">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[6]"
            :page-size="pagesize"
            :total="ReimbursementTableData.length"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ReimbursementData } from '@/api/monthlyState'
export default {
  name: 'MonthlyReimbursement',
  data() {
    return {
      // queryStartTime查询起始时间
      queryStartTime: null,
      // queryEndTime查询截止时间
      queryEndTime: null,
      // ReimbursementTableData接收数据
      ReimbursementTableData: [],
      currentPage: 1, // 初始页
      pagesize: 6 // 每页的数据
    }
  },
  created() {
    this.handleReimbursementTableData()
  },
  methods: {
    handleClick(row, index) {
      this.$router.push({ path: 'monthlyBillDetail', query: { OrderId: row.id }})
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
    handleReimbursementTableData(val) { // 请求数据的方法
      ReimbursementData(val).then(response => {
        if (response.data.code == 0) {
          this.ReimbursementTableData = response.data.data.list
          // console.log(response.data.data)
        }
      })
    },
    dateRange() {
      this.handleReimbursementTableData({
        year_month: {
          key: 'year_month',
          s: { 0: this.queryStartTime, 1: this.queryEndTime }
        }
      })
      console.log('光标离开')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//普通样式
.monthlyReimbursement{
    padding:40px 100px 0;
    .Reimbursement-info{
        .Reimbursement-info-title{
            margin-bottom:24px;
            p{
                height:33px;
                line-height:33px;
                color:#50688C;
                font-size:18px;
            }
        }
        .Reimbursement-info-tableDetail{
            height:535px;
            border:1px solid #E6EAEE;
            border-radius:4px;
            background:#FFFFFF;
            margin-bottom:24px;
            .Reimbursement-info-tableDetail-query{
                height:76px;
                line-height: 76px;
                li{
                    float:left;
                }
                li:nth-child(1){
                    margin-left:40px;
                    color:#50688C;
                    font-size:14px;
                }
                li:nth-child(2){
                    margin-left:24px;
                }
                li:nth-child(3){
                    margin:38px 0 0 10px;
                    width:12px;
                    height:1px;
                    background:#C5D0DE;
                }
                li:nth-child(4){
                    margin-left:10px;
                }
            }
        }
        .Reimbursement-info-pages{
            height:36px;
            padding-left:313px;
        }
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" >
//element-ui组件样式
.monthlyReimbursement{
    .Reimbursement-info-tableDetail-data{
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
        .el-button--text{
            color:#FFA800;
        }
    }
    .Reimbursement-info-pages{
        .el-pagination__total{
            width:88px;
            height:36px;
            border:1px solid #CED0DA;
            border-radius:4px;
            text-align:center;
            line-height:36px;
            color:#7F8FA4;
            font-size:14px;
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

