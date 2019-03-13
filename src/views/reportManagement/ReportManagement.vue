<template>
  <div class="ReportManagement">
    <el-row>
      <el-col :span="24" class="ReportManagement-info">
        <ul class="ReportManagement-info-query">
          <li>Inspection time</li>
          <li>
            <el-date-picker
              v-model="startqueryTimevalue"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="start Date"/>
          </li>
          <li/>
          <li>
            <el-date-picker
              v-model="endqueryTimevalue"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="end Date"/>
          </li>
          <li>
            <el-select v-model="orderInfoValue" placeholder="订单号">
              <el-option
                v-for="item in orderInfo"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </li>
          <li>
            <el-input v-model="orderInput" placeholder="请输入"/>
          </li>
          <li>Status</li>
          <li>
            <el-select v-model="orderStateValue" placeholder="Whole">
              <el-option
                v-for="item in orderState"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </li>
          <li @click="queryOrderInfo">Query</li>
        </ul>
        <div class="ReportManagement-info-tableData">
          <el-table
            v-loading="loading"
            :data="reportTableData"
            height="calc(100vh - 340px)"
            stripe
            style="width: 100%">
            <el-table-column
              fixed
              prop="number"
              label="Report number"
              width="205"/>
            <el-table-column
              label="Order number"
              width="171">
              <template slot-scope="scope">
                <span type="text" size="small" @click="orderHandleClick(scope.row,scope.$index)">{{ scope.row.order.number }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="order.inspection_first_date"
              label="Inspection date"
              width="169"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="order.supplier.name"
              label="Supplier name"
              width="220"/>
            <el-table-column
              label="Item No."
              width="190">
              <template slot-scope="scope">
                <el-button type="text" size="small">{{ scope.row.products.numbers.join('') }}</el-button>
                <el-button v-if="scope.row.products.numbers.join('').length > 9?true:false" type="text" size="small" @click="checkArtHandleClick(scope.row.products.numbers)"><i class="iconfont icon-IconCopy"/></el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="Product"
              width="220">
              <template slot-scope="scope">
                <el-button type="text" size="small">{{ scope.row.products.names.join('，') }}</el-button>
                <el-button v-if="scope.row.products.names.join('').length > 8?true:false" type="text" size="small" @click="checkNameHandleClick(scope.row.products.names)"><i class="iconfont icon-IconCopy"/></el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="State"
              width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small">{{ scope.row.marking == 'COMPLETED'?'complete':'unfinish' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="Operation"
            >
              <template v-if="scope.row.marking == 'COMPLETED'" slot-scope="scope">
                <el-button v-if="scope.row.type_name == '线上'" type="text" size="small" @click="webpageHandleClick(scope.row)">网页报告</el-button>
                <el-button type="text" size="small" @click="PDFHandleClick(scope.row,scope.$index)">PDF报告</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="ReportManagement-info-Dialog">
          <el-dialog :visible.sync="reportProductsDialog1" title="全部产品货号">
            <el-table
              :data="ProductsNumberTableData"
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
                label="产品货号"
              >
                <template slot-scope="scope">
                  {{ scope.row }}
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
          <el-dialog :visible.sync="reportProductsDialog2" title="全部产品名称">
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
                  {{ scope.row }}
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
    <el-col :span="24" class="toolbar">
      <el-pagination
        :current-page="filters.currentpage"
        :page-sizes="[15, 30, 50]"
        :page-size="filters.rows"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        style="float:right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </el-col>
  </div>
</template>

<script>
import { getReportManagement } from '@/api/reportManagement'
export default {
  name: 'ReportManagement',
  components: {},
  data() {
    return {
      loading: false, // 过渡动画
      filters: {
        page: 1,
        rows: 15,
        currentpage: 1
      },
      startqueryTimevalue: '', // startqueryTimevalue开始时间
      endqueryTimevalue: '', // endqueryTimevalue截止时间
      orderInfo: [{
        value: '3',
        label: '订单号'
      }],
      orderInfoValue: '', // orderInfoValue选择值
      orderInput: '', // orderInput输入的值

      orderState: [{ // orderState订单状态
        value: '1',
        label: 'complete'
      }, {
        value: '2',
        label: 'unfinish'
      }],
      orderStateValue: '', // orderStateValue订单状态值

      // reportTableData 报告管理table数据
      reportTableData: [],

      reportProductsDialog1: false, // 产品号码Dialog显示隐藏
      ProductsNumberTableData: [], // 产品全部号码

      reportProductsDialog2: false, // 产品名称Dialog显示隐藏
      ProductsNameTableData: [], // 产品全部名称

      currentPage: 1, // 初始页
      pagesize: 10, // 每页的数据
      page: 1, //
      total: 10, //

      // 跳转传递数据
      accountApi: ''
    }
  },
  created() {
    if (this.$route.query.orderId) {
      console.log('跳转进来，发现orderId')
      this.queryOrderInfo()
    } else {
      console.log('没有发现id')
      this.getReportManagementData()
    }
  },
  methods: {
    // queryOrderInfo 点击查询相关订单
    queryOrderInfo() {
      if (this.$route.query.orderId) {
        console.log('进入queryOrderInfo')
        this.orderInput = this.$route.query.orderId.number
      }
      this.getReportManagementData({
        inspection_first_date: [this.startqueryTimevalue, this.endqueryTimevalue],
        marking: this.orderStateValue == '' ? '' : this.orderStateValue == 1 ? 'COMPLETED' : 'UNCOMPLETED',
        order_number: this.orderInput,
        page: this.filters.page,
        limit: this.filters.rows
      })
      console.log(this.orderStateValue)
    },

    // orderHandleClick 点击订单号
    orderHandleClick(row, index) {
      // console.log(row,index);
      this.$router.push({ path: '/orderManagement/orderDetails', query: { orderId: row.id }})
    },

    // checkArtHandleClick 点击查看全部货号展开
    checkArtHandleClick(row) {
      this.reportProductsDialog1 = true
      this.ProductsNumberTableData = row
    },

    // checkNameHandleClick 点击查看全部名称展开
    checkNameHandleClick(row) {
      console.log(row)
      this.reportProductsDialog2 = true
      this.ProductsNameTableData = row
    },

    // webpageHandleClick 点击网页报告
    webpageHandleClick(row) {
      // console.log(row,index);
      this.$router.push({ path: 'inspectionReport', query: { accountApi: row._links.self.substring(4) }})
      console.log(row)
    },

    // PDFHandleClick 点击PDF报告
    PDFHandleClick(row, index) {
      // console.log(row,index);
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(val) {
      this.filters.rows = val
      this.queryOrderInfo()
    },
    handleCurrentChange(val) {
      this.filters.page = val
      this.filters.currentpage = val
      this.queryOrderInfo()
    },

    // 页面加载调用方法
    getReportManagementData(val) {
      this.loading = true
      getReportManagement(val).then(response => {
        if (response.data.code == 0) {
          this.reportTableData = response.data.data
          this.total = response.data.meta.total
          // console.log(response.data.data)
          this.loading = false
        }
      }).catch(error => {
        console.log(error)
      })
    }

  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scope>
//普通样式
.ReportManagement{
    margin:0 40px 0 40px;
    .toolbar{
        position: absolute;
        right: 40px;
        bottom: 10px;
    }
    .ReportManagement-info{
        .ReportManagement-info-query{
            // height:80px;
            background:#FFFFFF;
            margin-top:24px;
            line-height: 80px;
            margin-bottom:24px;
            overflow: hidden;
            li{
                float:left;
                color:#164061;
                font-size:16px;
                height:80px;
            }
            li:nth-child(1){
                margin-left:32px;
            }
            li:nth-child(2){
                margin-left:16px;
            }
            li:nth-child(3){
                width:12px;
                height:1px;
                background:#C5D0DE;
                margin:40px 10px 0;
            }
            li:nth-child(5){
                margin-left:32px;
            }
            li:nth-child(6){
                margin-left:13px;
            }
            li:nth-child(7){
                margin-left:32px;
            }
            li:nth-child(8){
                margin-left:16px;
            }
            li:nth-child(9){
                margin:20px 0 0 32px;
                width:100px;
                height:40px;
                background:#67C23A;
                border-radius:4px;
                text-align: center;
                line-height: 40px;
                color:#FFFFFF;
                cursor: pointer;
            }
        }
        .ReportManagement-info-tableData{
            // height:580px;
            border:1px solid #E6EAEE;
            border-radius:4px;
            background:#FFFFFF;
        }
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" >
//element-ui样式
.ReportManagement{
    .ReportManagement-info-query{
        .el-date-editor.el-input{
            width:200px;
        }
        .el-input--prefix .el-input__inner{
            width:200px;
            height:40px;
            border-color:#CED0DA;
        }
        li:nth-child(5){
            .el-input__inner{
                width:130px;
                // border:none;
                text-align:center;
                border-color:#C0C4CC;
            }
            // .el-icon-arrow-up:before{
            //     color:#164061;
            //     font-size:16px;
            // }
            // .el-input__inner::-webkit-input-placeholder{
            //     color:#164061;
            //     font-size:16px;
            // }
            // .el-input__inner::-moz-placeholder{   /* Mozilla Firefox 19+ */
            //     color:#164061;
            //     font-size:16px;
            // }
            // .el-input__inner:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            //     color:#164061;
            //     font-size:16px;
            // }
            // .el-input__inner:-ms-input-placeholder{  /* Internet Explorer 10-11 */
            //     color:#164061;
            //     font-size:16px;
            // }
        }
        li:nth-child(6){
            .el-input__inner{
                width:240px;
                height:40px;
                border-color:#C0C4CC;
            }
        }
        li:nth-child(8){
            .el-input__inner{
                width:120px;
                height:40px;
                border-color:#C0C4CC;
            }
        }
    }
    .ReportManagement-info-tableData{
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
            padding-left:25px;
            width:205px;
            white-space:nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
        }
        .el-table td:nth-child(1) div{
            padding-left:25px;
            width:205px;
            white-space:nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
        }
        .el-table td:nth-child(2) div{
            font-size:14px;
            color:rgba(21,139,228,1);
        }
        .el-table td:last-child div .el-button--text{
            font-size:14px;
            color:#FFA800;
        }
        .el-table td:nth-child(2) div .el-button--text{
            // color:rgba(80,104,140,1);
            font-size:14px;
            padding:0;
        }
        .el-table td:nth-child(5) div .el-button--text:nth-child(1){
            float:left;
            width:109px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:rgba(80,104,140,1);
            font-size:14px;
            margin-right:34px;
        }
        .el-table td:nth-child(5) div .el-button--text:nth-child(2){
            float:left;
            color:rgba(80,104,140,1);
            margin:0;
        }
        .el-table td:nth-child(6) div .el-button--text:nth-child(1){
            float:left;
            width:97px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:rgba(80,104,140,1);
            font-size:14px;
            margin-right:32px;
            text-align:left;
        }
        .el-table td:nth-child(6) div .el-button--text:nth-child(2){
            float:left;
            color:rgba(80,104,140,1);
            margin:0;
        }
        .el-table td:nth-child(7) div .el-button--text{
            font-size:14px;
            color:rgba(80,104,140,1);
        }

    }
    .ReportManagement-info-pagination{
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
        .el-pagination__editor.el-input .el-input__inner{
            // border:none;
            height:35px;
            line-height:35px;
            text-align:center;
            border-radius:4px;
            padding:0;
            background:#F3F6F9;
            border-bottom:1px solid #CED0DA;
        }
    }
    .ReportManagement-info-Dialog{
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
}

</style>

