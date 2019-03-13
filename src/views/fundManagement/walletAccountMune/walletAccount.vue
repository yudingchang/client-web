<template>
  <div class="walletAccount">
    <!-- wallet-index -->
    <div class="wallet-index">
      <div class="walletAccount-Ac">
        <p class="walletAccount-Ac-name">钱包账户</p>
        <div class="walletAccount-Ac-recharge">
          <div class="walletAccount-Ac-recharge-rmb">
            <p>
              <span>人民币</span>
              <span>￥ 8989.89</span>
            </p>
            <p @click="jumpPayRmb">去充值</p>
          </div>
          <div class="walletAccount-Ac-recharge-line"/>
          <div class="walletAccount-Ac-recharge-dollar">
            <p>
              <span>美元</span>
              <span>$ 8989.89</span>
            </p>
            <p @click="jumpDollar">去充值</p>
          </div>
        </div>
      </div>
      <div class="walletAccount-detail">
        <p class="walletAccount-detail-name">钱包明细</p>
        <div class="walletAccount-detail-list">
          <ul>
            <li>创建时间</li>
            <li>
              <div class="block">
                <el-date-picker
                  v-model="created_at[0]"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"/>
              </div>
            </li>
            <li/>
            <li>
              <div class="block">
                <el-date-picker
                  v-model="created_at[1]"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"/>
              </div>
            </li>
            <li>交易类型</li>
            <li>
              <el-select v-model="transactionTypevalue" placeholder="请选择">
                <el-option
                  v-for="item in transactionType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </li>
            <li>状态</li>
            <li>
              <el-select v-model="transactionStatevalue" placeholder="请选择">
                <el-option
                  v-for="item in transactionState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </li>
            <li @click="queryList">查询</li>
          </ul>
          <ul class="wallet-tableDate-ul">
            <el-table
              :header-cell-style="{background:'#F5F8FA'}"
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%">
              <el-table-column
                fixed
                align="left"
                prop="money_id"
                label="流水号"
                width="237"/>
              <el-table-column
                align="left"
                prop="created_at"
                label="创建时间"
                width="200"/>
              <el-table-column
                align="left"
                prop="price"
                label="金额"
                width="200">
                <template slot-scope="scope">
                  <!-- <span>{{scope.row.id}}</span> -->
                  <span>{{ scope.row.plus_minus ? "+" : "-" }}</span>
                  <span>￥{{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="left"
                prop="type"
                label="交易类型"
                width="200"/>
              <el-table-column
                align="left"
                prop="status"
                label="状态"
                width="200"/>
              <el-table-column
                align="left"
                fixed="right"
                label="操作"
                width="381">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleClickDetail(scope.row, scope.$index)">详情</el-button>
                  <el-button type="text" size="small"/>
                </template>
              </el-table-column>
            </el-table>
          </ul>
          <ul>
            <el-pagination
              :current-page="currentPage"
              :page-sizes="[9]"
              :page-size="pagesize"
              :total="tableData.length"
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tableDate, queryList, tradeTypeDetail } from '@/api/walletDetail'// 列表请求数据
export default {
  name: 'WalletAccount',
  components: { },
  data() {
    return {
      created_at: [],
      a: '+',
      // transactionType交易类型
      transactionType: [{
        value: '1',
        label: '订单付款'
      }, {
        value: '3',
        label: '月结还款'
      }, {
        value: '0',
        label: '充值'
      }, {
        value: '2',
        label: '订单退款'
      }],
      // transactionState状态
      transactionState: [{
        value: '0',
        label: '待付款'
      }, {
        value: '2',
        label: '成功'
      }, {
        value: '1',
        label: '付款中'
      }, {
        value: '-1',
        label: '已关闭'
      }],
      // transactionTypevalue是交易类型数据
      transactionTypevalue: '',
      // transactionStatevalue是状态类型数据
      transactionStatevalue: '',
      // 钱包明细表格数据tableData
      tableData: [],
      // 钱包明细表格数据查询tableDateQuery
      tableDateQuery: [],
      currentPage: 1, // 初始页
      pagesize: 9, // 每页的数据
      radio: '1',

      // 详情页面的数据origin
      jumpDetailDate: [],
      jumpDetailKeyValue: {
        detailStatus: '状态',
        detailCreateTime: '创建时间',
        detailSerial: '流水号',
        detailTradeType: '交易类型',
        detailBill: this.judege,
        detailAmount: '金额',
        detailPayTime: '付款时间'
      },
      // 判断是订单号是还是账单号
      judege: '',

      // 用来区分table金额前面的加减号
      tableDataadd: false,
      tableDatareduce: false,

      // 判断支付方式途径传递传出框中数据chn
      detailPayWayInMessage: '',
      // 判断支付方式途径传递传出框中数据usa
      detailPayWayInMessageUsa: '',

      // 判断tableDate返回回来的值正负
      tf: ''
    }
  },
  watch: {

  },
  created() {
    this.tableDateA()
  },
  methods: {
    queryList() {
      this.tableDateA({
        created_at: this.created_at,
        type: this.value1,
        status: this.value2
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
    // 获取钱包明细状态信息
    tableDateA(val) {
      tableDate(val).then(response => {
        if (response.data.code == 0) {
          this.tableData = response.data.data.list
          // console.log(this.tableData[0].plus_minus)

          for (let i = 0; i < this.tableData.length; i++) {
            console.log(response.data.data.list[i].price)
            // 判断拿回来的数据进行列表交易类型判断
            if (this.tableData[i].type == '0') {
              this.tableData[i].type = '充值'
            } else if (this.tableData[i].type == '1') {
              this.tableData[i].type = '订单付款'
            } else if (this.tableData[i].type == '2') {
              this.tableData[i].type = '订单退款'
            } else if (this.tableData[i].type == '3') {
              this.tableData[i].type = '月结还款'
            }
            // 判断拿回来的数据进行列表状态判断
            if (this.tableData[i].status == '0') {
              this.tableData[i].status = '待付款'
            } else if (this.tableData[i].status == '1') {
              this.tableData[i].status = '付款中'
            } else if (this.tableData[i].status == '2') {
              this.tableData[i].status = '已完成'
            } else if (this.tableData[i].status == '-1') {
              this.tableData[i].status = '已关闭'
            }
            // 判断拿回来的数据进行金额数据判断
          }
        }
      })
    },
    // table表格操作click详情方法
    handleClick(row, index) {
      this.$router.push({ path: 'walletDetail', query: { OrderId: row.id }})
    },
    // 跳转支付
    jumpPayRmb() {
      this.$router.push({ path: 'walletRechargeRmb', query: {}})
    },
    jumpDollar() {
      this.$router.push({ path: 'walletRechargeDollar', query: {}})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  // walletAccount
.walletAccount{
  //walletAccount-detail
  .walletAccount-detail{
    .walletAccount-detail-list ul:nth-child(1){
      .el-date-editor.el-input{
        width:200px;

      }
      .el-select .el-input__inner{
        width:140px;
        height:36px !important;
      }
    }
      //改变钱包明细列表样式
      .wallet-tableDate-ul{
        //表头部分header
          .el-table th>.cell{
            padding-left:0px;
            font-size:14px;
            color:#50688C;
          }
          .el-table th:nth-child(1)>.cell{
            padding-left:39px;

          }

        //表身body部分
          .el-table td>.cell{
            padding-left:0px;
            font-size:14px;
            color:#50688C;
          }
          .el-table td:nth-child(1)>.cell{
            padding-left:39px;
          }
          .el-button--text{
            color:#FFA800;
          }
      }
  }
  // pagination
  .el-pagination {
    //当前总页数
    .el-pagination__total{
      color:#7F8FA4 !important;
      font-size:14px !important;
      width:88px !important;
      height:36px !important;
      border:1px solid #CED0DA;
      text-align: center;
      line-height: 36px !important;
      border-radius:4px;
      cursor:pointer;
    }
    //选择页数
    .el-input__inner{
      color:#7F8FA4 !important;
      font-size:14px !important;
      // width:88px !important;
      height:36px !important;
      border:1px solid #CED0DA;
    }
    //后退
    .btn-prev,.btn-next{
      width:36px !important;
      height:36px !important;
      border:1px solid #CED0DA;
      border-radius:4px;
      text-align: center;
      // padding-left:12px;
      margin-right:15px;
      color:#7F8FA4 !important;
    }
    .btn-next{
      margin-left:15px !important;
    }
    //
    //页码
    .el-pager{
      height:36px;

      .number{
        width:36px !important;
        height:100% !important;
        border:1px solid #CED0DA;
        border-radius:4px;
        text-align: center;
        line-height: 36px !important;
        margin-right:10px;
        // color:#7F8FA4 !important;
        color:#7F8FA4;
        font-size:12px;
      }
      .active{
        background-color:#158BE4;
        color:#fff;
        font-size:12px;
        border:none;
      }
    }
    //跳转页码
    .el-pagination__jump{
        width:124px !important;
        height:36px !important;
        border:1px solid #CED0DA;
        border-radius:4px;
        line-height: 36px !important;
        text-align: center !important;
        background:#CED0DA;
        color:#fff !important;
        .el-input{
          float:right;
          width:68px;
          height:100%;
          overflow:hidden;
          padding:0;
          margin:0;
          border-top-left-radius:0 !important;
          border-bottom-left-radius:0 !important;
          .el-input__inner{
            border:none;
            border-radius: 0 !important;
          }
        }
    }

  }
  //rmb充值页面wallet-pay-Rmb
//   .wallet-pay-Rmb,.wallet-pay-Dollar{
//     //充值金额
//     .el-button--medium{
//       width:140px;
//       height:40px;
//       // border:1px solid #C0C4CC;
//       background:#F3F6F9;
//       margin:0;
//       border:1px solid #C0C4CC;
//       margin-right:30px;
//       span{
//         font-size:14px !important;
//         color:#909399;

//       }
//     }
//   //弹出框样式调整
//   .pay-rmb-submit{
//     //点击按钮
//     .el-button--medium{
//       margin-left:146px;
//       width:250px;
//       height:50px;
//       border-radius:4px;
//       background:#FFA800;
//       border:none;
//       span{
//         color:#fff;
//         font-size:18px;
//       }
//     }
//     //弹出框界面
//     .el-dialog__wrapper{
//       .el-dialog--center{
//         width:600px !important;
//         height:360px !important;
//         border-radius:8px;
//         border:none;
//         //弹出框header
//         .el-dialog__header{
//           height:48px;
//           margin-bottom:49px;
//           .el-dialog__headerbtn{
//             i{
//               font-size:32px;
//               color:#909399;
//               font-weight:600;
//             }
//           }
//         }
//         //弹出框body
//         .el-dialog__body{
//           padding:0;
//           margin-bottom:27px;
//         }
//         //弹出框footer
//         .el-dialog__footer{
//           padding:0;
//           button{
//             margin-left:210px !important;
//             width:180px !important;
//             height:40px !important;
//             border:none;
//             padding: 0;
//             display:block;
//           }
//           button:nth-child(1){
//             margin-bottom:16px;
//             span{
//               font-size:14px !important;
//               color:#fff;
//             }
//           }
//           button:nth-child(2){
//             background:#fff;
//             border:1px solid #909399;
//             span{
//               color:#909399;
//               font-size:14px !important;
//             }
//           }
//         }
//       }
//     }
//   }
// }

}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.walletAccount{
    padding-left:100px;
    // height:600px;
    overflow:hidden;
    .walletAccount-Ac{
        margin-bottom:32px;
        .walletAccount-Ac-name{
            height:33px;
            line-height:33px;
            font-size:16px;
            font-weight:100;
            color:#50688C;
            margin:24px 0;
        }
        .walletAccount-Ac-recharge{
            width:770px;
            height:168px;
            border:1px solid #E6EAEE;
            border-radius:4px;
            background:#fff;
            .walletAccount-Ac-recharge-rmb{
                width:383.5px;
                height:168px;
                float:left;
                p:nth-child(1){
                    height:35px;
                    margin:32px 0 22px;
                    span:nth-child(1){
                        color:#50688C;
                        font-size:24px;
                        margin-left:67px;
                    }
                    span:nth-child(2){
                        color:#158BE4;
                        font-size:26px;
                        margin-left:37px;
                    }
                }
               p:nth-child(2){
                   height:40px;
                   width:120px;
                   background:#67C23A;
                   text-align:center;
                   line-height:40px;
                   border-radius:4px;
                   color:#fff;
                   font-size:16px;
                   margin-left:132px;
                   cursor:pointer;
               }
            }
            .walletAccount-Ac-recharge-line{
                width:1px;
                height:80px;
                margin-top:46px;
                float:left;
                background:#DFE3E9;
            }
            .walletAccount-Ac-recharge-dollar{
                width:383.5px;
                height:168px;
                float:left;
                p:nth-child(1){
                    height:35px;
                    margin:32px 0 22px;;
                    span:nth-child(1){
                        color:#50688C;
                        font-size:24px;
                        margin-left:67px;
                    }
                    span:nth-child(2){
                        color:#158BE4;
                        font-size:26px;
                        margin-left:37px;
                    }
                }
               p:nth-child(2){
                   height:40px;
                   width:120px;
                   background:#67C23A;
                   text-align:center;
                   line-height:40px;
                   border-radius:4px;
                   color:#fff;
                   font-size:16px;
                   margin-left:132px;
                   cursor:pointer;
               }
            }
        }
    }
    .walletAccount-detail{
      width:1420px;

        // background:#fff;
        .walletAccount-detail-name{
            height:33px;
            line-height: 33px;
            font-size:16px;
            color:#50688C;
            margin:24px 0;
        }
        .walletAccount-detail-list{
            width:100%;
            height:682px;
            border:1px solid #E6EAEE;
            border-radius:4px;
            background:#fff;
            // padding-left:40px;
            padding-top:19px;
            ul:nth-child(1){
                height:36px;
                line-height:36px;
                padding-left:40px;
                 li{
                    list-style:none;
                    float:left;

                }
                li:nth-child(1){
                    margin-right:16px;
                    font-size:16px;
                    color:#50688C;
                    width:72px;
                }
                li:nth-child(3){
                    margin:18px 10px 0;
                    width:12px;
                    height:1px;
                    background:#C5D0DE;
                }
                li:nth-child(5){
                    margin-left:32px;
                    font-size:16px;
                    color:#50688C;
                     width:72px;
                }
                li:nth-child(6){
                    margin-left:16px;
                }
                li:nth-child(7){
                    margin-left:32px;
                    font-size:16px;
                    color:#50688C;
                    margin-right:16px;
                }
                li:nth-child(9){
                    margin-left:32px;
                    width:100px;
                    height:36px;
                    border-radius:4px;
                    background:#67C23A;
                    text-align: center;
                    line-height:36px;
                    color:#fff;
                    font-size:16px;
                    cursor:pointer;
                }
            }
            ul:nth-child(2){
                margin:18px 0 24px;
                width:100%;
                background:#F5F8FA;
            }
            ul:nth-child(3){
                margin-left:314px;
            }
        }
    }
    // wallet-pay
    // .wallet-pay-Rmb,.wallet-pay-Dollar{
    //     // padding-left:100px;
    //     padding-top:38px;
    //     p:nth-child(1){
    //         height:25px;
    //         line-height: 25px;
    //         font-size:16px;
    //         color:#50688C;
    //         margin-bottom:30px;
    //     }
    //     .wallet-pay-Rmb-ul{
    //         height:40px;
    //         padding:0;
    //         margin-bottom:24px;
    //         li{
    //             width:140px;
    //             height:100%;
    //             border:1px solid #C0C4CC;
    //             border-radius:4px;
    //             float:left;
    //             text-align:center;
    //             line-height: 40px;
    //             color:#909399;
    //             font-size:14px;
    //             margin-right:30px;
    //             cursor:pointer;
    //         }
    //         li:nth-child(1){
    //             border:none;
    //             width:64px;
    //             margin-right:26px;
    //             text-align: left;
    //             color:#7F8FA4;
    //         }
    //         div{
    //           .el-radio-group{
    //             .el-radio-button__inner{
    //               width:140px !important;
    //             }
    //           }
    //         }
    //         // .addBg{
    //         //     background:#67C23A;
    //         //     color:#fff;
    //         // }
    //         .class-G{
    //             background:#67C23A;
    //             color:#fff;
    //         }
    //         // .class-B{
    //         //     background:#F3F6F9;
    //         //     color:#909399;
    //         // }
    //         //radio3的样式

    //     }
    //     p:nth-child(3){
    //         height:40px;
    //         margin-left:90px;
    //         position:relative;
    //         width:300px;
    //         margin-bottom:24px;
    //         #sumFin{
    //             width:284px;
    //             height:100%;
    //             border:1px solid #C0C4CC;
    //             outline: none;
    //             border-radius:4px;
    //             color:#909399;
    //             font-size:14px;
    //             padding-left:16px;
    //             background:#F3F6F9;
    //         }
    //         span{
    //             color:#909399;
    //             font-size:14px;
    //             position:absolute;
    //             right:26px;
    //             top:13px;
    //         }
    //     }
    //     //payment
    //     .payment{
    //         height:400px;
    //         margin-bottom:24px;
    //         p{
    //             height:80px;
    //             color:#7F8FA4;
    //             font-size:14px;
    //             float:left;
    //             line-height:80px;
    //             margin-right:34px;

    //         }
    //         .paymentAll{
    //             float:left;
    //             height:400px;
    //             width:660px;
    //         }

    //     }
    //     //propsData
    //     .propsData{
    //         width:250px;
    //         height:50px;
    //         border:none;
    //         border-radius:4px;
    //         text-align: center;
    //         line-height: 50px;
    //         background:#FFA800;
    //         color:#fff;
    //         font-size:18px;
    //         margin-left:147px;
    //         cursor:pointer;
    //     }
    //     //pay-rmb-submit
    //     .pay-rmb-submit{
    //       p{
    //         height:28px;
    //         text-align: center;
    //         font-size:20px;
    //         color:#6F90AE;
    //       }
    //       .su-payment{
    //         margin-bottom:0;
    //       }
    //     }
    // }
    //wallet-detailGo
    .wallet-detailGo{
      padding-top:40px;
      p{
        height:25px;
        line-height: 25px;
        font-size:16px;
        color:#50688C;
        margin-bottom:24px;
      }
      ul:nth-child(2){
        margin-bottom:24px;
        li{
          height:40px;
          line-height:40px;
          span:nth-child(1){
            display:inline-block;
            color:#FFA800;
            font-size:14px;
            margin-right:24px;
          }
          span:nth-child(2){
            display:inline-block;
            width:120px;
            height:40px;
            border-radius:4px;
            background:#67C23A;
            color:#fff;
            font-size:14px;
            text-align: center;
            line-height: 40px;
          }
        }
      }
      ul:nth-child(3){
        li{
          height:22px;
          line-height: 22px;
          margin-bottom:24px;
          span:nth-child(1){
            display: inline-block;
            width:190px;
            color:#7C8FA6;
            font-size:14px;
          }
          span:nth-child(2){
            color:#50688C;
            font-size:14px;
          }
        }
        li:last-child{
          margin-bottom:0;
        }
      }
    }
    //用来判定传过来的数据金额前面是+还是-
    .tableDataadd {
      &::before {
        content: '+';
      }
    }
    .tableDatareduce{
      &::before{
        content:'-';
      }
    }

}

</style>

