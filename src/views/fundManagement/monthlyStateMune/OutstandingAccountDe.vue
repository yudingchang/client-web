<template>
  <div class="OutstandingAccountDe">
    <el-row>
      <el-col :span="24" class="AccountDe-info">
        <div class="AccountDe-info-title">
          <p>未出账明细</p>
        </div>
        <div class="AccountDe-info-tableDetail">
          <ul class="AccountDe-info-tableDetail-query">
            <li>创建时间</li>
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
          <div class="AccountDe-info-tableDetail-data">
            <el-table
              :data="AccountDeTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%">
              <el-table-column
                prop="year_month"
                label="创建时间"
                width="250"/>
              <el-table-column
                label="订单号"
                width="210">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleClick(scope.row,scope.$index)">{{ scope.row.year_month }}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="year_month"
                label="币种"
                width="210"/>
              <el-table-column
                prop="year_month"
                label="总金额"
                width="210"/>
              <el-table-column
                prop="year_month"
                label="到账时间"
                width="210"/>
              <el-table-column
                label="状态"
                prop="year_month"
              >
                <!-- <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">查看详情</el-button>
                            </template> -->
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="AccountDe-info-pages">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[6]"
            :page-size="pagesize"
            :total="AccountDeTableData.length"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { AccountDeData } from '@/api/monthlyState'
export default {
  name: 'OutstandingAccountDe',
  data() {
    return {
      // queryStartTime查询起始时间
      queryStartTime: null,
      // queryEndTime查询截止时间
      queryEndTime: null,
      // AccountDeTableData接收数据
      AccountDeTableData: [],
      currentPage: 1, // 初始页
      pagesize: 6 // 每页的数据
    }
  },
  created() {
    this.AccountDetailTableData()
  },
  methods: {
    handleClick(row, index) {
      console.log(row.order_id)
      this.$router.push({ path: '' })
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
    AccountDetailTableData(val) { // 请求数据的方法
      AccountDeData(val).then(response => {
        if (response.data.code == 0) {
          this.AccountDeTableData = response.data.data.list
        }
      })
    },
    dateRange() {
      this.AccountDetailTableData({
        year_month: {
          key: 'year_month',
          s: { 0: this.queryStartTime, 1: this.queryEndTime }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//普通样式
.OutstandingAccountDe{
    // margin-right:100px;
    padding:32px 100px 244px;
    .AccountDe-info{
        .AccountDe-info-title{
            margin-bottom:24px;
            p{
                height:33px;
                line-height:33px;
                color:#50688C;
                font-size:18px;
            }
        }
        .AccountDe-info-tableDetail{
            height:535px;
            border:1px solid #E6EAEE;
            border-radius:4px;
            background:#FFFFFF;
            margin-bottom:24px;
            .AccountDe-info-tableDetail-query{
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
        .AccountDe-info-pages{
            height:36px;
            padding-left:313px;
        }
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" >
//element-ui组件样式
.OutstandingAccountDe{
    .AccountDe-info-tableDetail-data{
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
            color:#158BE4;
            font-size:14px;
        }
    }
    .AccountDe-info-pages{
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

