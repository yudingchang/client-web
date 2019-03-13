<template>
  <div class="walletDetail">
    <el-row>
      <el-col :span="24" >
        <div class="wallet-detailGo">
          <p>钱包详情</p>
          <!-- ul待付款倒计时提示 -->
          <ul v-show="DetailData.status == 0">
            <li>
              <span>系统将在1天23小时59分59秒后自动关闭</span>
              <span id="obligation">付款</span>
            </li>
          </ul>
          <!-- ul钱包详情 -->
          <ul>
            <li>
              <span>{{ OrderInfo.Status }}</span>
              <span>{{ DetailData.status }}</span>
            </li>
            <li>
              <span>{{ OrderInfo.CreateTime }}</span>
              <span>{{ DataKey.created_at }}</span>
            </li>
            <li>
              <span>{{ OrderInfo.Serial }}</span>
              <span>{{ DetailData.payment_id }}</span>
            </li>
            <li>
              <span>{{ OrderInfo.TradeType }}</span>
              <span>{{ DetailData.type }}</span>
            </li>
            <li v-if="DataKey.bill">
              <span>{{ OrderInfo.Bill }}</span>
              <span>{{ DetailData.bill }}</span>
            </li>
            <li v-if="DataKey.order">
              <span>{{ OrderInfo.order }}</span>
              <span>{{ DetailData.order }}</span>
            </li>
            <li v-if="DataKey.zfb">
              <span>{{ OrderInfo.zfb }}</span>
              <span>{{ DetailData.order }}</span>
            </li>
            <li>
              <span>{{ OrderInfo.Amount }}</span>
              <span>{{ DetailData.price }}</span>
            </li>
            <li>
              <span>{{ OrderInfo.PayTime }}</span>
              <span>{{ DetailData.deliveries_at }}</span>
            </li>
          </ul>
          <!-- ul汇款转账预留 -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { OrderDetail } from '@/api/walletDetail'
export default {
  name: 'WalletDetail',
  data() {
    return {
      // 详情页面账单和流水号
      DataKey: [],

      // 详情页面的数据origin
      DetailData: [],

      OrderInfo: {
        Status: '状态',
        CreateTime: '创建时间',
        Serial: '流水号',
        TradeType: '交易类型',
        Bill: '账单',
        order: '订单号',
        zfb: '支付宝订单号',
        Amount: '金额',
        PayTime: '付款时间'
      }
    }
  },
  created() {
    this.acceptDetailData(this.$route.query.OrderId)
    console.log(this.$route.query.OrderId)
  },
  methods: {
    acceptDetailData(val) {
      OrderDetail(val).then(response => {
        if (response.data.code == 0) {
          console.log(' 请求成功  success ')

          this.DataKey = response.data.data
          this.DetailData = response.data.data.payment
          console.log(this.DetailData)
          // 判断拿回来的数据进行列表状态判断
          if (this.DetailData.status == '0') {
            this.DetailData.status = '待付款'
          } else if (this.DetailData.status == '1') {
            this.DetailData.status = '付款中'
          } else if (this.DetailData.status == '2') {
            this.DetailData.status = '已完成'
          } else if (this.DetailData.status == '-1') {
            this.DetailData.status = '已关闭'
          }
          // console.log(this.DetailData)

          // 判断拿回来的数据进行列表交易类型判断
          if (this.DetailData.type == '0') {
            this.DetailData.type = '充值'
          } else if (this.DetailData.type == '1') {
            this.DetailData.type = '订单付款'
          } else if (this.DetailData.type == '2') {
            this.DetailData.type = '订单退款'
          } else if (this.DetailData.type == '3') {
            this.DetailData.type = '月结还款'
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scope>
//普通样式
.walletDetail{
        //wallet-detailGo
        padding-left:100px;
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
}
</style>

<style rel="stylesheet/scss" lang="scss" scope>
//element-ui样式

</style>
